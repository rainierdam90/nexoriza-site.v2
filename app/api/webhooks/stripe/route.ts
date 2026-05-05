import { NextRequest, NextResponse } from "next/server"
import { markAsPaid } from "@/lib/mockups"
import { getStripe } from "@/lib/stripe"
import type Stripe from "stripe"

/**
 * Stripe Webhook Handler
 * ----------------------
 *
 * Stripe sends server-to-server events here when payment state changes.
 * This is the only trusted source of "paid" status — never trust the
 * customer's redirect back to the success page, since they could close
 * their browser before redirecting, or could navigate to /success
 * directly without paying.
 *
 * Configure this URL in your Stripe Dashboard:
 *   https://nexthorizons.ae/api/webhooks/stripe
 *
 * Then copy the signing secret into STRIPE_WEBHOOK_SECRET. See
 * CHECKOUT_SETUP.md for full setup instructions.
 *
 * Event we care about:
 *   - checkout.session.completed: customer finished checkout, payment is
 *     either captured (one-shot card) or pending capture. For our flow,
 *     we treat session.completed as paid.
 *
 * Idempotency: Stripe may retry webhooks. `markAsPaid` is idempotent
 * (writes the same fields each call), so this is safe.
 */

// Important: we need the *raw* request body to verify the Stripe signature.
// In Next.js App Router, calling `req.text()` gives us the raw body as
// long as we haven't consumed it elsewhere first.
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature")
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error(
      "[stripe-webhook] STRIPE_WEBHOOK_SECRET not set — refusing to process",
    )
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 503 },
    )
  }

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    )
  }

  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("[stripe-webhook] Signature verification failed:", message)
    // 400 tells Stripe not to retry — this is a permanent error.
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    )
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const token = session.metadata?.mockupToken

        if (!token) {
          console.error(
            "[stripe-webhook] checkout.session.completed missing mockupToken in metadata",
            { sessionId: session.id },
          )
          break
        }

        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? "unknown"

        markAsPaid(token, paymentIntentId, session.id)

        console.log(
          `[stripe-webhook] Marked mockup '${token}' as paid (PI: ${paymentIntentId})`,
        )

        // TODO: send confirmation email here. For now, the customer gets
        // Stripe's auto-receipt and we'll need to add Resend follow-up.
        break
      }

      // Listen for refunds too, so admin sees correct state if you refund.
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge
        const token = charge.metadata?.mockupToken
        if (token) {
          console.log(
            `[stripe-webhook] Charge refunded for mockup '${token}' (charge: ${charge.id})`,
          )
          // We don't auto-revert the status — you decide manually whether to
          // mark expired or leave paid. Logged for the admin to see.
        }
        break
      }

      default:
        // We acknowledge unknown events with 200 so Stripe doesn't retry.
        // The event log in Stripe Dashboard shows what was received.
        break
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error(
      `[stripe-webhook] Error processing event ${event.type}:`,
      err,
    )
    // 500 tells Stripe to retry — appropriate for transient errors like
    // a temporary file-write failure.
    return NextResponse.json(
      { error: "Internal error processing webhook" },
      { status: 500 },
    )
  }
}
