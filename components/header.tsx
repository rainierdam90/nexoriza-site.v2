"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700 to-slate-400">
            <span className="text-sm font-bold text-white">NH</span>
          </div>
          <span className="text-lg font-semibold text-foreground">Next Horizons</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/services/website-redesign" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Website Redesign
          </Link>
          <Link href="/services/due-diligence" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Due Diligence
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button asChild className="bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
            <Link href="/contact">Request a call</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4 px-4 py-6">
            <Link href="/services/website-redesign" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
              Website Redesign
            </Link>
            <Link href="/services/due-diligence" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
              Due Diligence
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Button asChild className="mt-2 bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Request a call
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
