import Link from "next/link"
import { Linkedin, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-foreground/[0.02]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <Link href="/services/website-redesign" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700 to-slate-400">
                <span className="text-sm font-bold text-white">NH</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-foreground tracking-tight">Next Horizons</span>
                <span className="text-[10px] text-muted-foreground tracking-wide">Software &amp; Web Design</span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              AI-powered website redesign and intelligent due diligence software — built for organisations that expect measurable results.
            </p>
            <div className="mt-6 space-y-2">
              <a href="mailto:contact@nexthorizons.ae" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <Mail className="h-4 w-4" />
                contact@nexthorizons.ae
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Next Horizons FZCO · IFZA Business Park 44824<br />Dubai Silicon Oasis, Dubai, UAE</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/services/website-redesign" className="text-sm text-muted-foreground transition-colors hover:text-foreground">AI Website Redesign</Link></li>
              <li><Link href="/request-mockup" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Free Redesign Mockup</Link></li>
              <li><Link href="/services/due-diligence" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Due Diligence Software</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Request a Demo</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Next Horizons FZCO. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Next Horizons Software &amp; Web Design · Dubai Silicon Oasis, UAE
          </p>
        </div>
      </div>
    </footer>
  )
}
