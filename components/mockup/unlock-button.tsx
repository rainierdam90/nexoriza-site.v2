"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Lock, Loader2, AlertCircle } from "lucide-react"

interface UnlockButtonProps {
  token: string
  priceLabel: string
  className?: string
}

/**
 * Unlock button — calls our API route which creates a Stripe Checkout
 * Session and redirects the customer to Stripe's hosted page.
 *
 * Failure handling: if Stripe isn't configured (no STRIPE_SECRET_KEY in
 * env), the API returns a clear error. We surface that to the user with a
 * helpful message rather than a generic "something went wrong" toast.
 */
export function UnlockButton({ token, priceLabel, className }: UnlockButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? "Checkout failed")
      }

      if (!data.url) {
        throw new Error("Checkout response missing redirect URL")
      }

      // Redirect to Stripe-hosted Checkout
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <Button
        onClick={handleClick}
        disabled={loading}
        size="lg"
        className="w-full bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Redirecting to secure checkout…
          </>
        ) : (
          <>
            <Lock className="mr-2 h-5 w-5" />
            Unlock & Order — {priceLabel}
          </>
        )}
      </Button>

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-medium">Payment is temporarily unavailable</p>
            <p className="mt-0.5 text-xs">
              {error}. Please email <a href="mailto:contact@nexthorizons.ae" className="underline">contact@nexthorizons.ae</a> and we&apos;ll send you a payment link manually.
            </p>
          </div>
        </div>
      )}

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Secure payment via Stripe · Cards, Apple&nbsp;Pay, Google&nbsp;Pay
      </p>
    </div>
  )
}
