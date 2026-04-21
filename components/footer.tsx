import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-foreground/[0.02]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700 to-slate-400">
                <span className="text-sm font-bold text-white">NH</span>
              </div>
              <span className="text-lg font-semibold text-foreground">Next Horizons</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Next Horizons develops modern websites and practical due diligence software for businesses that value clarity, trust and efficient execution.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <a href="mailto:contact@nexoriza.com" className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Mail className="h-4 w-4" />
                contact@nexoriza.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Next Horizons FZCO
                  <br />
                  IFZA Business Park
                  <br />
                  44824, Dubai Silicon Oasis
                  <br />
                  Dubai
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/services/website-redesign" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Website redesign</Link></li>
              <li><Link href="/services/due-diligence" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Due diligence software</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Request a proposal</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Book a call</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms of service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Next Horizons FZCO. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Dubai, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  )
}
