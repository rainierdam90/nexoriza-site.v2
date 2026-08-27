import { z } from "zod"

/**
 * Pairing contract between the Tivexo IPTV TV app (Samsung Tizen) and this
 * website. Both sides of the handshake are defined here so the API route and
 * the /iptv page can never drift apart.
 *
 * Flow:
 *   1. The TV generates a 6-character code and renders a QR pointing at
 *      https://www.nhsoftware.ae/iptv?c={CODE}
 *   2. The visitor fills in the form on their phone; the page POSTs the
 *      payload to /iptv/api/session/{CODE}
 *   3. The TV polls GET /iptv/api/session/{CODE} every 3.5s. The first 200
 *      hands over the payload and destroys the session (one-time read).
 * A second POST while a payload is waiting is rejected with 409 code_in_use;
 * the first visitor's credentials are never overwritten.
 *
 * The two endpoints answer a bad code differently, on purpose: POST reports a
 * malformed code as 400, while GET answers malformed, never-issued and expired
 * codes identically with 404. A distinct status on the polled endpoint would
 * confirm which codes are well-formed and turn polling into an enumeration
 * oracle.
 *
 * Payloads carry IPTV credentials, so they are never logged and never stored
 * beyond SESSION_TTL_SECONDS.
 */

/** Ambiguous glyphs (0/O, 1/I/L, B) are excluded so codes survive being read off a TV screen. */
export const CODE_ALPHABET = "23456789ACDEFGHJKMNPQRSTUVWXYZ"
export const CODE_LENGTH = 6
/** Sessions expire after 10 minutes; the TV generates a fresh code and QR when they do. */
export const SESSION_TTL_SECONDS = 10 * 60
/** Poll cadence the TV app uses. Documented here so rate limits stay compatible with it. */
export const POLL_INTERVAL_MS = 3500

const CODE_RE = new RegExp(`^[${CODE_ALPHABET}]{${CODE_LENGTH}}$`)

/**
 * Normalises a code typed by hand or read from the `c` query parameter:
 * uppercases, drops separators (spaces, dashes) and repairs the one
 * unambiguous misread — "B" is not in the alphabet but "8" is.
 */
export function normalizeCode(raw: string | null | undefined): string {
  return (raw ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/B/g, "8")
}

export function isValidCode(code: string): boolean {
  return CODE_RE.test(code)
}

/**
 * The two limits are one decision: the body cap must clear the largest payload
 * the schema accepts, or the schema's own ceiling is unreachable and an
 * oversized backup 413s before zod ever sees it. A backup blob is the only
 * unbounded part, and JSON escaping costs at most 6 bytes per character
 * (\uXXXX), so MAX_BACKUP_CHARS * 6 plus the envelope has to stay under
 * MAX_BODY_BYTES. Move one and re-check the other.
 */
export const MAX_BODY_BYTES = 128 * 1024
const MAX_BACKUP_CHARS = 20_000

/** Single-line field: no control characters, trimmed, bounded. */
const line = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    // eslint-disable-next-line no-control-regex
    .refine((v) => !/[\u0000-\u001F\u007F]/.test(v), "Control characters are not allowed")

/** Optional single-line field: absent, empty, or a valid line. */
const optionalLine = (max: number) =>
  z
    .union([line(max), z.literal("")])
    .optional()

/**
 * Deliberately permissive about URL shape: the TV app performs the real
 * detection and connection test, and users legitimately paste portal hosts
 * without a scheme (e.g. "portal.example.com:8080"). The server only enforces
 * that the value is a sane, bounded, single-line string.
 */
export const sourceSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("auto"), url: line(2048) }).strict(),
  z
    .object({
      kind: z.literal("xtream"),
      server: line(2048),
      username: line(256),
      password: line(256),
    })
    .strict(),
  z
    .object({
      kind: z.literal("m3u"),
      playlistUrl: line(4096),
      epgUrl: optionalLine(4096),
    })
    .strict(),
  z.object({ kind: z.literal("direct"), streamUrl: line(4096) }).strict(),
])

export const pairingPayloadSchema = z.discriminatedUnion("type", [
  z.object({ v: z.literal(1), type: z.literal("source"), source: sourceSchema }).strict(),
  z
    .object({
      v: z.literal(1),
      type: z.literal("backup"),
      // Backup blobs may legitimately contain newlines, so only the length is bounded.
      code: z.string().trim().min(1).max(MAX_BACKUP_CHARS),
    })
    .strict(),
])

export type PairingSource = z.infer<typeof sourceSchema>
export type PairingPayload = z.infer<typeof pairingPayloadSchema>
export type SourceKind = PairingSource["kind"]

/**
 * Tab order for the source picker on /iptv. Both assertions keep this tied to
 * sourceSchema, which the UI would otherwise drift from silently: `satisfies`
 * rejects a renamed or deleted variant, and the alias below rejects a new
 * variant that never got a tab.
 */
export const SOURCE_KINDS = [
  "auto",
  "xtream",
  "m3u",
  "direct",
] as const satisfies readonly SourceKind[]

type AllKindsCovered<T extends true> = T
type _SourceKindsExhaustive = AllKindsCovered<
  [Exclude<SourceKind, (typeof SOURCE_KINDS)[number]>] extends [never] ? true : false
>
