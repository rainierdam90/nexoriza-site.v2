/**
 * Stripe SDK wrapper.
 *
 * We export a function that lazily initialises Stripe only when needed,
 * and which throws a clear, actionable error if STRIPE_SECRET_KEY is unset
 * (rather than crashing with an opaque "Cannot read properties of undefined").
 *
 * The currency mapping for Checkout: Stripe accepts ISO 4217 lowercase
 * currency codes. We pass through whatever currency the mockup is priced
 * in.
 */

import Stripe from "stripe"

// Stripe pins API versions; using the latest at the time of writing.
const STRIPE_API_VERSION = "2024-12-18.acacia" as const

let cachedClient: Stripe | null = null

export function getStripe(): Stripe {
  if (cachedClient) return cachedClient

  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local (or your hosting " +
      "provider's environment variables) before using payment features. " +
      "See CHECKOUT_SETUP.md for the full Stripe setup guide.",
    )
  }

  cachedClient = new Stripe(key, {
    // Cast required because TS can't verify the literal version string against
    // the Stripe SDK's bundled type. This is fine — Stripe will warn at
    // runtime if the version is unrecognised.
    apiVersion: STRIPE_API_VERSION as Stripe.LatestApiVersion,
    typescript: true,
  })
  return cachedClient
}

/** Quick, side-effect-free check used by API routes to fail fast */
export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY
}
