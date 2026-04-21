import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Shield, Search, FileCheck, Bell, CheckCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Due Diligence Software | Next Horizons",
  description:
    "Next Horizons is developing AI-supported due diligence software to structure screening, information gathering and reporting more efficiently.",
}

const steps = [
  {
    icon: Search,
    title: "Collect and screen information",
    description: "The workflow starts with the entity and jurisdiction details. Screening and background checks are gathered into one review environment.",
  },
  {
    icon: FileCheck,
    title: "Structure the review",
    description: "Findings are organised into sections for ownership, risk indicators, media findings and analyst notes so the review is easier to follow.",
  },
  {
    icon: Bell,
    title: "Support ongoing monitoring",
    description: "The same setup can be used to monitor reviewed entities and flag changes that may require further attention.",
  },
]

const bullets = [
  "Clear case overview for internal review",
  "Structured analyst notes and reporting output",
  "Designed for regulated and risk-aware environments",
  "Practical interface concept with audit trail in mind",
]

export default function DueDiligencePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-slate-700 animate-pulse" />
                <span className="text-muted-foreground">Due diligence software</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                AI-supported due diligence, organised in a more usable workflow
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                This concept is aimed at organisations that need faster information gathering and more structured review output without losing control over the process.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="group bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
                  <Link href="/contact">
                    Request a demo discussion
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <Link href="/contact">Discuss your workflow</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/50 bg-foreground/[0.01] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3 text-center">
              {[
                { value: "Structured", label: "One workspace for screening, notes and reporting" },
                { value: "Practical", label: "Designed around review logic rather than abstract AI claims" },
                { value: "Flexible", label: "Suitable for different levels of risk review maturity" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/50 bg-background/70 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">{item.value}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Mockup</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Illustrative platform view</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Below is an indicative dashboard mockup for an AI-supported due diligence workflow, with Next Horizons included in the interface concept.
              </p>
            </div>
            <div className="mt-16 overflow-hidden rounded-3xl border border-border/50 bg-background/80 shadow-sm">
              <Image src="/due-diligence-dashboard.svg" alt="Next Horizons due diligence dashboard mockup" width={1500} height={980} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">Workflow</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Designed around review and escalation</h2>
                <div className="mt-8 space-y-5">
                  {steps.map((step) => (
                    <div key={step.title} className="rounded-2xl border border-border/50 bg-background/70 p-6 backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700/10 to-slate-400/20">
                          <step.icon className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border/50 bg-background/70 p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-slate-500">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-700">Potential platform benefits</p>
                    <h3 className="text-2xl font-semibold text-foreground">A clearer operating model for due diligence work</h3>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  {bullets.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 shrink-0 text-blue-700" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                  The software proposition can be discussed as a standalone concept or in combination with a wider digital workflow review.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
