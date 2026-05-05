import { isAdminAuthenticated } from "@/lib/admin-auth"
import { redirect, notFound } from "next/navigation"
import { getMockupSeed } from "@/lib/mockups-data"
import { formatPrice } from "@/lib/mockups"
import { MockupEditor } from "@/components/admin/mockup-editor"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ token: string }>
}

export const metadata: Metadata = {
  title: "Edit Mockup · Admin · Next Horizons",
  robots: { index: false, follow: false },
}

const STATUS_CLASSES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  paid: "bg-green-100 text-green-800 border-green-200",
  expired: "bg-slate-100 text-slate-700 border-slate-200",
}

export default async function AdminMockupPage({ params }: PageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const { token } = await params
  const mockup = await getMockupSeed(token)
  if (!mockup) notFound()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Link>
            <span className="text-muted-foreground">·</span>
            <h1 className="text-base font-semibold text-foreground">
              {mockup.companyName}
            </h1>
            <Badge variant="outline" className={STATUS_CLASSES[mockup.status]}>
              {mockup.status}
            </Badge>
          </div>

          <Link
            href={`/mockup/${token}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View customer page
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Token{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              {token}
            </code>{" "}
            · Price{" "}
            <strong className="text-foreground">
              {formatPrice(mockup.priceMinor, mockup.currency)}
            </strong>{" "}
            · {mockup.pages.length}{" "}
            {mockup.pages.length === 1 ? "page" : "pages"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Customer link:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              https://nexthorizons.ae/mockup/{token}
            </code>
          </p>
        </div>

        <MockupEditor mockup={mockup} />
      </main>
    </div>
  )
}
