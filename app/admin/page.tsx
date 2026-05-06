import { isAdminAuthenticated } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import { getAllMockups, formatPrice, type MockupStatus } from "@/lib/mockups"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  LogOut,
  CircleDot,
  CheckCircle2,
  XCircle,
  Plus,
  Pencil,
} from "lucide-react"
import Link from "next/link"
import { logoutAction } from "./actions"
import { CopyButton } from "@/components/admin/copy-button"
import type { Metadata } from "next"

// Force dynamic rendering — admin and customer-private pages must
// always reflect the latest state, never a cached snapshot.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin Dashboard · Next Horizons",
  robots: { index: false, follow: false },
}

const STATUS_CONFIG: Record<
  MockupStatus,
  { label: string; className: string; icon: typeof CircleDot }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800 border-amber-200",
    icon: CircleDot,
  },
  paid: {
    label: "Paid",
    className: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
  },
  expired: {
    label: "Expired",
    className: "bg-slate-100 text-slate-700 border-slate-200",
    icon: XCircle,
  },
}

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const mockups = await getAllMockups()

  const totals = {
    pending: mockups.filter((m) => m.status === "pending").length,
    paid: mockups.filter((m) => m.status === "paid").length,
    expired: mockups.filter((m) => m.status === "expired").length,
  }

  // Total revenue from paid mockups, grouped by currency
  const revenueByCurrency = mockups
    .filter((m) => m.status === "paid")
    .reduce<Record<string, number>>((acc, m) => {
      acc[m.currency] = (acc[m.currency] ?? 0) + m.priceMinor
      return acc
    }, {})

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Mockup Admin</h1>
            <p className="text-xs text-muted-foreground">Next Horizons internal</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild className="bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
              <Link href="/admin/new">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                New mockup
              </Link>
            </Button>
            <Link
              href="/"
              className="ml-2 text-sm text-muted-foreground hover:text-foreground"
            >
              View site
            </Link>
            <form action={logoutAction}>
              <Button type="submit" variant="ghost" size="sm">
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Stats grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Pending" value={String(totals.pending)} hint="Awaiting payment" />
          <StatCard label="Paid" value={String(totals.paid)} hint="Successfully ordered" />
          <StatCard label="Expired" value={String(totals.expired)} hint="No longer accessible" />
          <StatCard
            label="Revenue"
            value={
              Object.keys(revenueByCurrency).length === 0
                ? "—"
                : Object.entries(revenueByCurrency)
                    .map(([cur, val]) =>
                      formatPrice(val, cur as Parameters<typeof formatPrice>[1]),
                    )
                    .join(" + ")
            }
            hint="From paid mockups"
          />
        </div>

        {/* Mockups table */}
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-base font-semibold text-foreground">
              All mockups ({mockups.length})
            </h2>
          </div>

          {mockups.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              No mockups yet. Add some in <code className="rounded bg-muted px-1.5 py-0.5">data/mockups.json</code>.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {mockups.map((m) => {
                const cfg = STATUS_CONFIG[m.status]
                const StatusIcon = cfg.icon
                return (
                  <div key={m.token} className="px-6 py-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-semibold text-foreground">
                            {m.companyName}
                          </h3>
                          <Badge variant="outline" className={cfg.className}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {cfg.label}
                          </Badge>
                        </div>

                        {m.contactName && (
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            Contact: {m.contactName}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                          <span className="font-mono">
                            <CopyableToken token={m.token} />
                          </span>
                          <span>·</span>
                          <span>
                            <strong className="font-medium text-foreground">
                              {formatPrice(m.priceMinor, m.currency)}
                            </strong>{" "}
                            ({m.currency})
                          </span>
                          <span>·</span>
                          <span>{m.pages.length} {m.pages.length === 1 ? "page" : "pages"}</span>
                          <span>·</span>
                          <span>Created {new Date(m.createdAt).toLocaleDateString("en-GB")}</span>
                          {m.paidAt && (
                            <>
                              <span>·</span>
                              <span className="text-green-700">
                                Paid {new Date(m.paidAt).toLocaleDateString("en-GB")}
                              </span>
                            </>
                          )}
                        </div>

                        {m.internalNote && (
                          <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-900 border border-amber-100">
                            <strong>Internal note:</strong> {m.internalNote}
                          </p>
                        )}

                        {m.stripePaymentIntentId && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            Stripe PI:{" "}
                            <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
                              {m.stripePaymentIntentId}
                            </code>
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/mockup/${m.token}`}>
                            <Pencil className="mr-1.5 h-3.5 w-3.5" />
                            Edit
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/mockup/${m.token}`} target="_blank">
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                            Open
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h3 className="font-semibold text-blue-900">How the admin works</h3>
          <ol className="mt-3 space-y-1.5 text-sm text-blue-900 list-decimal list-inside">
            <li>Click <strong>New mockup</strong> at the top right.</li>
            <li>Fill in the customer&apos;s details and click <em>Create</em>.</li>
            <li>Upload before/after screenshots for each page.</li>
            <li>Send the customer their unique link: <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">https://nexthorizons.ae/mockup/&lt;token&gt;</code></li>
          </ol>
          <p className="mt-3 text-xs text-blue-800">
            See <code>CHECKOUT_SETUP.md</code> in the repo for Stripe + storage configuration details.
          </p>
        </div>
      </main>
    </div>
  )
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint: string
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  )
}

/* Client component for copy-to-clipboard token */
function CopyableToken({ token }: { token: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono">{token}</code>
      <CopyButton value={token} />
    </span>
  )
}

