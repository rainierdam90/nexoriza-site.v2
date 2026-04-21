import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Next Horizons",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex-1 max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>This website is operated by Next Horizons FZCO, IFZA Business Park, 44824, Dubai Silicon Oasis, Dubai.</p>
          <p>When you contact us through the website, we may receive the personal information you provide, such as your name, email address, company name and the contents of your message.</p>
          <p>We use this information only to respond to enquiries, assess potential projects and maintain relevant correspondence. We do not sell personal data to third parties.</p>
          <p>The contact form on this website uses a third-party form delivery service to send enquiries to contact@nexoriza.com. Please avoid sending sensitive information unless specifically requested.</p>
          <p>If you would like to request access to, correction of or deletion of personal information you have submitted, you can contact us at contact@nexoriza.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
