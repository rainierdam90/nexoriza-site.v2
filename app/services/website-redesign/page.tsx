import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Search,
  Sparkles,
  Code2,
  Rocket,
  Palette,
  Smartphone,
  BarChart3,
  FileText,
  Gauge,
  Database,
  Headphones,
  CheckCircle,
  TrendingUp,
  Clock,
  Tag,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Powered Website Redesign | Next Horizons",
  description: "Transform your digital presence with AI-driven design. Request a free mockup and receive a clear fixed price — guaranteed the most competitive in the market.",
}

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery & Audit",
    description: "We analyse your existing website — its structure, performance, content, and conversion flow. Combined with a look at your market and competitors, this forms the foundation for a genuinely better design.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Free Design Concept + Fixed Price",
    description: "We create a free, tailored design concept for your website — no generic templates. Alongside it, you receive a clear, fixed price with no hidden costs. You decide whether to proceed. There is no obligation whatsoever.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Full Development",
    description: "Once approved, we build your site on a modern stack — Next.js, clean code, fast loading times, mobile-first, and SEO-ready. We keep you informed at every stage.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch — Your Choice",
    description: "When the site is ready, you have two options: we handle the full deployment on your server or hosting, or we hand over the complete code so you can implement it yourself. Either way, we provide three months of post-launch support.",
  },
]

const features = [
  { icon: Palette, title: "Full Brand Redesign", description: "Every element aligned with your brand identity and target audience" },
  { icon: Smartphone, title: "Mobile-First Design", description: "Built for the devices your visitors actually use" },
  { icon: BarChart3, title: "Conversion Optimisation", description: "Structured to guide visitors towards the actions that matter" },
  { icon: FileText, title: "AI Copy Assistance", description: "Clear, persuasive copy — written and refined with AI support" },
  { icon: Gauge, title: "High Performance", description: "Optimised load times and clean code that search engines reward" },
  { icon: Database, title: "CMS Integration", description: "Update your own content without technical knowledge" },
  { icon: Headphones, title: "3 Months Support", description: "Post-launch assistance included as standard" },
]

const stats = [
  { value: "3×", label: "Average conversion improvement", sub: "across redesign projects" },
  { value: "48h", label: "To your first design concept", sub: "from submitted request" },
  { value: "100%", label: "Fixed-price projects", sub: "no unexpected invoices" },
]

const faqs = [
  {
    q: "How long does a full redesign take?",
    a: "Most projects are completed within four to eight weeks, depending on scope. You receive the first design concept within 48 hours of submitting your request.",
  },
  {
    q: "Do I need to provide content and copy?",
    a: "No. We use AI-assisted copywriting to draft all page copy based on your brand, industry, and objectives. You review and approve before anything goes live.",
  },
  {
    q: "Can I implement the finished website myself?",
    a: "Yes. You can choose to receive the complete, production-ready code and deploy it on your own server or hosting. We also offer full deployment as an included option — at no extra cost.",
  },
  {
    q: "What technologies do you build on?",
    a: "We typically build on Next.js with Tailwind CSS. For content management, we recommend Sanity or similar headless CMS solutions. Hosting is on Vercel or your preferred provider.",
  },
  {
    q: "Is there really no cost for the initial mockup?",
    a: "Correct. The design concept and fixed-price quote are entirely free. There is no obligation to proceed, and no invoice if you choose not to.",
  },
]

