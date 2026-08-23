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
  { icon: Lightbulb, title: "Purposeful Use of AI", description: "We use AI where it can genuinely produce a better or more efficient result. We do not add it simply so that we can call something an AI product." },
  { icon: ShieldCheck, title: "Integrity", description: "Particularly with compliance technology, it is important to be clear about what software can and cannot do. We would rather be straightforward about a limitation than promise functionality that does not work properly in practice." },
  { icon: Target, title: "Measurable Results", description: "We are interested in what the end result actually improves. For a website that can mean more enquiries, higher conversion or better performance. For compliance software it can mean less research time, faster reviews and greater consistency." },
  { icon: Users, title: "Long-Term Relationships", description: "We do not see delivery as the end of a project. Website clients receive post-launch support and we continue to work with software clients as their requirements and processes develop." },
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
                Next Horizons is an AI solutions company based in Dubai. We focus on two areas: AI-powered website redesign and intelligent due diligence software for compliance teams. Both services use AI to make work that previously required significantly more time and resources faster and more efficient.
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
                    Our aim is to make useful AI solutions available to businesses that can benefit from them without needing large internal technology teams or development budgets.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    The capabilities of AI have developed extremely quickly.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    We take those capabilities and apply them to specific business problems where we believe they can make a measurable difference.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm lg:p-12">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-slate-400/10 to-transparent blur-3xl" />
                <div className="relative">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Our Approach</h2>
                  <p className="mt-4 text-2xl font-semibold leading-relaxed text-foreground sm:text-3xl">
                    We combine AI and software development with practical knowledge of the markets we work in.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    That matters particularly in compliance, where building technically impressive software is not enough. The system also needs to make sense to the professionals using it and fit within the governance and regulatory requirements of the organisation.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    The same applies to websites.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    AI allows us to design, test and develop considerably faster, but the final website still needs to convince a real visitor and generate business.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    That is the standard we work towards.
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
              <p className="mt-4 text-lg text-muted-foreground">We deliberately focus on two areas and have built a separate proposition around each.</p>
            </div>
            <div className="mt-16 grid gap-10 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-500">
                  <span className="text-lg font-bold text-white">01</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">AI-Powered Website Redesign</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  We redesign existing business websites using modern AI-assisted design and development tools.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  This allows us to produce high-quality design and development faster and more efficiently than a traditional redesign process.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  The result is a modern website that is technically strong, designed to convert and normally delivered within four to eight weeks.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Our main market is the UAE, although we also work with companies internationally.
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
                  We develop standalone AI-assisted due diligence software for financial institutions and other regulated businesses.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  The software can perform OSINT research, sanctions and PEP screening, analyse due diligence information and prepare structured CDD reports.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  It is designed to take time-consuming work away from compliance professionals while keeping the actual judgement and decision with them.
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
                  Next Horizons FZCO is incorporated in Dubai and based in Dubai Silicon Oasis.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our main focus is the UAE, where we work across technology, financial services and professional services.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our services can also be delivered internationally. Website development is largely location-independent, while our compliance software can be configured around different regulatory environments.
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
                  { label: "Incorporated", value: "Dubai, United Arab Emirates" },
                  { label: "Licensing Authority", value: "International Free Zone Authority (IFZA)" },
                  { label: "Markets Served", value: "UAE and international markets" },
                  { label: "Project Languages", value: "English, with multilingual websites and screening available where agreed" },
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
              <p className="mt-4 text-lg text-white/80">Tell us what you are working on. We are happy to discuss whether one of our services is suitable and what the next step would look like. There is no obligation.</p>
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
