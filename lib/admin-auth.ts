/**
 * Lightweight admin authentication.
 *
 * Design decision: the admin panel is for ONE person (you). A full
 * user-management system would be massive overkill — what we need is just
 * "did the person typing the password know the right password?"
 *
 * So:
 *   - Single `ADMIN_PASSWORD` set in env vars
 *   - On successful login, we set a signed session cookie. The signature
 *     uses HMAC over a timestamp, keyed by `ADMIN_SESSION_SECRET`. This
 *     prevents cookie tampering without needing a session store.
 *   - Cookie expires after 7 days
 *   - Logout simply clears the cookie
 *
 * Everything in this file runs server-side only.
 *
 * Limitations of this approach (be aware):
 *   - No rate limiting on the login endpoint — Vercel has IP-based DDoS
 *     protection at the platform level which is enough at our scale, but
 *     consider adding upstash/ratelimit if this becomes a target.
 *   - No 2FA. If you want 2FA, the cleanest path is to swap this whole
 *     file out for something like Auth.js with a TOTP provider.
 *   - No "remember me" / refresh token flow — sessions just expire.
 */

import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "node:crypto"

const COOKIE_NAME = "nh_admin_session"
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short. Set it to a random " +
      "string of at least 32 characters in your environment.",
    )
  }
  return secret
}

/** Sign a session payload with HMAC */
function signPayload(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex")
}

/** Verify a session token. Returns true if valid and unexpired. */
function verifySession(token: string): boolean {
  const parts = token.split(".")
  if (parts.length !== 2) return false

  const [payload, signature] = parts
  const expectedSig = signPayload(payload)

  // Timing-safe compare to defeat timing attacks (paranoid, but cheap)
  const a = Buffer.from(signature, "hex")
  const b = Buffer.from(expectedSig, "hex")
  if (a.length !== b.length) return false
  if (!timingSafeEqual(a, b)) return false

  // Payload format: "issuedAtMs"
  const issuedAt = Number(payload)
  if (!Number.isFinite(issuedAt)) return false
  if (Date.now() - issuedAt > SESSION_DURATION_MS) return false

  return true
}

/** Create a new session token (called on successful login) */
export function createSessionToken(): string {
  const payload = String(Date.now())
  const signature = signPayload(payload)
  return `${payload}.${signature}`
}

/** Set the session cookie (called from login server action / route) */
export async function setAdminSession() {
  const token = createSessionToken()
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  })
}

/** Clear the session cookie (logout) */
export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

/** Server-side check: is the current request authenticated? */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  try {
    return verifySession(token)
  } catch {
    // If secret is missing, treat as unauthenticated (not crash).
    return false
  }
}

/**
 * Verify a submitted password against ADMIN_PASSWORD.
 * Uses timing-safe comparison.
 */
export function checkAdminPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    console.error("[admin-auth] ADMIN_PASSWORD not set — login will always fail")
    return false
  }
  // Pad both to the same length for timing-safe compare
  const a = Buffer.from(submitted)
  const b = Buffer.from(expected)
  if (a.length !== b.length) {
    // Still do a comparison to keep timing constant-ish
    timingSafeEqual(Buffer.alloc(32), Buffer.alloc(32))
    return false
  }
  return timingSafeEqual(a, b)
}
