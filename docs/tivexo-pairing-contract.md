# Tivexo IPTV — TV pairing contract

Spec voor de Samsung Tizen-app **Tivexo IPTV**. De tv toont een code + QR, de gebruiker vult zijn
gegevens in op zijn telefoon via `nhsoftware.ae`, en de tv haalt die gegevens op. Dit document is de
enige bron van waarheid voor de tv-kant: alles hieronder ligt vast in de website-implementatie en
mag niet afwijkend geïnterpreteerd worden.

De tv praat met precies één endpoint, met precies één methode: `GET`.

> **Voordat je begint — controleer de opslag.**
> De pairing werkt alleen als de website met Redis draait. Zonder de juiste environment-variabelen
> valt de server terug op een Map in het geheugen van één instance; op een serverless deployment
> schrijft de ene instance de `POST` weg en leest een andere instance de `GET`, en dan mislukt de
> pairing meestal — onvoorspelbaar, en met als enig symptoom een eindeloze reeks `404`'s aan de
> tv-kant. Dat is precies de toestand die de tv volgens §6 negeert.
> Doe daarom altijd eerst één `GET https://www.nhsoftware.ae/iptv/api/status` (zie §4.1) en bevestig
> dat er `"store":"redis"` terugkomt. Staat er `"memory"`, dan is elke test hieronder betekenisloos:
> het is een serverprobleem, geen tv-probleem.

---

## 1. De flow

1. De tv genereert een **nieuwe 6-teken code** en rendert die groot op het scherm, samen met een QR
   die naar `https://www.nhsoftware.ae/iptv?c={CODE}` wijst.
2. De gebruiker scant de QR (of typt de code met de hand op `nhsoftware.ae/iptv`) en vult op zijn
   telefoon het formulier in. De pagina doet `POST /iptv/api/session/{CODE}`.
3. De tv doet ondertussen elke **3500 ms** een `GET /iptv/api/session/{CODE}`.
4. De eerste `200` levert de payload **en vernietigt de sessie op de server** (one-time read). De tv
   verwerkt die response precies één keer.
5. De tv past de bron toe en start de sessie opnieuw (nieuwe code + QR) zodra de flow klaar of
   mislukt is.

De tv is de enige partij die codes genereert. De server maakt nooit een code aan.

---

## 2. Code-formaat

| | |
|---|---|
| Lengte | **6 tekens** |
| Alfabet | `23456789ACDEFGHJKMNPQRSTUVWXYZ` |
| Casing | altijd **uppercase** genereren, tonen en verzenden |

De ambigue glyphs `0` `O` `1` `I` `L` `B` zitten er bewust **niet** in, zodat een code die van een
tv-scherm wordt overgetypt niet misgelezen wordt.

**Normalisatie is symmetrisch.** De server draait dezelfde `normalizeCode` over het pad-segment van
jouw `GET` als over wat de gebruiker op de site intypt: uppercasen, **alle niet-alfanumerieke tekens
weggooien** (niet alleen spaties en streepjes) en daarna `B` → `8`. Kleine letters, spaties en
streepjes in de URL werken dus ook vanaf de tv. Verstuur desondanks **altijd** de canonieke
uppercase-vorm — dat is wat gegarandeerd is, de rest is coulance.

`B` → `8` is de **enige** misleesreparatie. Een getypte `O`, `I`, `L`, `0` of `1` overleeft de
normalisatie wél, maar valt buiten het alfabet: dat is simpelweg een ongeldige code en er komt geen
pairing. Daarom is het lettertype op het scherm (§13) niet cosmetisch — het moet voorkomen dat een
getoond teken voor een van die uitgesloten glyphs wordt aangezien.

Gebruik een cryptografisch fatsoenlijke randombron met rejection sampling (geen `Math.random()`,
geen modulo-bias — 256 is niet deelbaar door 30):

```js
var CODE_ALPHABET = "23456789ACDEFGHJKMNPQRSTUVWXYZ"

function generateCode() {
  var out = ""
  var buf = new Uint8Array(16)
  while (out.length < 6) {
    window.crypto.getRandomValues(buf)
    for (var i = 0; i < buf.length && out.length < 6; i++) {
      // 240 = 8 * 30; alles daarboven weggooien houdt de verdeling uniform
      if (buf[i] < 240) out += CODE_ALPHABET.charAt(buf[i] % 30)
    }
  }
  return out
}
```

