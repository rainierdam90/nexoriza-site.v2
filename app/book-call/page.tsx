"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CheckCircle, Send, User, Mail, Phone, Building2, Clock, MessageSquare } from "lucide-react"
import { useState, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function BookCallForm() {
  const searchParams = useSearchParams()
  const topicParam = searchParams.get("topic") || ""

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeSlot, setTimeSlot] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  // Minimum date is tomorrow (UTC-safe)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  const topicLabel: Record<string, string> = {
    "compliance-specialist": "Speak to a Compliance Specialist",
    "discovery": "Introductory Call",
  }
  const topic = topicLabel[topicParam] || "Introductory Call"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("service", `Call Booking — ${topic}`)
      formData.set("timeSlot", timeSlot)

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Submission failed")
      setIsSubmitted(true)
      formRef.current?.reset()
      setTimeSlot("")
    } catch {
      setError("Something went wrong. Please try again or email us directly at contact@nexthorizons.ae")
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
                <Calendar className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-muted-foreground">{topic}</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Book a{" "}
                <span className="bg-gradient-to-r from-blue-700 to-slate-500 bg-clip-text text-transparent">
                  30-Minute Call
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Share a few details and your preferred time. We will confirm the appointment within one business day with a calendar invite.
              </p>
            </div>
          </div>
        </section>

        <section className="relative pb-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5">

              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-foreground">What to Expect</h2>
                <ol className="mt-6 space-y-5">
                  {[
                    { n: "1", title: "Submit your details", body: "Tell us who you are, how to reach you, and when you are available." },
                    { n: "2", title: "We confirm your slot", body: "Within one business day you receive a calendar invite with a video conferencing link." },
                    { n: "3", title: "30-minute call", body: "We discuss your situation, answer your questions, and give you an honest assessment of fit." },
                    { n: "4", title: "No pressure", body: "There is no obligation to proceed. You receive clarity either way." },
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
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <div>
                      <p className="font-semibold text-foreground">Availability</p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        Sunday to Thursday, 9:00–18:00 Gulf Standard Time (GST). We accommodate other time zones on request.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                        Thank you. We will confirm your appointment within one business day with a calendar invite to the email address you provided.
                      </p>
                      <Button variant="outline" className="mt-6" onClick={() => setIsSubmitted(false)}>
                        Book Another Call
                      </Button>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Your Details</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Takes 2 minutes. We respond within one business day.</p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <User className="h-4 w-4 text-blue-600" />
                            Full Name <span className="text-blue-600">*</span>
                          </label>
                          <Input id="name" name="name" placeholder="Your full name" required className="border-border/50 bg-background/50" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Building2 className="h-4 w-4 text-blue-600" />
                            Company <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                          </label>
                          <Input id="company" name="company" placeholder="Your company" className="border-border/50 bg-background/50" />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Mail className="h-4 w-4 text-blue-600" />
                            Email Address <span className="text-blue-600">*</span>
                          </label>
                          <Input id="email" name="email" type="email" placeholder="you@company.com" required className="border-border/50 bg-background/50" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Phone className="h-4 w-4 text-blue-600" />
                            Phone Number <span className="text-blue-600">*</span>
                          </label>
                          <Input id="phone" name="phone" type="tel" placeholder="+971 50 123 4567" required className="border-border/50 bg-background/50" />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="preferredDate" className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            Preferred Date <span className="text-blue-600">*</span>
                          </label>
                          <Input id="preferredDate" name="preferredDate" type="date" min={minDate} required className="border-border/50 bg-background/50" />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <Clock className="h-4 w-4 text-blue-600" />
                            Preferred Time <span className="text-blue-600">*</span>
                          </label>
                          <Select value={timeSlot} onValueChange={setTimeSlot} required>
                            <SelectTrigger className="border-border/50 bg-background/50">
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning-early">Morning (09:00–11:00 GST)</SelectItem>
                              <SelectItem value="morning-late">Late morning (11:00–13:00 GST)</SelectItem>
                              <SelectItem value="afternoon-early">Early afternoon (13:00–15:00 GST)</SelectItem>
                              <SelectItem value="afternoon-late">Late afternoon (15:00–18:00 GST)</SelectItem>
                              <SelectItem value="flexible">Flexible — suggest a time</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                          What would you like to discuss? <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="A brief note on the topic, your current situation, or specific questions. The more context, the more useful the call."
                          rows={4}
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
                        {isSubmitting ? "Sending..." : "Request Appointment →"}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        No commitment. We handle your data with care and never share it with third parties.
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

export default function BookCallPage() {
  return (
    <Suspense fallback={null}>
      <BookCallForm />
    </Suspense>
  )
}
