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
  TrendingDown,
  Settings,
  Server,
  Eye,
  ScrollText,
  GitBranch,
  ShieldCheck,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Assisted Compliance Tooling | Next Horizons",
  description: "We provide standalone AI-assisted compliance software — OSINT research, CDD review drafting, sanctions, PEP and adverse media screening, and source of income analysis — configurable around your modules, templates and risk framework, with private deployment options and human review before every final decision.",
}

const capabilities = [
  {
    icon: Search,
    title: "OSINT Research",
    description: "The software searches more than 500 available sources, including company registers, court records, news archives, beneficial ownership information and other public information. Work that can take an analyst hours to research manually can be brought together considerably faster. The underlying sources remain available so the analyst can check the information used.",
  },
  {
    icon: FileText,
    title: "CDD Review Writing",
    description: "Once the research is complete, the software can prepare a full first draft of the CDD review. The review can follow your existing format and include the relevant findings, sources, risk assessment and recommended next steps. Instead of starting with an empty document, your analyst starts with a structured review that can be checked, amended and approved.",
  },
  {
    icon: TrendingDown,
    title: "Source of Income Analysis",
    description: "Upload documents such as bank statements, tax returns, financial statements or business valuations. The software analyses the information for consistency, possible red flags and whether it reasonably fits the customer’s stated profile. The findings are then presented in clear language for the reviewer.",
  },
  {
    icon: AlertTriangle,
    title: "Sanctions & Watchlist Screening",
    description: "Screen individuals and entities against OFAC SDN, the EU Consolidated List, UN Security Council sanctions, UK OFSI and more than 60 other national and international lists. Automated matching and disambiguation can help reduce false positives while still identifying potential genuine matches for further review.",
  },
  {
    icon: Globe,
    title: "High-Risk Countries & Sectors",
    description: "The software keeps track of information including FATF grey and black lists, EU high-risk third countries and relevant sector risk information. Connections with higher-risk countries or sectors can automatically be included in the review and assessed against your own risk framework.",
  },
  {
    icon: Bell,
    title: "Latest Compliance News",
    description: "Relevant AML/CFT developments, enforcement actions, sanctions changes and FATF updates can be brought directly into the software. This gives your team one place to keep track of developments instead of manually checking multiple sources.",
  },
  {
    icon: UserSearch,
    title: "PEP & Adverse Media Screening",
    description: "The software can identify politically exposed persons, family members and close associates, combined with adverse media screening across more than 100 languages. It can search international and regional sources and use AI-assisted translation and relevance analysis to help identify information that requires further review.",
  },
]

const audiences = [
  {
    icon: Building2,
    title: "Banks & Credit Institutions",
    description: "Reduce the amount of manual work involved in CDD and deal with larger review volumes without increasing headcount at the same rate. The software supports structured, traceable reviews that can be aligned with your AML framework.",
  },
  {
    icon: Briefcase,
    title: "Asset Managers & Investment Firms",
    description: "Carry out enhanced due diligence on investors, counterparties and acquisition targets more quickly and consistently.",
  },
  {
    icon: Scale,
    title: "Compliance & Legal Teams",
    description: "Let the software handle much of the research and first-draft work, while your professionals focus on investigation, judgement and advisory work.",
  },
  {
    icon: CreditCard,
    title: "Fintechs & Payment Providers",
    description: "Process increasing client volumes without having to grow the compliance team at the same speed.",
  },
]

const steps = [
  { step: "01", title: "Input Entity", description: "Start with a name, registration number or other identifier. The system uses the available information to identify the correct person or entity." },
  { step: "02", title: "AI Research", description: "The software performs OSINT research across available sources, including corporate records, media, court information, sanctions sources and beneficial ownership information." },
  { step: "03", title: "Risk Analysis", description: "The information is brought together and cross-checked. Potential red flags are identified and the findings can be assessed against the risk appetite configured for your organisation." },
  { step: "04", title: "Report Generated", description: "A structured first-draft CDD report is prepared in the software. This can include source links, confidence information, findings and recommended actions for the analyst to review." },
  { step: "05", title: "Ongoing Monitoring", description: "Where ongoing monitoring is enabled, reviewed entities remain under monitoring. If relevant new information appears, your team can be alerted." },
]

