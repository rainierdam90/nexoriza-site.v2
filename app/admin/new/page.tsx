import { isAdminAuthenticated } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import { NewMockupForm } from "@/components/admin/new-mockup-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Mockup · Admin · Next Horizons",
  robots: { index: false, follow: false },
}

export default async function NewMockupPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
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
              New Mockup
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Create a new customer mockup
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Step 1: enter the customer&apos;s details. After saving you can upload before/after screenshots for each page.
          </p>
        </div>

        <NewMockupForm />
      </main>
    </div>
  )
}
