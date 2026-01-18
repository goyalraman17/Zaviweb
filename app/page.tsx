// New conversion-focused components
import Navigation from '@/components/Navigation';
import HeroWithScreenshot from '@/components/HeroWithScreenshot';
import LanguageTranslationHero from '@/components/LanguageTranslationHero';
import KillYourKeyboard from '@/components/KillYourKeyboard';
import AdaptsToYourRole from '@/components/AdaptsToYourRole';
import OnTheGoOrAtYourDesk from '@/components/OnTheGoOrAtYourDesk';
import LanguageSection from '@/components/LanguageSection';
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
 * 2. Language Translation Hero (global unlock)
 * 3. Kill Your Keyboard (smart editing showcase)
 * 4. Adapts to Your Role (role-specific demos)
 * 5. On-the-go or At Your Desk (cross-device sync)
 * 6. Language Support (multilingual capability)
 * 7. Pricing (conversion)
 * 8. FAQ (objections)
 * 9. Final CTA (last conversion push)
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

        {/* Adapts to Your Role - Interactive Cohorts */}
        <AdaptsToYourRole />

        {/* On-the-go or At Your Desk - Device Sync */}
        <OnTheGoOrAtYourDesk />

        {/* Language Support - speak native, get professional */}
        <LanguageSection />

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
