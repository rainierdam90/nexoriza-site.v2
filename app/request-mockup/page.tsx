"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Send, Globe, User, Mail, MessageSquare } from "lucide-react"
import { useState } from "react"

export default function RequestMockupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("service", "Free Redesign Mockup Request")

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Submission failed")
      setIsSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again or email us directly at rainier@nexthorizonsglobal.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-20">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-muted-foreground">Free Redesign Mockup</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                See Your New Website{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  Before You Commit
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Send us your current website and we will prepare a free homepage redesign concept for it. You will also receive a clear, fixed price for completing the full website. If you like what we have created, we can continue. If not, there is nothing to pay.
              </p>
            </div>
          </div>
        </section>

        <section className="relative pb-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5">

              {/* Left: what to expect */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-foreground">What Happens Next</h2>
                <ol className="mt-6 space-y-5">
                  {[
                    { n: "1", title: "Submit Your Details", body: "Send us your current website, your contact details and anything specific you would like us to take into account." },
                    { n: "2", title: "We Review Your Website", body: "We look at your existing design, content, structure and how the website currently works for visitors. We then prepare a new homepage design direction based on your business and brand." },
                    { n: "3", title: "You Receive the Mockup + Price", body: "Within 48 hours, you receive your first homepage concept together with a clear, fixed price for completing the redesign. The concept shows you the visual direction we would take. It is not a complete or production-ready website. No open-ended hourly billing and no vague estimate of what it may eventually cost." },
                    { n: "4", title: "You Decide", body: "If you like what we have created, we build the complete website. There is no pressure to proceed. You can also choose to receive the finished code and implement the website yourself." },
                  ].map((step) => (
                    <li key={step.n} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500 text-sm font-bold text-white">
                        {step.n}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{step.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 rounded-xl border border-blue-600/20 bg-blue-600/5 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <div>
                      <p className="font-semibold text-foreground">Our Price Match Commitment</p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        Our aim is to offer highly competitive pricing for professional AI-powered website redesign. If you receive a lower price for genuinely comparable work and quality, send us the quotation. We will review the scope, deliverables, technology and support included and, where possible, match it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-3">
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm">
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-600/10 to-slate-400/10 blur-3xl" />

                  {isSubmitted ? (
                    <div className="relative flex flex-col items-center justify-center py-12 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500">
                        <Send className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-foreground">Request Received</h3>
                      <p className="mt-3 max-w-sm text-muted-foreground leading-relaxed">
                        Thank you. We will review your website and send you a free design concept with a fixed price within 48 hours.
                      </p>
                      <Button variant="outline" className="mt-6" onClick={() => setIsSubmitted(false)}>
                        Submit Another Request
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="relative space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Request Your Free Mockup</h3>
                        <p className="mt-1 text-sm text-muted-foreground">It takes around two minutes to submit your request. We aim to send your first homepage concept within 48 hours.</p>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="website" className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Globe className="h-4 w-4 text-blue-600" />
                          Current Website URL <span className="text-blue-600">*</span>
                        </label>
                        <Input
                          id="website"
                          name="website"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          required
                          className="border-border/50 bg-background/50"
                        />
                        <p className="text-xs text-muted-foreground">We use this to review your current website and prepare the redesign.</p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <User className="h-4 w-4 text-blue-600" />
                            Your Name <span className="text-blue-600">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Full name"
                            required
                            className="border-border/50 bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Mail className="h-4 w-4 text-blue-600" />
                            Email Address <span className="text-blue-600">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@company.com"
                            required
                            className="border-border/50 bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                          Your Wishes <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us if there is anything you specifically want to change, improve or keep."
                          rows={5}
                          className="border-border/50 bg-background/50 resize-none"
                        />
                      </div>

                      {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600"
                        size="lg"
                      >
                        {isSubmitting ? "Sending..." : "Request My Free Mockup"}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        Free of charge and without any obligation to proceed. The mockup is an initial homepage design concept, not a complete or production-ready website.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
