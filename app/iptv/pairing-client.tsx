"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Check, Eye, EyeOff, Loader2, ShieldCheck, Tv } from "lucide-react"
import {
  CODE_LENGTH,
  SOURCE_KINDS,
  isValidCode,
  normalizeCode,
  pairingPayloadSchema,
  type PairingPayload,
  type SourceKind,
} from "@/lib/iptv-pairing"

export type Lang = "nl" | "en"

/** Every visible string on this page. Dutch is authoritative. */
const strings = {
  nl: {
    languageGroup: "Taal",
    heading: ["Verbind je", "televisie"],
    intro:
      "Vul de gegevens van je IPTV-abonnement in. Ze gaan rechtstreeks naar de Tivexo-app op je televisie.",
    codeLabel: "Code van je televisie",
    codePlaceholder: "AC29XK",
    codeHint:
      "Neem de {n} tekens over die op je televisie staan. De cijfers 0 en 1 en de letters I, L en O worden niet gebruikt.",
    codeOk: "Code herkend.",
    tabSource: "TV-bron instellen",
    tabBackup: "Back-up terugzetten",
    kindLabel: "Type bron",
    kindPlaceholder: "Kies een type",
    kinds: {
      auto: "Automatisch",
      xtream: "Xtream",
      m3u: "M3U-playlist",
      direct: "Directe stream",
    },
    autoHelp: "De televisie zoekt zelf uit om welk type bron het gaat.",
    fieldUrl: "URL",
    fieldServer: "Server",
    fieldUsername: "Gebruikersnaam",
    fieldPassword: "Wachtwoord",
    fieldPlaylistUrl: "Playlist-URL (M3U)",
    fieldEpgUrl: "EPG-URL",
    fieldStreamUrl: "Stream-URL",
    placeholders: {
      url: "http://voorbeeld.com:8080",
      playlistUrl: "http://voorbeeld.com/playlist.m3u",
      epgUrl: "http://voorbeeld.com/epg.xml",
      streamUrl: "http://voorbeeld.com/stream.m3u8",
    },
    optional: "optioneel",
    showPassword: "Wachtwoord tonen",
    hidePassword: "Wachtwoord verbergen",
    backupLabel: "Back-upcode",
    backupHelp:
      "Plak hier de back-upcode die je in de Tivexo-app hebt gemaakt. Je zenders, favorieten en instellingen worden daarmee teruggezet.",
    backupPlaceholder: "Plak hier je back-upcode",
    submit: "Versturen naar mijn televisie",
    submitting: "Versturen...",
    submitBlocked: "Vul eerst de code en alle velden hierboven in.",
    successTitle: "Verzonden",
    successBody: "Kijk op je televisie — de gegevens worden nu geladen.",
    successClose: "Je kunt deze pagina nu sluiten.",
    sendAgainPrompt: "Gebeurt er niets op je televisie?",
    sendAgain: "Gegevens opnieuw invullen",
    privacyNote:
      "Je gegevens worden via een beveiligde verbinding tijdelijk klaargezet en verwijderd zodra je televisie ze ophaalt, of uiterlijk na 10 minuten.",
    refreshNote:
      "De code op je televisie ververst elke 10 minuten. Staat er inmiddels een andere code op je scherm? Scan de QR-code dan opnieuw.",
    errorBadRequest: "Controleer de ingevulde gegevens en probeer het opnieuw.",
    errorExpired: "Deze code is niet meer geldig. Scan de QR-code op je televisie opnieuw.",
    errorCodeInUse:
      "Deze code is al gebruikt. Laat de televisie een nieuwe code tonen en scan die opnieuw.",
    errorTooLarge: "De back-upcode is te groot om te versturen.",
    errorRateLimited: "Te veel pogingen. Wacht even en probeer het daarna opnieuw.",
    errorServer: "Er ging iets mis aan onze kant. Probeer het zo nog een keer.",
    errorNetwork: "Geen verbinding. Controleer je internet en probeer het opnieuw.",
    footerPrivacy: "Privacybeleid",
  },
  en: {
    languageGroup: "Language",
    heading: ["Connect your", "television"],
    intro:
      "Enter the details of your IPTV subscription. They go straight to the Tivexo app on your television.",
    codeLabel: "Code from your television",
    codePlaceholder: "AC29XK",
    codeHint:
      "Copy the {n} characters shown on your television. The digits 0 and 1 and the letters I, L and O are never used.",
    codeOk: "Code recognised.",
    tabSource: "Set up TV source",
    tabBackup: "Restore backup",
    kindLabel: "Source type",
    kindPlaceholder: "Choose a type",
    kinds: {
      auto: "Automatic",
      xtream: "Xtream",
      m3u: "M3U playlist",
      direct: "Direct stream",
    },
    autoHelp: "Your television works out which kind of source this is by itself.",
    fieldUrl: "URL",
    fieldServer: "Server",
    fieldUsername: "Username",
    fieldPassword: "Password",
    fieldPlaylistUrl: "Playlist URL (M3U)",
    fieldEpgUrl: "EPG URL",
    fieldStreamUrl: "Stream URL",
    placeholders: {
      url: "http://example.com:8080",
      playlistUrl: "http://example.com/playlist.m3u",
      epgUrl: "http://example.com/epg.xml",
      streamUrl: "http://example.com/stream.m3u8",
    },
    optional: "optional",
    showPassword: "Show password",
    hidePassword: "Hide password",
    backupLabel: "Backup code",
    backupHelp:
      "Paste the backup code you created in the Tivexo app. It restores your channels, favourites and settings.",
    backupPlaceholder: "Paste your backup code here",
    submit: "Send to my television",
    submitting: "Sending...",
    submitBlocked: "Enter the code and all the fields above first.",
    successTitle: "Sent",
    successBody: "Check your television — the details are loading now.",
    successClose: "You can close this page now.",
    sendAgainPrompt: "Nothing happening on your television?",
    sendAgain: "Enter the details again",
    privacyNote:
      "Your details are held temporarily over a secure connection and deleted as soon as your television collects them, or after 10 minutes at the latest.",
    refreshNote:
      "The code on your television refreshes every 10 minutes. If your screen now shows a different code, scan the QR code again.",
    errorBadRequest: "Please check the details you entered and try again.",
    errorExpired: "This code is no longer valid. Scan the QR code on your television again.",
    errorCodeInUse:
      "This code has already been used. Let the television show a new code and scan it again.",
    errorTooLarge: "That backup code is too large to send.",
    errorRateLimited: "Too many attempts. Wait a moment and try again.",
    errorServer: "Something went wrong on our side. Please try again shortly.",
    errorNetwork: "No connection. Check your internet and try again.",
    footerPrivacy: "Privacy Policy",
  },
}

