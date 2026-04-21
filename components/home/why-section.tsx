import { Cpu, Layers, Zap, Building2, ShieldCheck, Settings } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "AI used where it adds value",
    description: "We use AI to speed up design, research and structuring work where it improves output. It is a tool in the process, not the whole message.",
  },
  {
    icon: Layers,
    title: "Modern architecture",
    description: "Web projects are built on a current stack with a focus on maintainability, speed and clean deployment.",
  },
  {
    icon: Zap,
    title: "Efficient delivery",
    description: "We keep the process focused. Clear scope, direct feedback rounds and visible progress matter more than unnecessary complexity.",
  },
  {
    icon: Building2,
    title: "Comfortable in regulated environments",
    description: "Our due diligence proposition is shaped around organisations that need evidence, traceability and structured review.",
  },
  {
    icon: ShieldCheck,
    title: "Risk awareness built in",
    description: "From data handling to reporting logic, we design with oversight and accountability in mind.",
  },
  {
    icon: Settings,
    title: "Tailored to the context",
    description: "We adapt the delivery to your commercial goals, internal processes and stakeholder expectations rather than forcing a generic template.",
  },
]

export function WhySection() {
  return (
    <section className="relative bg-foreground/[0.02] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">Why Next Horizons</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">A measured approach, with commercial focus</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We aim for work that is persuasive, usable and properly finished. That usually performs better than something louder but less considered.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group relative rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-blue-700/5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700/10 to-slate-400/20">
                  <feature.icon className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
