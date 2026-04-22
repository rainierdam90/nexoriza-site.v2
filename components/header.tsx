"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/services/website-redesign" className="flex items-center">
          <Image src="/new_logo.png" alt="Next Horizons Logo" width={240} height={60} className="h-14 w-auto" priority />
        </Link>

        {/* Desktop Navigation */}
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
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4 px-4 py-6">
            {[
              { href: "/services/website-redesign", label: "Website Redesign" },
              { href: "/services/due-diligence", label: "Due Diligence" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Get in Touch</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