export default function WebsiteRedesignPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden pt-16">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-muted-foreground">AI-Powered Website Redesign</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                A Website That{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  Works as Hard as You Do
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                We redesign business websites using the most advanced AI tools available — delivering a sharper design, faster performance, and measurably better results. See your new website before you spend a single dirham.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="group bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600 shadow-lg shadow-blue-700/20">
                  <Link href="/request-mockup">
                    Request a Free Redesign Mockup
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <Link href="/contact">Discuss Your Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative border-y border-border/50 bg-foreground/[0.01] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent sm:text-5xl">{stat.value}</div>
                  <p className="mt-1 font-medium text-foreground text-sm">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guaranteed Cheapest */}
        <section className="relative py-12 bg-gradient-to-r from-blue-700/5 to-slate-500/5 border-b border-border/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left sm:gap-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-slate-500">
                <Tag className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Guaranteed Most Competitive Pricing</h2>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  We offer the most competitive pricing for professional, AI-driven website redesign in the market. Every project comes with a clear, fixed price — no hourly surprises. Found a comparable service for less? We will match it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">The Challenge</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  An Outdated Website Costs You Business — Every Day
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>Your website is often the first impression a potential client has of your business. If it is slow, unclear, or visually dated, most visitors will leave within seconds — before they have even read a line of copy.</p>
                  <p>This is not about aesthetics. It is about lost business. A modern, well-structured website turns visitors into enquiries. An outdated one filters them out.</p>
                  <p className="font-medium text-foreground">We fix that — at a fixed price, with a free concept upfront so you can see exactly what you are getting before you commit.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, label: "53% of visitors leave a site that takes more than 3 seconds to load" },
                  { icon: Clock, label: "You have approximately 3 seconds to make a first impression" },
                  { icon: BarChart3, label: "A 1-second improvement in load time can lift conversions by 7%" },
                  { icon: Smartphone, label: "61% of users will not return to a mobile site that gave them difficulty" },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-border/50 bg-background/50 p-5">
                    <item.icon className="h-6 w-6 text-blue-600" />
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Our Process</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">From Request to Live in Four Stages</h2>
              <p className="mt-4 text-lg text-muted-foreground">A clear, transparent process — so you always know where things stand.</p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="group relative">
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-blue-600/20 to-slate-400/20 lg:block" />
                  )}
                  <div className="relative rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-blue-600/5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-slate-500">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{step.step}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Mockups */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Design Quality</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">The Standard We Design To</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clean, purposeful, and built to convert — representative examples of the approach we apply to every project.
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {[
                { src: "/mockup-1.png", alt: "Modern SaaS dashboard website design", label: "SaaS / Technology platform" },
                { src: "/mockup-2.png", alt: "Premium agency website design", label: "Agency / Creative studio" },
                { src: "/mockup-3.png", alt: "Professional services website design", label: "Professional services / Consultancy" },
                { src: "/mockup-4.png", alt: "Enterprise AI solutions website design", label: "Enterprise / AI solutions" },
              ].map((mockup, i) => (
                <div key={i} className="group overflow-hidden rounded-2xl border border-border/50 shadow-xl shadow-blue-600/5 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/10">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={mockup.src}
                      alt={mockup.alt}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="border-t border-border/50 bg-foreground/[0.02] px-5 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{mockup.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="group bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
                <Link href="/request-mockup">
                  Request a Free Redesign Mockup
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Everything Included</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">No Hidden Extras</h2>
              <p className="mt-4 text-lg text-muted-foreground">Every project includes everything needed to launch — from design to deployment.</p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4 rounded-xl border border-border/50 bg-background/50 p-5 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg hover:shadow-blue-600/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/10 to-slate-400/10">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">FAQ</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Common Questions</h2>
            </div>
            <div className="mt-12 space-y-5">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border/50 bg-background/50 p-6">
                  <h3 className="flex items-start gap-3 font-semibold text-foreground">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    {faq.q}
                  </h3>
                  <p className="mt-3 pl-8 text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-slate-600" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">See Your New Website — Free, No Commitment</h2>
              <p className="mt-4 text-lg text-white/80">Submit your website and receive a tailored design concept with a fixed price within 48 hours. You decide what happens next.</p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="group bg-white text-blue-700 hover:bg-white/90">
                  <Link href="/request-mockup">
                    Request a Free Redesign Mockup
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                  <Link href="/contact">Discuss Your Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
