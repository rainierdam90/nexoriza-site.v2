import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Search, Sparkles, Code2, Rocket, Palette, Smartphone, BarChart3, FileText, Gauge, Database, Headphones, CheckCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Powered Website Redesign | Next Horizons",
  description: "We redesign websites using advanced AI tools and modern development practices — delivering measurable improvements in performance, design quality, and conversion rates.",
}

const steps = [
  { icon: Search, step: "01", title: "Discovery & Audit", description: "We analyse your current website alongside your objectives, audience, and competitive context. This gives us the foundation to make deliberate design decisions rather than aesthetic ones." },
  { icon: Sparkles, step: "02", title: "AI-Assisted Design", description: "We use generative AI tools to produce multiple high-fidelity design directions quickly. You select and refine the concept that best represents your organisation. First concepts within 48 hours." },
  { icon: Code2, step: "03", title: "Development", description: "We build on Next.js — the same framework used by Vercel, Loom, and Notion. Server-side rendering, clean architecture, and optimised delivery as standard." },
  { icon: Rocket, step: "04", title: "Launch & Ongoing Improvement", description: "We manage deployment and monitor performance post-launch. Ongoing optimisation and support are included for three months after go-live." },
]

const features = [
  { icon: Palette, title: "Full Redesign", description: "Every element reconsidered and aligned with your brand" },
  { icon: Smartphone, title: "Mobile-First", description: "Designed for the majority of users who browse on mobile" },
  { icon: BarChart3, title: "Conversion Optimisation", description: "Structure and copy built around your conversion goals" },
  { icon: FileText, title: "AI Copywriting", description: "SEO-optimised copy drafted and refined using AI" },
  { icon: Gauge, title: "Core Web Vitals", description: "Target score of 90+ across Google's performance metrics" },
  { icon: Database, title: "CMS Integration", description: "Manage your content independently after launch" },
  { icon: Headphones, title: "3 Months Support", description: "Post-launch fixes, updates, and performance monitoring" },
]

