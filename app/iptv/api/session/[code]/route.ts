import { NextRequest, NextResponse } from "next/server"
import {
  MAX_BODY_BYTES,
  isValidBackupTransferCode,
  isValidSessionCode,
  normalizeCode,
  pairingPayloadSchema,
} from "@/lib/iptv-pairing"
import { consumeRateLimit, putSession, takeSession } from "@/lib/iptv-store"

/**
 * The pairing handshake. See lib/iptv-pairing.ts for the contract.
 *
 *   POST /iptv/api/session/{CODE}  — the phone hands over the payload
 *   GET  /iptv/api/session/{CODE}  — the TV collects it, once
 *
 * Bodies carry IPTV credentials, so no handler logs a payload, a field of one,
 * or anything derived from the request body.
 */

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface RouteContext {
  params: Promise<{ code: string }>
}

/**
 * The TV app is loaded from file:// and therefore sends no Origin header, so
 * the wildcard is the only workable value. No credentials are involved — the
 * pairing code in the URL is the entire authorisation.
 */
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

/** The old Tizen webview caches aggressively; a cached 404 would stall pairing forever. */
function baseHeaders(): Headers {
  return new Headers({ ...CORS_HEADERS, "Cache-Control": "no-store" })
}

function jsonResponse(body: unknown, status: number): NextResponse {
  return NextResponse.json(body, { status, headers: baseHeaders() })
}

function tooManyRequests(retryAfter: number): NextResponse {
  const headers = baseHeaders()
  headers.set("Retry-After", String(Math.max(1, Math.ceil(retryAfter))))
  return NextResponse.json({ error: "rate_limited" }, { status: 429, headers })
}

/**
 * An unexpected throw becomes a bare 500. Only the error class is logged:
 * JSON.parse embeds a slice of its input in the message, and that input is the
 * visitor's credentials. Storage failures log their own value-free detail.
 */
async function guard(handler: () => Promise<NextResponse>): Promise<NextResponse> {
  try {
    return await handler()
  } catch (err) {
    console.error("[iptv/session] Unhandled failure:", err instanceof Error ? err.name : "unknown")
    return jsonResponse({ error: "server_error" }, 500)
  }
}

/**
 * Most trustworthy header first. x-forwarded-for is only meaningful because the
 * proxy in front rewrites it; behind anything that does not, a caller can send
 * their own and both dodge their limit and exhaust a chosen victim's bucket.
 * x-vercel-forwarded-for is set at the edge and cannot be forged through it.
 */
const IP_HEADERS = ["x-vercel-forwarded-for", "x-real-ip", "x-forwarded-for"]

function clientIp(req: NextRequest): string {
  for (const name of IP_HEADERS) {
    const first = req.headers.get(name)?.split(",")[0].trim()
    if (first) return first
  }
  return "unknown"
}

/**
 * Reads the body while enforcing the cap, rather than buffering first and
 * measuring after: content-length is a claim, and a request can omit it.
 * Returns null once the limit is passed.
 */
async function readBoundedText(req: NextRequest, maxBytes: number): Promise<string | null> {
  const declared = Number(req.headers.get("content-length"))
  if (Number.isFinite(declared) && declared > maxBytes) return null
  if (!req.body) return ""

  const reader = req.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > maxBytes) {
      await reader.cancel().catch(() => {})
      return null
    }
    chunks.push(value)
  }

  return Buffer.concat(chunks).toString("utf8")
}

export async function OPTIONS(): Promise<NextResponse> {
  const headers = baseHeaders()
  headers.set("Access-Control-Max-Age", "86400")
  return new NextResponse(null, { status: 204, headers })
}

/**
 * Declared only to shadow the router's fallback, which answers HEAD with the
 * GET handler and strips the body. That would run the one-time read: a scanner,
 * proxy or link preview touching the URL would consume the pairing and leave
 * the TV polling a session that can never arrive. Never touches the store.
 */
export async function HEAD(): Promise<NextResponse> {
  const headers = baseHeaders()
  headers.set("Allow", "GET, POST, OPTIONS")
  return new NextResponse(null, { status: 405, headers })
}

export async function POST(req: NextRequest, ctx: RouteContext): Promise<NextResponse> {
  return guard(async () => {
    // The only bound on how much one caller can park in the store: any
    // well-formed code is writable, at up to MAX_BODY_BYTES for a full TTL. A
    // visitor submits once, twice after a typo; carrier NAT — many phones on
    // one address — is why it is not tighter still.
    const ip = clientIp(req)
    const limit = await consumeRateLimit(`post:${ip}`, 10, 60)
    if (!limit.ok) return tooManyRequests(limit.retryAfter)

    // Checked before the body is read so a wrong code costs nothing.
    const code = normalizeCode((await ctx.params).code)
    if (!isValidSessionCode(code)) return jsonResponse({ error: "invalid_payload" }, 400)

    const raw = await readBoundedText(req, MAX_BODY_BYTES)
    if (raw === null) return jsonResponse({ error: "payload_too_large" }, 413)

    let json: unknown
    try {
      json = JSON.parse(raw)
    } catch {
      return jsonResponse({ error: "invalid_payload" }, 400)
    }

    const parsed = pairingPayloadSchema.safeParse(json)
    // The failure reason is discarded rather than echoed: zod reports the
    // offending value, which here is a password.
    if (!parsed.success) return jsonResponse({ error: "invalid_payload" }, 400)
    // Long tokens are outbound backup transfers only. Keeping source setup on
    // the short TV code prevents the two flows from being confused.
    if (isValidBackupTransferCode(code) && parsed.data.type !== "backup") {
      return jsonResponse({ error: "invalid_payload" }, 400)
    }

    const stored = await putSession(code, parsed.data)
    if (!stored) return jsonResponse({ error: "code_in_use" }, 409)
    return new NextResponse(null, { status: 204, headers: baseHeaders() })
  })
}

export async function GET(req: NextRequest, ctx: RouteContext): Promise<NextResponse> {
  return guard(async () => {
    // 60/min leaves room for several TVs behind one router at the ~17/min poll
    // cadence. It is not a defence against guessing — a 30^6 code space is.
    const ip = clientIp(req)
    const limit = await consumeRateLimit(`get:${ip}`, 60, 60)
    if (!limit.ok) return tooManyRequests(limit.retryAfter)

    const code = normalizeCode((await ctx.params).code)
    // A malformed code, an expired session and a code nobody ever generated
    // all answer identically. Never 410 — "gone" would confirm that the code
    // existed, turning polling into an enumeration oracle.
    if (!isValidSessionCode(code)) return jsonResponse({ error: "not_found" }, 404)

    const payload = await takeSession(code)
    if (!payload) return jsonResponse({ error: "not_found" }, 404)

    return jsonResponse(payload, 200)
  })
}
