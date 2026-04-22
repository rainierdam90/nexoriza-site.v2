import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "The redesign process was efficient and well-structured. The new site is considerably faster and we have seen a meaningful increase in enquiry volume since launch.",
    author: "Chief Marketing Officer",
    company: "Series B technology company",
    initials: "MV",
  },
  {
    quote: "The CDD reports are thorough and structured in a way that works for our compliance file. What previously took a day now takes a fraction of that time.",
    author: "Head of Compliance",
    company: "Mid-size asset manager, Europe",
    initials: "JB",
  },
  {
    quote: "We were initially uncertain about AI-generated design, but the quality of the concepts was genuinely high. The team understood our audience and brand without extensive briefing.",
    author: "Founder",
    company: "Financial services firm, Dubai",
    initials: "AL",
  },
]

const clientTypes = [
  "Banks & Credit Institutions",
  "Asset Managers",
  "Fintech Companies",
  "Law Firms",
  "Compliance Consultancies",
  "Technology Scale-ups",
]

export function TrustSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Clients across sectors
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {clientTypes.map((type) => (
              <span key={type} className="rounded-full border border-border/50 bg-foreground/[0.03] px-4 py-2 text-sm text-muted-foreground">
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Client Feedback</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What Our Clients Say
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm">
                <Quote className="h-8 w-8 text-blue-600/20" />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-slate-400/20 text-xs font-bold text-blue-700">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
