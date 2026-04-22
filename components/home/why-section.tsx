import { Cpu, Layers, Zap, Building2, ShieldCheck, Settings } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Built on Leading AI Models",
    description: "We select the most appropriate model for each task — GPT-4o, Claude, and specialised tools — rather than applying one solution to every problem.",
  },
  {
    icon: Layers,
    title: "Designed to Scale",
    description: "Whether you are a boutique firm or a large institution, our solutions are built on infrastructure that accommodates growth without requiring rebuilds.",
  },
  {
    icon: Zap,
    title: "Speed Without Compromise",
    description: "First design concepts in 48 hours. CDD reports in under 15 minutes. We believe efficient delivery and quality are entirely compatible.",
  },
  {
    icon: Building2,
    title: "Sector Experience That Shows",
    description: "Our compliance tools are built with input from experienced AML and compliance professionals — not adapted from generic AI frameworks.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance as a Foundation",
    description: "GDPR-aligned, FATF-aware, and built with audit-ready outputs from the outset — not retrofitted after the fact.",
  },
  {
    icon: Settings,
    title: "Configured to Your Requirements",
    description: "We adapt our solutions to your internal processes, templates, and risk appetite. Our tools work the way you work.",
  },
]

export function WhySection() {
  return (
    <section className="relative bg-foreground/[0.02] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Why Next Horizons</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Substance Over Presentation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The AI space is crowded with tools that look impressive in a demo. We focus on what holds up in daily professional use.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-blue-600/5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/10 to-slate-400/15">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
