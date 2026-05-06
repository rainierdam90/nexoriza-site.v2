/**
 * Runtime mockup state.
 *
 * This module returns mockup objects with payment state filled in from
 * Stripe. It's the layer that callers (pages, admin, API routes) actually
 * import.
 *
 * Why this layer exists: on Vercel, the filesystem is read-only at runtime,
 * so we can't persist "paid" state in JSON files reliably. Instead:
 *
 *   - Seed data (companyName, prices, screenshots) → tracked in git
 *   - Payment state                                → derived from Stripe
 *
 * To avoid hammering Stripe's API on every page load, we cache results in
 * an in-memory map per serverless function instance. Cache TTL is 30s,
 * which is plenty for "I just paid, now show me the success state" cases
 * because the success page is the next request and is hit ~3-10 seconds
 * after Stripe redirects.
 *
 * Trade-off: there's a 0–30 second window between webhook firing and admin
 * panel reflecting the change, which is acceptable for our scale.
 */

import { getMockupSeed, getAllMockupsSeed, type Mockup } from "./mockups-data"
import { getStripe, isStripeConfigured } from "./stripe"
import type Stripe from "stripe"

// Re-export types and helpers from the data module so callers don't need
// to know about the split.
export type {
  Mockup,
  MockupStatus,
  MockupPage,
  Currency,
} from "./mockups-data"
export { formatPrice, generateToken } from "./mockups-data"
export { createMockup, replaceMockup, deleteMockup } from "./mockups-data"

interface CachedState {
  paid: boolean
  paidAt?: string
  stripePaymentIntentId?: string
  stripeSessionId?: string
  fetchedAt: number
}

const CACHE_TTL_MS = 30 * 1000
const stateCache = new Map<string, CachedState>()

/**
 * Look up payment state for a single token from Stripe.
 *
 * We paginate through recent Checkout Sessions and find one whose
 * metadata.mockupToken matches. We deliberately do NOT use Stripe's
 * `search` API here — it's only available on certain account types and its
 * TypeScript bindings vary across SDK versions. List-based lookup works on
 * every account.
 *
 * Returns undefined if Stripe is not configured (callers should fall back
 * to seed status).
 */
async function fetchStateFromStripe(
  token: string,
): Promise<CachedState | undefined> {
  if (!isStripeConfigured()) return undefined

  const stripe = getStripe()
  let starting_after: string | undefined

  // Cap at 5 pages (500 sessions). For our scale this is more than enough —
  // Stripe sessions are listed newest-first, so the relevant one is almost
  // always on page 1.
  for (let page = 0; page < 5; page++) {
    const list: Stripe.ApiList<Stripe.Checkout.Session> =
      await stripe.checkout.sessions.list({
        limit: 100,
        starting_after,
      })
    for (const session of list.data) {
      if (
        session.metadata?.mockupToken === token &&
        session.status === "complete"
      ) {
        const piId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id
        return {
          paid: true,
          paidAt: session.created
            ? new Date(session.created * 1000).toISOString()
            : new Date().toISOString(),
          stripePaymentIntentId: piId,
          stripeSessionId: session.id,
          fetchedAt: Date.now(),
        }
      }
    }
    if (!list.has_more) break
    starting_after = list.data[list.data.length - 1]?.id
  }
  return { paid: false, fetchedAt: Date.now() }
}

/**
 * Get a mockup with payment state resolved.
 *
 * Behaviour:
 *   - Returns seed status as-is for `expired` mockups (we don't need Stripe).
 *   - For `pending` and `paid` seed status, asks Stripe whether the mockup
 *     has actually been paid. If Stripe says yes, we override the seed
 *     status to "paid" with the real Stripe IDs.
 *   - If Stripe isn't configured, we just return the seed data unchanged.
 *     This is the right behaviour for local dev.
 */
export async function getMockup(token: string): Promise<Mockup | null> {
  const seed = await getMockupSeed(token)
  if (!seed) return null
  if (seed.status === "expired") return seed

  const state = await getCachedState(token)
  if (!state || !state.paid) {
    // Either Stripe isn't configured, or it's confirmed not paid → seed wins
    return seed
  }

  return {
    ...seed,
    status: "paid",
    paidAt: state.paidAt ?? seed.paidAt,
    stripePaymentIntentId:
      state.stripePaymentIntentId ?? seed.stripePaymentIntentId,
    stripeSessionId: state.stripeSessionId ?? seed.stripeSessionId,
  }
}

/**
 * Admin: get all mockups with payment state resolved.
 *
 * We fetch payment states for all non-expired tokens in parallel, but
 * batched at 5-at-a-time to avoid Stripe API rate limits.
 */
export async function getAllMockups(): Promise<Mockup[]> {
  const all = await getAllMockupsSeed()
  const tokensToCheck = all
    .filter((m) => m.status !== "expired")
    .map((m) => m.token)

  // Batch 5 at a time
  const batchSize = 5
  for (let i = 0; i < tokensToCheck.length; i += batchSize) {
    const batch = tokensToCheck.slice(i, i + batchSize)
    await Promise.all(batch.map((t) => getCachedState(t)))
  }

  return all.map((m) => {
    if (m.status === "expired") return m
    const state = stateCache.get(m.token)
    if (!state || !state.paid) return m
    return {
      ...m,
      status: "paid",
      paidAt: state.paidAt ?? m.paidAt,
      stripePaymentIntentId:
        state.stripePaymentIntentId ?? m.stripePaymentIntentId,
      stripeSessionId: state.stripeSessionId ?? m.stripeSessionId,
    }
  })
}

async function getCachedState(token: string): Promise<CachedState | undefined> {
  const cached = stateCache.get(token)
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached
  }
  const fresh = await fetchStateFromStripe(token)
  if (fresh) stateCache.set(token, fresh)
  return fresh
}

/**
 * Webhook handler calls this — it primes our in-memory cache so that the
 * customer's success page (the next request, ~3 seconds later) sees the
 * paid state without needing to wait for the Stripe lookup.
 *
 * Note: in serverless, this only primes the cache on THIS function
 * instance. Other instances will look up Stripe directly. That's fine — it
 * just means they take ~200ms longer the first time.
 */
export function markAsPaid(
  token: string,
  paymentIntentId: string,
  sessionId?: string,
): void {
  stateCache.set(token, {
    paid: true,
    paidAt: new Date().toISOString(),
    stripePaymentIntentId: paymentIntentId,
    stripeSessionId: sessionId,
    fetchedAt: Date.now(),
  })
}

/**
 * Generic update — used to record session IDs etc. Same caveat as
 * markAsPaid: only primes this instance's cache.
 */
export function updateMockup(token: string, patch: Partial<Mockup>): void {
  // We don't actually need to do anything here in the new design — Stripe
  // is the source of truth. This function exists for API compatibility
  // with the previous design and to record session IDs eagerly so admin
  // can show them.
  if (patch.stripeSessionId || patch.stripePaymentIntentId) {
    const existing = stateCache.get(token)
    stateCache.set(token, {
      paid: existing?.paid ?? false,
      paidAt: existing?.paidAt ?? patch.paidAt,
      stripePaymentIntentId:
        patch.stripePaymentIntentId ?? existing?.stripePaymentIntentId,
      stripeSessionId: patch.stripeSessionId ?? existing?.stripeSessionId,
      fetchedAt: Date.now(),
    })
  }
}
