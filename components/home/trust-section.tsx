
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


      </div>
    </section>
  )
}
