import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { getMockup } from "@/lib/mockups"
import { CheckCircle, Mail, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Force dynamic rendering — admin and customer-private pages must
// always reflect the latest state, never a cached snapshot.
export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ token: string }>
  searchParams: Promise<{ session_id?: string }>
}

export const metadata: Metadata = {
  title: "Order Confirmed | Next Horizons",
  robots: { index: false, follow: false },
}

/**
 * Success page hit after Stripe Checkout redirects back.
 *
 * Note on race conditions: Stripe's webhook may not have fired yet by the
 * time the customer lands here, so the mockup status might still read
 * "pending" briefly. That's fine — we show the success message either way
 * because the customer is here as a result of `Checkout.session.completed`.
 * The webhook will catch up within seconds and persistent status will
 * update.
 */
export default async function MockupSuccessPage({ params }: PageProps) {
  const { token } = await params
  const mockup = await getMockup(token)

  if (!mockup) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-20">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-600/20">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Thank you,{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  {mockup.contactName ?? mockup.companyName}
                </span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Your payment has been received and your order for the{" "}
                <strong className="text-foreground">{mockup.companyName}</strong>{" "}
                website redesign is now in production.
              </p>
            </div>

            {/* Next steps panel */}
            <div className="mt-12 rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-foreground">What happens next</h2>

              <ol className="mt-6 space-y-6">
                <li className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500 text-sm font-bold text-white">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Confirmation email</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      You&apos;ll receive a confirmation email within minutes from{" "}
                      <a href="mailto:contact@nexthorizons.ae" className="text-blue-600 hover:underline">
                        contact@nexthorizons.ae
                      </a>
                      , including your invoice and a summary of what was ordered.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500 text-sm font-bold text-white">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">We start building</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      Our team begins implementing the full redesign across all pages of your site, using the mockup you approved as the foundation.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500 text-sm font-bold text-white">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Delivered in two business days</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      You&apos;ll receive a staging link to review the completed redesign within{" "}
                      <strong className="text-foreground">two business days</strong>. Once approved, we deploy to your domain or hand over the full code — whichever you prefer.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Support panel */}
            <div className="mt-8 rounded-xl border border-blue-600/20 bg-blue-600/5 p-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <p className="font-semibold text-foreground">Questions in the meantime?</p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Reply to your confirmation email or write to{" "}
                    <a href="mailto:contact@nexthorizons.ae" className="text-blue-600 hover:underline">
                      contact@nexthorizons.ae
                    </a>
                    . We typically respond within a few hours during UAE business hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Order placed: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </div>

              <Button asChild variant="outline" className="mt-4">
                <Link href={`/mockup/${token}`}>
                  View your mockup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
