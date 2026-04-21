import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Lightbulb, ShieldCheck, Target } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Next Horizons",
  description:
    "Next Horizons is based in Dubai and focuses on modern website redesign and practical due diligence software for regulated and service-led businesses.",
}

const principles = [
  {
    icon: Lightbulb,
    title: "Use technology with restraint",
    description:
      "We prefer technology that improves the outcome in a visible way. That means clearer design, quicker delivery and more structured information handling.",
  },
  {
    icon: ShieldCheck,
    title: "Keep trust at the centre",
    description:
      "For both websites and compliance tools, trust matters. We therefore favour clarity, evidence and usability over exaggerated claims.",
  },
  {
    icon: Target,
    title: "Build around the business case",
    description:
      "Our work is intended to support commercial goals and operational discipline. The result should be practical to use, not just good to present.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-700 to-slate-400" />
                <span className="text-muted-foreground">About Next Horizons</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                A focused company working at the intersection of design, AI and business process
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Next Horizons develops modern websites and due diligence software for businesses that want better presentation, clearer workflows and more efficient execution.
              </p>
            </div>
          </div>
        </section>

        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-background/60 p-8 backdrop-blur-sm lg:p-12">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-700">What we do</h2>
                <p className="mt-4 text-2xl font-semibold leading-relaxed text-foreground sm:text-3xl">
                  We help organisations improve how they are seen online and how they handle information internally.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  On one side, we redesign websites so they communicate more clearly and generate better quality enquiries. On the other, we build software concepts for due diligence work where speed, structure and traceability are important.
                </p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-background/60 p-8 backdrop-blur-sm lg:p-12">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-600">Company details</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Entity:</span> Next Horizons FZCO
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Address:</span> IFZA Business Park, 44824, Dubai Silicon Oasis, Dubai
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Contact:</span> contact@nexoriza.com
                  </p>
                  <p>
                    We serve clients internationally, with a particular interest in businesses that value credibility, efficiency and a measured approach to digital transformation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">How we work</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Three principles behind the work</h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {principles.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/50 bg-background/60 p-6 backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700/10 to-slate-400/20">
                    <item.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Would you like to discuss a project?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We are happy to review your current website or discuss how an AI-supported due diligence workflow could fit your organisation.
            </p>
            <Button asChild size="lg" className="mt-8 bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
              <Link href="/contact">
                Contact us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
