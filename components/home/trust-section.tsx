const clientTypes = [
  "Financial services",
  "Professional services",
  "Technology companies",
  "Property businesses",
  "Founder-led firms",
  "Regulated organisations",
]

export function TrustSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Relevant for organisations that value trust and presentation</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {clientTypes.map((type) => (
              <span key={type} className="rounded-full border border-border/50 bg-foreground/[0.03] px-4 py-2 text-sm text-muted-foreground">
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Clearer positioning",
              text: "A redesign should make it easier for the right client to understand what you offer, why it matters and what to do next.",
            },
            {
              title: "Better workflow discipline",
              text: "Due diligence software should reduce manual repetition, improve consistency and leave a usable audit trail for internal review.",
            },
            {
              title: "Professional presentation",
              text: "A calm, credible interface usually supports conversion and trust better than an over-designed or over-claimed message.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
