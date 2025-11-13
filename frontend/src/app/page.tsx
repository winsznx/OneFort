import { Header } from '@/components/shared/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { UseCasesSection } from '@/components/landing/UseCasesSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/shared/Footer';
import { BackToTop } from '@/components/shared/BackToTop';

/**
 * OneFort Landing Page
 * Showcases the platform's value proposition with fortress/security theming
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-highlight/20">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <CTASection />
      <Footer />
      <BackToTop />
    </main>
  );
}
