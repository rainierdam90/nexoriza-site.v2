import { SESSION_TTL_SECONDS, type PairingPayload } from "@/lib/iptv-pairing"

/**
 * Storage for TV pairing sessions.
 *
 * Two backends, picked at runtime from the environment:
 *
 *   - Redis over the Upstash-style REST API (production): used when a URL and
 *     a token are both present. Either naming convention works —
 *     KV_REST_API_URL/KV_REST_API_TOKEN (Vercel KV) or
 *     UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN.
 *
 *   - An in-process Map (dev): correct for a single `next dev` server and
 *     nothing else. A serverless deployment runs many instances, so a session
 *     written by the instance that handled the phone's POST is invisible to
 *     the instance that handles the TV's next GET — pairing would then fail
 *     most of the time, unpredictably. Configure Redis before shipping.
 *
 * Sessions carry the visitor's IPTV credentials, so nothing in this file ever
 * logs a key, a value, or a pairing code.
 */

const SESSION_PREFIX = "iptv:session:"
const RATE_PREFIX = "iptv:rate:"

/** A stalled Redis would otherwise hold the TV's poll open until the platform timeout. */
const REDIS_TIMEOUT_MS = 5000

const REDIS_ENV_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["KV_REST_API_URL", "KV_REST_API_TOKEN"],
  ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
]

interface RedisConfig {
  url: string
  token: string
}

/**
 * Conventions are read as pairs, never field by field: pairing a Vercel KV URL
 * with an Upstash token would only surface at request time, as an auth error
 * the operator has no way to interpret.
 */
function redisConfig(): RedisConfig | null {
  for (const [urlVar, tokenVar] of REDIS_ENV_PAIRS) {
    const url = process.env[urlVar]?.trim()
    const token = process.env[tokenVar]?.trim()
    if (url && token) return { url: url.replace(/\/+$/, ""), token }
  }
  return null
}

export function storeKind(): "redis" | "memory" {
  return redisConfig() ? "redis" : "memory"
}

/**
 * Logs a value-free diagnostic and throws. Callers must not swallow this: a
 * silent failure loses a pairing the visitor already typed their credentials
 * into, and the TV would poll a session that will never arrive.
 */
function fail(verb: string, detail: string): never {
  console.error(`[iptv-store] Redis ${verb} failed: ${detail}`)
  throw new Error(`iptv-store: Redis ${verb} failed`)
}

interface RedisReply {
  result?: unknown
  error?: unknown
}

/**
 * Runs one command against the REST endpoint, e.g. ["SET", key, value, "EX", "600"].
 *
 * Error responses are reported by status and error code only. Redis echoes the
 * offending command back in its error strings, which would put the key — and
 * with SET, the payload — into the logs. A rejected fetch is reduced the same
 * way, to the error class: its message quotes the endpoint it was handed
 * ("Failed to parse URL from ..."), and TimeoutError vs TypeError vs
 * AbortError is the whole diagnostic anyway.
 */
async function redisCommand(cfg: RedisConfig, command: string[]): Promise<unknown> {
  const verb = command[0]

  const res = await fetch(cfg.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
  }).catch((err: unknown) => fail(verb, err instanceof Error ? err.name : "unreachable"))

  if (!res.ok) fail(verb, `HTTP ${res.status}`)

  const body = (await res.json().catch(() => fail(verb, "malformed response"))) as RedisReply

  if (body.error !== undefined) {
    // Keep the leading error code ("NOAUTH", "WRONGTYPE", "ERR") and drop the
    // rest, which is where the command arguments appear.
    const code = /^[A-Z]+/.exec(String(body.error))?.[0] ?? "error"
    fail(verb, `reply ${code}`)
  }

  return body.result ?? null
}

interface MemoryEntry {
  value: string
  expiresAt: number
}

