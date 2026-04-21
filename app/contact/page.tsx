import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Next Horizons",
  description: "Contact Next Horizons to discuss a website redesign, due diligence software or a more tailored digital project.",
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@nexoriza.com",
    sub: "Response usually within one working day",
    href: "mailto:contact@nexoriza.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "IFZA Business Park, 44824, Dubai Silicon Oasis, Dubai",
    sub: "Next Horizons FZCO",
    href: null,
  },
  {
    icon: Clock,
    label: "Working week",
    value: "Monday to Friday",
    sub: "Calls by appointment",
    href: null,
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-700 to-slate-400" />
                <span className="text-muted-foreground">Contact</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Tell us what you are considering</h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                You can use the form below for website redesign, due diligence software or a broader digital project. We will come back with a sensible next step.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/50 bg-background/60 p-6 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700/10 to-slate-400/20">
                      <item.icon className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block text-base font-medium text-foreground hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-base font-medium text-foreground">{item.value}</p>
                      )}
                      <p className="mt-1 text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border/50 bg-background/70 p-8 backdrop-blur-sm sm:p-10">
              <h2 className="text-2xl font-semibold text-foreground">Project enquiry</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The form sends directly to contact@nexoriza.com. Please include a short description of what you need, your timeline and any relevant links.
              </p>

              <form action="https://formsubmit.co/contact@nexoriza.com" method="POST" className="mt-8 space-y-5">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://nexoriza.com/thank-you" />
                <input type="hidden" name="_subject" value="New enquiry via Next Horizons website" />
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">Name</label>
                  <input id="name" name="name" required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-blue-700" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">Email</label>
                    <input id="email" name="email" type="email" required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-blue-700" />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">Company</label>
                    <input id="company" name="company" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-blue-700" />
                  </div>
                </div>
                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-foreground">Area of interest</label>
                  <select id="service" name="service" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-blue-700">
                    <option>Website redesign</option>
                    <option>Due diligence software</option>
                    <option>Both / not sure yet</option>
                    <option>Other digital project</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">Message</label>
                  <textarea id="message" name="message" required rows={7} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-blue-700" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600 sm:w-auto">
                  Send enquiry
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
