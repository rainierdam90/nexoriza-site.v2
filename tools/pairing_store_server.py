#!/usr/bin/env python3
"""Pairing-session store for /iptv — Python port of pairing-store-server.mjs.

Speaks the small subset of the Upstash REST protocol that lib/iptv-store.ts
uses, so the website needs no code change: point UPSTASH_REDIS_REST_URL at this
service and UPSTASH_REDIS_REST_TOKEN at the token it is started with.

Standard library only, so it runs on a box that has Python but no Node and
needs no packages installed. Sessions live in this process's memory with a TTL,
which is correct here — unlike on serverless — because a single long-lived
process handles both the phone's write and the TV's read.

  Run:  PAIRING_TOKEN=<long-random> python3 pairing_store_server.py
  Env:  PAIRING_TOKEN (required)  PORT (default 8787)  HOST (default 127.0.0.1)

Terminate TLS in front of it and bind to localhost: the token is the only
authentication, and payloads hold IPTV credentials.
"""

import hmac
import json
import os
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

TOKEN = os.environ.get("PAIRING_TOKEN", "")
PORT = int(os.environ.get("PORT", "8787"))
HOST = os.environ.get("HOST", "127.0.0.1")
MAX_BODY_BYTES = 256 * 1024
SWEEP_INTERVAL = 30.0

if len(TOKEN) < 24:
    sys.stderr.write("PAIRING_TOKEN is required and must be at least 24 characters.\n")
    raise SystemExit(1)

# key -> (value, expires_at). The lock is what makes GETDEL atomic across
# threads: two TVs polling the same code must never both be handed the payload.
_store: dict[str, tuple[str, float]] = {}
_lock = threading.Lock()


def _sweep() -> None:
    while True:
        time.sleep(SWEEP_INTERVAL)
        now = time.monotonic()
        with _lock:
            for key in [k for k, (_, exp) in _store.items() if exp <= now]:
                del _store[key]


def run_command(command: list) -> dict:
    verb = str(command[0]).upper() if command else ""
    key = str(command[1]) if len(command) > 1 else ""

    if verb == "SET":
        value = command[2] if len(command) > 2 else None
        ttl = 600
        rest = [str(part).upper() for part in command[3:]]
        if "EX" in rest:
            try:
                ttl = int(command[3 + rest.index("EX") + 1])
            except (IndexError, TypeError, ValueError):
                return {"error": "ERR bad SET"}
        if not isinstance(value, str) or ttl <= 0:
            return {"error": "ERR bad SET"}
        with _lock:
            _store[key] = (value, time.monotonic() + ttl)
        return {"result": "OK"}

    if verb == "GETDEL":
        with _lock:
            entry = _store.pop(key, None)
        if entry is None:
            return {"result": None}
        value, expires_at = entry
        return {"result": value if expires_at > time.monotonic() else None}

    if verb == "DEL":
        with _lock:
            return {"result": 1 if _store.pop(key, None) is not None else 0}

    if verb == "PING":
        return {"result": "PONG"}

    return {"error": "ERR unsupported command"}


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    server_version = "pairing-store"
    sys_version = ""

    def _send(self, status: int, body: dict) -> None:
        payload = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def _authorised(self) -> bool:
        supplied = self.headers.get("Authorization", "")
        if supplied.startswith("Bearer "):
            supplied = supplied[len("Bearer "):]
        return hmac.compare_digest(supplied, TOKEN)

    def do_POST(self) -> None:  # noqa: N802 - name fixed by BaseHTTPRequestHandler
        if not self._authorised():
            return self._send(401, {"error": "NOAUTH"})

        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            return self._send(400, {"error": "ERR length"})
        if length > MAX_BODY_BYTES:
            return self._send(413, {"error": "ERR too large"})

        try:
            command = json.loads(self.rfile.read(length).decode("utf-8"))
        except (ValueError, UnicodeDecodeError):
            return self._send(400, {"error": "ERR parse"})
        if not isinstance(command, list) or not command:
            return self._send(400, {"error": "ERR shape"})

        outcome = run_command(command)
        if "error" in outcome:
            # Values are IPTV credentials: log the verb, never key or value.
            sys.stderr.write(f"[pairing-store] {str(command[0]).upper()} rejected\n")
        self._send(200 if "error" not in outcome else 200, outcome)

    def do_GET(self) -> None:  # noqa: N802
        self._send(405, {"error": "ERR method"})

    def log_message(self, *args) -> None:
        """Silence the access log: request lines would carry no secrets today,
        but the default handler is one refactor away from logging a body."""


if __name__ == "__main__":
    threading.Thread(target=_sweep, daemon=True).start()
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    sys.stderr.write(f"[pairing-store] listening on {HOST}:{PORT}\n")
    sys.stderr.flush()
    server.serve_forever()
