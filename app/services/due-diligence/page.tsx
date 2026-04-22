import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Search,
  FileText,
  AlertTriangle,
  Globe,
  UserSearch,
  Bell,
  Building2,
  Briefcase,
  Scale,
  CreditCard,
  Shield,
  CheckCircle,
  Lock,
  Clock,
  TrendingDown,
  Quote,
  Settings,
  Server,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Powered Due Diligence Software | Next Horizons",
  description: "AI-driven due diligence for financial institutions. OSINT research, CDD report writing, sanctions screening, source of income analysis, and real-time compliance intelligence — encrypted, on-premise.",
}

const capabilities = [
  {
    icon: Search,
    title: "OSINT Research",
    description: "Automated open-source intelligence gathering across 500+ public data sources: company registries, court records, news archives, beneficial ownership databases, and more. What a compliance analyst would spend two days researching, our platform completes in minutes.",
  },
  {
    icon: FileText,
    title: "CDD Review Writing",
    description: "The platform drafts complete Customer Due Diligence reviews in structured, narrative format — ready for your compliance file. Reports follow your internal template, include source citations, risk assessments, and recommended next steps. No blank-page writing from scratch.",
  },
  {
    icon: TrendingDown,
    title: "Source of Income Analysis",
    description: "Upload source of income documentation — bank statements, tax returns, financial statements, business valuations — and the platform analyses them for consistency, red flags, and alignment with the stated client profile. Results are summarised in plain language for your reviewer.",
  },
  {
    icon: AlertTriangle,
    title: "Sanctions & Watchlist Screening",
    description: "Real-time screening against OFAC SDN, EU Consolidated List, UN Security Council, UK OFSI, and 60+ additional national and international lists. Automated match scoring and disambiguation reduce false positives without missing genuine hits.",
  },
  {
    icon: Globe,
    title: "High-Risk Countries & Sectors",
    description: "Stay informed on FATF grey and black lists, EU high-risk third countries, and sector-specific AML risk ratings. The platform flags entities connected to high-risk jurisdictions or industries automatically — and keeps the information current.",
  },
  {
    icon: Bell,
    title: "Latest Compliance News",
    description: "A built-in regulatory intelligence feed delivers the latest developments in AML/CFT regulation, enforcement actions, sanctions updates, and FATF guidance — directly in your dashboard. Your team stays informed without manual monitoring.",
  },
  {
    icon: UserSearch,
    title: "PEP & Adverse Media Screening",
    description: "Identification of politically exposed persons, their family members and close associates, combined with adverse media analysis across 100+ languages. Coverage includes major news databases, regulatory publications, and regional sources often missed by standard tools.",
  },
]

const audiences = [
  {
    icon: Building2,
    title: "Banks & Credit Institutions",
    description: "Reduce CDD backlogs significantly without adding headcount. Meet your MiFID II, 6AMLD, and local AML obligations with structured, audit-ready output.",
  },
  {
    icon: Briefcase,
    title: "Asset Managers & Investment Firms",
    description: "Run enhanced due diligence on counterparties, fund investors, and acquisition targets with speed and consistency.",
  },
  {
    icon: Scale,
    title: "Compliance & Legal Teams",
    description: "Let the platform handle research and report drafting while your team focuses on analysis, judgement, and advisory work.",
  },
  {
    icon: CreditCard,
    title: "Fintechs & Payment Providers",
    description: "Scale your compliance operations without scaling your team. Onboard clients more efficiently while maintaining regulatory standards.",
  },
]

const steps = [
  { step: "01", title: "Input Entity", description: "Provide a name, registration number, or any identifier. The platform resolves ambiguity automatically." },
  { step: "02", title: "AI Research", description: "Deep OSINT runs across 500+ sources — corporate records, media, court filings, sanctions lists, and beneficial ownership registers." },
  { step: "03", title: "Risk Analysis", description: "Findings are cross-referenced, red flags identified, and a risk score calculated — aligned to your configured risk appetite." },
  { step: "04", title: "Report Generated", description: "A structured CDD report is ready in your dashboard — with source links, confidence scores, and recommended actions." },
  { step: "05", title: "Ongoing Monitoring", description: "Reviewed entities remain under continuous watch. Any material change triggers an immediate alert." },
]

