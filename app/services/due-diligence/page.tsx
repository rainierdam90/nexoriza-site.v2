import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Search, FileText, AlertTriangle, Globe, UserSearch, Bell, Building2, Briefcase, Scale, CreditCard, Shield, CheckCircle, Lock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Due Diligence Software | Next Horizons",
  description: "AI-driven due diligence for financial institutions. Automated OSINT, CDD report generation, sanctions screening, and real-time regulatory intelligence — aligned with FATF and EU AML standards.",
}

const capabilities = [
  { icon: Search, title: "OSINT Research", description: "Automated research across 500+ public data sources — corporate registries, court records, news archives, regulatory databases, and more. A complete intelligence picture in minutes." },
  { icon: FileText, title: "CDD Report Generation", description: "Structured, narrative-quality Customer Due Diligence reports ready for your compliance file. Formatted to your internal template, with source citations and risk ratings included." },
  { icon: AlertTriangle, title: "Sanctions Screening", description: "Real-time screening against OFAC SDN, EU Consolidated, UN Security Council, UK OFSI, and 60+ additional lists — with automated match scoring and escalation flags." },
  { icon: Globe, title: "High-Risk Country & Sector Monitoring", description: "Continuously updated intelligence on FATF grey lists, EU high-risk third countries, and sector-specific AML risks — automatically applied at the point of review." },
  { icon: UserSearch, title: "PEP & Adverse Media Screening", description: "Identification of politically exposed persons and their associates, combined with adverse media screening across 100+ languages." },
  { icon: Bell, title: "Ongoing Monitoring", description: "Continuous monitoring of reviewed entities with immediate alerts on sanctions changes, adverse news, or ownership changes — so nothing requires manual follow-up." },
]

const audiences = [
  { icon: Building2, title: "Banks & Credit Institutions", description: "Address your CDD backlog without additional headcount. Produce audit-ready outputs that meet MiFID II, 6AMLD, and local AML requirements." },
  { icon: Briefcase, title: "Asset Managers & Investment Firms", description: "Conduct enhanced due diligence on counterparties, fund investors, and acquisition targets with the depth your risk function requires." },
  { icon: Scale, title: "Compliance & Legal Teams", description: "Redirect time from data collection to analysis and judgement. The platform handles research; your team applies expertise where it matters." },
  { icon: CreditCard, title: "Fintechs & Payment Providers", description: "Scale your compliance function in line with client growth — without a proportional increase in operational cost or headcount." },
]

const steps = [
  { step: "01", title: "Entity Input", description: "Provide a name, registration number, or any identifier. The system resolves disambiguation automatically." },
  { step: "02", title: "Automated Research", description: "OSINT across 500+ sources runs in parallel — corporate records, media, court filings, sanctions lists, PEP databases, and more." },
  { step: "03", title: "Risk Analysis", description: "Findings are cross-referenced, red flags are identified, and risk levels are scored against configurable thresholds." },
  { step: "04", title: "Report Delivery", description: "A structured, audit-ready CDD report is available in your dashboard — with source links, confidence scores, and recommended next steps." },
  { step: "05", title: "Ongoing Monitoring", description: "Reviewed entities remain under continuous monitoring. Material changes trigger immediate alerts." },
]

const badges = [
  { icon: Shield, title: "GDPR Aligned", sub: "Data processed within EU infrastructure" },
  { icon: CheckCircle, title: "Audit-Ready Output", sub: "Formatted for regulatory review" },
  { icon: Lock, title: "Bank-Grade Security", sub: "ISO 27001 aligned architecture" },
  { icon: Globe, title: "FATF 40 Recommendations", sub: "Comprehensive regulatory coverage" },
]

