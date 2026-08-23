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
  Tag,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Powered Website Redesign | Next Horizons",
  description: "We redesign existing business websites with AI-powered design and development. Request a free redesign mockup and receive a clear, fixed price within 48 hours — no obligation.",
}

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery & Audit",
    description: "We start with your existing website. We look at the design, structure, content, loading speed and how visitors currently move through the site. We also review your market and competitors to understand where your website can be improved. That gives us the basis for the new design.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Free Design Concept + Fixed Price",
    description: "We then create an initial homepage design concept specifically for your website. This is not a generic template. It is based on your company, your existing brand and what the website needs to achieve. Together with the concept, you receive a fixed price for the full redesign. You can then decide whether you want us to continue. There is no obligation and nothing to pay if you decide not to.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Full Development",
    description: "Once you approve the direction, we build the complete website. We use a modern development stack, including Next.js, with clean code, fast loading times, mobile-first development and the technical foundations needed for SEO. We keep you involved during development so you can review the progress before the website goes live.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch, Your Choice",
    description: "Once the website is finished, you decide how you want to proceed. We can deploy the complete website to your hosting or server for you. Prefer to handle this yourself or through your existing developer? We can also hand over the complete production-ready code. Whichever option you choose, three months of post-launch support are included.",
  },
]

const features = [
  { icon: Palette, title: "Website Visual Redesign", description: "We redesign the website around your brand, market and target audience." },
  { icon: Smartphone, title: "Mobile-First Design", description: "The complete website is designed to work properly across mobile, tablet and desktop." },
  { icon: BarChart3, title: "Conversion Optimisation", description: "Pages are structured to make the next step clear and guide visitors towards the actions that matter to your business." },
  { icon: FileText, title: "Website Copy Included", description: "We prepare and improve the website copy based on your company, market and objectives. AI helps us work faster, but every page is reviewed and can be adjusted before it goes live." },
  { icon: Gauge, title: "High Performance", description: "The website is built with clean code and optimised for fast loading and good technical performance." },
  { icon: Database, title: "CMS Integration", description: "Where included in the agreed project scope, we can connect a content management system so you can make day-to-day changes without technical knowledge." },
  { icon: Headphones, title: "Three Months of Support", description: "You receive three months of post-launch support as standard." },
]

const stats = [
  { value: "48h", label: "To your first homepage concept", sub: "from submitting your request" },
  { value: "Fixed Price", label: "Agreed before", sub: "development starts" },
  { value: "3 Months", label: "Post-launch support", sub: "included as standard" },
]

const faqs = [
  {
    q: "How long does a full redesign take?",
    a: [
      "Most complete redesigns take between four and eight weeks, depending on the size and complexity of the website.",
      "You normally receive the first homepage design concept within 48 hours of submitting your request.",
    ],
  },
  {
    q: "Do I need to provide the content and copy myself?",
    a: [
      "No.",
      "We use AI-assisted copywriting to prepare and improve the content based on your business, industry and objectives.",
      "You review and approve the text before anything goes live.",
    ],
  },
  {
    q: "Can I implement the finished website myself?",
    a: [
      "Yes.",
      "If you prefer, we can provide the complete production-ready code so you or your own developer can deploy the website.",
      "Alternatively, we can handle the full deployment for you at no additional cost.",
    ],
  },
  {
    q: "What technology do you use?",
    a: [
      "We normally build websites using Next.js and Tailwind CSS.",
      "For websites that require content management, we can use a headless CMS such as Sanity. Hosting can be arranged through Vercel or your preferred hosting provider.",
    ],
  },
  {
    q: "Is the initial mockup really free?",
    a: [
      "Yes.",
      "We prepare an initial homepage design concept and fixed-price quotation free of charge.",
      "The concept is intended to show you the visual direction we would take. It is not a complete or production-ready website.",
      "There is no obligation to continue and no invoice if you decide not to proceed.",
    ],
  },
]

export default function WebsiteRedesignPage() {
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
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-muted-foreground">AI-Powered Website Redesign</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                A Better Website, Built Faster{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  With AI
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                We redesign existing business websites using the latest AI tools, combined with modern design and development. The result is a website that looks better, loads faster and is built to convert more visitors into clients. And before you spend anything, we show you what we would change.
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
                <h2 className="text-xl font-bold text-foreground">Competitive Pricing, Agreed in Advance</h2>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  We want professional AI-powered website redesign to be affordable. That is why every project comes with a clear, fixed price from the start. You know what the complete redesign will cost before you decide to proceed. Received a lower quote for a genuinely comparable service and level of quality? Send it to us. We will review it and, where possible, match it.
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
                  An Outdated Website Costs You Business Every Day
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>For many potential clients, your website is their first introduction to your company.</p>
                  <p>If it feels outdated, takes too long to load or does not make it immediately clear what you offer, people leave. Often before they have properly looked at your business.</p>
                  <p>That makes a website redesign about much more than appearance.</p>
                  <p>A good website makes your company easy to understand, builds trust and guides visitors towards contacting you or taking the next step.</p>
                  <p>That is what we redesign for.</p>
                  <p className="font-medium text-foreground">And because we prepare the first concept free of charge, you can see the direction before committing to the project.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, strong: "53%", label: "of mobile website visits are abandoned if a page takes longer than 3 seconds to load" },
                  { icon: Smartphone, strong: "Mobile-first", label: "design across phone, tablet and desktop" },
                  { icon: BarChart3, strong: "Clear structure", label: "built around the actions that matter to your business" },
                  { icon: Gauge, strong: "Fast performance", label: "with clean code and optimised assets" },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-border/50 bg-background/50 p-5">
                    <item.icon className="h-6 w-6 text-blue-600" />
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed"><span className="font-semibold text-foreground">{item.strong}</span> {item.label}</p>
                  </div>
                ))}
                <p className="col-span-2 text-xs text-muted-foreground/70">
                  The 53% figure is based on Google Data, Global, n=3,700, using aggregated and anonymised Google Analytics data from a sample of mobile websites, March 2016.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Our Process</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">From Your Current Website to the New One in Four Steps</h2>
              <p className="mt-4 text-lg text-muted-foreground">We keep the process straightforward and make sure you know what is happening at every stage.</p>
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
                Modern, clean and professional, but always designed around the business behind the website. We do not redesign websites simply to make them look different. The design needs to make the company clearer, more credible and easier to do business with.
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {[
                { src: "/mockup-1.png", alt: "Modern SaaS dashboard website design", label: "SaaS / Technology Platform" },
                { src: "/mockup-2.png", alt: "Premium agency website design", label: "Agency / Creative Studio" },
                { src: "/mockup-3.png", alt: "Professional services website design", label: "Professional Services / Consultancy" },
                { src: "/mockup-4.png", alt: "Enterprise AI solutions website design", label: "Enterprise / AI Solutions" },
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
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">No Unexpected Extras</h2>
              <p className="mt-4 text-lg text-muted-foreground">The fixed price covers the complete redesign, development and launch scope agreed at the start of the project.</p>
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
                  <div className="mt-3 space-y-3 pl-8">
                    {faq.a.map((paragraph, j) => (
                      <p key={j} className="text-muted-foreground leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
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
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">See What We Would Do With Your Website</h2>
              <p className="mt-4 text-lg text-white/80">Send us your current website and we will prepare an initial homepage redesign concept. Within 48 hours, you will see the direction we would take and what the complete redesign would cost. You decide what happens after that.</p>
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