Als `window.crypto.getRandomValues` op het doelmodel ontbreekt, val dan terug op een bron die
minstens tijd + **device-entropie** mengt (serienummer, MAC, duid) — nooit alleen de klok. Twee
toestellen die tegelijk uit de doos komen en tegelijk aangaan mogen niet dezelfde reeks produceren;
waarom dat ernstig is, staat in §12.

---

## 3. QR-URL en QR-rendering

```
https://www.nhsoftware.ae/iptv?c={CODE}
```

Exact deze URL, met `https`, met `www`, en met de code in hoofdletters in de `c`-parameter. De
pagina leest `c` uit, normaliseert hem en vult het formulier voor. Toon onder de QR ook de code zelf
in leesbare tekst plus de kale URL `nhsoftware.ae/iptv`, zodat een gebruiker zonder werkende camera
de code met de hand kan intypen — hoofdletterongevoelig, zie §2.

De QR wordt vanaf twee tot drie meter gescand, met een handcamera, van een lichtgevend paneel. Dat
is de meest waarschijnlijke plek waar de happy path stukgaat, dus de render is een harde spec en
geen smaakkwestie:

| | |
|---|---|
| Inhoud | de volledige URL hierboven: 39 tekens, byte-mode (de kleine letters sluiten alfanumerieke modus uit) |
| Error correction | **Q** (25 %) → versie 4, 33×33 modules. Minimaal **M** → versie 3, 29×29 modules |
| Modulegrootte | ≥ **10 px** per module bij 1080p, altijd een heel aantal pixels — nooit fractioneel schalen |
| Quiet zone | ≥ **4 modules** wit rondom, binnen de QR-afbeelding zelf (bij versie 4 dus 33 + 8 = 41 modules breed) |
| Kleur | puur zwart `#000000` op puur wit `#FFFFFF`, **ongeacht het thema** — geen tint, geen transparantie, geen gradient, geen afgeronde modules, geen logo in het midden |
| Minimale afmeting | ≥ **35 % van de schermhoogte**, en bij 1080p nooit kleiner dan **410 px** in het vierkant, inclusief quiet zone |
| Beweging | statisch renderen — geen animatie, fade of scaling op het moment dat de gebruiker scant |

410 px is precies 41 modules × 10 px: bij 1080p is de modulegrootte de bindende ondergrens. Op 4K
schaal je mee met de schermhoogte, niet met de pixelmaat.

---

## 4. Endpoints

| Methode | URL | Wie |
|---|---|---|
| `POST` | `https://www.nhsoftware.ae/iptv/api/session/{CODE}` | de telefoon (website) — **niet de tv** |
| `GET` | `https://www.nhsoftware.ae/iptv/api/session/{CODE}` | de tv |

De tv doet **uitsluitend** `GET`. Nooit `POST`, nooit `DELETE`: de sessie ruimt zichzelf op bij de
eerste geslaagde read en verloopt daarnaast vanzelf.

### 4.1 Diagnose-endpoint

```
GET https://www.nhsoftware.ae/iptv/api/status
```

```json
{ "store": "redis", "ttlSeconds": 600, "pollIntervalMs": 3500 }
```

Zelfde CORS- en `no-store`-headers als de sessie-endpoint, **geen** rate limit. `store` is `"redis"`
of `"memory"`; `"memory"` betekent dat pairing op productie onbetrouwbaar is (zie het kader
bovenaan). Bevat nooit een code, payload of environment-waarde.

Gebruik dit als **diagnose**, niet als onderdeel van de flow: één call bij het openen van het
pairing-scherm of achter een verborgen debug-optie. Poll het niet.

---

## 5. Payloads

De `200`-response body is exact één van de volgende vijf vormen. Het veld `v` is altijd `1`.

**Auto-detect** — de gebruiker plakte één URL en de tv bepaalt zelf het type:

```json
{ "v": 1, "type": "source", "source": { "kind": "auto", "url": "..." } }
```

**Xtream Codes:**

```json
{
  "v": 1,
  "type": "source",
  "source": { "kind": "xtream", "server": "...", "username": "...", "password": "..." }
}
```

**M3U-playlist** (`epgUrl` is optioneel — het veld kan ontbreken **of** een lege string zijn):

