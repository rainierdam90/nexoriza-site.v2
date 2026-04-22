import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Next Horizons",
  description: "How Next Horizons FZCO collects, uses, and protects personal data in connection with our website and services.",
}

export default function PrivacyPage() {
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
                <span className="text-muted-foreground">Privacy Policy</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Privacy Policy
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
                  This Privacy Policy describes how Next Horizons FZCO (&ldquo;Next Horizons&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and protects personal data in connection with our website at nexthorizons.ae (the &ldquo;Website&rdquo;) and the services we provide. By using our Website or services, you acknowledge the practices described in this policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">1. Who We Are</h2>
                <p className="mt-4">
                  Next Horizons FZCO is a company incorporated in the International Free Zone Authority (IFZA), with its registered address at IFZA Business Park 44824, Dubai Silicon Oasis, Dubai, United Arab Emirates. For any privacy-related questions, you can reach us at contact@nexthorizons.ae.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
                <p className="mt-4">We collect personal data that you provide to us directly, as well as limited technical data that is generated automatically when you interact with our Website.</p>
                <h3 className="mt-6 text-lg font-semibold text-foreground">Information you provide</h3>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>Contact details such as your name, company name, email address, and phone number — provided through our contact, mockup request, or call booking forms.</li>
                  <li>The content of any message, enquiry, or description you submit.</li>
                  <li>Website URLs or other business information you share to obtain a design concept or proposal.</li>
                  <li>Scheduling preferences when booking a call, such as preferred dates and time slots.</li>
                </ul>
                <h3 className="mt-6 text-lg font-semibold text-foreground">Information collected automatically</h3>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>Standard server logs, including IP address, browser type, device information, referring URL, and pages visited.</li>
                  <li>Anonymous usage analytics aimed at understanding aggregate visitor behaviour and improving the Website.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
                <p className="mt-4">We use personal data for the following purposes:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>To respond to enquiries and provide the information or services you have requested.</li>
                  <li>To prepare and deliver design concepts, proposals, and quotations.</li>
                  <li>To schedule and conduct calls and meetings with prospective and existing clients.</li>
                  <li>To deliver, support, and improve our website redesign and due diligence services.</li>
                  <li>To maintain business records and comply with applicable legal, regulatory, and accounting obligations.</li>
                  <li>To protect the security and integrity of our Website, systems, and services.</li>
                </ul>
                <p className="mt-4">
                  We do not use your personal data for automated decision-making that produces legal or similarly significant effects, and we do not sell your personal data to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">4. Legal Basis for Processing</h2>
                <p className="mt-4">Where the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021) or other applicable data protection law requires a specific legal basis for processing, we rely on one or more of the following:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>Your consent, where you have provided information voluntarily for a specific purpose.</li>
                  <li>The performance of a contract with you, or taking steps at your request prior to entering into a contract.</li>
                  <li>Compliance with a legal obligation to which we are subject.</li>
                  <li>Our legitimate interests in operating, promoting, and improving our services, provided those interests are not overridden by your rights and freedoms.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">5. How We Share Information</h2>
                <p className="mt-4">We share personal data only to the extent necessary to operate our business and deliver our services, and only with the following categories of recipients:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>Trusted service providers who process data on our behalf — for example, email delivery, hosting, analytics, and calendar services — under appropriate confidentiality and data-protection obligations.</li>
                  <li>Professional advisors such as auditors and legal counsel, where required.</li>
                  <li>Competent authorities, where required by applicable law, regulation, legal process, or governmental request.</li>
                </ul>
                <p className="mt-4">
                  For clients of our due diligence platform, the platform itself is deployed within your own infrastructure. Client data, uploaded documents, and generated reports remain in your environment and are not transmitted to or stored by Next Horizons.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">6. International Transfers</h2>
                <p className="mt-4">
                  We are based in the United Arab Emirates. Where personal data is transferred outside the UAE — for example, to service providers located in the European Economic Area or other jurisdictions — we take reasonable steps to ensure an adequate level of protection, including contractual safeguards consistent with applicable data-protection law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">7. Data Retention</h2>
                <p className="mt-4">
                  We retain personal data only for as long as reasonably necessary for the purposes set out in this policy, for the duration of any contract, and to meet applicable legal, tax, accounting, and regulatory requirements. When personal data is no longer required, we securely delete or anonymise it.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">8. Data Security</h2>
                <p className="mt-4">
                  We implement appropriate technical and organisational measures to protect personal data against unauthorised access, disclosure, alteration, or destruction. These measures include encryption in transit, restricted access controls, secure hosting, and confidentiality obligations for our personnel and service providers. No method of transmission or storage is perfectly secure, however, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">9. Your Rights</h2>
                <p className="mt-4">Subject to applicable law, you may have the following rights in relation to your personal data:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>The right to access the personal data we hold about you.</li>
                  <li>The right to request correction of inaccurate or incomplete data.</li>
                  <li>The right to request deletion of personal data in certain circumstances.</li>
                  <li>The right to restrict or object to certain processing activities.</li>
                  <li>The right to withdraw consent where processing is based on your consent.</li>
                  <li>The right to data portability, where applicable.</li>
                  <li>The right to lodge a complaint with the relevant data protection authority.</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please email us at contact@nexthorizons.ae. We will respond within a reasonable timeframe and in accordance with applicable law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">10. Cookies and Similar Technologies</h2>
                <p className="mt-4">
                  Our Website uses a limited number of cookies and similar technologies to operate the site, remember preferences, and understand how visitors use the Website. You can configure your browser to refuse cookies or alert you when cookies are being sent. Some parts of the Website may not function correctly if cookies are disabled.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">11. Third-Party Links</h2>
                <p className="mt-4">
                  Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party websites you visit.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">12. Changes to This Policy</h2>
                <p className="mt-4">
                  We may update this Privacy Policy from time to time. The most current version will always be posted on this page, with the &ldquo;Last updated&rdquo; date above reflecting the date of the most recent revision. We encourage you to review this policy periodically.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">13. Contact</h2>
                <p className="mt-4">
                  For questions, requests, or complaints about this Privacy Policy or our handling of personal data, please contact us at:
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
