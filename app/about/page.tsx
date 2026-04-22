import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Lightbulb, ShieldCheck, Target, Users } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Next Horizons",
  description: "Next Horizons is an AI solutions company based in Dubai, specialising in website redesign and intelligent due diligence software for financial institutions.",
}

const values = [
  { icon: Lightbulb, title: "Purposeful Use of AI", description: "We apply AI where it genuinely improves on what was possible before — not because it is expected. Every model and tool we use has a clear reason for being in the workflow." },
  { icon: ShieldCheck, title: "Integrity in Everything", description: "In compliance and in client relationships, trust is earned through consistency. We are straightforward about what our tools can and cannot do." },
  { icon: Target, title: "Measured Results", description: "We define success by the outcomes we deliver — conversion rates, review turnaround times, regulatory findings — not by outputs or hours." },
  { icon: Users, title: "Long-Term Partnerships", description: "We do not consider an engagement complete at the point of delivery. We remain involved, attentive, and invested in the results our clients see." },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden pt-20">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-700 to-slate-400" />
                <span className="text-muted-foreground">About</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                About{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  Next Horizons
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                We are an AI solutions company based in Dubai, focused on two areas: transforming digital presence through AI-assisted website redesign, and automating compliance workflows through intelligent due diligence software.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm lg:p-12">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-600/10 to-transparent blur-3xl" />
                <div className="relative">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600">Our Mission</h2>
                  <p className="mt-4 text-2xl font-semibold leading-relaxed text-foreground sm:text-3xl">
                    To make well-designed AI solutions accessible to organisations that would benefit from them most.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    The most capable AI tools have historically required significant internal resources to deploy effectively. We bring those capabilities to organisations of varying sizes — applying them thoughtfully to problems where they create meaningful, measurable value.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm lg:p-12">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-slate-400/10 to-transparent blur-3xl" />
                <div className="relative">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Our Approach</h2>
                  <p className="mt-4 text-2xl font-semibold leading-relaxed text-foreground sm:text-3xl">
                    Sector knowledge, applied AI, and a focus on what holds up in daily professional use.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Our work combines technical expertise in AI with practical experience in the industries we serve. We build tools that work in regulated environments and design experiences that convert — not demos that look good but underperform in practice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Our Focus</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Two Services, Clearly Distinct</h2>
              <p className="mt-4 text-lg text-muted-foreground">We maintain a deliberate focus on two areas — and we work to be genuinely good at both.</p>
            </div>
            <div className="mt-16 grid gap-10 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-500">
                  <span className="text-lg font-bold text-white">01</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">AI-Powered Website Redesign</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  We redesign business websites using AI-assisted design tools and modern development practices. The result is a site that is visually current, technically sound, and structured to convert — delivered in four to eight weeks.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Our primary focus is the UAE, with clients ranging from professional services firms to technology companies and financial institutions. We also serve selected clients in other countries worldwide.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-6 border-border/50">
                  <Link href="/services/website-redesign">Website Redesign <ArrowRight className="ml-2 h-3 w-3" /></Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-blue-600">
                  <span className="text-lg font-bold text-white">02</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">Intelligent Due Diligence Software</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Our AI platform automates customer due diligence for financial institutions — conducting OSINT research, screening against global sanctions lists, and generating structured CDD reports aligned with FATF and EU AML standards.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Clients include banks, asset managers, compliance consultancies, and fintech companies operating in regulated markets.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-6 border-border/50">
                  <Link href="/services/due-diligence">Due Diligence Software <ArrowRight className="ml-2 h-3 w-3" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">How We Work</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Principles</h2>
              <p className="mt-4 text-lg text-muted-foreground">The standards we hold ourselves to in every client engagement.</p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg hover:shadow-blue-600/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-slate-500">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Where We Are</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Based in Dubai, Serving Clients Globally</h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Next Horizons is incorporated and based in Dubai Silicon Oasis — a regulated free zone and hub for technology companies, ideally positioned to serve the UAE and the wider world.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our primary focus is the UAE, where we serve financial institutions, technology companies, and professional services firms operating in one of the world&apos;s most dynamic markets. We also work with selected clients in other countries worldwide — our compliance platform is built to meet the regulatory requirements of multiple jurisdictions, and our design work is delivered remotely with no loss of quality.
                </p>
                <div className="mt-8 rounded-xl border border-border/50 bg-foreground/[0.02] p-5">
                  <p className="text-sm font-semibold text-foreground">Next Horizons FZCO</p>
                  <p className="mt-1 text-sm text-muted-foreground">IFZA Business Park 44824</p>
                  <p className="text-sm text-muted-foreground">Dubai Silicon Oasis</p>
                  <p className="text-sm text-muted-foreground">Dubai, UAE</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Incorporated", value: "Dubai Silicon Oasis" },
                  { label: "Regulatory Framework", value: "IFZA Free Zone" },
                  { label: "Clients Based In", value: "UAE (primary) & worldwide" },
                  { label: "Languages Supported", value: "English, Arabic" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-border/50 bg-background/50 p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    <p className="mt-2 font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-slate-600" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Interested in Working Together?</h2>
              <p className="mt-4 text-lg text-white/80">We are happy to discuss your situation and whether our services are a good fit — without any obligation.</p>
              <Button asChild size="lg" className="group mt-8 bg-white text-blue-700 hover:bg-white/90">
                <Link href="/contact">Get in Touch <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
