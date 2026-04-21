import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { WhySection } from "@/components/home/why-section"
import { TrustSection } from "@/components/home/trust-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhySection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