const faqs = [
  { q: "How does the platform handle false positives in sanctions screening?", a: "Entity disambiguation and confidence scoring are built into the matching algorithm, which significantly reduces false-positive rates. Each potential match includes a detailed rationale, allowing your compliance officer to make an informed decision quickly." },
  { q: "Can CDD reports be configured to our internal template?", a: "Yes. We conduct a template configuration session during onboarding. Report structure, risk categories, language, and escalation thresholds are set to match your existing processes." },
  { q: "Which languages does adverse media screening cover?", a: "Adverse media screening covers 100+ languages, with AI-assisted translation and relevance scoring. Coverage includes major news databases, regional publications, and regulatory announcements." },
  { q: "How is the platform priced?", a: "Pricing is volume-based per review, with a monthly platform fee that includes monitoring for your existing portfolio. We tailor pricing to your review volumes and entity types — contact us for a quote." },
  { q: "Is the platform suitable for smaller compliance teams?", a: "Yes. The platform is designed to increase the effective capacity of small teams significantly. There is no minimum volume requirement — we work with boutique asset managers and large financial institutions alike." },
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
                <span className="text-muted-foreground">AI Due Diligence Software</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Customer Due Diligence,{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  Automated Without Compromise
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Our AI platform automates the research-intensive elements of CDD — OSINT gathering, sanctions screening, adverse media analysis, and report drafting — reducing review time by up to 80% while maintaining the quality your regulator expects.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="group bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
                  <Link href="/contact">Request a Demo <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <Link href="/contact">Speak with a Compliance Specialist</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative border-y border-border/50 bg-foreground/[0.01] py-14">
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

        {/* Platform Mockup */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">The Platform</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Designed for Compliance Professionals
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A clean, structured interface built around the way compliance teams actually work — not a generic data tool adapted for the purpose.
              </p>
            </div>

            <div className="mt-16 overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-blue-600/10">
              <svg viewBox="0 0 1200 760" xmlns="http://www.w3.org/2000/svg" className="w-full">
                {/* App shell */}
                <rect width="1200" height="760" fill="#f1f5f9"/>

                {/* Sidebar */}
                <rect width="220" height="760" fill="#0f172a"/>
                {/* Logo */}
                <rect x="20" y="20" width="32" height="32" rx="8" fill="#1d4ed8"/>
                <rect x="22" y="26" width="28" height="4" rx="2" fill="#fff" opacity="0.9"/>
                <rect x="22" y="34" width="20" height="4" rx="2" fill="#93c5fd"/>
                <rect x="22" y="42" width="24" height="4" rx="2" fill="#fff" opacity="0.7"/>
                <rect x="60" y="25" width="90" height="10" rx="3" fill="#f1f5f9"/>
                <rect x="60" y="39" width="70" height="8" rx="2" fill="#475569"/>
                {/* Nav items */}
                <rect x="12" y="76" width="196" height="36" rx="8" fill="#1d4ed8" opacity="0.25"/>
                <rect x="32" y="88" width="14" height="14" rx="3" fill="#3b82f6"/>
                <rect x="54" y="90" width="80" height="10" rx="2" fill="#e2e8f0"/>
                <rect x="180" y="87" width="20" height="12" rx="6" fill="#3b82f6"/>
                <rect x="183" y="90" width="14" height="6" rx="3" fill="#fff" opacity="0.9"/>

                <rect x="12" y="122" width="196" height="36" rx="8"/>
                <rect x="32" y="134" width="14" height="14" rx="3" fill="#475569"/>
                <rect x="54" y="136" width="70" height="10" rx="2" fill="#64748b"/>

                <rect x="12" y="166" width="196" height="36" rx="8"/>
                <rect x="32" y="178" width="14" height="14" rx="3" fill="#475569"/>
                <rect x="54" y="180" width="90" height="10" rx="2" fill="#64748b"/>

                <rect x="12" y="210" width="196" height="36" rx="8"/>
                <rect x="32" y="222" width="14" height="14" rx="3" fill="#475569"/>
                <rect x="54" y="224" width="76" height="10" rx="2" fill="#64748b"/>

                <rect x="12" y="254" width="196" height="36" rx="8"/>
                <rect x="32" y="266" width="14" height="14" rx="3" fill="#475569"/>
                <rect x="54" y="268" width="84" height="10" rx="2" fill="#64748b"/>

                <rect x="12" y="298" width="196" height="36" rx="8"/>
                <rect x="32" y="310" width="14" height="14" rx="3" fill="#e11d48" opacity="0.7"/>
                <rect x="54" y="312" width="60" height="10" rx="2" fill="#64748b"/>
                <rect x="174" y="308" width="26" height="16" rx="8" fill="#e11d48" opacity="0.2"/>
                <rect x="179" y="311" width="16" height="10" rx="5" fill="#e11d48" opacity="0.8"/>

                {/* Bottom sidebar */}
                <rect x="12" y="680" width="196" height="36" rx="8"/>
                <circle cx="39" cy="698" r="12" fill="#1d4ed8" opacity="0.3"/>
                <rect x="57" y="693" width="70" height="8" rx="2" fill="#94a3b8"/>
                <rect x="57" y="705" width="50" height="6" rx="2" fill="#475569"/>

                {/* Top bar */}
                <rect x="220" y="0" width="980" height="56" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                <rect x="240" y="16" width="200" height="24" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
                <rect x="252" y="22" width="100" height="12" rx="3" fill="#cbd5e1"/>
                <rect x="950" y="14" width="100" height="28" rx="8" fill="#1d4ed8"/>
                <rect x="960" y="20" width="80" height="16" rx="4" fill="#fff" opacity="0.0"/>
                <rect x="965" y="23" width="70" height="10" rx="2" fill="#fff" opacity="0.9"/>
                <circle cx="1090" cy="28" r="14" fill="#1d4ed8" opacity="0.2"/>
                <rect x="1080" y="23" width="20" height="10" rx="2" fill="#64748b"/>
                <circle cx="1140" cy="28" r="14" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
                <rect x="1130" y="23" width="20" height="10" rx="2" fill="#94a3b8"/>

                {/* Main content area */}
                {/* Page title */}
                <rect x="240" y="72" width="160" height="18" rx="4" fill="#0f172a"/>
                <rect x="240" y="96" width="240" height="12" rx="3" fill="#94a3b8"/>

                {/* Summary cards row */}
                <rect x="240" y="124" width="220" height="100" rx="12" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                <rect x="260" y="142" width="80" height="12" rx="3" fill="#94a3b8"/>
                <rect x="260" y="162" width="60" height="28" rx="4" fill="#0f172a"/>
                <rect x="330" y="172" width="50" height="12" rx="3" fill="#22c55e" opacity="0.7"/>
                <rect x="260" y="200" width="140" height="8" rx="2" fill="#f1f5f9"/>

                <rect x="476" y="124" width="220" height="100" rx="12" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                <rect x="496" y="142" width="90" height="12" rx="3" fill="#94a3b8"/>
                <rect x="496" y="162" width="50" height="28" rx="4" fill="#0f172a"/>
                <rect x="556" y="172" width="60" height="12" rx="3" fill="#f59e0b" opacity="0.8"/>
                <rect x="496" y="200" width="140" height="8" rx="2" fill="#f1f5f9"/>

                <rect x="712" y="124" width="220" height="100" rx="12" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                <rect x="732" y="142" width="100" height="12" rx="3" fill="#94a3b8"/>
                <rect x="732" y="162" width="40" height="28" rx="4" fill="#0f172a"/>
                <rect x="782" y="172" width="70" height="12" rx="3" fill="#e11d48" opacity="0.7"/>
                <rect x="732" y="200" width="140" height="8" rx="2" fill="#f1f5f9"/>

                <rect x="948" y="124" width="232" height="100" rx="12" fill="#1d4ed8"/>
                <rect x="968" y="142" width="110" height="12" rx="3" fill="#bfdbfe"/>
                <rect x="968" y="162" width="80" height="28" rx="4" fill="#fff"/>
                <rect x="968" y="200" width="160" height="8" rx="2" fill="#3b82f6" opacity="0.4"/>

                {/* Main table / review list */}
                <rect x="240" y="240" width="704" height="480" rx="12" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                {/* Table header */}
                <rect x="240" y="240" width="704" height="44" rx="12" fill="#f8fafc"/>
                <rect x="240" y="272" width="704" height="12" fill="#f8fafc"/>
                <rect x="260" y="256" width="80" height="10" rx="2" fill="#64748b"/>
                <rect x="400" y="256" width="60" height="10" rx="2" fill="#64748b"/>
                <rect x="510" y="256" width="80" height="10" rx="2" fill="#64748b"/>
                <rect x="640" y="256" width="60" height="10" rx="2" fill="#64748b"/>
                <rect x="760" y="256" width="60" height="10" rx="2" fill="#64748b"/>
                <rect x="870" y="256" width="50" height="10" rx="2" fill="#64748b"/>

                {/* Row 1 — highlighted */}
                <rect x="240" y="284" width="704" height="56" fill="#eff6ff"/>
                <rect x="260" y="302" width="120" height="10" rx="3" fill="#0f172a"/>
                <rect x="260" y="318" width="80" height="8" rx="2" fill="#94a3b8"/>
                <rect x="400" y="306" width="80" height="12" rx="3" fill="#64748b"/>
                <rect x="510" y="302" width="100" height="10" rx="3" fill="#0f172a"/>
                <rect x="510" y="318" width="70" height="8" rx="2" fill="#94a3b8"/>
                <rect x="640" y="303" width="60" height="20" rx="10" fill="#fef3c7"/>
                <rect x="650" y="308" width="40" height="10" rx="2" fill="#d97706"/>
                <rect x="760" y="304" width="50" height="18" rx="9" fill="#dcfce7"/>
                <rect x="767" y="309" width="36" height="8" rx="2" fill="#16a34a"/>
                <rect x="870" y="302" width="70" height="26" rx="6" fill="#1d4ed8"/>
                <rect x="880" y="309" width="50" height="12" rx="3" fill="#fff" opacity="0.9"/>

                {/* Row 2 */}
                <rect x="240" y="340" width="704" height="56" fill="#fff"/>
                <rect x="240" y="395" width="704" height="1" fill="#f1f5f9"/>
                <rect x="260" y="358" width="140" height="10" rx="3" fill="#0f172a"/>
                <rect x="260" y="374" width="90" height="8" rx="2" fill="#94a3b8"/>
                <rect x="400" y="362" width="70" height="12" rx="3" fill="#64748b"/>
                <rect x="510" y="358" width="110" height="10" rx="3" fill="#0f172a"/>
                <rect x="510" y="374" width="60" height="8" rx="2" fill="#94a3b8"/>
                <rect x="640" y="359" width="60" height="20" rx="10" fill="#fef2f2"/>
                <rect x="648" y="364" width="44" height="10" rx="2" fill="#e11d48"/>
                <rect x="760" y="360" width="50" height="18" rx="9" fill="#f0f9ff"/>
                <rect x="767" y="365" width="36" height="8" rx="2" fill="#0284c7"/>
                <rect x="870" y="358" width="70" height="26" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
                <rect x="880" y="365" width="50" height="12" rx="3" fill="#64748b"/>

                {/* Row 3 */}
                <rect x="240" y="396" width="704" height="56" fill="#fff"/>
                <rect x="240" y="451" width="704" height="1" fill="#f1f5f9"/>
                <rect x="260" y="414" width="100" height="10" rx="3" fill="#0f172a"/>
                <rect x="260" y="430" width="120" height="8" rx="2" fill="#94a3b8"/>
                <rect x="400" y="418" width="90" height="12" rx="3" fill="#64748b"/>
                <rect x="510" y="414" width="90" height="10" rx="3" fill="#0f172a"/>
                <rect x="510" y="430" width="70" height="8" rx="2" fill="#94a3b8"/>
                <rect x="640" y="415" width="60" height="20" rx="10" fill="#dcfce7"/>
                <rect x="648" y="420" width="44" height="10" rx="2" fill="#16a34a"/>
                <rect x="760" y="416" width="50" height="18" rx="9" fill="#dcfce7"/>
                <rect x="767" y="421" width="36" height="8" rx="2" fill="#16a34a"/>
                <rect x="870" y="414" width="70" height="26" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
                <rect x="880" y="421" width="50" height="12" rx="3" fill="#64748b"/>

                {/* Row 4 */}
                <rect x="240" y="452" width="704" height="56" fill="#fff"/>
                <rect x="240" y="507" width="704" height="1" fill="#f1f5f9"/>
                <rect x="260" y="470" width="130" height="10" rx="3" fill="#0f172a"/>
                <rect x="260" y="486" width="80" height="8" rx="2" fill="#94a3b8"/>
                <rect x="400" y="474" width="80" height="12" rx="3" fill="#64748b"/>
                <rect x="510" y="470" width="100" height="10" rx="3" fill="#0f172a"/>
                <rect x="510" y="486" width="60" height="8" rx="2" fill="#94a3b8"/>
                <rect x="640" y="471" width="60" height="20" rx="10" fill="#fef3c7"/>
                <rect x="648" y="476" width="44" height="10" rx="2" fill="#d97706"/>
                <rect x="760" y="472" width="50" height="18" rx="9" fill="#dcfce7"/>
                <rect x="767" y="477" width="36" height="8" rx="2" fill="#16a34a"/>
                <rect x="870" y="470" width="70" height="26" rx="6" fill="#1d4ed8"/>
                <rect x="880" y="477" width="50" height="12" rx="3" fill="#fff" opacity="0.9"/>

                {/* Pagination */}
                <rect x="260" y="686" width="80" height="12" rx="3" fill="#94a3b8"/>
                <rect x="770" y="680" width="154" height="24" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
                <rect x="780" y="686" width="30" height="12" rx="3" fill="#1d4ed8"/>
                <rect x="820" y="686" width="24" height="12" rx="3" fill="#64748b"/>
                <rect x="854" y="686" width="24" height="12" rx="3" fill="#64748b"/>
                <rect x="888" y="686" width="26" height="12" rx="3" fill="#64748b"/>

                {/* Right panel — Report Detail */}
                <rect x="960" y="240" width="220" height="480" rx="12" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                <rect x="960" y="240" width="220" height="44" rx="12" fill="#f8fafc"/>
                <rect x="960" y="272" width="220" height="12" fill="#f8fafc"/>
                <rect x="976" y="254" width="100" height="12" rx="3" fill="#0f172a"/>

                {/* NH branding in report */}
                <rect x="976" y="296" width="40" height="6" rx="2" fill="#94a3b8"/>
                <rect x="976" y="308" width="180" height="20" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1"/>
                <rect x="984" y="314" width="8" height="8" rx="2" fill="#1d4ed8"/>
                <rect x="998" y="315" width="80" height="6" rx="2" fill="#1d4ed8"/>
                <rect x="1140" y="308" width="40" height="20" rx="4" fill="#1d4ed8" opacity="0.1"/>
                <rect x="1148" y="313" width="24" height="10" rx="2" fill="#1d4ed8"/>

                <rect x="976" y="340" width="180" height="1" fill="#f1f5f9"/>

                {/* Risk score */}
                <rect x="976" y="352" width="60" height="8" rx="2" fill="#94a3b8"/>
                <rect x="976" y="368" width="180" height="36" rx="8" fill="#fef3c7" stroke="#fde68a" strokeWidth="1"/>
                <rect x="992" y="376" width="60" height="12" rx="3" fill="#d97706"/>
                <rect x="1062" y="376" width="70" height="12" rx="3" fill="#d97706" opacity="0.5"/>
                <rect x="976" y="416" width="180" height="6" rx="3" fill="#f1f5f9"/>
                <rect x="976" y="416" width="108" height="6" rx="3" fill="#f59e0b"/>

                <rect x="976" y="436" width="180" height="1" fill="#f1f5f9"/>

                {/* Flags */}
                <rect x="976" y="448" width="70" height="8" rx="2" fill="#94a3b8"/>
                <rect x="976" y="464" width="180" height="24" rx="6" fill="#fef2f2"/>
                <rect x="984" y="470" width="8" height="8" rx="4" fill="#e11d48"/>
                <rect x="998" y="471" width="100" height="6" rx="2" fill="#e11d48" opacity="0.8"/>
                <rect x="976" y="494" width="180" height="24" rx="6" fill="#fef2f2"/>
                <rect x="984" y="500" width="8" height="8" rx="4" fill="#e11d48"/>
                <rect x="998" y="501" width="120" height="6" rx="2" fill="#e11d48" opacity="0.8"/>
                <rect x="976" y="524" width="180" height="24" rx="6" fill="#f0fdf4"/>
                <rect x="984" y="530" width="8" height="8" rx="4" fill="#22c55e"/>
                <rect x="998" y="531" width="90" height="6" rx="2" fill="#22c55e" opacity="0.8"/>

                <rect x="976" y="562" width="180" height="1" fill="#f1f5f9"/>

                {/* Sources */}
                <rect x="976" y="574" width="60" height="8" rx="2" fill="#94a3b8"/>
                <rect x="976" y="590" width="180" height="18" rx="4" fill="#f8fafc"/>
                <rect x="984" y="595" width="120" height="8" rx="2" fill="#3b82f6"/>
                <rect x="976" y="614" width="180" height="18" rx="4" fill="#f8fafc"/>
                <rect x="984" y="619" width="100" height="8" rx="2" fill="#3b82f6"/>
                <rect x="976" y="638" width="180" height="18" rx="4" fill="#f8fafc"/>
                <rect x="984" y="643" width="130" height="8" rx="2" fill="#3b82f6"/>

                {/* Export button */}
                <rect x="976" y="678" width="180" height="30" rx="8" fill="#1d4ed8"/>
                <rect x="1002" y="686" width="128" height="14" rx="3" fill="#fff" opacity="0.9"/>

                {/* Next Horizons watermark/logo in report area */}
                <rect x="976" y="296" width="0" height="0"/>
                <text x="1078" y="320" textAnchor="middle" fontSize="7" fill="#1d4ed8" fontWeight="600" fontFamily="sans-serif">Next Horizons</text>
              </svg>

              {/* Caption bar */}
              <div className="grid grid-cols-3 divide-x divide-border/50 border-t border-border/50 bg-foreground/[0.02]">
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Review Queue</p>
                  <p className="mt-1 text-sm text-foreground">All active CDD reviews with status, risk level, and assigned analyst</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk Indicators</p>
                  <p className="mt-1 text-sm text-foreground">Colour-coded risk ratings with direct flags for sanctions and adverse media hits</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Report Panel</p>
                  <p className="mt-1 text-sm text-foreground">Structured CDD report with source links, risk score, and export to your compliance file</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Platform Capabilities</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Everything in One Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">From initial screening to ongoing monitoring — fully integrated, fully auditable.</p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability) => (
                <div key={capability.title} className="group relative overflow-hidden rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-slate-400/10">
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-slate-400/15 to-blue-600/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
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

        {/* Who it's for */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Who It&apos;s For</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Built for Regulated Financial Services</h2>
              <p className="mt-4 text-lg text-muted-foreground">Designed with compliance professionals in mind — not adapted from a generic research tool.</p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {audiences.map((audience) => (
                <div key={audience.title} className="flex items-start gap-5 rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-blue-600/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-400/15 to-blue-600/10">
                    <audience.icon className="h-6 w-6 text-slate-500" />
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

        {/* How it works */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Workflow</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">From Input to Report in Under 15 Minutes</h2>
              <p className="mt-4 text-lg text-muted-foreground">A fully automated pipeline with your compliance officer in control at every step.</p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-5">
              {steps.map((step, index) => (
                <div key={step.step} className="relative">
                  <div className="rounded-xl border border-border/50 bg-background/50 p-6 text-center backdrop-blur-sm transition-all hover:border-border hover:shadow-lg">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500 text-sm font-bold text-white">{step.step}</div>
                    <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="relative py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-4xl text-slate-400/50 font-serif">&ldquo;</p>
            <blockquote className="mt-2 text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
              Our review backlog reduced considerably within the first few weeks. The reports are well-structured and our external auditors reviewed them without requesting additional documentation.
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-slate-400/20 text-sm font-bold text-blue-700">SV</div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Head of Compliance</p>
                <p className="text-sm text-muted-foreground">Asset management firm, EMEA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="relative bg-foreground/[0.02] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Security & Standards</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Built to the Standards You Are Held To</h2>
              <p className="mt-4 text-lg text-muted-foreground">Aligned with FATF 40 Recommendations, EU 6AMLD, and applicable local AML/CFT frameworks.</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {badges.map((badge) => (
                <div key={badge.title} className="flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-background/50 px-5 py-6 text-center backdrop-blur-sm">
                  <badge.icon className="h-8 w-8 text-slate-500" />
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
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Common Questions</h2>
            </div>
            <div className="mt-12 space-y-4">
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
              <p className="mt-4 text-lg text-white/80">Book a live demonstration and we will run a real CDD report on an entity of your choice — so you can assess the quality of the output directly.</p>
              <Button asChild size="lg" className="group mt-8 bg-white text-blue-700 hover:bg-white/90">
                <Link href="/contact">Book a Demonstration <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