type Copy = (typeof strings)["en"]

type Tab = "source" | "backup"

type Fields = {
  url: string
  server: string
  username: string
  password: string
  playlistUrl: string
  epgUrl: string
  streamUrl: string
}

const EMPTY_FIELDS: Fields = {
  url: "",
  server: "",
  username: "",
  password: "",
  playlistUrl: "",
  epgUrl: "",
  streamUrl: "",
}

/** Typed separators are stripped by normalizeCode, so the field accepts more than it keeps. */
const CODE_INPUT_MAX = CODE_LENGTH * 2

/** Geist Mono is not loaded site-wide, so the code and backup fields carry their own stack. */
const MONO = "[font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]"

const FIELD = "h-12 border-border/50 bg-background/50"
/**
 * globals.css restyles `.rounded-xl.border` / `.rounded-2xl.border` with a
 * forced gradient and a hover lift, which would override the glass look and
 * make the cards jump under a desktop cursor mid-typing. A ring draws the same
 * hairline without matching that selector.
 */
const CARD = "rounded-2xl bg-background/50 shadow-sm ring-1 ring-border/50 backdrop-blur-sm"
const URL_INPUT_PROPS = {
  type: "text",
  inputMode: "url",
  autoCapitalize: "none",
  autoCorrect: "off",
  autoComplete: "off",
  spellCheck: false,
} as const