```json
{
  "v": 1,
  "type": "source",
  "source": { "kind": "m3u", "playlistUrl": "...", "epgUrl": "..." }
}
```

**Directe stream:**

```json
{ "v": 1, "type": "source", "source": { "kind": "direct", "streamUrl": "..." } }
```

**Backup-code** — een eerder geëxporteerde backup-blob die de tv importeert:

```json
{ "v": 1, "type": "backup", "code": "..." }
```

### 5.1 Veldlimieten

De server garandeert voor **elk** veld dat het getrimd is, niet leeg (behalve een optionele lege
`epgUrl`) en binnen de grens hieronder valt. De garantie "single-line, geen control-characters" geldt
voor **alle velden behalve `backup.code`**:

| Veld | Max | Garantie |
|---|---|---|
| `auto.url` | 2048 tekens | single-line, geen control-characters |
| `xtream.server` | 2048 tekens | single-line, geen control-characters |
| `xtream.username` / `xtream.password` | 256 tekens | single-line, geen control-characters |
| `m3u.playlistUrl` / `m3u.epgUrl` | 4096 tekens | single-line, geen control-characters |
| `direct.streamUrl` | 4096 tekens | single-line, geen control-characters |
| `backup.code` | 100.000 tekens | **alleen getrimd en lengtebegrensd** — mag élk control-character bevatten: newlines, maar ook `NUL`, `ESC` en de rest van C0/C1 |
| hele request body | 128 KB | geweigerd met `413`, nooit stilzwijgend afgekapt |

"Geen control-characters" betekent precies: geen `U+0000`–`U+001F` en geen `U+007F`. Andere
onzichtbare tekens (C1, zero-width, RTL-overrides) worden **niet** gefilterd, in geen enkel veld.

`backup.code` is dus **opaque data**, geen tekst die je vertrouwt. Wat dat concreet betekent, staat
in §11.

**Let op de URL-vorm:** de server is expres soepel. Een `server` of `url` mag zonder schema
binnenkomen (`portal.example.com:8080`) omdat gebruikers dat nu eenmaal zo plakken. De tv doet de
echte detectie, normalisatie en verbindingstest.

### 5.2 Error-bodies

Elke response van deze API is `application/json` — ook de foutgevallen. Die hebben altijd exact deze
vorm:

```json
{ "error": "not_found" }
```

| `error` | Status | Bij |
|---|---|---|
| `not_found` | `404` | `GET` — niets ingevuld, verlopen, al opgehaald, óf een ongeldige code |
| `rate_limited` | `429` | `GET` en `POST` |
| `server_error` | `500` | `GET` en `POST` |
| `invalid_payload` | `400` | alleen `POST` |
| `payload_too_large` | `413` | alleen `POST` |

Een error-body bevat **nooit** `v` of `type`. Een client die op `v === 1` controleert, wijst ze
daarom vanzelf af — je hebt geen aparte parser nodig, alleen de wetenschap dat een `404`-body JSON
is en niet leeg. Een geslaagde `POST` geeft `204` zonder body, maar die kant is de telefoon; de tv
ziet dat nooit.

---

### 5.3 Aansluiting op de bestaande modellen in de app

De veldnamen op de lijn zijn met opzet gelijk aan `SourceConfig` in `src/core/models.ts`, zodat
een payload vrijwel rechtstreeks in het bestaande model past:

| Payload-veld | `SourceConfig` | Opmerking |
| --- | --- | --- |
| `server`, `username`, `password` | idem | Xtream |
| `playlistUrl` | idem | M3U |
| `epgUrl` | idem | optioneel, elk brontype mag er één hebben |
| `streamUrl` | idem | directe stream |

Twee dingen wijken bewust af en moeten aan de tv-kant worden opgevangen:

1. **`kind: "auto"` bestaat niet als `SourceType`.** Het is puur een koppel-begrip: de gebruiker
   plakt één URL en weet zelf niet wat het is. De tv draait er zijn eigen detectie op en slaat het
   resultaat op als een echt `SourceType` (`'xtream' | 'm3u' | 'stalker' | 'direct'`). Lukt de
   detectie niet, meld dat dan op het tv-scherm zoals bij handmatige invoer — de koppelsessie is op
   dat moment al opgebruikt, dus start een nieuwe code/QR.
