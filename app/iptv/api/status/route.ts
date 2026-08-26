import { NextResponse } from "next/server"
import { POLL_INTERVAL_MS, SESSION_TTL_SECONDS } from "@/lib/iptv-pairing"
import { storeKind } from "@/lib/iptv-store"

/**
 * GET /iptv/api/status
 *
 * Answers one operator question: is durable storage actually wired up, or is
 * this deployment falling back to per-instance memory? Reports which backend
 * was selected and the timings the TV app is expected to use — never an
 * environment value, a token, a pairing code or a payload.
 */

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Mirrors the session route deliberately: the TV app calls both from file://.
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

function baseHeaders(): Headers {
  return new Headers({ ...CORS_HEADERS, "Cache-Control": "no-store" })
}

export async function GET(): Promise<NextResponse> {
  const store = storeKind()
  return NextResponse.json(
    {
      store,
      // Memory mode pairs only within one instance, so on a serverless
      // deployment false means broken rather than merely degraded. Spelled out
      // so a check does not have to know what "memory" implies.
      healthy: store === "redis",
      ttlSeconds: SESSION_TTL_SECONDS,
      pollIntervalMs: POLL_INTERVAL_MS,
    },
    { headers: baseHeaders() },
  )
}

export async function OPTIONS(): Promise<NextResponse> {
  const headers = baseHeaders()
  headers.set("Access-Control-Max-Age", "86400")
  return new NextResponse(null, { status: 204, headers })
}