const badges = [
  { icon: Lock, title: "End-to-End Encrypted", sub: "All data encrypted at rest and in transit" },
  { icon: Server, title: "On-Premise Deployment", sub: "Runs on your own server — data never leaves your environment" },
  { icon: Shield, title: "GDPR Compliant", sub: "Processed in accordance with applicable data protection law" },
  { icon: CheckCircle, title: "Audit-Ready Output", sub: "Formatted for your regulatory compliance file" },
]

const faqs = [
  {
    q: "Can the platform be configured to match our specific requirements?",
    a: "Yes. The platform is built to be configured to each client's needs. You can enable or disable specific modules — for example, a firm that does not require source of income analysis can remove that component entirely. Risk appetite thresholds, report templates, and screening scope are all adjustable.",
  },
  {
    q: "Does our data leave our environment?",
    a: "No. The platform is deployed on your own server or private cloud infrastructure. Your client data, documents, and reports remain entirely within your environment. Nothing is processed externally or stored on our systems.",
  },
  {
    q: "How does the system handle false positives in sanctions screening?",
    a: "Entity disambiguation is built into the matching algorithm. Each potential match includes a detailed rationale and confidence score, allowing your compliance officer to make an informed decision quickly — without manual cross-checking.",
  },
  {
    q: "Which languages does adverse media screening cover?",
    a: "Adverse media screening covers 100+ languages, with AI-assisted translation and relevance scoring. This includes major international news databases, regional publications, and regulatory announcements often missed by English-only tools.",
  },
  {
    q: "How is the platform priced?",
    a: "We price on a per-review volume basis plus a monthly platform fee covering ongoing monitoring. We build the platform to your specifications — pricing is agreed during the scoping process. Contact us to discuss your review volumes and requirements.",
  },
]

