import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Shield, ArrowRight, CheckCircle } from "lucide-react"

const services = [
  {
    icon: Globe,
    badge: "Website Redesign",
    title: "A Digital Presence That Reflects the Quality of Your Work",
    description: "Many organisations have a website that no longer represents them accurately. We redesign it — using advanced AI to accelerate the design process and modern development practices to ensure the result performs as well as it looks.",
    bullets: [
      "AI-generated design concepts within 48 hours",
      "Built on Next.js for performance and SEO",
      "Conversion-optimised structure and copy",
      "Mobile-first, fully responsive",
    ],
    href: "/services/website-redesign",
    cta: "Learn more",
    gradient: "from-blue-700 to-blue-500",
  },
  {
    icon: Shield,
    badge: "Due Diligence Software",
    title: "Compliance Intelligence That Keeps Pace With the Regulatory Environment",
    description: "Our AI platform automates the research-intensive parts of customer due diligence — OSINT gathering, sanctions screening, adverse media, and report drafting — giving your compliance team the capacity to focus on judgement, not data collection.",
    bullets: [
      "OSINT across 500+ public data sources",
      "CDD reports aligned with FATF and EU AML directives",
      "Real-time sanctions and PEP screening",
      "High-risk country and sector monitoring",
    ],
    href: "/services/due-diligence",
    cta: "Request a demo",
    gradient: "from-slate-600 to-blue-600",
  },
]

export function ServicesSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">What We Do</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Two Distinct Services. One Underlying Principle.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether the challenge is digital presence or regulatory compliance, we apply the same approach: well-designed AI systems, built for professionals who care about outcomes.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-xl hover:shadow-blue-600/5"
            >
              <div className={`absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`} />
              
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient}`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="rounded-full border border-border/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                    {service.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-foreground leading-snug">
                  {service.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 shrink-0 text-blue-600" />
                      {b}
                    </li>
                  ))}
                </ul>

                <Button asChild variant="ghost" className="group/btn mt-6 -ml-4 text-foreground">
                  <Link href={service.href}>
                    {service.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
