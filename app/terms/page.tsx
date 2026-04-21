import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Next Horizons",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex-1 max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>The information on this website is provided for general informational purposes only and does not constitute legal, compliance or other regulated professional advice.</p>
          <p>Any project engagement, software discussion or proposal is subject to separate written agreement, including scope, fees, timelines and applicable terms.</p>
          <p>We aim to keep the content accurate and up to date, but we do not guarantee that all information on the website is complete or current at all times.</p>
          <p>All website content, branding and design materials remain the intellectual property of Next Horizons FZCO unless otherwise agreed in writing.</p>
          <p>For questions relating to these terms, please contact contact@nexoriza.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
