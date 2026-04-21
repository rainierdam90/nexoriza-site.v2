import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Shield, ArrowRight, CheckCircle } from "lucide-react"

const services = [
  {
    icon: Globe,
    badge: "Website redesign",
    title: "Modern websites designed to convert with less friction",
    description:
      "We redesign websites for businesses that need a clearer proposition, stronger presentation and a better path to enquiry. The focus is on performance, usability and credibility.",
    bullets: [
      "Clear page structure and stronger calls to action",
      "Modern build stack for speed, stability and SEO",
      "Copy refined for clarity and conversion",
      "Responsive design across desktop, tablet and mobile",
    ],
    href: "/services/website-redesign",
    cta: "See website redesign",
    gradient: "from-blue-700 to-slate-400",
  },
  {
    icon: Shield,
    badge: "Due diligence software",
    title: "AI-supported due diligence with a structured audit trail",
    description:
      "Our due diligence platform brings together screening, ownership checks, adverse media and reporting in one workflow. It supports compliance teams that need speed without losing oversight.",
    bullets: [
      "Structured review workflow with clear outputs",
      "Entity screening and adverse media collection",
      "Risk summaries for internal review and escalation",
      "Designed for financial and regulated environments",
    ],
    href: "/services/due-diligence",
    cta: "View due diligence software",
    gradient: "from-slate-700 to-blue-500",
  },
]

export function ServicesSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Services</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Two focused offers, delivered with the same standard of care
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We work where clarity matters: how a business presents itself online, and how it reviews information before taking risk.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-xl hover:shadow-blue-700/5">
              <div className={`absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`} />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient}`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`rounded-full border border-border/50 px-3 py-1 text-xs font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                    {service.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold leading-snug text-foreground">{service.title}</h3>
                <p className="mt-3 text-muted-foreground">{service.description}</p>

                <ul className="mt-5 space-y-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 shrink-0 text-blue-700" />
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
