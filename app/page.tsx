// New conversion-focused components
import Navigation from '@/components/Navigation';
import HeroWithScreenshot from '@/components/HeroWithScreenshot';
import LanguageTranslationHero from '@/components/LanguageTranslationHero';
import KillYourKeyboard from '@/components/KillYourKeyboard';
import LanguageSection from '@/components/LanguageSection';
import DownloadSection from '@/components/DownloadSection';
import WorksEverywhereSection from '@/components/WorksEverywhereSection';
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
 * 5. Category Creation (positioning)
 * 6. Audiences (targeting)
 * 7. Trust Signals (credibility)
 * 8. Pricing (conversion)
 * 9. FAQ (objections)
 * 10. Final CTA (last conversion push)
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        {/* Hero with Screenshot - Matches Landing Page Design */}
        <HeroWithScreenshot />

        {/* Language Translation Hero - Speak in Any Language */}
        <LanguageTranslationHero />

        {/* Kill Your Keyboard - Smart Editing */}
        <KillYourKeyboard />

        {/* Language Support - speak native, get professional */}
        <LanguageSection />

        {/* Download Section - all platforms */}
        <DownloadSection />

        {/* Works Everywhere - common apps */}
        <WorksEverywhereSection />

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
