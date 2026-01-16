// New conversion-focused components
import Navigation from '@/components/Navigation';
import HeroRedesign from '@/components/HeroRedesign';
import LanguageSection from '@/components/LanguageSection';
import DownloadSection from '@/components/DownloadSection';
import WorksEverywhereSection from '@/components/WorksEverywhereSection';
import ProblemStatement from '@/components/ProblemStatement';
import ZaviSolution from '@/components/ZaviSolution';
import CategoryCreation from '@/components/CategoryCreation';
import Audiences from '@/components/Audiences';
import TrustSignals from '@/components/TrustSignals';
import PricingNew from '@/components/PricingNew';
import FAQ from '@/components/FAQ';
import FinalCTANew from '@/components/FinalCTANew';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

/**
 * Zavi Marketing Website - Conversion-Focused Experience
 *
 * Clean, focused flow:
 * 1. Hero + Live Demo (immediate value)
 * 2. Language Support (global unlock)
 * 3. Download (conversion point)
 * 4. Works Everywhere (trust builder)
 * 5. Problem → Solution (narrative)
 * 6. Category Creation (positioning)
 * 7. Audiences (targeting)
 * 8. Trust Signals (credibility)
 * 9. Pricing (conversion)
 * 10. FAQ (objections)
 * 11. Final CTA (last conversion push)
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        {/* Hero with embedded Live Voice Demo - REDESIGNED */}
        <HeroRedesign />

        {/* Language Support - speak native, get professional */}
        <LanguageSection />

        {/* Download Section - all platforms */}
        <DownloadSection />

        {/* Works Everywhere - common apps */}
        <WorksEverywhereSection />

        {/* Problem identification */}
        <ProblemStatement />

        {/* Solution */}
        <ZaviSolution />

        {/* Category creation - not voice typing */}
        <CategoryCreation />

        {/* Target audiences */}
        <Audiences />

        {/* Trust and product readiness */}
        <TrustSignals />

        {/* Pricing */}
        <PricingNew />

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
