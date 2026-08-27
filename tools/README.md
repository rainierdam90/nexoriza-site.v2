# tools/pairing-store-server.mjs

Session store for the `/iptv` TV pairing flow, to run on your own VPS instead of
paying for a hosted Redis.

## Why this exists

The phone POSTs the pairing payload; the TV picks it up a few seconds later. On
Vercel those two requests usually land on different instances, so they need a
store they both reach. That is the *only* thing being stored: one small JSON
blob per pairing, for at most ten minutes.

The website talks to this service with the same two commands it would send to
Upstash (`SET … EX … NX` and `GETDEL`), so **nothing in the app changes** — you only
set two environment variables.

## Two builds, same protocol

| File | Needs | Use when |
| --- | --- | --- |
| `pairing-store-server.mjs` | Node 18+ | the box already runs Node |
| `pairing_store_server.py` | Python 3.9+ | it does not — no packages to install |

Both are standard-library only and speak the identical REST subset, so the
website cannot tell them apart. Pick one.

## Install

```bash
sudo mkdir -p /opt/pairing-store
sudo cp pairing_store_server.py /opt/pairing-store/     # or the .mjs
openssl rand -hex 32                                     # use this as PAIRING_TOKEN
```

Put the token in `/etc/pairing-store.env`, not in the unit file — unit files are
world-readable and the token is the only authentication this service has:

```bash
sudo sh -c 'umask 077; echo "PAIRING_TOKEN=<token>" > /etc/pairing-store.env'
```

`/etc/systemd/system/pairing-store.service`:

```ini
[Unit]
Description=Tivexo pairing store
After=network.target

[Service]
EnvironmentFile=/etc/pairing-store.env
Environment=PORT=8787
Environment=HOST=127.0.0.1
ExecStart=/usr/bin/python3 -u /opt/pairing-store/pairing_store_server.py
Restart=always
RestartSec=2
DynamicUser=yes
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ProtectHome=yes
RestrictAddressFamilies=AF_INET AF_INET6
MemoryMax=128M

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now pairing-store
```

## Put TLS in front of it

It binds to localhost and the token is the only authentication, so it must not
be exposed directly. Give it a vhost file of its own rather than editing one
that already serves something — a typo then cannot take that site down, and
`nginx -t` before every reload catches it anyway:

```nginx
server {
    listen 8444 ssl http2;
    server_name pairing.example.com;

    ssl_certificate     /etc/letsencrypt/live/pairing.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pairing.example.com/privkey.pem;

    client_max_body_size 256k;

    location = / {
        limit_except POST { deny all; }
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_read_timeout 5s;      # a poll must fail fast, not hang the TV
    }

    location / { return 444; }
}
```

Then `sudo nginx -t && sudo systemctl reload nginx` and open the port
(`sudo ufw allow 8444/tcp`). A port other than 443 is fine — the website calls
this URL server-to-server, so put it wherever it does not collide. Caddy
equivalent: `pairing.example.com { reverse_proxy 127.0.0.1:8787 }`.

Reusing a certificate that already exists on the box saves a second DNS record
and a second renewal to keep alive. If certbot runs with the `standalone`
authenticator, leave port 80 unbound or renewals will fail.

## Point the website at it

In Vercel → Settings → Environment Variables:

```
UPSTASH_REDIS_REST_URL   = https://pairing.example.com:8444
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
- **First write wins.** `SET … NX` is atomic under the process lock. A random
  code collision therefore returns a null result instead of overwriting the
  payload already waiting for another TV.
- **Sizing is not a concern**: a handful of small strings and roughly 17
  requests per minute per waiting TV.
- Health check: `curl -H "Authorization: Bearer $PAIRING_TOKEN" -d '["PING"]' https://pairing.example.com` → `{"result":"PONG"}`.