2. **`stalker` heeft nog geen variant op de lijn.** De app ondersteunt Stalker-portals
   (`portalUrl` + `macAddress`), maar de koppelpagina biedt dat type niet aan. Een Stalker-portal
   komt in de praktijk binnen als `kind: "auto"` en moet dus door de detectie worden herkend.
   Willen we het later expliciet maken, dan is dat een additieve uitbreiding binnen `v: 1`:

```json
{ "v": 1, "type": "source", "source": { "kind": "stalker", "portalUrl": "...", "macAddress": "..." } }
```

   Server en pagina moeten dan tegelijk mee — bouw er nu nog niet op.

## 6. GET-semantiek

Poll-interval: **3500 ms**.

De `GET` kent precies vier statuscodes. Meer bestaat er niet:

| Status | Betekenis | Wat de tv doet |
|---|---|---|
| `200` | payload; sessie is door déze read vernietigd | `Content-Type` checken (§11), verwerk **één keer**, stop met pollen |
| `404` | nog niets ingevuld, óf verlopen, óf al opgehaald, óf de code is ongeldig/misvormd | **gewoon doorgaan met pollen** — dit is geen fout, toon geen foutmelding |
| `429` | rate limit geraakt | backoff volgens §7, **code behouden** |
| `500` | server- of opslagstoring | doorgaan met pollen, code **niet** resetten |

Alles wat hierbuiten valt — `403`, `400`, `502`, `511`, een redirect naar een captive portal — komt
**niet van deze API**. Dat is een CDN, een WAF, hotelwifi of een proxy ertussen. Behandel het exact
als `500`: blijven pollen, dezelfde code houden, niets weggooien. Gooi **nooit** een code weg op
basis van een statuscode.

Vier regels die je niet mag overtreden:

- **`200` is one-time.** De read zelf vernietigt de sessie. Doe nooit een tweede `GET` om de payload
  te "bevestigen" of opnieuw op te halen — die levert `404` en je bent de gegevens kwijt. Parse en
  bewaar de payload in het geheugen vóór je iets anders doet.
- **`404` is de normale toestand.** Verreweg de meeste polls geven `404`. De tv kan "bestond nooit",
  "verlopen", "al opgehaald" en "misvormde code" **niet** onderscheiden, en dat is opzet: een aparte
  status voor "heeft bestaan" zou het pollen in een enumeratie-orakel veranderen. Zolang de code nog
  geldig is (§8) blijft de tv rustig doorpollen zonder iets te melden.
- **Storingen resetten niets.** `500`, netwerkfouten, timeouts en vreemde statuscodes mogen de
  gebruiker niet dwingen opnieuw te scannen.
- **Nooit twee `GET`'s tegelijk.** Zie hieronder.

### 6.1 Single-flight en timeout

De server kan in het slechtste geval ~5 s over een antwoord doen (opslag-timeout), dus **langer dan
het poll-interval**. Wie `setInterval(poll, 3500)` schrijft, heeft bij de eerste hapering twee of
drie `GET`'s tegelijk in de lucht. De one-time read is atomair: precies één van die requests krijgt
de payload en de server gooit hem in dezelfde stap weg. Landt dat antwoord bij een handler waarvan
de state machine al verder is, dan zijn de gegevens onherroepelijk weg.

Daarom, niet onderhandelbaar:

- **Geen `setInterval`.** Plan de volgende poll met `setTimeout`, pas ná het afronden van de vorige
  (`onload`, `onerror` of `ontimeout`).
- **Maximaal één `GET` in de lucht.** Bewaak dat met een `inFlight`-vlag, niet alleen met de timer.
- **Expliciete timeout van 3000 ms**, dus onder het interval. Een verlopen request wordt afgebroken
  en **genegeerd**; laat hem nooit alsnog binnenkomen. Met `fetch` betekent dat een `AbortController`
  **en** het negeren van een late resolve.
- **Deze `GET` is niet idempotent**, ondanks het werkwoord. Zet transparante retries, prefetch en
  request-herhaling van de webview of je HTTP-laag uit.

