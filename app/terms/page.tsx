import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Next Horizons",
  description: "The terms and conditions governing the use of the Next Horizons website and services.",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-20">
          <AnimatedBackground />
          <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-700 to-slate-400" />
                <span className="text-muted-foreground">Terms of Service</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-6 text-sm text-muted-foreground">
                Last updated: August 2026
              </p>
            </div>
          </div>
        </section>

        <section className="relative pb-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-10 text-muted-foreground leading-relaxed">

              <div>
                <p>
                  These Terms of Service apply to your use of the Next Horizons website and services provided by Next Horizons FZCO (&ldquo;Next Horizons&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;).
                </p>
                <p className="mt-4">
                  By using the website or engaging our services, you agree to these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">1. About Us</h2>
                <p className="mt-4">
                  Next Horizons FZCO is incorporated in the International Free Zone Authority (IFZA) and registered at IFZA Business Park 44824, Dubai Silicon Oasis, Dubai, United Arab Emirates.
                </p>
                <p className="mt-4">
                  We provide AI-assisted website redesign services and due diligence software for professional and regulated organisations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">2. Scope of Services</h2>
                <p className="mt-4">
                  Our services may include website design, redesign, development, deployment and support; provision, configuration and support of our due diligence software; and related advisory, training and scoping work.
                </p>
                <p className="mt-4">
                  The specific work, deliverables, timing and fees for an individual project will be agreed separately in a quotation, statement of work or other written agreement.
                </p>
                <p className="mt-4">
                  Where that agreement conflicts with these general Terms, the specific project agreement will take priority.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">3. Quotations and Mockups</h2>
                <p className="mt-4">
                  Free homepage design concepts and quotations provided as part of our mockup process are provided without obligation on either side.
                </p>
                <p className="mt-4">
                  The free concept is intended to demonstrate an initial visual direction and is not a complete or production-ready website.
                </p>
                <p className="mt-4">
                  Unless stated otherwise, quotations remain valid for 30 days.
                </p>
                <p className="mt-4">
                  A contractual relationship starts only once you accept a quotation in writing or enter into a separate Engagement Agreement with us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">4. Price Match Commitment</h2>
                <p className="mt-4">
                  We offer a price-match commitment for comparable website redesign services.
                </p>
                <p className="mt-4">
                  For a competing quotation to qualify, it must cover a genuinely comparable scope, quality, deliverables, technology and level of post-launch support.
                </p>
                <p className="mt-4">
                  The price must also fall within reasonable market pricing for professional AI-assisted website redesign.
                </p>
                <p className="mt-4">
                  You may be asked to provide the competing quotation, including enough information for us to compare the scope and pricing.
                </p>
                <p className="mt-4">
                  The quotation must come from an identifiable independent provider and must represent a genuine commercial offer. Internal estimates, DIY calculations and temporary promotional offers do not qualify.
                </p>
                <p className="mt-4">
                  We reserve the right to determine whether a quotation is genuinely comparable and may decline to match a price where doing so would require us to materially reduce the agreed scope, quality or delivery standard.
                </p>
                <p className="mt-4">
                  The price-match commitment reflects our confidence in our pricing but does not create an unconditional obligation to match every lower quotation.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">5. Fees and Payment</h2>
                <p className="mt-4">
                  Fees are set out in the relevant quotation or project agreement.
                </p>
                <p className="mt-4">
                  Unless agreed otherwise, invoices are payable within 14 days in the currency shown on the invoice.
                </p>
                <p className="mt-4">
                  If payment becomes overdue, we may suspend work after providing reasonable written notice.
                </p>
                <p className="mt-4">
                  Applicable taxes, including VAT where required, are charged in addition to the stated fees unless expressly included.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">6. Client Responsibilities</h2>
                <p className="mt-4">
                  To allow us to provide the agreed services, clients are responsible for providing accurate and timely information, materials, access, feedback and approvals.
                </p>
                <p className="mt-4">
                  Clients are also responsible for making sure materials supplied to us can legally be used and that their use of our services and deliverables complies with applicable law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">7. Intellectual Property</h2>
                <p className="mt-4">
                  Once all applicable fees have been paid, you receive the ownership rights or licence to the final deliverables specified in the relevant project agreement.
                </p>
                <p className="mt-4">
                  Next Horizons retains ownership of existing tools, software components, frameworks, libraries, methodologies and generic code used in producing the work.
                </p>
                <p className="mt-4">
                  Where these components are included in your final deliverables, you receive the rights required to use them as part of those deliverables.
                </p>
                <p className="mt-4">
                  You retain ownership of content, trademarks and other materials you provide to us and allow us to use those materials where needed to provide the agreed services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">8. Due Diligence Software</h2>
                <p className="mt-4">
                  Our due diligence software is provided under the applicable licence or project agreement.
                </p>
                <p className="mt-4">
                  The software is intended to assist compliance professionals. It does not constitute legal, regulatory or compliance advice.
                </p>
                <p className="mt-4">
                  Your organisation remains responsible for meeting its own legal and regulatory obligations, including requirements relating to AML, counter-terrorist financing and sanctions.
                </p>
                <p className="mt-4">
                  Software output is intended to support professional judgement, not replace it.
                </p>
                <p className="mt-4">
                  The software is intended to operate as a standalone application unless wider integration is expressly included in a separate written scope.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">9. Confidentiality</h2>
                <p className="mt-4">
                  Both parties agree to keep non-public information received in connection with an engagement confidential and to use it only for the purposes of that engagement.
                </p>
                <p className="mt-4">
                  Unless applicable law requires a longer period, this obligation continues for three years after the engagement ends.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">10. Privacy</h2>
                <p className="mt-4">
                  Our handling of personal information is described in our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>, which forms part of these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">11. Warranties and Disclaimers</h2>
                <p className="mt-4">
                  We provide our services with reasonable skill and care and in line with generally accepted professional standards.
                </p>
                <p className="mt-4">
                  Except where expressly agreed otherwise, the website, services and deliverables are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis to the maximum extent permitted by law.
                </p>
                <p className="mt-4">
                  We do not guarantee a particular commercial result.
                </p>
                <p className="mt-4">
                  Any conversion, performance or efficiency figures shown on our website are estimates, illustrative outcomes or third-party research unless expressly supported by project-specific testing. Actual results depend on factors including the client&rsquo;s starting point, scope, configuration and market conditions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">12. Limitation of Liability</h2>
                <p className="mt-4">
                  To the maximum extent permitted by law, our total liability relating to an engagement will not exceed the fees paid to us under the relevant engagement during the 12 months before the event giving rise to the claim.
                </p>
                <p className="mt-4">
                  We are not liable for indirect or consequential losses, including loss of profits, revenue, business or data, or business interruption, to the extent permitted by law.
                </p>
                <p className="mt-4">
                  Nothing in these Terms limits liability where it cannot legally be limited, including liability arising from fraud or wilful misconduct.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">13. Termination</h2>
                <p className="mt-4">
                  Either party may terminate an engagement following a material breach that has not been corrected within 30 days after written notice.
                </p>
                <p className="mt-4">
                  On termination, the client remains responsible for payment for work performed up to the termination date.
                </p>
                <p className="mt-4">
                  Each party will return or destroy confidential information where reasonably requested by the party that provided it.
                </p>
                <p className="mt-4">
                  Provisions that are intended to continue after termination will remain in effect.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">14. Force Majeure</h2>
                <p className="mt-4">
                  Neither party is responsible for a failure or delay caused by circumstances outside its reasonable control.
                </p>
                <p className="mt-4">
                  This may include natural disasters, government action, major telecommunications or utility failures, cyberattacks and public-health emergencies.
                </p>
                <p className="mt-4">
                  The affected party should notify the other party and take reasonable steps to resume performance as soon as practical.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">15. Governing Law and Jurisdiction</h2>
                <p className="mt-4">
                  These Terms are governed by the laws of the United Arab Emirates as applicable in the Emirate of Dubai.
                </p>
                <p className="mt-4">
                  Disputes relating to these Terms or our services are subject to the exclusive jurisdiction of the competent courts of Dubai, subject to any mandatory legal requirements that apply.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">16. Changes to These Terms</h2>
                <p className="mt-4">
                  We may update these Terms from time to time.
                </p>
                <p className="mt-4">
                  The current version will be published on this page with the date of the latest revision.
                </p>
                <p className="mt-4">
                  Continued use of our website following an update constitutes acceptance of the revised website Terms. Changes do not alter an existing project agreement unless agreed separately in writing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">17. Contact</h2>
                <p className="mt-4">
                  Questions about these Terms can be sent to:
                </p>
                <div className="mt-4 rounded-xl border border-border/50 bg-foreground/[0.02] p-5">
                  <p className="text-sm font-semibold text-foreground">Next Horizons FZCO</p>
                  <p className="mt-1 text-sm">IFZA Business Park 44824</p>
                  <p className="text-sm">Dubai Silicon Oasis, Dubai, UAE</p>
                  <p className="mt-2 text-sm">Email: rainier@nexthorizonsglobal.com</p>
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