const faqs = [
  { q: "How long does a redesign typically take?", a: "Most projects are completed in four to eight weeks, depending on scope and the number of pages involved. We provide first design concepts within 48 hours of the brief being finalised." },
  { q: "Do we need to provide content and copy?", a: "No. We draft all copy using AI-assisted writing based on your brand positioning and audience. You review and approve before anything goes live." },
  { q: "Which technology stack do you use?", a: "We build on Next.js and React with Tailwind CSS for styling. For content management, we typically use Sanity or Contentful. Hosting is on Vercel or your preferred provider." },
  { q: "What happens after launch?", a: "Three months of post-launch support is included in every project. After that, we offer monthly retainers for ongoing development and optimisation." },
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
                <span className="text-muted-foreground">Website Redesign</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                A Website That Represents{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  Your Organisation as It Is Today
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Most business websites were built to a brief that no longer reflects the organisation. We redesign them — using advanced AI to accelerate the process and modern engineering to ensure the result performs consistently.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="group bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
                  <Link href="/contact">Discuss Your Project <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <Link href="/contact">Request a Free Audit</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative border-y border-border/50 bg-foreground/[0.01] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: "3×", label: "Average conversion uplift", sub: "across redesign clients" },
                { value: "48h", label: "First design concept", sub: "from signed brief" },
                { value: "90+", label: "Target Lighthouse score", sub: "performance and SEO" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent sm:text-4xl">{stat.value}</div>
                  <p className="mt-1 font-medium text-foreground text-sm">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mockups Section */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Design Quality</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                The Standard We Design To
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Clean, purposeful, and built to convert — representative of the design approach we apply to every project.
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {/* Mockup 1: SaaS/Tech company */}
              <div className="overflow-hidden rounded-2xl border border-border/50 shadow-xl shadow-blue-600/5">
                <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  <rect width="600" height="400" fill="#0f172a"/>
                  {/* Nav */}
                  <rect width="600" height="52" fill="#1e293b"/>
                  <circle cx="28" cy="26" r="10" fill="#3b82f6"/>
                  <rect x="46" y="20" width="60" height="12" rx="3" fill="#e2e8f0"/>
                  <rect x="260" y="20" width="40" height="12" rx="3" fill="#64748b"/>
                  <rect x="312" y="20" width="40" height="12" rx="3" fill="#64748b"/>
                  <rect x="364" y="20" width="40" height="12" rx="3" fill="#64748b"/>
                  <rect x="510" y="16" width="72" height="20" rx="10" fill="#3b82f6"/>
                  <rect x="526" y="21" width="40" height="10" rx="2" fill="#fff" opacity="0.9"/>
                  {/* Hero */}
                  <rect x="60" y="80" width="220" height="14" rx="4" fill="#e2e8f0"/>
                  <rect x="60" y="104" width="280" height="22" rx="4" fill="#f8fafc"/>
                  <rect x="60" y="134" width="260" height="22" rx="4" fill="#f8fafc"/>
                  <rect x="60" y="164" width="200" height="22" rx="4" fill="#94a3b8"/>
                  <rect x="60" y="164" width="180" height="12" rx="3" fill="#94a3b8"/>
                  <rect x="60" y="196" width="180" height="12" rx="3" fill="#94a3b8"/>
                  <rect x="60" y="228" width="120" height="32" rx="8" fill="#3b82f6"/>
                  <rect x="78" y="237" width="84" height="14" rx="3" fill="#fff" opacity="0.9"/>
                  <rect x="196" y="228" width="120" height="32" rx="8" fill="transparent" stroke="#475569" strokeWidth="1.5"/>
                  <rect x="214" y="237" width="84" height="14" rx="3" fill="#64748b"/>
                  {/* Right illustration */}
                  <rect x="360" y="70" width="210" height="140" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
                  <rect x="376" y="86" width="178" height="10" rx="3" fill="#334155"/>
                  <rect x="376" y="104" width="130" height="8" rx="2" fill="#1d4ed8" opacity="0.6"/>
                  <rect x="376" y="118" width="178" height="72" rx="8" fill="#0f172a"/>
                  <rect x="388" y="130" width="50" height="6" rx="2" fill="#3b82f6" opacity="0.7"/>
                  <rect x="388" y="142" width="70" height="30" rx="4" fill="#1d4ed8" opacity="0.3"/>
                  <rect x="466" y="130" width="50" height="6" rx="2" fill="#64748b"/>
                  <rect x="466" y="142" width="70" height="30" rx="4" fill="#334155"/>
                  <rect x="388" y="178" width="148" height="4" rx="2" fill="#334155"/>
                  {/* Cards row */}
                  <rect x="60" y="290" width="148" height="80" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
                  <circle cx="84" cy="316" r="12" fill="#1d4ed8" opacity="0.5"/>
                  <rect x="102" y="310" width="80" height="7" rx="2" fill="#e2e8f0"/>
                  <rect x="102" y="323" width="60" height="6" rx="2" fill="#64748b"/>
                  <rect x="76" y="344" width="100" height="14" rx="3" fill="#3b82f6" opacity="0.7"/>
                  <rect x="226" y="290" width="148" height="80" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
                  <circle cx="250" cy="316" r="12" fill="#475569"/>
                  <rect x="268" y="310" width="80" height="7" rx="2" fill="#e2e8f0"/>
                  <rect x="268" y="323" width="60" height="6" rx="2" fill="#64748b"/>
                  <rect x="242" y="344" width="100" height="14" rx="3" fill="#475569" opacity="0.7"/>
                  <rect x="392" y="290" width="148" height="80" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
                  <circle cx="416" cy="316" r="12" fill="#1d4ed8" opacity="0.5"/>
                  <rect x="434" y="310" width="80" height="7" rx="2" fill="#e2e8f0"/>
                  <rect x="434" y="323" width="60" height="6" rx="2" fill="#64748b"/>
                  <rect x="408" y="344" width="100" height="14" rx="3" fill="#3b82f6" opacity="0.7"/>
                  {/* Label */}
                  <rect x="20" y="382" width="120" height="14" rx="3" fill="#1e293b"/>
                  <rect x="24" y="385" width="80" height="8" rx="2" fill="#475569"/>
                </svg>
                <div className="border-t border-border/50 bg-foreground/[0.02] px-5 py-4">
                  <p className="text-sm font-medium text-foreground">Technology / SaaS</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Dark theme · Product-led · Conversion-focused</p>
                </div>
              </div>

              {/* Mockup 2: Professional services / Finance */}
              <div className="overflow-hidden rounded-2xl border border-border/50 shadow-xl shadow-blue-600/5">
                <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  <rect width="600" height="400" fill="#f8fafc"/>
                  {/* Nav */}
                  <rect width="600" height="56" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="24" y="20" width="16" height="16" rx="4" fill="#1d4ed8"/>
                  <rect x="46" y="22" width="80" height="12" rx="3" fill="#0f172a"/>
                  <rect x="260" y="22" width="40" height="12" rx="3" fill="#64748b"/>
                  <rect x="314" y="22" width="40" height="12" rx="3" fill="#64748b"/>
                  <rect x="368" y="22" width="40" height="12" rx="3" fill="#64748b"/>
                  <rect x="500" y="18" width="80" height="20" rx="10" fill="#1d4ed8"/>
                  <rect x="516" y="23" width="48" height="10" rx="2" fill="#fff" opacity="0.9"/>
                  {/* Hero bg */}
                  <rect y="56" width="600" height="180" fill="#eff6ff"/>
                  <rect x="40" y="80" width="160" height="10" rx="3" fill="#93c5fd"/>
                  <rect x="40" y="100" width="280" height="24" rx="5" fill="#0f172a"/>
                  <rect x="40" y="132" width="260" height="20" rx="5" fill="#1e293b"/>
                  <rect x="40" y="162" width="200" height="12" rx="3" fill="#64748b"/>
                  <rect x="40" y="182" width="240" height="12" rx="3" fill="#64748b"/>
                  <rect x="40" y="210" width="130" height="30" rx="8" fill="#1d4ed8"/>
                  <rect x="58" y="219" width="94" height="12" rx="3" fill="#fff" opacity="0.9"/>
                  <rect x="184" y="210" width="130" height="30" rx="8" fill="transparent" stroke="#94a3b8" strokeWidth="1.5"/>
                  <rect x="200" y="219" width="94" height="12" rx="3" fill="#64748b"/>
                  {/* Right card */}
                  <rect x="380" y="72" width="196" height="160" rx="14" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5"/>
                  <rect x="396" y="90" width="164" height="10" rx="3" fill="#0f172a"/>
                  <rect x="396" y="108" width="120" height="8" rx="2" fill="#64748b"/>
                  <rect x="396" y="126" width="164" height="1" fill="#e2e8f0"/>
                  <rect x="396" y="138" width="60" height="8" rx="2" fill="#93c5fd"/>
                  <rect x="396" y="154" width="140" height="28" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1"/>
                  <rect x="408" y="161" width="80" height="8" rx="2" fill="#1d4ed8" opacity="0.7"/>
                  <rect x="396" y="192" width="164" height="28" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="408" y="199" width="80" height="8" rx="2" fill="#64748b"/>
                  {/* Stats row */}
                  <rect x="40" y="252" width="155" height="76" rx="10" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="56" y="270" width="60" height="18" rx="4" fill="#1d4ed8" opacity="0.15"/>
                  <rect x="60" y="275" width="52" height="10" rx="2" fill="#1d4ed8"/>
                  <rect x="56" y="296" width="100" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="56" y="310" width="80" height="7" rx="2" fill="#cbd5e1"/>
                  <rect x="214" y="252" width="155" height="76" rx="10" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="230" y="270" width="60" height="18" rx="4" fill="#475569" opacity="0.15"/>
                  <rect x="234" y="275" width="52" height="10" rx="2" fill="#475569"/>
                  <rect x="230" y="296" width="100" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="230" y="310" width="80" height="7" rx="2" fill="#cbd5e1"/>
                  <rect x="388" y="252" width="155" height="76" rx="10" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="404" y="270" width="60" height="18" rx="4" fill="#1d4ed8" opacity="0.15"/>
                  <rect x="408" y="275" width="52" height="10" rx="2" fill="#1d4ed8"/>
                  <rect x="404" y="296" width="100" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="404" y="310" width="80" height="7" rx="2" fill="#cbd5e1"/>
                  {/* bottom bar */}
                  <rect y="344" width="600" height="56" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="40" y="362" width="80" height="8" rx="2" fill="#64748b"/>
                  <rect x="200" y="362" width="60" height="8" rx="2" fill="#cbd5e1"/>
                  <rect x="280" y="362" width="60" height="8" rx="2" fill="#cbd5e1"/>
                  <rect x="360" y="362" width="60" height="8" rx="2" fill="#cbd5e1"/>
                  <rect x="480" y="358" width="80" height="18" rx="9" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1"/>
                </svg>
                <div className="border-t border-border/50 bg-foreground/[0.02] px-5 py-4">
                  <p className="text-sm font-medium text-foreground">Professional Services / Finance</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Light theme · Trust-focused · Clear conversion path</p>
                </div>
              </div>

              {/* Mockup 3: Mobile-first / modern brand */}
              <div className="overflow-hidden rounded-2xl border border-border/50 shadow-xl shadow-blue-600/5">
                <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  <defs>
                    <linearGradient id="gHero" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1e3a5f"/>
                      <stop offset="100%" stopColor="#0f172a"/>
                    </linearGradient>
                  </defs>
                  <rect width="600" height="400" fill="#f1f5f9"/>
                  {/* Sidebar */}
                  <rect width="180" height="400" fill="#0f172a"/>
                  <circle cx="90" cy="44" r="22" fill="#1d4ed8" opacity="0.3"/>
                  <rect x="70" y="38" width="40" height="12" rx="3" fill="#e2e8f0"/>
                  <rect x="58" y="55" width="64" height="8" rx="2" fill="#64748b"/>
                  <rect x="16" y="90" width="148" height="36" rx="8" fill="#1d4ed8" opacity="0.2"/>
                  <circle cx="36" cy="108" r="8" fill="#3b82f6"/>
                  <rect x="52" y="104" width="80" height="8" rx="2" fill="#e2e8f0"/>
                  <rect x="52" y="116" width="56" height="6" rx="2" fill="#475569"/>
                  <rect x="16" y="136" width="148" height="36" rx="8" fill="transparent"/>
                  <circle cx="36" cy="154" r="8" fill="#475569"/>
                  <rect x="52" y="150" width="70" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="16" y="182" width="148" height="36" rx="8" fill="transparent"/>
                  <circle cx="36" cy="200" r="8" fill="#475569"/>
                  <rect x="52" y="196" width="80" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="16" y="228" width="148" height="36" rx="8" fill="transparent"/>
                  <circle cx="36" cy="246" r="8" fill="#475569"/>
                  <rect x="52" y="242" width="60" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="16" y="360" width="148" height="28" rx="8" fill="#1d4ed8"/>
                  <rect x="46" y="368" width="88" height="12" rx="3" fill="#fff" opacity="0.8"/>
                  {/* Main content */}
                  <rect x="196" y="16" width="388" height="56" rx="10" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="212" y="30" width="100" height="10" rx="3" fill="#0f172a"/>
                  <rect x="212" y="46" width="140" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="476" y="26" width="92" height="28" rx="8" fill="#1d4ed8"/>
                  <rect x="492" y="33" width="60" height="14" rx="3" fill="#fff" opacity="0.85"/>
                  {/* Chart card */}
                  <rect x="196" y="88" width="240" height="150" rx="10" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="212" y="104" width="100" height="10" rx="3" fill="#0f172a"/>
                  <rect x="212" y="120" width="70" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="212" y="140" width="20" height="70" rx="3" fill="#bfdbfe"/>
                  <rect x="240" y="160" width="20" height="50" rx="3" fill="#3b82f6"/>
                  <rect x="268" y="148" width="20" height="62" rx="3" fill="#1d4ed8"/>
                  <rect x="296" y="155" width="20" height="55" rx="3" fill="#3b82f6"/>
                  <rect x="324" y="140" width="20" height="70" rx="3" fill="#93c5fd"/>
                  <rect x="352" y="150" width="20" height="60" rx="3" fill="#1d4ed8"/>
                  <rect x="212" y="218" width="208" height="8" rx="2" fill="#f1f5f9"/>
                  {/* Stats cards */}
                  <rect x="452" y="88" width="130" height="68" rx="10" fill="#1d4ed8"/>
                  <rect x="468" y="104" width="50" height="18" rx="4" fill="#fff" opacity="0.2"/>
                  <rect x="472" y="109" width="42" height="10" rx="2" fill="#fff"/>
                  <rect x="468" y="128" width="80" height="8" rx="2" fill="#bfdbfe"/>
                  <rect x="452" y="166" width="130" height="62" rx="10" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="468" y="180" width="50" height="14" rx="3" fill="#0f172a"/>
                  <rect x="468" y="200" width="90" height="8" rx="2" fill="#94a3b8"/>
                  {/* Bottom row */}
                  <rect x="196" y="252" width="116" height="130" rx="10" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="212" y="268" width="84" height="8" rx="2" fill="#0f172a"/>
                  <rect x="212" y="282" width="60" height="6" rx="2" fill="#94a3b8"/>
                  <rect x="212" y="296" width="84" height="56" rx="6" fill="#eff6ff"/>
                  <rect x="220" y="308" width="40" height="18" rx="3" fill="#1d4ed8" opacity="0.5"/>
                  <rect x="226" y="334" width="50" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="324" y="252" width="116" height="130" rx="10" fill="#0f172a"/>
                  <rect x="340" y="268" width="84" height="8" rx="2" fill="#e2e8f0"/>
                  <rect x="340" y="282" width="60" height="6" rx="2" fill="#475569"/>
                  <rect x="340" y="296" width="84" height="56" rx="6" fill="#1d4ed8" opacity="0.2"/>
                  <rect x="348" y="308" width="40" height="18" rx="3" fill="#3b82f6" opacity="0.6"/>
                  <rect x="452" y="252" width="130" height="130" rx="10" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="468" y="268" width="98" height="8" rx="2" fill="#0f172a"/>
                  <rect x="468" y="282" width="70" height="6" rx="2" fill="#94a3b8"/>
                  <circle cx="517" cy="330" r="26" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2"/>
                  <rect x="503" y="327" width="28" height="8" rx="2" fill="#1d4ed8"/>
                </svg>
                <div className="border-t border-border/50 bg-foreground/[0.02] px-5 py-4">
                  <p className="text-sm font-medium text-foreground">Dashboard / Product Interface</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Sidebar navigation · Data-rich · Dark/light hybrid</p>
                </div>
              </div>

              {/* Mockup 4: Clean minimalist */}
              <div className="overflow-hidden rounded-2xl border border-border/50 shadow-xl shadow-blue-600/5">
                <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  <rect width="600" height="400" fill="#ffffff"/>
                  {/* Nav */}
                  <rect width="600" height="60" fill="#fff"/>
                  <rect x="0" y="59" width="600" height="1" fill="#f1f5f9"/>
                  <rect x="40" y="24" width="12" height="12" rx="2" fill="#1d4ed8"/>
                  <rect x="58" y="25" width="72" height="10" rx="2" fill="#0f172a"/>
                  <rect x="286" y="25" width="36" height="10" rx="2" fill="#94a3b8"/>
                  <rect x="334" y="25" width="36" height="10" rx="2" fill="#94a3b8"/>
                  <rect x="382" y="25" width="36" height="10" rx="2" fill="#94a3b8"/>
                  <rect x="494" y="20" width="66" height="20" rx="10" fill="#0f172a"/>
                  <rect x="508" y="25" width="38" height="10" rx="2" fill="#fff" opacity="0.85"/>
                  {/* Full-width hero */}
                  <rect y="60" width="600" height="200" fill="#f8fafc"/>
                  <rect x="40" y="90" width="520" height="1" fill="#e2e8f0"/>
                  <rect x="200" y="100" width="200" height="16" rx="4" fill="#cbd5e1"/>
                  <rect x="120" y="126" width="360" height="28" rx="6" fill="#0f172a"/>
                  <rect x="160" y="162" width="280" height="14" rx="3" fill="#94a3b8"/>
                  <rect x="190" y="183" width="220" height="12" rx="3" fill="#cbd5e1"/>
                  <rect x="210" y="212" width="80" height="28" rx="14" fill="#0f172a"/>
                  <rect x="218" y="219" width="64" height="14" rx="3" fill="#fff" opacity="0.85"/>
                  <rect x="304" y="212" width="80" height="28" rx="14" fill="transparent" stroke="#e2e8f0" strokeWidth="1.5"/>
                  <rect x="316" y="219" width="56" height="14" rx="3" fill="#64748b"/>
                  {/* Feature row */}
                  <rect y="260" width="600" height="140" fill="#fff"/>
                  <rect x="40" y="278" width="155" height="100" rx="12" fill="#f8fafc" stroke="#f1f5f9" strokeWidth="1"/>
                  <rect x="56" y="296" width="28" height="28" rx="6" fill="#dbeafe"/>
                  <rect x="56" y="332" width="90" height="10" rx="2" fill="#0f172a"/>
                  <rect x="56" y="348" width="118" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="222" y="278" width="155" height="100" rx="12" fill="#f8fafc" stroke="#f1f5f9" strokeWidth="1"/>
                  <rect x="238" y="296" width="28" height="28" rx="6" fill="#e0e7ff"/>
                  <rect x="238" y="332" width="90" height="10" rx="2" fill="#0f172a"/>
                  <rect x="238" y="348" width="118" height="8" rx="2" fill="#94a3b8"/>
                  <rect x="404" y="278" width="155" height="100" rx="12" fill="#f8fafc" stroke="#f1f5f9" strokeWidth="1"/>
                  <rect x="420" y="296" width="28" height="28" rx="6" fill="#dbeafe"/>
                  <rect x="420" y="332" width="90" height="10" rx="2" fill="#0f172a"/>
                  <rect x="420" y="348" width="118" height="8" rx="2" fill="#94a3b8"/>
                </svg>
                <div className="border-t border-border/50 bg-foreground/[0.02] px-5 py-4">
                  <p className="text-sm font-medium text-foreground">Clean / Minimalist</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Full-width layout · Typography-led · Feature showcase</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative bg-foreground/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Our Process</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">From Brief to Live in 4–8 Weeks</h2>
              <p className="mt-4 text-lg text-muted-foreground">A structured process with clear milestones — so you know what to expect at every stage.</p>
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

        {/* Included */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Scope of Work</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What Is Included</h2>
              <p className="mt-4 text-lg text-muted-foreground">Every redesign project includes a complete, launch-ready package — without hidden additions.</p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4 rounded-xl border border-border/50 bg-background/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-blue-600/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/10 to-slate-400/15">
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

        {/* Testimonial */}
        <section className="relative bg-foreground/[0.02] py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-4xl text-blue-600/30 font-serif">&ldquo;</p>
            <blockquote className="mt-2 text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
              We had been operating with the same website for four years. The redesign process was straightforward and well-managed. Since launch, our enquiry rate has increased significantly and the feedback from prospective clients has been noticeably more positive.
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-slate-400/20 text-sm font-bold text-blue-700">RD</div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Managing Director</p>
                <p className="text-sm text-muted-foreground">Financial advisory firm, Dubai</p>
              </div>
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
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Interested? Let&apos;s Start With a Free Audit.</h2>
              <p className="mt-4 text-lg text-white/80">We will review your current website and share specific observations on design, performance, and conversion — at no cost and with no obligation.</p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="group bg-white text-blue-700 hover:bg-white/90">
                  <Link href="/contact">Request Free Audit <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
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