const badges = [
  { icon: Lock, title: "Encryption", sub: "Information can be encrypted both in storage and during transmission as part of the agreed technical configuration." },
  { icon: Server, title: "Private Deployment", sub: "Depending on the selected configuration, the software can run on your own server or private cloud environment so you retain greater control over client information." },
  { icon: Shield, title: "Data Protection", sub: "The software is designed so processing can be configured in line with applicable data-protection requirements." },
  { icon: CheckCircle, title: "Audit-Ready Output", sub: "Relevant findings, sources and review information can be retained as part of the compliance file." },
]

const governance = [
  {
    icon: Eye,
    title: "Human-in-the-Loop by Design",
    description: "The AI researches, analyses, drafts and flags. It does not make the final compliance decision. Every review remains subject to assessment and approval by a compliance professional. AI makes the process faster; responsibility remains with your organisation.",
  },
  {
    icon: ScrollText,
    title: "Explainable & Traceable Output",
    description: "Important findings include the underlying source and relevant confidence or matching information. That means an analyst can check where the information came from instead of being asked to accept an unexplained AI output.",
  },
  {
    icon: GitBranch,
    title: "Model-Risk Management",
    description: "Models can be documented and version controlled, with the model used for a review logged as part of the process. Behaviour can be tested against known cases and monitored over time, providing information that can support internal model-risk management and audit.",
  },
  {
    icon: ShieldCheck,
    title: "Developed With AI Regulation in Mind",
    description: "The software is developed with requirements relating to transparency, documentation, human oversight and risk management in mind, including the EU AI Act where it applies. The exact legal and risk classification will depend on how the software is configured and used by your organisation.",
  },
]

const faqs = [
  {
    q: "Can the software be configured around our specific requirements?",
    a: "Yes. Individual modules can be enabled or disabled and we can configure risk thresholds, report templates and screening requirements around your organisation. The software is intended to operate as a standalone application. Any wider integration with existing systems would need to be discussed and scoped separately.",
  },
  {
    q: "Does our data leave our environment?",
    a: "The software can be deployed on your own server or private cloud infrastructure, depending on the selected configuration. The exact data flows, model processing and any external services are documented and agreed before implementation. This allows your organisation to assess where client data, documents and reports are processed and stored.",
  },
  {
    q: "How does the system deal with false positives in sanctions screening?",
    a: "Potential matches are supported with entity matching and disambiguation information. The software provides the analyst with the available information, rationale and confidence information so potential false positives can be assessed more quickly. The final decision remains with your compliance professional.",
  },
  {
    q: "Which languages does adverse media screening cover?",
    a: "Adverse media screening can cover more than 100 languages using AI-assisted translation and relevance analysis. This includes international and regional sources as well as regulatory publications.",
  },
  {
    q: "Does the AI make compliance decisions itself?",
    a: "No. The software is AI-assisted rather than autonomous. It researches, drafts, analyses and flags information, but the review is presented to a compliance officer for assessment and sign-off.",
  },
  {
    q: "How do you address model risk and AI governance?",
    a: "Models can be documented, version controlled and logged against individual reviews. Outputs retain the information needed to understand how a result was produced, including relevant sources and confidence or matching information. The system can also be monitored and validated over time as part of your own model-risk framework.",
  },
  {
    q: "Is client data used to train AI models?",
    a: "No. Client information, documents and reports are not used by Next Horizons to train models. The selected deployment and any external model providers are documented during the scoping process so your organisation can review the applicable data terms before using the software.",
  },
  {
    q: "How is the tooling priced?",
    a: "Pricing consists of a monthly component together with pricing based on review volume. The exact amount depends on the functionality, configuration and volumes you require. We agree that during the scoping process rather than offering a standard package that may contain functionality you do not need.",
  },
]