```js
var POLL_MS = 3500
var TIMEOUT_MS = 3000
var interval = POLL_MS
var inFlight = false
var timer = null

function schedule(ms) {
  if (timer) clearTimeout(timer)
  timer = setTimeout(poll, ms)
}

function poll() {
  if (inFlight) return schedule(interval)
  inFlight = true

  var xhr = new XMLHttpRequest()
  // cache-buster: zie §10
  xhr.open("GET", BASE + "/iptv/api/session/" + code + "?t=" + Date.now(), true)
  xhr.timeout = TIMEOUT_MS
  // handleResponse plant zelf de volgende poll — of stopt bij een geldige 200 (§6, §7)
  xhr.onload = function () { inFlight = false; handleResponse(xhr) }
  xhr.onerror = function () { inFlight = false; schedule(interval) }
  xhr.ontimeout = function () { inFlight = false; schedule(interval) }
  xhr.send()
}
```

---

## 7. Rate limits en backoff

De server telt per client-IP, in vaste vensters van 60 seconden, met **gescheiden emmers** voor
`GET` en `POST`:

| Emmer | Budget |
|---|---|
| `GET /iptv/api/session/{CODE}` | **60 requests per 60 s per IP** |
| `POST /iptv/api/session/{CODE}` | **30 requests per 60 s per IP** |

Het budget geldt per **publiek** IP, dus alle toestellen achter dezelfde router delen het. Eén tv op
3500 ms verbruikt ~17 requests per minuut. Dat betekent in de praktijk:

