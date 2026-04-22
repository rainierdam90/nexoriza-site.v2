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
                Last updated: April 2026
              </p>
            </div>
          </div>
        </section>

        <section className="relative pb-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-10 text-muted-foreground leading-relaxed">

              <div>
                <p>
                  These Terms of Service (the &ldquo;Terms&rdquo;) govern your access to and use of the Next Horizons website at nexthorizons.ae (the &ldquo;Website&rdquo;) and the services provided by Next Horizons FZCO (&ldquo;Next Horizons&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By accessing the Website or engaging our services, you agree to be bound by these Terms. If you do not agree, please do not use the Website or our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">1. About Us</h2>
                <p className="mt-4">
                  Next Horizons FZCO is a company incorporated in the International Free Zone Authority (IFZA), registered at IFZA Business Park 44824, Dubai Silicon Oasis, Dubai, United Arab Emirates. We provide AI-assisted website redesign services and due diligence software for professional and regulated organisations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">2. Scope of Services</h2>
                <p className="mt-4">Our services include, but are not limited to:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>Website design, redesign, development, deployment, and post-launch support.</li>
                  <li>The supply, configuration, and ongoing support of our due diligence software platform.</li>
                  <li>Related advisory, training, and scoping activities.</li>
                </ul>
                <p className="mt-4">
                  The specific scope, deliverables, timelines, and fees for any engagement will be set out in a separate written agreement, statement of work, or quotation (the &ldquo;Engagement Agreement&rdquo;). In the event of conflict between these Terms and an Engagement Agreement, the Engagement Agreement prevails.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">3. Quotations and Mockups</h2>
                <p className="mt-4">
                  Free design concepts and fixed-price quotations provided through our mockup request process are offered in good faith and without obligation on either party. Quotations are valid for thirty (30) days from the date of issue unless stated otherwise. A contractual relationship is formed only upon your written acceptance of our quotation or execution of an Engagement Agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">4. Price Match Commitment</h2>
                <p className="mt-4">
                  We offer to match a lower price for comparable website redesign services, subject to the following conditions:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>The competing quotation must relate to a service of comparable scope, quality, deliverables, technology stack, and post-launch support to those offered by Next Horizons.</li>
                  <li>The competing price must fall within market-conforming pricing ranges for professional AI-assisted website redesign in the relevant market. Quotations that fall materially below prevailing market rates — including but not limited to those from providers operating without established credentials, sustainable business models, or the quality standards that comparable delivery requires — will not qualify for price matching.</li>
                  <li>Written evidence of the competing quotation, including scope, deliverables, and pricing, must be provided in a form that allows us to assess comparability in good faith.</li>
                  <li>The quotation must come from a clearly identifiable third-party provider offering services on arm&rsquo;s-length commercial terms. Internal estimates, do-it-yourself cost projections, and promotional or time-limited offers are not eligible.</li>
                  <li>We reserve the right, acting reasonably, to determine in our sole discretion whether a competing quotation meets these conditions, and to decline to match a price where doing so would require compromising scope, quality, or the standards set out in an Engagement Agreement.</li>
                </ul>
                <p className="mt-4">
                  This commitment is offered as a gesture of confidence in our pricing and does not constitute a legally binding guarantee to match every lower quotation presented.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">5. Fees and Payment</h2>
                <p className="mt-4">
                  Fees for our services will be set out in the applicable quotation or Engagement Agreement. Unless stated otherwise, invoices are payable within fourteen (14) days of the invoice date, in the currency stated on the invoice. We reserve the right to suspend work or delivery in the event of overdue payment, after providing reasonable written notice. Fees are exclusive of applicable taxes, including VAT where applicable, which will be added to invoices as required by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">6. Client Responsibilities</h2>
                <p className="mt-4">To enable us to deliver our services effectively, you agree to:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>Provide accurate, complete, and timely information, materials, access, and approvals.</li>
                  <li>Nominate a single point of contact with authority to provide feedback and approvals.</li>
                  <li>Ensure that any content or materials you supply to us do not infringe third-party rights or applicable law.</li>
                  <li>Comply with all applicable laws and regulations in your use of our services and any delivered work.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">7. Intellectual Property</h2>
                <p className="mt-4">
                  Upon full payment of the applicable fees, you receive ownership or a broad licence (as specified in the Engagement Agreement) over the final deliverables produced specifically for you. We retain ownership of pre-existing materials, tools, libraries, frameworks, methodologies, and generic code that we use to produce those deliverables, and we grant you a non-exclusive licence to use such pre-existing materials to the extent they are embedded in your deliverables.
                </p>
                <p className="mt-4">
                  You retain ownership of any content, trademarks, and other materials you supply to us, and you grant us a non-exclusive licence to use such materials for the purpose of performing our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">8. Due Diligence Software</h2>
                <p className="mt-4">
                  Our due diligence software is provided on the terms set out in the applicable software licence or Engagement Agreement. The platform is designed to assist compliance professionals and does not constitute legal, regulatory, or compliance advice. You remain solely responsible for compliance with the laws, regulations, and professional standards that apply to your operations, including but not limited to anti-money-laundering, counter-terrorist-financing, and sanctions obligations. Outputs of the platform are tools that support — but do not replace — professional judgement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">9. Confidentiality</h2>
                <p className="mt-4">
                  Each party agrees to keep confidential any non-public information disclosed by the other party in connection with our services, and to use that information only for the purpose of the engagement. This obligation continues for three (3) years after the end of the engagement, or longer where required by applicable law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">10. Privacy</h2>
                <p className="mt-4">
                  Our handling of personal data is governed by our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>, which forms part of these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">11. Warranties and Disclaimers</h2>
                <p className="mt-4">
                  We will perform our services with reasonable skill and care, in accordance with prevailing professional standards. Except as expressly stated in these Terms or an Engagement Agreement, all services, deliverables, and the Website are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, and we disclaim all other warranties, representations, and conditions, whether express or implied, to the fullest extent permitted by law. This includes any implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p className="mt-4">
                  We make no guarantees regarding specific business outcomes. Performance metrics, conversion figures, and efficiency indicators presented on our Website reflect typical outcomes across past engagements and are illustrative only. Actual results will vary based on your starting point, project scope, configuration, and market conditions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">12. Limitation of Liability</h2>
                <p className="mt-4">
                  To the maximum extent permitted by law, our total aggregate liability arising out of or in connection with these Terms or any Engagement Agreement — whether in contract, tort (including negligence), or otherwise — shall not exceed the fees paid by you to us under the relevant Engagement Agreement in the twelve (12) months preceding the event giving rise to the claim.
                </p>
                <p className="mt-4">
                  In no event will we be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of revenue, loss of business, loss of data, or business interruption, even if we have been advised of the possibility of such damages.
                </p>
                <p className="mt-4">
                  Nothing in these Terms excludes or limits liability for fraud, wilful misconduct, or any other liability that cannot lawfully be excluded or limited.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">13. Termination</h2>
                <p className="mt-4">
                  Either party may terminate an engagement for material breach that has not been cured within thirty (30) days of written notice. On termination, you will pay for all services performed up to the date of termination, and each party will return or destroy confidential information of the other party at the disclosing party&rsquo;s request. Sections that by their nature are intended to survive termination shall do so.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">14. Force Majeure</h2>
                <p className="mt-4">
                  Neither party is liable for failure or delay in performance caused by events beyond its reasonable control, including natural disasters, acts of government, failure of telecommunications or utilities, cyberattacks, or public-health emergencies, provided the affected party gives prompt notice and uses reasonable efforts to resume performance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">15. Governing Law and Jurisdiction</h2>
                <p className="mt-4">
                  These Terms are governed by the laws of the United Arab Emirates as applicable in the Emirate of Dubai. Any dispute arising out of or in connection with these Terms or our services shall be subject to the exclusive jurisdiction of the competent courts of Dubai, without prejudice to any mandatory provisions of applicable law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">16. Changes to These Terms</h2>
                <p className="mt-4">
                  We may update these Terms from time to time. The most current version will always be posted on this page, with the &ldquo;Last updated&rdquo; date above reflecting the date of the most recent revision. Your continued use of the Website or our services following any such update constitutes acceptance of the updated Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">17. Contact</h2>
                <p className="mt-4">
                  For questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 rounded-xl border border-border/50 bg-foreground/[0.02] p-5">
                  <p className="text-sm font-semibold text-foreground">Next Horizons FZCO</p>
                  <p className="mt-1 text-sm">IFZA Business Park 44824</p>
                  <p className="text-sm">Dubai Silicon Oasis, Dubai, UAE</p>
                  <p className="mt-2 text-sm">Email: contact@nexthorizons.ae</p>
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