// Next.js replaces the module on every hot reload in dev; hanging the Map off
// globalThis keeps in-flight pairings alive across a file save.
const globalForMemory = globalThis as typeof globalThis & {
  __iptvPairingMemory?: Map<string, MemoryEntry>
}
const memory: Map<string, MemoryEntry> = (globalForMemory.__iptvPairingMemory ??= new Map())

const SWEEP_INTERVAL_MS = 60_000
let nextSweepAt = 0

/** Expired entries are dropped on read; this only stops abandoned keys accumulating. */
function sweep(now: number): void {
  if (now < nextSweepAt) return
  nextSweepAt = now + SWEEP_INTERVAL_MS
  for (const [key, entry] of memory) {
    if (entry.expiresAt <= now) memory.delete(key)
  }
}

function memoryTake(key: string): string | null {
  const now = Date.now()
  sweep(now)
  const entry = memory.get(key)
  if (!entry) return null
  memory.delete(key)
  return entry.expiresAt > now ? entry.value : null
}

/** Stores the payload under a namespaced key, expiring with the session. */
export async function putSession(code: string, payload: PairingPayload): Promise<void> {
  const key = SESSION_PREFIX + code
  const value = JSON.stringify(payload)

  const cfg = redisConfig()
  if (cfg) {
    await redisCommand(cfg, ["SET", key, value, "EX", String(SESSION_TTL_SECONDS)])
    return
  }

  memory.set(key, { value, expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000 })
}

/**
 * One-time read: the payload is handed over and destroyed in the same step, so
 * two TVs polling the same code can never both receive it. GETDEL does this
 * atomically — a GET followed by a DEL would race between the TV's polls.
 */
export async function takeSession(code: string): Promise<PairingPayload | null> {
  const key = SESSION_PREFIX + code

  const cfg = redisConfig()
  const raw = cfg
    ? ((await redisCommand(cfg, ["GETDEL", key])) as string | null)
    : memoryTake(key)

  if (typeof raw !== "string") return null

  try {
    return JSON.parse(raw) as PairingPayload
  } catch {
    // Only putSession writes these keys, so this is a corrupted value rather
    // than untrusted input. Drop it instead of handing the TV garbage.
    return null
  }
}

export interface RateLimitResult {
  ok: boolean
  /** Seconds until the window resets. Zero when the request was allowed. */
  retryAfter: number
}

/** Fixed-window counter, keyed by an opaque bucket the caller composes. */
export async function consumeRateLimit(
  bucket: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const key = RATE_PREFIX + bucket

  const cfg = redisConfig()
  if (!cfg) {
    const now = Date.now()
    sweep(now)
    const entry = memory.get(key)
    if (!entry || entry.expiresAt <= now) {
      memory.set(key, { value: "1", expiresAt: now + windowSeconds * 1000 })
      return { ok: true, retryAfter: 0 }
    }
    const count = Number(entry.value) + 1
    entry.value = String(count)
    if (count <= limit) return { ok: true, retryAfter: 0 }
    return { ok: false, retryAfter: secondsUntil(entry.expiresAt, now, windowSeconds) }
  }

  const count = Number(await redisCommand(cfg, ["INCR", key]))
  if (count === 1) {
    await redisCommand(cfg, ["EXPIRE", key, String(windowSeconds)])
  }
  if (count <= limit) return { ok: true, retryAfter: 0 }

  const ttl = Number(await redisCommand(cfg, ["TTL", key]))
  if (ttl === -1) {
    // INCR landed but EXPIRE did not — without this the counter would never
    // reset and the caller's IP would be blocked permanently.
    await redisCommand(cfg, ["EXPIRE", key, String(windowSeconds)])
    return { ok: false, retryAfter: windowSeconds }
  }
  return { ok: false, retryAfter: ttl > 0 ? ttl : windowSeconds }
}

function secondsUntil(expiresAt: number, now: number, fallback: number): number {
  const remaining = Math.ceil((expiresAt - now) / 1000)
  return remaining > 0 ? remaining : fallback
}