/** Exactly the wire payload for the active tab, or null while it is still incomplete. */
function buildPayload(tab: Tab, kind: SourceKind, fields: Fields, backup: string): PairingPayload | null {
  if (tab === "backup") {
    const backupCode = backup.trim()
    return backupCode ? { v: 1, type: "backup", code: backupCode } : null
  }

  const trimmed = (key: keyof Fields) => fields[key].trim()

  switch (kind) {
    case "auto": {
      const url = trimmed("url")
      return url ? { v: 1, type: "source", source: { kind: "auto", url } } : null
    }
    case "xtream": {
      const server = trimmed("server")
      const username = trimmed("username")
      const password = trimmed("password")
      if (!server || !username || !password) return null
      return { v: 1, type: "source", source: { kind: "xtream", server, username, password } }
    }
    case "m3u": {
      const playlistUrl = trimmed("playlistUrl")
      const epgUrl = trimmed("epgUrl")
      if (!playlistUrl) return null
      return {
        v: 1,
        type: "source",
        source: epgUrl ? { kind: "m3u", playlistUrl, epgUrl } : { kind: "m3u", playlistUrl },
      }
    }
    case "direct": {
      const streamUrl = trimmed("streamUrl")
      return streamUrl ? { v: 1, type: "source", source: { kind: "direct", streamUrl } } : null
    }
  }
}

/**
 * The server answers an over-length blob with 400 unless it also blows the body
 * cap, so "too big" would arrive dressed as "check your details". Asking the
 * shared schema keeps the real ceiling in one place instead of copying it here,
 * where it could drift.
 */
function isOversized(payload: PairingPayload | null): boolean {
  if (!payload) return false
  const result = pairingPayloadSchema.safeParse(payload)
  return !result.success && result.error.issues.some((issue) => issue.code === "too_big")
}