export default function DueDiligencePage() {
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
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-pulse" />
                <span className="text-muted-foreground">Intelligent Due Diligence Software</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                CDD That Took Two Days.{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  Now Takes 15 Minutes.
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Our AI platform automates OSINT research, writes CDD reviews, analyses source of income documentation, screens against global sanctions lists, and keeps your team current on compliance developments — deployed on your own server, fully encrypted.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="group bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
                  <Link href="/contact">
                    Request a Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <Link href="/contact">Speak to a Compliance Specialist</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative border-y border-border/50 bg-foreground/[0.01] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              {[
                { value: "80%", label: "Reduction in research time" },
                { value: "500+", label: "OSINT sources covered" },
                { value: "60+", label: "Sanctions lists screened" },
                { value: "100+", label: "Languages for media screening" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent sm:text-4xl">{stat.value}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy & Security Banner */}
        <section className="relative py-12 bg-gradient-to-r from-slate-600/5 to-blue-700/5 border-b border-border/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left sm:gap-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-blue-700">
                <Server className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Your Data Stays on Your Server</h2>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  The platform is deployed entirely within your own infrastructure. All client data, uploaded documents, and generated reports are encrypted and processed locally — nothing leaves your environment. This is a deliberate architectural decision, not an add-on.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Platform Capabilities</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What the Software Does</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A fully integrated compliance intelligence platform — covering every stage of the due diligence process.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability) => (
                <div key={capability.title} className="group relative overflow-hidden rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-blue-600/5">
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-blue-600/10 to-slate-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-slate-500">
                      <capability.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{capability.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{capability.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Configurable Banner */}
        <section className="relative py-16 border-y border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-slate-500">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Fully Configurable</p>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Built to Your Specifications — Not Adapted After the Fact
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Every client has different requirements. Some need full OSINT and CDD reporting. Others need sanctions screening alone. A private bank may require source of income analysis; a payments firm may not. We build the platform with the features you need and leave out the ones you do not. Pricing reflects your actual usage — not a package designed around someone else&apos;s workflow.
                </p>
                <ul className="mt-5 space-y-2">
                  {[
                    "Enable or disable specific modules per your compliance framework",
                    "Configure risk thresholds to match your internal risk appetite",
                    "Use your own CDD report template and format",
                    "Set screening scope by jurisdiction and list type",
                    "Integrate with your existing case management or document system",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "OSINT Research", included: true },
                  { title: "CDD Review Writing", included: true },
                  { title: "Source of Income Analysis", included: true },
                  { title: "Sanctions Screening", included: true },
                  { title: "PEP Screening", included: true },
                  { title: "Adverse Media", included: true },
                  { title: "High-Risk Countries", included: true },
                  { title: "Compliance News Feed", included: true },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 px-4 py-3">
                    <CheckCircle className="h-4 w-4 shrink-0 text-blue-600" />
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Platform Mockup */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">The Platform</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How the Software Can Look for Your Organisation
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The interface is tailored to your workflow and branding. Below is an example of how the platform is configured for a compliance team — with your modules, your templates, and your risk framework.
              </p>
            </div>

            <div className="mt-16 overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-blue-600/10">
              <div className="relative w-full">
                <Image
                  src="/dd-software.png"
                  alt="Next Horizons Due Diligence Platform Dashboard"
                  width={1400}
                  height={900}
                  className="w-full"
                  priority
                />
              </div>
              <div className="grid grid-cols-3 divide-x divide-border/50 border-t border-border/50 bg-foreground/[0.02]">
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Intelligence Dashboard</p>
                  <p className="mt-1 text-sm text-foreground">Global risk map, high-risk sectors, compliance news, and watchlist alerts — all in one view</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CDD Review Queue</p>
                  <p className="mt-1 text-sm text-foreground">Active reviews with entity, jurisdiction, risk level, and status — managed from a single interface</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI Draft Assistant</p>
                  <p className="mt-1 text-sm text-foreground">Generate or improve CDD reviews, summarise findings, and produce structured reports in minutes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Who Uses It</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built for Organisations That Cannot Afford to Miss a Flag
              </h2>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {audiences.map((audience) => (
                <div key={audience.title} className="flex items-start gap-5 rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg hover:shadow-blue-600/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-slate-400/10">
                    <audience.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{audience.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{audience.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">The Workflow</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">From Input to Report in Under 15 Minutes</h2>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-5">
              {steps.map((step) => (
                <div key={step.step} className="rounded-xl border border-border/50 bg-background/50 p-6 text-center backdrop-blur-sm transition-all hover:border-border hover:shadow-lg hover:shadow-blue-600/5">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500 text-sm font-bold text-white">{step.step}</div>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="relative py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <Quote className="mx-auto h-10 w-10 text-blue-600/30" />
            <blockquote className="mt-6 text-2xl font-semibold leading-relaxed text-foreground sm:text-3xl">
              &ldquo;Our CDD review backlog went from three weeks to three days in the first month. The reports are more thorough than what we produced manually — and our regulator reviewed them without a single question.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-slate-400/20 text-sm font-bold text-blue-700">SV</div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Head of Compliance &amp; MLRO</p>
                <p className="text-sm text-muted-foreground">Regional bank, UAE</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Badges */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Security &amp; Privacy</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Designed for Regulated Environments</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Aligned with FATF 40 Recommendations, EU 6AMLD, and applicable AML/CFT frameworks across the jurisdictions we serve.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {badges.map((badge) => (
                <div key={badge.title} className="flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-background/50 px-5 py-6 text-center backdrop-blur-sm">
                  <badge.icon className="h-8 w-8 text-blue-600" />
                  <span className="font-semibold text-foreground">{badge.title}</span>
                  <span className="text-xs text-muted-foreground">{badge.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">FAQ</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Questions We Are Asked</h2>
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
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">See the Platform on Your Own Entities</h2>
              <p className="mt-4 text-lg text-white/80">
                Book a live demo and we will run a real CDD review on an entity of your choice — so you can assess the output quality directly.
              </p>
              <Button asChild size="lg" className="group mt-8 bg-white text-blue-700 hover:bg-white/90">
                <Link href="/contact">
                  Book Your Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
