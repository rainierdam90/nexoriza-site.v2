import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/animated-background"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <AnimatedBackground />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-blue-700 to-slate-400" />
          <span className="text-muted-foreground">AI website delivery and due diligence software · Dubai</span>
        </div>

        <h1 className="max-w-5xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Clear digital products,
          <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent"> built with purpose</span>
        </h1>

        <p className="mt-6 max-w-3xl text-pretty text-lg text-muted-foreground sm:text-xl">
          Next Horizons helps organisations improve their digital presence and streamline due diligence work. We combine modern design, practical AI and structured delivery.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="group bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600 shadow-lg shadow-blue-700/20">
            <Link href="/services/website-redesign">
              View website redesign
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80">
            <Link href="/services/due-diligence">Explore due diligence software</Link>
          </Button>
        </div>

        <div className="mt-20 w-full max-w-3xl">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/50 sm:grid-cols-3">
            {[
              { value: "Fast", label: "Initial concepts and software demos prepared without unnecessary delay" },
              { value: "Practical", label: "Built around real business requirements rather than novelty" },
              { value: "Structured", label: "Clear scope, clear delivery and clear next steps" },
            ].map((stat, i) => (
              <div key={i} className="bg-background/80 px-4 py-6 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent sm:text-3xl">
                  {stat.value}
                </div>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
