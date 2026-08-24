"use client"

import { Header } from "@/components/header"
import { submitViaFormSubmit, submitErrorMessage } from "@/lib/submit-form"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MapPin, Calendar, Send, Clock, MessageSquare, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [service, setService] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("service", service)

      await submitViaFormSubmit(formData)

      setIsSubmitted(true)
      formRef.current?.reset()
      setService("")
    } catch (err) {
      setError(submitErrorMessage(err, "Something went wrong. Please try again or email us directly."))
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
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-700 to-slate-400" />
                <span className="text-muted-foreground">Contact</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Let’s Discuss What{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  You Are Working On
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Tell us what you need and we will tell you whether we think we can help. You do not need to prepare a detailed brief beforehand.
              </p>
            </div>
          </div>
        </section>

        <section className="relative pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">

              {/* Left */}
              <div className="lg:pr-8">
                <h2 className="text-2xl font-semibold text-foreground">Good Reasons to Get in Touch</h2>
                <ul className="mt-6 space-y-3">
                  {[
                    { title: "Website redesign", body: "Ask us to review your current website and prepare a free homepage redesign concept." },
                    { title: "Due diligence demo", body: "See the compliance software carry out a live review using a public entity of your choice." },
                    { title: "Project scope", body: "Discuss a website redesign, functionality, timing or implementation." },
                    { title: "Compliance tooling", body: "Find out whether the standalone software can be configured around the due diligence use cases you need." },
                    { title: "Pricing or availability", body: "Ask us directly about cost, implementation or timing." },
                  ].map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      <span>
                        <span className="font-medium text-foreground">{r.title}</span>
                        <br />
                        {r.body}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-5">
                  {[
                    { icon: Mail, label: "Email", value: "rainier@nexthorizonsglobal.com", sub: "We normally respond within one business day.", href: "mailto:rainier@nexthorizonsglobal.com" },
                    { icon: MapPin, label: "Address", value: "Next Horizons FZCO", sub: "IFZA Business Park 44824, Dubai Silicon Oasis, Dubai, UAE", href: null },
                    { icon: Clock, label: "Response time", value: "Within one business day", sub: "Sunday to Thursday", href: null },
                  ].map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/10 to-slate-400/15">
                        <info.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="font-medium text-foreground transition-colors hover:text-blue-600">{info.value}</a>
                        ) : (
                          <p className="font-medium text-foreground">{info.value}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{info.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-xl border border-border/50 bg-gradient-to-br from-blue-600/5 to-slate-400/10 p-6">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-foreground">Prefer to Speak Directly?</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Book a 30-minute introductory call. Tell us what you are working on, ask any questions you have and we will give you a clear idea of what we can offer.
                  </p>
                  <Button asChild variant="outline" className="mt-4 gap-2 border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80">
                    <Link href="/book-call">
                      <Calendar className="h-4 w-4" />
                      Book a 30-Minute Call
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Form */}
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-600/10 to-slate-400/15 blur-3xl" />

                {isSubmitted ? (
                  <div className="relative flex h-full flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-slate-500">
                      <Send className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-foreground">Message Received</h3>
                    <p className="mt-3 max-w-sm text-muted-foreground">
                      Thank you for getting in touch. We will review your message and respond within one business day. If the matter is time-sensitive, please email us directly.
                    </p>
                    <Button variant="outline" className="mt-6" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Send a Message</h3>
                      <p className="mt-1 text-sm text-muted-foreground">We normally respond within one business day.</p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name *</label>
                        <Input id="name" name="name" placeholder="Your full name" required className="border-border/50 bg-background/50" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-foreground">Company</label>
                        <Input id="company" name="company" placeholder="Your company" className="border-border/50 bg-background/50" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">Work Email *</label>
                      <Input id="email" name="email" type="email" placeholder="you@company.com" required className="border-border/50 bg-background/50" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">How can we help?</label>
                      <Select value={service} onValueChange={setService}>
                        <SelectTrigger className="border-border/50 bg-background/50">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website-redesign">Website Redesign</SelectItem>
                          <SelectItem value="website-audit">Free Website Audit</SelectItem>
                          <SelectItem value="due-diligence">Due Diligence Platform</SelectItem>
                          <SelectItem value="demo">Request a Demonstration</SelectItem>
                          <SelectItem value="pricing">Pricing &amp; Availability</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">Your Message *</label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us briefly what you would like to discuss."
                        rows={5}
                        required
                        className="resize-none border-border/50 bg-background/50"
                      />
                    </div>

                    {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600"
                    >
                      {isSubmitting ? "Sending…" : "Send Message"}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      We handle the information you submit in accordance with our Privacy Policy.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
