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
        <p className="mt-4 text-sm text-muted-foreground">Last updated: August 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>This Privacy Policy explains how Next Horizons FZCO (&ldquo;Next Horizons&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) collects, uses and protects personal information when you use our website or services.</p>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">1. Who We Are</h2>
            <p className="mt-4">Next Horizons FZCO is incorporated in the International Free Zone Authority (IFZA) and registered at IFZA Business Park 44824, Dubai Silicon Oasis, Dubai, United Arab Emirates.</p>
            <p className="mt-4">For questions about privacy or the way we handle personal information, contact us at contact@nexthorizons.ae.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            <p className="mt-4">We collect information that you provide to us directly, together with a limited amount of technical information generated when you use our website.</p>
            <h3 className="mt-6 text-lg font-semibold text-foreground">Information You Provide</h3>
            <p className="mt-3">This may include:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>your name, company name, email address and telephone number;</li>
              <li>information submitted through our contact, mockup request or booking forms;</li>
              <li>the content of messages and enquiries you send us;</li>
              <li>website URLs and other information provided when requesting a redesign concept or quotation; and</li>
              <li>information provided when scheduling a call.</li>
            </ul>
            <h3 className="mt-6 text-lg font-semibold text-foreground">Information Collected Automatically</h3>
            <p className="mt-3">This may include standard server information such as IP address, browser, device, referring website and pages visited.</p>
            <p className="mt-4">We may also use analytics to understand how the website is being used and where it can be improved.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="mt-4">We use personal information to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>respond to enquiries;</li>
              <li>prepare redesign concepts, proposals and quotations;</li>
              <li>arrange calls and meetings;</li>
              <li>provide and support our website redesign and due diligence services;</li>
              <li>maintain appropriate business records;</li>
              <li>meet legal, regulatory, tax and accounting requirements; and</li>
              <li>protect the security of our website, systems and services.</li>
            </ul>
            <p className="mt-4">We do not sell your personal information.</p>
            <p className="mt-4">We also do not use your personal information for automated decision-making that produces legal or similarly significant effects.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">4. Legal Basis for Processing</h2>
            <p className="mt-4">Where applicable data-protection law requires a legal basis for processing, this may include your consent, taking steps towards or performing a contract, meeting a legal obligation or our legitimate interest in operating and improving our business.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">5. How We Share Information</h2>
            <p className="mt-4">We only share personal information where this is reasonably required to operate our business, provide our services or meet legal obligations.</p>
            <p className="mt-4">This may include service providers used for hosting, email, analytics or scheduling, professional advisers and competent authorities where disclosure is legally required.</p>
            <p className="mt-4">Appropriate confidentiality and data-protection arrangements are used where required.</p>
            <p className="mt-4">Where due diligence software is deployed within a client&rsquo;s own infrastructure or private cloud, the exact data flows, storage arrangements and any external processing are documented as part of the agreed technical configuration.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">6. International Transfers</h2>
            <p className="mt-4">Next Horizons is based in the United Arab Emirates.</p>
            <p className="mt-4">Where information needs to be transferred to service providers in another jurisdiction, we take reasonable steps to make sure appropriate protections are in place in accordance with applicable law.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">7. Data Retention</h2>
            <p className="mt-4">We keep personal information only for as long as reasonably required for the purpose for which it was collected, the duration of an applicable contract and any legal, accounting, tax or regulatory retention requirements.</p>
            <p className="mt-4">Once information is no longer required, it is deleted or anonymised where appropriate.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">8. Data Security</h2>
            <p className="mt-4">We use appropriate technical and organisational measures to protect personal information against unauthorised access, disclosure, alteration or loss.</p>
            <p className="mt-4">Measures may include encryption, access controls, secure hosting and confidentiality requirements.</p>
            <p className="mt-4">No method of electronic transmission or storage is completely secure, however, and absolute security cannot be guaranteed.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">9. Your Rights</h2>
            <p className="mt-4">Depending on the law that applies to you, you may have rights relating to access, correction, deletion, restriction, objection, withdrawal of consent and data portability.</p>
            <p className="mt-4">You may also have the right to submit a complaint to an appropriate data-protection authority.</p>
            <p className="mt-4">To make a request, contact us at contact@nexthorizons.ae.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">10. Cookies and Similar Technologies</h2>
            <p className="mt-4">Our website may use a limited number of cookies and similar technologies for basic website functionality, preferences and analytics.</p>
            <p className="mt-4">You can control cookies through your browser settings, although disabling some cookies may affect parts of the website.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">11. Third-Party Links</h2>
            <p className="mt-4">Our website may contain links to third-party websites.</p>
            <p className="mt-4">We are not responsible for the content or privacy practices of those websites.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">12. Changes to This Policy</h2>
            <p className="mt-4">We may update this Privacy Policy from time to time.</p>
            <p className="mt-4">The current version will be published on this page and the date above will show when it was most recently updated.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">13. Contact</h2>
            <p className="mt-4">For questions, requests or complaints relating to this Privacy Policy, contact:</p>
            <div className="mt-4 rounded-xl border border-border/50 bg-foreground/[0.02] p-5">
              <p className="text-sm font-semibold text-foreground">Next Horizons FZCO</p>
              <p className="mt-1 text-sm">IFZA Business Park 44824</p>
              <p className="text-sm">Dubai Silicon Oasis, Dubai, UAE</p>
              <p className="mt-2 text-sm">Email: contact@nexthorizons.ae</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
