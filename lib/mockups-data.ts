/**
 * Mockup Data Store
 * =================
 *
 * The list of mockups is stored as a single JSON document. We support two
 * back-ends, picked automatically at runtime:
 *
 *   1. Vercel Blob (production) — when BLOB_READ_WRITE_TOKEN is set.
 *      A single blob at the well-known key `mockups.json` holds the array.
 *      Writes happen via the @vercel/blob SDK.
 *
 *   2. Local filesystem (development) — fallback. Reads/writes
 *      `data/mockups.json` in the repo. Convenient for local testing.
 *
 * On first read in production, if the blob doesn't exist yet we seed it
 * from the bundled `data/mockups.json` (which ships with the deploy as
 * sample/seed data). After that, all writes go to the blob.
 *
 * Mock screenshots are stored separately (also in Vercel Blob in
 * production, in /public during dev). See lib/blob.ts for the storage
 * helpers.
 */

import fs from "node:fs"
import path from "node:path"
import { put, head } from "@vercel/blob"

export type MockupStatus =
  | "pending"   // Customer can view and unlock
  | "paid"      // Already paid — show "in production" state
  | "expired"   // Link no longer valid

export type Currency = "AED" | "USD" | "EUR" | "GBP"

export interface MockupPage {
  /** Display label for the mockup variant (e.g. "Homepage", "About page") */
  label: string
  /** URL of the "before" screenshot (Vercel Blob URL or /public path) */
  beforeImage: string
  /** URL of the "after" screenshot (Vercel Blob URL or /public path) */
  afterImage: string
  /** Optional short description shown under the page */
  notes?: string
}

export interface Mockup {
  /** Unique, hard-to-guess token used in the URL */
  token: string

  /** Customer-facing company name (shown on the page) */
  companyName: string

  /** Optional contact name (shown in the welcome heading) */
  contactName?: string

  /** Customer's existing website URL (just for reference / display) */
  currentWebsite?: string

  /** One or two pages of the redesign */
  pages: MockupPage[]

  /** What's included — bullet list shown above the price */
  deliverables: string[]

  /** Pricing — use cents/fils (smallest currency unit) to avoid float math */
  priceMinor: number      // e.g. 350000 = 3500.00 AED
  currency: Currency

  /** Lifecycle */
  status: MockupStatus
  createdAt: string       // ISO date
  paidAt?: string         // ISO date — set when payment confirmed
  /** Stripe Checkout Session ID, set after the session is created */
  stripeSessionId?: string
  /** Stripe Payment Intent ID, set after webhook confirms payment */
  stripePaymentIntentId?: string

  /** Optional internal note — only visible in the admin panel */
  internalNote?: string
}

// ─────────────────────────────────────────────────────────────────
// Storage backend selection
// ─────────────────────────────────────────────────────────────────

const BLOB_KEY = "mockups.json"
const LOCAL_FILE = path.join(process.cwd(), "data", "mockups.json")