export default function DueDiligencePage() {
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
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-pulse" />
                <span className="text-muted-foreground">AI-Assisted Compliance Tooling</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                AI-Assisted Compliance Tooling, Built Around{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  Your Governance
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                We provide standalone AI-assisted software that takes a large part of the manual work out of due diligence. The software brings together several specific use cases. It can handle OSINT research, draft CDD reviews, analyse source of income documentation, screen sanctions and watchlists, identify PEPs, monitor adverse media and much more. AI does the research and preparation. Your compliance officers remain responsible for the review and final decision. The software can be configured around the modules, risk criteria and report formats your organisation needs. It can operate as a standalone application, without requiring you to replace your existing case-management or core systems.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="group bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
                  <Link href="/contact">
                    Request a Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <Link href="/book-call?topic=compliance-specialist">Speak to a Compliance Specialist</Link>
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
                { value: "500+", label: "OSINT sources available" },
                { value: "60+", label: "Sanctions and watchlists screened" },
                { value: "100+", label: "Languages for media screening" },
                { value: "Human Review", label: "Required before every final decision" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent sm:text-4xl">{stat.value}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-muted-foreground/70">
              *Exact coverage depends on the selected modules, data sources, configuration and availability of the underlying information.
            </p>
          </div>
        </section>

        {/* Private Deployment Options */}
        <section className="relative py-12 bg-gradient-to-r from-slate-600/5 to-blue-700/5 border-b border-border/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left sm:gap-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-blue-700">
                <Server className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Private Deployment Options</h2>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  The software can be provided as a standalone application and, depending on the agreed technical configuration, can be deployed within your own server or private cloud environment. This gives organisations greater control over client information, uploaded documents and generated reports. The exact architecture, data flows and any external processing are documented during the scoping process, so you know where information is processed and stored before the software is used.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Tooling Capabilities</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What the Tooling Does</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The software can support different stages of a due diligence review while keeping the judgement and final decision with your compliance team.
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
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Use-Case Based</p>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Choose the Capabilities You Need
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Not every compliance team needs the same software. One organisation may want OSINT research and CDD drafting. Another may mainly need sanctions, PEP and adverse media screening. A private bank may need detailed source of income analysis, while another business may not use that capability at all. We configure the standalone software around the use cases you actually need. Pricing is then based on the functionality and volume required rather than forcing you into a standard package containing capabilities you do not use. The software can be configured to:
                </p>
                <ul className="mt-5 space-y-2">
                  {[
                    "enable or disable individual modules;",
                    "use risk thresholds based on your own risk appetite;",
                    "produce reviews in your existing CDD template;",
                    "determine which sanctions and watchlists are screened; and",
                    "operate as a standalone application alongside your current systems.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Available modules</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
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
                The interface can be configured around the selected modules, templates and risk framework. The example below shows how this can look for a compliance team.
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
                  <p className="mt-1 text-sm text-foreground">See global risk information, high-risk sectors, relevant compliance news and watchlist alerts in one place.</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CDD Review Queue</p>
                  <p className="mt-1 text-sm text-foreground">Manage active reviews with the relevant entity, jurisdiction, risk level and review status from one screen.</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI Draft Assistant</p>
                  <p className="mt-1 text-sm text-foreground">Create or improve CDD reviews, summarise findings and prepare structured reports based on the information collected.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Compliance Experience */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Practical Compliance Experience</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Developed With Direct Compliance Experience
              </h2>
            </div>
            <div className="mx-auto mt-8 max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The direction of the compliance software is led by Rainier van Dam, a CAMS-certified AML and financial crime professional with experience across banking, online gaming and property finance.
              </p>
              <p>
                His work has included complex CDD and EDD reviews, source of income and source of funds investigations, sanctions, PEP and adverse media screening, quality assurance, procedure development and leading an operational FEC team of approximately 15 analysts.
              </p>
              <p>
                That practical experience is used when determining which use cases the software supports, how findings are presented and where human review and professional judgement remain necessary.
              </p>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Who Uses It</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built for Organisations Managing Higher-Risk Reviews
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
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">From Input to a Structured CDD Report</h2>
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

        {/* AI Governance & Model Risk */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">AI Governance &amp; Model Risk</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                AI That Can Be Properly Governed
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Using AI in a regulated compliance environment creates additional questions around governance, explainability, validation and accountability. We take those requirements into account when the software is designed rather than trying to solve them afterwards.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {governance.map((item) => (
                <div key={item.title} className="flex items-start gap-5 rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg hover:shadow-blue-600/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-slate-500">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Badges */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Security, Privacy &amp; Compliance</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Designed for Regulated Environments</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The software is designed for use with sensitive compliance information and can be configured around the regulatory framework that applies to your organisation.
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
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">See the Software on a Public Entity of Your Choice</h2>
              <p className="mt-4 text-lg text-white/80">
                The easiest way to decide whether the software is useful is to see what it actually produces. Book a live demonstration and select a publicly available entity you would like us to review. We will show you how the relevant research, screening and first-draft CDD output can be brought together for your team to assess.
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
