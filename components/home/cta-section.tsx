import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-slate-500" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Would you like to discuss a project?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            If you are considering a redesign or want to explore a due diligence workflow, we can arrange an initial conversation and outline a suitable next step.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="group bg-white text-blue-800 hover:bg-white/90 shadow-lg">
              <Link href="/contact">
                Contact us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
              <Link href="/contact">
                <Calendar className="mr-2 h-4 w-4" />
                Request a call back
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/60">No obligation · Response typically within one working day</p>
        </div>
      </div>
    </section>
  )
}