| Tv's achter één IP | Interval |
|---|---|
| 1 – 3 | 3500 ms (~51/min bij drie tv's) |
| 4 of meer | `max(3500, N × 1200)` ms — bij vier tv's dus 4800 ms |

Bied dat als instelling aan, of laat de tv zijn interval verhogen zodra `429` structureel wordt. In
een hotel of appartementencomplex achter één NAT is `429` een normale toestand die de app moet
overleven, niet een fout die de gebruiker te zien krijgt.

**Backoff bij `429`:**

1. De server stuurt een `Retry-After`-header met het aantal seconden tot het venster reset (1 tot
   60). Lees hem als hij beschikbaar is en gebruik die waarde, geklemd op maximaal 60 s.
   *Let op:* `Retry-After` staat niet in de CORS-safelist voor response-headers, en de server stuurt
   op dit moment geen `Access-Control-Expose-Headers`. Cross-origin krijg je dus vrijwel zeker
   `null` terug. Schrijf de code die hem honoreert, maar reken op de fallback.
2. **Fallback als de header ontbreekt of onleesbaar is:** verdubbel het interval, geklemd op 60 s.
   Bij een volgende `429` verdubbel je opnieuw vanaf het al verhoogde interval.
3. **Herstel:** bij de eerste response die géén `429` is — dus ook bij een `404` — zet je het
   interval direct terug op 3500 ms.
4. De code blijft in alle gevallen dezelfde. `429` is nooit een reden om opnieuw te scannen.

```js
function backoff(xhr) {
  var header = parseInt(xhr.getResponseHeader("Retry-After"), 10)
  var waitMs = isFinite(header) && header > 0
    ? Math.min(header, 60) * 1000
    : Math.min(interval * 2, 60000)
  interval = waitMs
  schedule(waitMs)
}
```

---

## 8. Verlopen: twee klokken, niet één

De server geeft **nooit** een `410`. Verlopen en nooit-bestaan zijn allebei `404` (§6).

Er lopen twee verschillende klokken, en ze starten niet op hetzelfde moment:

| Klok | Start bij | Duur |
|---|---|---|
| Server-TTL van de sessie | het moment dat de **telefoon POST** | 600 s (`SESSION_TTL_SECONDS`) |
| Rotatie van code + QR op de tv | het moment dat de **tv de code genereert** | 600 s |

Het verschil is de tijd die de gebruiker nodig heeft om te scannen en te typen. Wie op `T+595`
verzendt, laat een payload achter die tot `T+1195` geldig is — terwijl de tv vijf seconden later
naar een nieuwe code springt en die payload nooit ophaalt. De gebruiker heeft alles correct gedaan
en moet toch opnieuw beginnen.

Daarom:

- **Altijd één laatste poll vlak vóór het weggooien van een code**, en pas roteren als díé poll
  `404` geeft. Geeft hij `200`, dan gebruik je de payload. Geeft hij `429`, `500`, een timeout of
  een vreemde status, dan **niet roteren**: houd de code, wacht één cyclus en probeer de
  afsluitende poll opnieuw.
- Ververs code + QR elke 10 minuten, ook als er niets gebeurd is.
- Start een nieuwe sessie (nieuwe code) na een geslaagde pairing én na een mislukte poging.
- Toon een aftellende hint of een simpel "code ververst" — nooit een foutmelding.

**Bij het roteren reset je expliciet deze drie stukken state:** de lopende poll-timer (annuleren),
het backoff-interval (terug naar 3500 ms, §7) en de teller van opeenvolgende afwijkende responses
(terug naar 0, §11). Daarna pas een nieuwe code genereren.

---

## 9. CORS

De API stuurt `Access-Control-Allow-Origin: *`, zodat een Tizen-webview die vanaf `file://` draait
(origin `null`) de call gewoon mag doen.

Voorwaarde: houd het een **simple request**.

- Geen cookies, geen credentials — zet `withCredentials` niet aan.
- **Geen enkele request-header zelf zetten.** Geen `X-...`, geen `Authorization`, en ook geen
  `Cache-Control`. Alles buiten de CORS-safelist (`Accept`, `Accept-Language`, `Content-Language`,
  `Content-Type` met beperkte waarden, `Range`) dwingt een OPTIONS-preflight af, en de server
  antwoordt daarop met `Access-Control-Allow-Headers: Content-Type` — alleen dát. Elke andere header
  wordt door de browser geweigerd en je `GET` vertrekt nooit.
- Alleen `GET`, geen body.

Heb je ooit tóch een request-header nodig, dan is dat eerst een **serverwijziging**:
`Access-Control-Allow-Headers` in `app/iptv/api/session/[code]/route.ts` moet die header noemen
voordat de tv hem mag sturen.

---

## 10. Caching — belangrijk op oudere Tizen-webviews

De server stuurt `Cache-Control: no-store`, maar de webview houdt zich daar niet betrouwbaar aan.
Een gecachete `404` betekent dat de tv de pairing nooit ziet.

Hang daarom een cache-buster aan elke poll. De URL heeft nog geen query, dus gebruik `?`:

```js
var url = "https://www.nhsoftware.ae/iptv/api/session/" + code + "?t=" + Date.now()
```

Dat is samen met de `no-store` van de server de volledige oplossing. Zet **geen**
`Cache-Control`-header op je request — zie §9, dat breekt de call.

---

## 11. Validatie aan de tv-kant

Behandel de payload als **untrusted input**, ook al komt hij van onze eigen server.

Volgorde bij een `200`:

1. **`Content-Type` checken.** De API antwoordt altijd `application/json`. Is dat niet zo, dan zit er
   iets tussen: een captive portal, hotelwifi of een proxy die een inlogpagina teruggeeft met status
   `200`. Zie hieronder.
2. **Grootte cappen vóór het parsen.** De responsebody kan de request-cap van 128 KB niet
   overschrijden, dus zet je eigen plafond bewust hóger: **192 KB**. Dat plafond is een DoS-rem
   tegen iets wat níet onze server is — geen geldigheidscontrole. Weiger boven het plafond, kap
   nooit stilletjes af.
3. `JSON.parse` in een try/catch.
4. `v === 1` en `type === "source" | "backup"` controleren.
5. Bij `type === "source"`: `kind` tegen `auto | xtream | m3u | direct`, en of exact de bijbehorende
   velden aanwezig en van type `string` zijn.
6. De lengtelimieten uit §5.1 aan jouw kant herhalen; kap of weiger wat eroverheen gaat.
7. `epgUrl` dat ontbreekt of `""` is: behandelen als "geen EPG".

Een `200` die de checks niet haalt, kent **twee heel verschillende gevallen**. Verwar ze niet — het
verschil bepaalt of je de code weggooit of juist vasthoudt.

**a. De response kwam niet van ons.** Geen `application/json`, geen parsebare JSON, of JSON waarin
`v` en `type` allebei ontbreken. Dat is een captive portal, hotelwifi of een proxy — de sessie op de
server staat er nog gewoon. **Houd de code, blijf pollen**, en tel hoe vaak dit achter elkaar
gebeurt. Pas na een begrensd aantal opeenvolgende afwijkende responses (bijvoorbeeld 5) toon je het
"echt mis"-scherm uit §13. Bij de eerste response die wél klopt — inclusief een gewone `404` — zet
je die teller terug op 0. Regenereer **nooit** op de eerste afwijking: dat is precies de lus waarin
de tv bij elke poll een verse code verbrandt terwijl de gebruiker achter een portal zit.

**b. De response kwam wél van ons, maar je kunt hem niet toepassen.** JSON met een `v` en een `type`
erin, maar een afwijkende `v`, een onbekend `type` of een onbekende `kind` — bijvoorbeeld een
nieuwere website tegenover een oudere tv-app. Deze read heeft de sessie **al vernietigd**, dus
doorpollen op dezelfde code levert niets meer op. Niets toepassen, de gebruiker een nette melding
geven, en de sessie opnieuw starten met een verse code (§8). Nooit half toepassen.

**`backup.code` is opaque.** Alleen de lengte is begrensd; de blob mag `NUL`, `ESC` en elk ander
control-character bevatten (§5.1). Dus:

- Nooit ongeëscaped naar een logregel, een terminal of stdout — ingebedde ANSI-escapes kunnen output
  vervalsen of afkappen.
- Nooit in een bestandsnaam, een pad of een shell-argument.
- Nooit ongefilterd in een HTML- of URL-context injecteren.
- De blob eerst door je eigen backup-importer laten valideren; pas als díé hem accepteert, doe je er
  iets mee. Een payload die de wire-check overleeft is nog geen geldige backup.

Datzelfde geldt voor de andere velden: injecteer een ontvangen string nooit ongefilterd in HTML of
in een shell-/URL-context.

---

## 12. Beveiliging

De payload bevat IPTV-wachtwoorden. Daarom:

- **Alleen HTTPS.** Geen fallback naar `http`, geen negeren van certificaatfouten.
- **Toon het wachtwoord nooit op het scherm.** Ook niet kort, ook niet in een "controleer je
  gegevens"-scherm. Masker het (`••••••••`) of laat het helemaal weg.
- **Niets loggen.** Geen payload, geen los veld, geen response body, geen volledige URL met code in
  een logregel. Log hooguit statuscodes en tellers.
- **Niet ruw persisteren.** Zet de gegevens om naar je normale profiel-/credential-opslag en gooi de
  ruwe payload daarna uit het geheugen. Geen kopie in `localStorage` "voor het geval dat".
- Zet de code niet in een crashrapport of analytics-event.

**Code-botsingen.** De server controleert bij een `POST` niet of een code al bezet is: een tweede
telefoon die dezelfde code gebruikt, overschrijft de eerste payload. Twee tv's die tegelijk dezelfde
code tonen, betekent dus niet "de pairing mislukt" maar **"de ene tv krijgt de IPTV-gegevens van een
onbekende gebruiker"** — de one-time read levert de payload aan wie het eerst polt. Met 30⁶ ≈ 729
miljoen codes en een TTL van 10 minuten is dat zeldzaam, maar de gevolgen zijn ernstig genoeg om de
randombron serieus te nemen: zaai hem **per toestel**, niet per boot (§2). Een serverzijdige weigering
van een `POST` op een bezette code — zodat de tweede gebruiker "ververs de code" te zien krijgt in
plaats van stilletjes te overschrijven — is een mogelijke toekomstige aanscherping; reken er nu niet
op.

---

## 13. UX op het tv-scherm

**Wachten (de normale toestand):**
- De code groot, in hoofdletters, goed leesbaar vanaf de bank — bijvoorbeeld gegroepeerd als `ABC DEF`.
  Het lettertype is hier functioneel, geen smaak: `O`, `I` en `L` zitten niet in het alfabet, dus als
  een gebruiker er één intypt is dat per definitie een misleesbeurt en er is **geen** reparatie —
  alleen `B` → `8` wordt hersteld (§2). Kies dus een schreefloos lettertype waarin `D` en `Q` niet
  op een `O` lijken, `J` niet op een `I`, en `8`/`S`/`5` en `2`/`Z` duidelijk verschillen.
- De QR ernaast, volgens de spec in §3.
- Tekst: "Scan met je telefoon" en daaronder `nhsoftware.ae/iptv` met de code, voor handmatig invoeren.
- Een rustige "wachten op je telefoon…"-indicator. **Geen** foutmeldingen tijdens `404`-polls.

**Gelukt:** meteen bevestigen ("Verbonden"), daarna de bron toepassen en doorgaan naar de zender-/
playlistlijst. Geen tussenscherm waarin de gegevens nog eens getoond worden.

**Verlopen (10 min):** stilletjes een nieuwe code + QR tonen, met een korte regel als "Code
ververst — scan opnieuw". Geen rood, geen error-icoon.

**Echt mis:** één nette melding plus een knop "Opnieuw proberen" die een verse sessie start. Dit
scherm is voor een kapotte payload of een aanhoudend afwijkende response (§11) — **niet** voor een
`404`, een `429`, een `500` of een netwerkstoring.

---

## 14. Acceptatie-checklist

Loop deze punten op een echt toestel af.

**Eerst de omgeving:**

- [ ] **Opslag** — `GET https://www.nhsoftware.ae/iptv/api/status` geeft `"store":"redis"`. Staat er `"memory"`, stop hier: alles hieronder is dan betekenisloos.
- [ ] **Landingspagina** — open `https://www.nhsoftware.ae/iptv?c={CODE}` met een echte code in een telefoonbrowser: het formulier rendert, de code staat voorgevuld, en verzenden doet een `POST` naar `/iptv/api/session/{CODE}` met `204` als antwoord.

**Dan de flow:**

- [ ] **Happy path** — code + QR verschijnen, telefoon vult in, tv pikt de payload binnen ~3,5 s op en past de bron toe.
- [ ] **QR-scan op afstand** — scan de QR van drie meter met een middenklasse-telefoon, bij normale woonkamerhelderheid. Lukt dat niet in één poging, dan is de QR te klein (§3).
- [ ] **Alle vijf payloads** — `auto`, `xtream`, `m3u` (mét en zónder `epgUrl`), `direct`, `backup` worden alle vijf correct toegepast.
- [ ] **Handmatige code** — code met de hand intypen op `nhsoftware.ae/iptv`, in kleine letters en met een spatie erin, werkt net zo goed als de QR.
- [ ] **Verkeerde code** — telefoon vult een andere code in; de tv blijft `404` krijgen en toont geen fout.
- [ ] **Ongeldige code** — laat de tv één keer een code met een `O` erin pollen: dat geeft `404` (geen aparte status), en de app blijft rustig doorpollen.
- [ ] **Double read** — na een geslaagde `200` handmatig nog een `GET` doen: dat geeft `404`. Bevestig dat de app dit nooit uit zichzelf doet.
- [ ] **Poll tijdens 404** — laat de tv 5 minuten pollen zonder invoer: geen geheugenlek, geen oplopende timers, geen zichtbare melding.
- [ ] **Single flight** — bevestig in de netwerklog dat er nooit twee `GET`'s tegelijk openstaan en dat elke request binnen 3000 ms afgerond of afgebroken is.
- [ ] **Rate limit** — forceer `429`; het interval verdubbelt (of volgt `Retry-After`), zakt terug naar 3500 ms bij de eerste niet-`429`, en de code blijft dezelfde.
- [ ] **Grensgeval verlopen** — laat de telefoon op ~9:55 verzenden; de afsluitende poll vlak vóór de rotatie pikt de payload alsnog op en de code wordt niet weggegooid.
- [ ] **Verlopen code** — laat een sessie 10 minuten staan zonder invoer; de tv ververst code + QR uit zichzelf en blijft bruikbaar.
- [ ] **Offline recovery** — trek de netwerkverbinding er 60 s uit; de tv blijft pollen, behoudt dezelfde code, en pikt de pairing daarna alsnog op.
- [ ] **Vreemde response** — simuleer een captive portal (`200` met HTML, of een `403` van een proxy): de tv houdt dezelfde code, blijft pollen, en toont hooguit na meerdere keren het "echt mis"-scherm.
- [ ] **Caching** — bevestig in de netwerklog dat elke poll een unieke `?t=`-URL heeft, dat er geen response uit de cache komt, en dat de tv zelf géén `Cache-Control`-header meestuurt.
- [ ] **Backup-blob** — importeer een backup met newlines en een control-character erin: hij komt ongeschonden aan, gaat door de importer-validatie, en belandt nergens in een log of op het scherm.
- [ ] **Geen lek** — controleer logs, crashrapporten en het scherm: nergens een wachtwoord, backup-blob of pairing-code te zien.
