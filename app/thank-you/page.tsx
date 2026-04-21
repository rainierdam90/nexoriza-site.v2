import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex flex-1 max-w-3xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-700/10 to-slate-400/20">
          <CheckCircle className="h-8 w-8 text-blue-700" />
        </div>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground">Thank you</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your message has been sent. We will review it and come back to you as soon as possible.
        </p>
        <Button asChild className="mt-8 bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600">
          <Link href="/">Return to homepage</Link>
        </Button>
      </main>
      <Footer />
    </div>
  )
}