export function PairingClient({
  initialCode,
  initialLang,
  year,
}: {
  initialCode: string
  initialLang?: Lang
  year: number
}) {
  const [lang, setLang] = useState<Lang>(initialLang ?? "en")
  // Server-supplied rather than read from useSearchParams(): that hook makes
  // Next render the subtree on the client only, behind a Suspense boundary that
  // then failed to hydrate — leaving a dead form. As a prop the scanned code is
  // in the first paint and the page is plain interactive HTML.
  const [code, setCode] = useState(initialCode)
  const [tab, setTab] = useState<Tab>("source")
  const [kind, setKind] = useState<SourceKind>("auto")
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS)
  const [backup, setBackup] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const codeInputRef = useRef<HTMLInputElement>(null)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)
  /** Set only by the "fill in again" button, so the first mount never steals focus. */
  const returningToForm = useRef(false)

  // Only when the request carried no usable Accept-Language: the server pass has
  // already settled the language otherwise, and re-deciding it here would swap
  // the whole page to Dutch a paint after it arrived in English.
  useEffect(() => {
    if (initialLang) return
    const preferred = navigator.languages?.[0] ?? navigator.language
    if (preferred?.toLowerCase().startsWith("nl")) setLang("nl")
  }, [initialLang])

  useEffect(() => {
    const previous = document.documentElement.lang
    document.documentElement.lang = lang
    return () => {
      document.documentElement.lang = previous
    }
  }, [lang])

  // Submitting either unmounts the form or disables the fieldset the focused
  // field sits in, so the browser drops focus to <body> either way. Put it on
  // whatever the visitor now has to read or use.
  useEffect(() => {
    if (isSent) {
      successHeadingRef.current?.focus()
    } else if (returningToForm.current) {
      returningToForm.current = false
      codeInputRef.current?.focus()
    }
  }, [isSent])

  // The submit button keeps focus when it is clicked, and role="alert" reads the
  // failure out from there. Only a keyboard submit from inside a field loses it.
  useEffect(() => {
    if (!error) return
    if (document.activeElement && document.activeElement !== document.body) return
    errorRef.current?.focus()
  }, [error])

  const t: Copy = strings[lang]
  const codeValid = isValidCode(code)

  function setField(key: keyof Fields, value: string) {
    setError(null)
    setFields((current) => ({ ...current, [key]: value }))
  }

  function messageForStatus(status: number): string {
    if (status === 404 || status === 410) return t.errorExpired
    if (status === 409) return t.errorCodeInUse
    if (status === 413) return t.errorTooLarge
    if (status === 429) return t.errorRateLimited
    if (status >= 500) return t.errorServer
    return t.errorBadRequest
  }

  const payload = useMemo(() => buildPayload(tab, kind, fields, backup), [tab, kind, fields, backup])
  const oversized = useMemo(() => isOversized(payload), [payload])
  const canSubmit = codeValid && payload !== null && !oversized

  function handleSendAgain() {
    returningToForm.current = true
    setError(null)
    setIsSent(false)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // The button stays enabled while the request is out — so focus is not yanked
    // out from under the visitor — which leaves the double-submit guard here.
    if (!canSubmit || !payload || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/iptv/api/session/${encodeURIComponent(code)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      })

      // 204 and nothing else. A captive portal or proxy that swallows the POST
      // and hands back its own 200 must not read as a stored pairing.
      if (response.status === 204) {
        // The TV has the credentials now; drop our copy rather than leave it in state.
        setFields(EMPTY_FIELDS)
        setBackup("")
        setShowPassword(false)
        setIsSent(true)
        return
      }

      setError(messageForStatus(response.status))
    } catch {
      setError(t.errorNetwork)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    // isolate: the background sits at -z-10, so it needs a stacking context to sit inside.
    <div className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <AnimatedBackground />

      <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Next Horizons">
          <Logo className="h-10 text-foreground" />
        </Link>
        <span role="group" aria-label={t.languageGroup} className="flex shrink-0 items-center gap-1 rounded-full border border-border/60 bg-background/60 p-1 backdrop-blur-sm">
          {(["nl", "en"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLang(option)}
              aria-pressed={lang === option}
              // A literal colour, not the from-blue-700 gradient: globals.css
              // hangs a full call-to-action drop shadow off that class name.
              className={`min-h-11 rounded-full px-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                lang === option
                  ? "bg-[#294758] text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </span>
      </header>

      <main className="relative z-10 flex-1 px-4 pb-10 pt-4 sm:px-6">
        <div className="mx-auto w-full max-w-lg">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-3 py-1.5 text-xs backdrop-blur-sm">
            <Tv className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-muted-foreground">Tivexo IPTV</span>
          </div>

          <h1 className="text-3xl! leading-[1.1]! text-foreground sm:text-4xl!">
            {t.heading[0]}{" "}
            <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
              {t.heading[1]}
            </span>
          </h1>
          <p className="mt-3 text-muted-foreground">{t.intro}</p>

          {isSent ? (
            <div role="status" className={`mt-8 p-6 text-center ${CARD}`}>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500">
                <Check className="h-7 w-7 text-white" />
              </div>
              {/* Focused on arrival: the panel is inserted rather than updated, and an
                  inserted live region is announced far less reliably than a focus move. */}
              <h2
                ref={successHeadingRef}
                tabIndex={-1}
                aria-describedby="pairing-success-body"
                className="mt-5 text-xl font-semibold text-foreground"
              >
                {t.successTitle}
              </h2>
              <p id="pairing-success-body" className="mt-3 text-foreground">
                {t.successBody}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{t.successClose}</p>
              <p className="mt-6 text-sm text-muted-foreground">{t.sendAgainPrompt}</p>
              <Button
                type="button"
                variant="outline"
                onClick={handleSendAgain}
                className="mt-3 h-11 border-border/50 bg-background/50"
              >
                {t.sendAgain}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-busy={isSubmitting} className="mt-8 space-y-5">
              {/* Disabled while the POST is out: the request body was serialised
                  before the await, so anything typed during the wait would be
                  described by the UI but not actually sent — and then wiped. */}
              <fieldset disabled={isSubmitting} className="min-w-0 space-y-5">
                <div className={`p-5 ${CARD}`}>
                  <label htmlFor="pairing-code" className="text-sm font-medium text-foreground">
                    {t.codeLabel}
                  </label>
                  <Input
                    id="pairing-code"
                    ref={codeInputRef}
                    value={code}
                    onChange={(event) => {
                      setError(null)
                      setCode(normalizeCode(event.target.value).slice(0, CODE_LENGTH))
                    }}
                    placeholder={t.codePlaceholder}
                    maxLength={CODE_INPUT_MAX}
                    inputMode="text"
                    autoCapitalize="characters"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-describedby="pairing-code-hint"
                    aria-invalid={code.length > 0 && !codeValid}
                    className={`mt-2 h-14 border-border/50 bg-background/50 text-center text-2xl uppercase tracking-[0.4em] indent-[0.4em] md:text-2xl ${MONO}`}
                  />
                  <p
                    id="pairing-code-hint"
                    className={`mt-2 flex items-start gap-1.5 text-xs ${codeValid ? "text-blue-600" : "text-muted-foreground"}`}
                  >
                    {codeValid && <Check className="mt-px h-3.5 w-3.5 shrink-0" />}
                    {codeValid ? t.codeOk : t.codeHint.replace("{n}", String(CODE_LENGTH))}
                  </p>
                </div>

                <div className={`p-5 ${CARD}`}>
                  <Tabs value={tab} onValueChange={(value) => { setError(null); setTab(value as Tab) }}>
                    <TabsList className="grid h-auto w-full grid-cols-2 items-stretch p-1">
                      <TabsTrigger value="source" className="h-auto whitespace-normal px-2 py-2.5 text-xs leading-tight sm:text-sm">
                        {t.tabSource}
                      </TabsTrigger>
                      <TabsTrigger value="backup" className="h-auto whitespace-normal px-2 py-2.5 text-xs leading-tight sm:text-sm">
                        {t.tabBackup}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="source" className="mt-5 space-y-5">
                      <div className="space-y-2">
                        {/* label[for] is not a naming source for a <button>, which is what
                            SelectTrigger renders — without this the field announces only
                            its current value. */}
                        <label id="source-kind-label" htmlFor="source-kind" className="text-sm font-medium text-foreground">
                          {t.kindLabel}
                        </label>
                        <Select value={kind} onValueChange={(value) => { setError(null); setKind(value as SourceKind) }}>
                          <SelectTrigger id="source-kind" aria-labelledby="source-kind-label" className="w-full border-border/50 bg-background/50 data-[size=default]:h-12">
                            <SelectValue placeholder={t.kindPlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {SOURCE_KINDS.map((option) => (
                              <SelectItem key={option} value={option} className="py-2.5">
                                {t.kinds[option]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {kind === "auto" && <p className="text-xs text-muted-foreground">{t.autoHelp}</p>}
                      </div>

                      {kind === "auto" && (
                        <div className="space-y-2">
                          <label htmlFor="source-url" className="text-sm font-medium text-foreground">
                            {t.fieldUrl}
                          </label>
                          <Input
                            {...URL_INPUT_PROPS}
                            id="source-url"
                            value={fields.url}
                            onChange={(event) => setField("url", event.target.value)}
                            placeholder={t.placeholders.url}
                            className={FIELD}
                          />
                        </div>
                      )}

                      {kind === "xtream" && (
                        <>
                          <div className="space-y-2">
                            <label htmlFor="xtream-server" className="text-sm font-medium text-foreground">
                              {t.fieldServer}
                            </label>
                            <Input
                              {...URL_INPUT_PROPS}
                              id="xtream-server"
                              value={fields.server}
                              onChange={(event) => setField("server", event.target.value)}
                              placeholder={t.placeholders.url}
                              className={FIELD}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="xtream-username" className="text-sm font-medium text-foreground">
                              {t.fieldUsername}
                            </label>
                            <Input
                              id="xtream-username"
                              value={fields.username}
                              onChange={(event) => setField("username", event.target.value)}
                              autoCapitalize="none"
                              autoCorrect="off"
                              autoComplete="off"
                              spellCheck={false}
                              className={FIELD}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="xtream-password" className="text-sm font-medium text-foreground">
                              {t.fieldPassword}
                            </label>
                            <div className="relative">
                              <Input
                                id="xtream-password"
                                type={showPassword ? "text" : "password"}
                                value={fields.password}
                                onChange={(event) => setField("password", event.target.value)}
                                autoCapitalize="none"
                                autoCorrect="off"
                                autoComplete="off"
                                spellCheck={false}
                                className={`${FIELD} pr-14`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword((current) => !current)}
                                aria-label={showPassword ? t.hidePassword : t.showPassword}
                                aria-pressed={showPassword}
                                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-md text-muted-foreground transition-colors hover:text-foreground"
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      {kind === "m3u" && (
                        <>
                          <div className="space-y-2">
                            <label htmlFor="m3u-playlist" className="text-sm font-medium text-foreground">
                              {t.fieldPlaylistUrl}
                            </label>
                            <Input
                              {...URL_INPUT_PROPS}
                              id="m3u-playlist"
                              value={fields.playlistUrl}
                              onChange={(event) => setField("playlistUrl", event.target.value)}
                              placeholder={t.placeholders.playlistUrl}
                              className={FIELD}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="m3u-epg" className="text-sm font-medium text-foreground">
                              {t.fieldEpgUrl}{" "}
                              <span className="text-xs font-normal text-muted-foreground">({t.optional})</span>
                            </label>
                            <Input
                              {...URL_INPUT_PROPS}
                              id="m3u-epg"
                              value={fields.epgUrl}
                              onChange={(event) => setField("epgUrl", event.target.value)}
                              placeholder={t.placeholders.epgUrl}
                              className={FIELD}
                            />
                          </div>
                        </>
                      )}

                      {kind === "direct" && (
                        <div className="space-y-2">
                          <label htmlFor="direct-stream" className="text-sm font-medium text-foreground">
                            {t.fieldStreamUrl}
                          </label>
                          <Input
                            {...URL_INPUT_PROPS}
                            id="direct-stream"
                            value={fields.streamUrl}
                            onChange={(event) => setField("streamUrl", event.target.value)}
                            placeholder={t.placeholders.streamUrl}
                            className={FIELD}
                          />
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="backup" className="mt-5 space-y-2">
                      <label htmlFor="backup-code" className="text-sm font-medium text-foreground">
                        {t.backupLabel}
                      </label>
                      <p className="text-xs text-muted-foreground">{t.backupHelp}</p>
                      <Textarea
                        id="backup-code"
                        value={backup}
                        onChange={(event) => { setError(null); setBackup(event.target.value) }}
                        placeholder={t.backupPlaceholder}
                        rows={8}
                        autoCapitalize="none"
                        autoCorrect="off"
                        autoComplete="off"
                        spellCheck={false}
                        aria-invalid={oversized}
                        aria-describedby={oversized ? "pairing-size-error" : undefined}
                        className={`field-sizing-fixed max-h-72 min-h-40 resize-y break-all border-border/50 bg-background/50 text-sm ${MONO}`}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </fieldset>

              {error && (
                <p
                  ref={errorRef}
                  tabIndex={-1}
                  id="pairing-error"
                  role="alert"
                  className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
                >
                  {error}
                </p>
              )}

              <div className="space-y-2">
                <Button
                  type="submit"
                  size="lg"
                  // Enabled while submitting on purpose: disabling the control the
                  // visitor just activated hands focus back to <body>. handleSubmit
                  // ignores the repeat.
                  disabled={!canSubmit}
                  aria-busy={isSubmitting}
                  aria-disabled={isSubmitting}
                  aria-describedby={error ? "pairing-error" : undefined}
                  className="h-12 w-full bg-gradient-to-r from-blue-700 to-slate-500 text-base text-white hover:from-blue-800 hover:to-slate-600 aria-disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {t.submitting}
                    </>
                  ) : (
                    t.submit
                  )}
                </Button>
                {oversized ? (
                  // Caught before the round trip: over the schema's ceiling but under
                  // the body cap, the server answers 400, which reads as "check what
                  // you typed" rather than "that is too big".
                  <p id="pairing-size-error" className="text-center text-xs text-red-700">
                    {tab === "backup" ? t.errorTooLarge : t.errorBadRequest}
                  </p>
                ) : (
                  !canSubmit && <p className="text-center text-xs text-muted-foreground">{t.submitBlocked}</p>
                )}
              </div>

              <p className="flex items-start gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="mt-px h-4 w-4 shrink-0 text-blue-600" />
                {t.privacyNote}
              </p>
            </form>
          )}

          {/* Also on the success screen: a 204 only means the code was accepted, not
              that the TV behind it is still waiting on that code. */}
          <p className="mt-6 rounded-xl bg-background/50 p-4 text-xs leading-relaxed text-muted-foreground ring-1 ring-border/50 backdrop-blur-sm">
            {t.refreshNote}
          </p>
        </div>
      </main>

      <footer className="relative z-10 px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        <span>&copy; {year} Next Horizons FZCO</span>
        <span aria-hidden="true" className="px-2">
          &middot;
        </span>
        <Link href="/privacy" className="underline underline-offset-4 transition-colors hover:text-foreground">
          {t.footerPrivacy}
        </Link>
      </footer>
    </div>
  )
}
