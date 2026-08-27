#!/usr/bin/env node
// Pairing-session store for /iptv, to run on your own VPS instead of a hosted
// Redis. It speaks the small subset of the Upstash REST protocol that
// lib/iptv-store.ts actually uses, so the website needs no code change: point
// UPSTASH_REDIS_REST_URL at this service and UPSTASH_REDIS_REST_TOKEN at the
// token below.
//
// Sessions live in this process's memory with a TTL. That is correct here, and
// not the compromise it would be on serverless, precisely because this is one
// long-lived process: the phone's write and the TV's read always meet.
//
//   Run:   PAIRING_TOKEN=<long-random> node pairing-store-server.mjs
//   Env:   PAIRING_TOKEN (required)  PORT (default 8787)  HOST (default 127.0.0.1)
//
// Terminate TLS in front of it (nginx/Caddy) and bind to localhost: the token
// is the only authentication, and payloads hold IPTV credentials.

import http from "node:http"
import { timingSafeEqual } from "node:crypto"

const TOKEN = process.env.PAIRING_TOKEN
const PORT = Number(process.env.PORT ?? 8787)
const HOST = process.env.HOST ?? "127.0.0.1"
const MAX_BODY_BYTES = 256 * 1024

if (!TOKEN || TOKEN.length < 24) {
  console.error("PAIRING_TOKEN is required and must be at least 24 characters.")
  process.exit(1)
}

/** key -> { value, expiresAt } */
const store = new Map()

setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) if (entry.expiresAt <= now) store.delete(key)
}, 30_000).unref()

function authorised(header) {
  const supplied = (header ?? "").replace(/^Bearer /, "")
  const a = Buffer.from(supplied)
  const b = Buffer.from(TOKEN)
  return a.length === b.length && timingSafeEqual(a, b)
}

function run(command) {
  const [verb, key, ...rest] = command
  switch (String(verb).toUpperCase()) {
    case "SET": {
      const value = rest[0]
      const exIndex = rest.findIndex((part) => String(part).toUpperCase() === "EX")
      const ttl = exIndex >= 0 ? Number(rest[exIndex + 1]) : 600
      if (typeof value !== "string" || !Number.isFinite(ttl) || ttl <= 0) return { error: "ERR bad SET" }
      store.set(key, { value, expiresAt: Date.now() + ttl * 1000 })
      return { result: "OK" }
    }
    case "GETDEL": {
      const entry = store.get(key)
      if (!entry) return { result: null }
      store.delete(key)
      return { result: entry.expiresAt > Date.now() ? entry.value : null }
    }
    case "DEL": {
      return { result: store.delete(key) ? 1 : 0 }
    }
    case "PING":
      return { result: "PONG" }
    default:
      return { error: `ERR unsupported command` }
  }
}

const server = http.createServer((req, res) => {
  const send = (status, body) => {
    const text = JSON.stringify(body)
    res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" })
    res.end(text)
  }

  if (req.method !== "POST") return send(405, { error: "ERR method" })
  if (!authorised(req.headers.authorization)) return send(401, { error: "NOAUTH" })

  let size = 0
  const chunks = []
  req.on("data", (chunk) => {
    size += chunk.length
    if (size > MAX_BODY_BYTES) {
      send(413, { error: "ERR too large" })
      req.destroy()
      return
    }
    chunks.push(chunk)
  })
  req.on("end", () => {
    if (res.writableEnded) return
    let command
    try {
      command = JSON.parse(Buffer.concat(chunks).toString("utf8"))
    } catch {
      return send(400, { error: "ERR parse" })
    }
    if (!Array.isArray(command) || command.length === 0) return send(400, { error: "ERR shape" })
    // Values are IPTV credentials: log the verb, never the key or the value.
    const outcome = run(command)
    if (outcome.error) console.error(`[pairing-store] ${String(command[0]).toUpperCase()} rejected`)
    send(200, outcome)
  })
})

server.listen(PORT, HOST, () => {
  console.log(`[pairing-store] listening on ${HOST}:${PORT}`)
})