function isBlobAvailable(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

function readLocalSeed(): Mockup[] {
  try {
    const raw = fs.readFileSync(LOCAL_FILE, "utf-8")
    return JSON.parse(raw) as Mockup[]
  } catch {
    return []
  }
}

// In-memory cache for the *current Blob URL* (not data). After we write,
// `put()` returns the canonical URL we just created — we remember it so
// subsequent reads in the same function instance hit the right URL
// directly without going through eventually-consistent list() / head().
// Other function instances will look it up via head() on first miss.
let cachedBlobUrl: string | null = null

async function readFromBlob(): Promise<Mockup[]> {
  // Path A — we have a remembered URL from a recent write in this instance.
  // Append a cache-buster so the CDN doesn't serve a stale version.
  if (cachedBlobUrl) {
    const url = `${cachedBlobUrl}?t=${Date.now()}`
    const res = await fetch(url, { cache: "no-store" })
    if (res.ok) return (await res.json()) as Mockup[]
    // Fall through if the URL stopped working for any reason.
    cachedBlobUrl = null
  }

  // Path B — look up the canonical URL via head(). head() is strongly
  // consistent (unlike list()), so it works immediately after a write.
  let blobUrl: string | undefined
  try {
    const meta = await head(BLOB_KEY)
    blobUrl = meta.url
  } catch {
    // head() throws if the blob doesn't exist yet → first-time setup.
    // Seed it from the bundled JSON.
    const seed = readLocalSeed()
    await writeToBlob(seed)
    return seed
  }

  cachedBlobUrl = blobUrl
  const res = await fetch(`${blobUrl}?t=${Date.now()}`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error(`Failed to fetch mockups blob: ${res.status}`)
  }
  return (await res.json()) as Mockup[]
}

async function writeToBlob(mockups: Mockup[]): Promise<void> {
  const result = await put(BLOB_KEY, JSON.stringify(mockups, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    // Don't cache writes — we always want fresh reads for admin operations.
    cacheControlMaxAge: 0,
  })
  // Remember the URL so subsequent reads in this instance use it directly.
  cachedBlobUrl = result.url
}

function writeLocal(mockups: Mockup[]): void {
  fs.mkdirSync(path.dirname(LOCAL_FILE), { recursive: true })
  fs.writeFileSync(LOCAL_FILE, JSON.stringify(mockups, null, 2))
}

/** Read all mockups from whichever backend is active */
async function loadAll(): Promise<Mockup[]> {
  return isBlobAvailable() ? await readFromBlob() : readLocalSeed()
}

/** Persist a new full list */
async function saveAll(mockups: Mockup[]): Promise<void> {
  if (isBlobAvailable()) {
    await writeToBlob(mockups)
  } else if (process.env.VERCEL) {
    // We're running on Vercel without Blob configured. Vercel's filesystem
    // is read-only at runtime, so writeLocal() would throw EROFS — give
    // the admin a clear message instead.
    throw new Error(
      "Vercel Blob storage is not configured. To save mockups, go to your " +
        "Vercel project → Storage → Create Database → Blob, connect it to " +
        "this project, then redeploy. See CHECKOUT_SETUP.md for details.",
    )
  } else {
    writeLocal(mockups)
  }
}

// ─────────────────────────────────────────────────────────────────
// Public API: seed-only reads (sync wrappers around async load)
// ─────────────────────────────────────────────────────────────────
//
// These return seed data WITHOUT consulting Stripe for paid status. The
// "Stripe-aware" versions live in lib/mockups.ts. We expose async
// versions because the storage layer is now async (Blob).
//
// The legacy "Sync" versions still work in the local-filesystem case
// because readLocalSeed() is sync, but they throw if Blob is configured.
// All callers should be using the async versions; sync versions are kept
// only for compatibility with code that runs at import time.

export async function getMockupSeed(token: string): Promise<Mockup | null> {
  if (!token || typeof token !== "string") return null
  const all = await loadAll()
  return all.find((m) => m.token === token) ?? null
}

export async function getAllMockupsSeed(): Promise<Mockup[]> {
  const all = await loadAll()
  return [...all].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

// ─────────────────────────────────────────────────────────────────
// Mutations (admin-only — guarded by API route auth checks)
// ─────────────────────────────────────────────────────────────────

/** Create a new mockup. Throws if the token already exists. */
export async function createMockup(mockup: Mockup): Promise<void> {
  const all = await loadAll()
  if (all.some((m) => m.token === mockup.token)) {
    throw new Error(`A mockup with token "${mockup.token}" already exists`)
  }
  await saveAll([mockup, ...all])
}

/** Replace a mockup wholesale (used for edits). Throws if not found. */
export async function replaceMockup(
  token: string,
  next: Mockup,
): Promise<void> {
  const all = await loadAll()
  const idx = all.findIndex((m) => m.token === token)
  if (idx === -1) throw new Error(`Mockup with token "${token}" not found`)
  // Don't allow changing the token via replace
  if (next.token !== token) {
    throw new Error("Cannot change token via replaceMockup; delete + recreate")
  }
  all[idx] = next
  await saveAll(all)
}

/** Delete a mockup permanently. */
export async function deleteMockup(token: string): Promise<void> {
  const all = await loadAll()
  await saveAll(all.filter((m) => m.token !== token))
}

// ─────────────────────────────────────────────────────────────────
// Display helpers
// ─────────────────────────────────────────────────────────────────

const CURRENCY_FORMAT: Record<Currency, { locale: string }> = {
  AED: { locale: "en-AE" },
  USD: { locale: "en-US" },
  EUR: { locale: "en-GB" },
  GBP: { locale: "en-GB" },
}

/** Format price in major units, with currency symbol */
export function formatPrice(priceMinor: number, currency: Currency): string {
  const major = priceMinor / 100
  const fmt = new Intl.NumberFormat(CURRENCY_FORMAT[currency].locale, {
    style: "currency",
    currency,
    minimumFractionDigits: major % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
  return fmt.format(major)
}

/** Generate a hard-to-guess token: company-slug + 12 random chars */
export function generateToken(companySlug: string): string {
  const clean = companySlug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24)
  const random = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 36).toString(36),
  ).join("")
  return `${clean}-${random}`
}

// Public API: the Stripe-aware wrappers (getMockup / getAllMockups /
// markAsPaid / updateMockup) live in lib/mockups.ts.
