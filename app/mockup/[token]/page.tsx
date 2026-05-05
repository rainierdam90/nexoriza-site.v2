import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { BeforeAfterSlider } from "@/components/mockup/before-after-slider"
import { UnlockButton } from "@/components/mockup/unlock-button"
import { getMockup, formatPrice } from "@/lib/mockups"
import { getMockupSeed } from "@/lib/mockups-data"
import { CheckCircle, Clock, ExternalLink, Sparkles, ShieldCheck } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ token: string }>
}

/**
 * Don't index private mockup pages — these URLs should never end up in
 * Google. The token in the path is the only "credential", so we treat it
 * like a magic link.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params
  // Use seed-only lookup here — we don't need payment state for the title,
  // and avoiding the Stripe call keeps page rendering fast.
  const mockup = await getMockupSeed(token)
  return {
    title: mockup
      ? `${mockup.companyName} — Website Redesign Mockup | Next Horizons`
      : "Mockup Not Found | Next Horizons",
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  }
}

export default async function MockupPage({ params }: PageProps) {
  const { token } = await params
  const mockup = await getMockup(token)

  // Token doesn't exist → 404 (not "expired" — we don't want to confirm
  // whether a token ever existed)
  if (!mockup) notFound()

  // Expired link — show friendly message
  if (mockup.status === "expired") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-32">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h1 className="text-3xl font-bold">This mockup link has expired</h1>
            <p className="mt-4 text-muted-foreground">
              If you&apos;d like to reactivate it, please email{" "}
              <a href="mailto:contact@nexthorizons.ae" className="text-blue-600 underline">
                contact@nexthorizons.ae
              </a>
              .
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isPaid = mockup.status === "paid"
  const priceLabel = formatPrice(mockup.priceMinor, mockup.currency)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero / welcome */}
        <section className="relative overflow-hidden pt-20">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-muted-foreground">Private Mockup · {mockup.companyName}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {mockup.contactName ? `Hi ${mockup.contactName}, ` : ""}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  here&apos;s your redesign
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Drag the slider on each preview to compare your current site with the redesign we&apos;ve put together for {mockup.companyName}.
              </p>
              {mockup.currentWebsite && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Current site:{" "}
                  <a
                    href={mockup.currentWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    {mockup.currentWebsite.replace(/^https?:\/\//, "")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Already-paid banner */}
        {isPaid && (
          <section className="relative">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-green-900">
                      Payment received — your redesign is in production
                    </h2>
                    <p className="mt-1 text-sm text-green-800 leading-relaxed">
                      Thank you. We&apos;ll deliver your full website redesign within{" "}
                      <strong>two business days</strong>. You&apos;ll receive an email at the
                      address you used at checkout with the staging link and access details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Mockup pages */}
        <section className="relative py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {mockup.pages.map((page, idx) => (
                <div key={idx}>
                  <div className="mb-6 flex items-baseline justify-between">
                    <h2 className="text-2xl font-semibold text-foreground">
                      {page.label}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      Page {idx + 1} of {mockup.pages.length}
                    </span>
                  </div>

                  <BeforeAfterSlider
                    beforeImage={page.beforeImage}
                    afterImage={page.afterImage}
                    beforeLabel="Current"
                    afterLabel="Redesign"
                  />

                  {page.notes && (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                      {page.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unlock / order section */}
        {!isPaid && (
          <section className="relative pb-24 pt-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm sm:p-12">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-blue-600/15 to-slate-400/10 blur-3xl" />
                <div className="absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-600/10 to-slate-400/10 blur-3xl" />

                <div className="relative grid gap-12 lg:grid-cols-5">
                  <div className="lg:col-span-3">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                      Like what you see?
                    </h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Order now and receive your full website redesign within{" "}
                      <strong className="text-foreground">two business days</strong>.
                      Everything below is included — no surprises, no upsells, no hidden fees.
                    </p>

                    <ul className="mt-6 space-y-3">
                      {mockup.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                      <div className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        Delivered in 2 business days
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Secure payment via Stripe
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="rounded-xl border border-border/50 bg-foreground/[0.02] p-6">
                      <p className="text-sm text-muted-foreground">Total price</p>
                      <p className="mt-1 text-4xl font-bold bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                        {priceLabel}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Fixed price — no additional charges
                      </p>

                      <div className="mt-6">
                        <UnlockButton token={mockup.token} priceLabel={priceLabel} />
                      </div>

                      <p className="mt-4 text-center text-xs text-muted-foreground">
                        By ordering, you agree to our{" "}
                        <a href="/terms" className="underline hover:text-foreground">
                          Terms of Service
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
