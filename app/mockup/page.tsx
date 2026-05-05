"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, ArrowRight, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

/**
 * Public landing page for /mockup. Lets a customer paste in the token
 * we emailed them and jump to their private mockup page.
 *
 * Note: this page is publicly accessible. Individual mockup pages
 * (/mockup/[token]) are noindex'd. We don't reveal whether a given token
 * exists from this page either — if invalid, the [token] page returns 404.
 */
export default function MockupEntryPage() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = token.trim()
    if (!cleaned) return
    setSubmitting(true)
    router.push(`/mockup/${encodeURIComponent(cleaned)}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-20">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Access Your{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  Mockup
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                If we&apos;ve prepared a redesign mockup for you, you should have received an email with a private link. Paste your access code below or follow the link directly.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-12 mx-auto max-w-md rounded-2xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm"
            >
              <label htmlFor="token" className="text-sm font-medium text-foreground">
                Access code
              </label>
              <Input
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="e.g. acme-trading-abc123xyz"
                className="mt-2 border-border/50 bg-background/50 font-mono"
                autoFocus
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
              />
              <Button
                type="submit"
                disabled={submitting || !token.trim()}
                className="mt-4 w-full bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600"
                size="lg"
              >
                View Mockup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have a mockup yet?
              </p>
              <a
                href="/request-mockup"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                Request a free redesign mockup
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
