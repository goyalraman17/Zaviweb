// New conversion-focused components
import Navigation from '@/components/Navigation';
import HeroWithScreenshot from '@/components/HeroWithScreenshot';
import VoiceTypingDemo from '@/components/VoiceTypingDemo';
import VideoDemo from '@/components/VideoDemo';
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
 * 2. Voice Typing Demo (interactive use case showcase)
 * 3. Video Demo (product in action)
 * 4. Language Translation Hero (global unlock)
 * 5. Kill Your Keyboard (smart editing showcase)
 * 6. Adapts to Your Role (role-specific demos)
 * 7. On-the-go or At Your Desk (cross-device sync)
 * 8. Language Support (multilingual capability)
 * 9. Pricing (conversion)
 * 10. FAQ (objections)
 * 11. Final CTA (last conversion push)
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        {/* Hero with Screenshot - Matches Landing Page Design */}
        <HeroWithScreenshot />

        {/* Voice Typing Demo - Interactive Use Case Showcase */}
        <VoiceTypingDemo />

        {/* Video Demo - See Zavi in Action */}
        <VideoDemo />

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
