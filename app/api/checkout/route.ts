import { NextRequest, NextResponse } from "next/server"
import { getMockup, updateMockup } from "@/lib/mockups"
import { getStripe, isStripeConfigured } from "@/lib/stripe"

/**
 * POST /api/checkout
 * Body: { token: string }
 *
 * Creates a Stripe Checkout Session for the requested mockup and returns
 * the redirect URL. The browser then sets `window.location` to that URL.
 *
 * We don't mark the mockup as paid here — that happens in the webhook
 * handler at /api/webhooks/stripe, which is the only source of truth for
 * payment state. Customers landing back on the success page see an
 * optimistic "thank you" regardless, but the database state only flips
 * after the webhook fires.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const token = typeof body?.token === "string" ? body.token : ""

    if (!token) {
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 400 },
      )
    }

    const mockup = await getMockup(token)
    if (!mockup) {
      return NextResponse.json({ error: "Mockup not found" }, { status: 404 })
    }

    if (mockup.status === "paid") {
      return NextResponse.json(
        { error: "This mockup has already been paid for" },
        { status: 409 },
      )
    }

    if (mockup.status === "expired") {
      return NextResponse.json(
        { error: "This mockup link has expired" },
        { status: 410 },
      )
    }

    if (!isStripeConfigured()) {
      // Friendly message — surfaces in the unlock button's error UI.
      return NextResponse.json(
        {
          error:
            "Online payment is not yet configured. Please email contact@nexthorizons.ae for a manual invoice.",
        },
        { status: 503 },
      )
    }

    const stripe = getStripe()

    // Build the Checkout Session.
    // Note on currency: Stripe expects lowercase ISO 4217.
    const origin =
      req.headers.get("origin") ??
      `https://${req.headers.get("host") ?? "nexthorizons.ae"}`

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: mockup.currency.toLowerCase(),
            unit_amount: mockup.priceMinor,
            product_data: {
              name: `Website Redesign — ${mockup.companyName}`,
              description:
                "Full website redesign delivered within 2 business days, with mobile-first layouts, AI-assisted copy, and three months of post-launch support.",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/mockup/${encodeURIComponent(token)}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/mockup/${encodeURIComponent(token)}`,
      // We pass the token in metadata so the webhook can find which mockup
      // to mark paid without needing a database lookup keyed by session ID.
      metadata: { mockupToken: token },
      payment_intent_data: {
        metadata: { mockupToken: token },
        description: `Next Horizons website redesign — ${mockup.companyName}`,
      },
      // Pre-fill customer email if we have one (we don't yet — customer
      // types it on the Checkout page). Leaving the field unfilled is fine.
      billing_address_collection: "auto",
      // Allow promotional codes (you can enable/disable this in Dashboard).
      allow_promotion_codes: false,
    })

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL")
    }

    // Record the session ID against the mockup so the admin panel can show it.
    updateMockup(token, { stripeSessionId: session.id })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("[checkout] Failed to create session:", err)
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json(
      { error: `Could not start checkout: ${message}` },
      { status: 500 },
    )
  }
}
