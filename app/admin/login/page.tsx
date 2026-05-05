import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, AlertCircle } from "lucide-react"
import { loginAction } from "../actions"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin · Next Horizons",
  robots: { index: false, follow: false },
}

interface PageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  // Already logged in? Skip to dashboard.
  if (await isAdminAuthenticated()) {
    redirect("/admin")
  }

  const { error } = await searchParams
  const showError = error === "1"

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border/50 bg-background p-8 shadow-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your password to manage mockups
          </p>
        </div>

        {showError && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>Incorrect password.</p>
          </div>
        )}

        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className="mt-2"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600"
            size="lg"
          >
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Authorised personnel only.
        </p>
      </div>
    </div>
  )
}
