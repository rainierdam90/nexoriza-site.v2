import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, Sparkles, Code2, Rocket, Smartphone, Gauge, BarChart3, CheckCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website Redesign | Next Horizons",
  description:
    "Next Horizons redesigns websites for businesses that need a more modern presentation, better structure and a stronger conversion path.",
}

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Review and positioning",
    description:
      "We start by reviewing the current website, the target audience and the commercial objective. This helps us simplify the message before we redesign the interface.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Design direction",
    description:
      "We prepare a visual direction that feels more current, more coherent and more suitable for the market you want to speak to.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Build and refine",
    description:
      "Once approved, the site is built on a modern stack with attention to speed, structure and responsive behaviour.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch with care",
    description:
      "We support deployment, final adjustments and practical handover so the site is ready for real use, not just a design presentation.",
  },
]

const features = [
  { icon: Smartphone, title: "Responsive by default", description: "Designed to work cleanly across desktop, tablet and mobile." },
  { icon: Gauge, title: "Faster user experience", description: "A current build stack and lighter pages help reduce friction." },
  { icon: BarChart3, title: "Clearer conversion flow", description: "Calls to action and page structure are arranged to support enquiries." },
]

const mockups = [
  "/redesign-mockup-1.svg",
  "/redesign-mockup-2.svg",
  "/redesign-mockup-3.svg",
  "/redesign-mockup-4.svg",
]

export default function WebsiteRedesignPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-blue-700" />
                <span className="text-muted-foreground">Website redesign</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                A more credible website can improve how the business is understood
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                We redesign websites for companies that have outgrown an older presentation and need a calmer, more modern and more commercially effective digital presence.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="group bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
                  <Link href="/contact">
                    Discuss a redesign
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <Link href="/contact">Request a call back</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/50 bg-foreground/[0.01] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3 text-center">
              {[
                { value: "Clearer", label: "Positioning and page hierarchy" },
                { value: "Faster", label: "Modern build and lighter pages" },
                { value: "Stronger", label: "More direct path to enquiry" },
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
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Process</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">A practical redesign process</h2>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
              {steps.map((step) => (
                <div key={step.step} className="rounded-2xl border border-border/50 bg-background/60 p-6 backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700/10 to-slate-400/20">
                    <step.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-blue-700">{step.step}</p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">Mockups</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Example visual directions</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A few examples of the kind of cleaner, more current design language we can develop for service-led and regulated businesses.
              </p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {mockups.map((src, index) => (
                <div key={src} className="overflow-hidden rounded-2xl border border-border/50 bg-background/80 shadow-sm">
                  <Image src={src} alt={`Website redesign mockup ${index + 1}`} width={1400} height={900} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-border/50 bg-background/60 p-6 backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700/10 to-slate-400/20">
                    <feature.icon className="h-5 w-5 text-blue-700" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-border/50 bg-background/60 p-6 backdrop-blur-sm">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Current visual language and stronger hierarchy",
                  "Sharper messaging for the target audience",
                  "Improved structure for service pages and lead capture",
                  "A modern base that can be extended over time",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 shrink-0 text-blue-700" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
