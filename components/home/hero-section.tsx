import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/animated-background"
import { ArrowRight, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <AnimatedBackground />
      
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-700 to-slate-400 animate-pulse" />
          <span className="text-muted-foreground">AI-Driven Solutions · Dubai</span>
        </div>

        <h1 className="max-w-5xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Sharper Websites.{" "}
          <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
            Smarter Compliance.
          </span>
          {" "}Powered by AI.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
          We help organisations modernise their digital presence and streamline compliance workflows — using the most capable AI available, applied with precision.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="flex -space-x-1">
            {["BF","JK","RM","AL"].map((init, i) => (
              <div key={i} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-blue-600/40 to-slate-400/40 text-[9px] font-bold text-blue-700">
                {init}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>Trusted by financial institutions and growing companies across EMEA</span>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600 shadow-lg shadow-blue-600/20"
          >
            <Link href="/services/website-redesign">
              Website Redesign
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80"
          >
            <Link href="/services/due-diligence">
              Due Diligence Software
            </Link>
          </Button>
        </div>

        <div className="mt-20 w-full max-w-3xl">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/30">
            {[
              { value: "80%", label: "Reduction in CDD research time" },
              { value: "3×", label: "Average conversion uplift post-redesign" },
              { value: "48h", label: "To first design concept" },
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
