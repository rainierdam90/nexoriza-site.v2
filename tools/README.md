# tools/pairing-store-server.mjs

Session store for the `/iptv` TV pairing flow, to run on your own VPS instead of
paying for a hosted Redis.

## Why this exists

The phone POSTs the pairing payload; the TV picks it up a few seconds later. On
Vercel those two requests usually land on different instances, so they need a
store they both reach. That is the *only* thing being stored: one small JSON
blob per pairing, for at most ten minutes.

The website talks to this service with the same two commands it would send to
Upstash (`SET … EX` and `GETDEL`), so **nothing in the app changes** — you only
set two environment variables.

## Install

Requires Node 18+. No dependencies.

```bash
sudo mkdir -p /opt/pairing-store
sudo cp pairing-store-server.mjs /opt/pairing-store/
openssl rand -base64 36        # use this as PAIRING_TOKEN
```

`/etc/systemd/system/pairing-store.service`:

```ini
[Unit]
Description=Tivexo pairing store
After=network.target

[Service]
Environment=PAIRING_TOKEN=<the token you generated>
Environment=PORT=8787
Environment=HOST=127.0.0.1
ExecStart=/usr/bin/node /opt/pairing-store/pairing-store-server.mjs
Restart=always
DynamicUser=yes
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ProtectHome=yes

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now pairing-store
```

## Put TLS in front of it

It binds to localhost and the token is the only authentication, so it must not
be exposed directly. Behind nginx on a hostname you already have:

```nginx
location / {
    proxy_pass http://127.0.0.1:8787;
    proxy_set_header Host $host;
}
```

Caddy equivalent: `pairing.example.com { reverse_proxy 127.0.0.1:8787 }`.

## Point the website at it

In Vercel → Settings → Environment Variables:

```
UPSTASH_REDIS_REST_URL   = https://pairing.example.com
UPSTASH_REDIS_REST_TOKEN = <the same PAIRING_TOKEN>
```

Redeploy, then check `https://www.nhsoftware.ae/iptv/api/status`. It must say
`{"store":"redis","healthy":true,…}`.

## Operating notes

- **State is in memory.** A restart drops pairings that were in flight; the TV
  shows a fresh code within ten minutes anyway, and a user simply re-scans.
  Nothing needs backing up.
- **Payloads contain IPTV passwords.** The service never logs keys or values,
  and entries are deleted the moment the TV reads them. Keep it that way if you
  edit it.
- **Sizing is not a concern**: a handful of small strings and roughly 17
  requests per minute per waiting TV.
- Health check: `curl -H "Authorization: Bearer $PAIRING_TOKEN" -d '["PING"]' https://pairing.example.com` → `{"result":"PONG"}`.
