// New conversion-focused components
import Navigation from '@/components/Navigation';
import HeroRedesign from '@/components/HeroRedesign';
import PlatformAvailability from '@/components/PlatformAvailability';
import ProblemStatement from '@/components/ProblemStatement';
import PainAmplification from '@/components/PainAmplification';
import ZaviSolution from '@/components/ZaviSolution';
import CategoryCreation from '@/components/CategoryCreation';
import HowZaviWorks from '@/components/HowZaviWorks';
import LanguageUnlock from '@/components/LanguageUnlock';
import Audiences from '@/components/Audiences';
import WhyItSticks from '@/components/WhyItSticks';
import TrustSignals from '@/components/TrustSignals';
import PricingNew from '@/components/PricingNew';
import FAQ from '@/components/FAQ';
import FinalCTANew from '@/components/FinalCTANew';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import PlatformDownload from '@/components/PlatformDownload';

/**
 * Zavi Marketing Website - Conversion-Focused Experience
 *
 * Structure:
 * 1. Hero + Live Voice Demo (highest priority - shows value immediately)
 * 2. Platform Availability (works everywhere)
 * 3. Problem → Pain → Solution narrative (conversion flow)
 * 4. Category Creation (position as new input layer)
 * 5. How It Works (trust building)
 * 6. Language Unlock (global feature)
 * 7. Audiences (if you write daily, this is for you)
 * 8. Why It Sticks (habit formation)
 * 9. Trust Signals (production-ready)
 * 10. Pricing (priced for habit)
 * 11. FAQ (objection handling)
 * 12. Final CTA (conversion)
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        {/* Hero with embedded Live Voice Demo - REDESIGNED */}
        <HeroRedesign />

        {/* Platform availability - works everywhere */}
        <PlatformAvailability />

        {/* Problem → Pain → Solution narrative flow */}
        <ProblemStatement />
        <PainAmplification />
        <ZaviSolution />

        {/* Category creation - not voice typing */}
        <CategoryCreation />

        {/* How it works - build trust */}
        <HowZaviWorks />

        {/* Global language unlock */}
        <LanguageUnlock />

        {/* Target audiences */}
        <Audiences />

        {/* Why it sticks - habit formation */}
        <WhyItSticks />

        {/* Trust and product readiness */}
        <TrustSignals />

        {/* Pricing */}
        <PricingNew />

        {/* Download section */}
        <PlatformDownload />

        {/* FAQ - objection handling */}
        <FAQ />

        {/* Final CTA */}
        <FinalCTANew />

        {/* Footer */}
        <Footer />

        {/* Sticky mobile CTA */}
        <StickyCTA />
      </main>
    </>
  );
}
