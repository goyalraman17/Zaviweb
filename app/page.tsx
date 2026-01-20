// New conversion-focused components
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import HeroWithScreenshot from '@/components/HeroWithScreenshot';
import VoiceTypingDemo from '@/components/VoiceTypingDemo';
import StickyCTA from '@/components/StickyCTA';

// Lazy load below-the-fold components for better performance
const VideoDemo = dynamic(() => import('@/components/VideoDemo'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});
const LanguageTranslationHero = dynamic(() => import('@/components/LanguageTranslationHero'));
const KillYourKeyboard = dynamic(() => import('@/components/KillYourKeyboard'));
const AdaptsToYourRole = dynamic(() => import('@/components/AdaptsToYourRole'));
const OnTheGoOrAtYourDesk = dynamic(() => import('@/components/OnTheGoOrAtYourDesk'));
const LanguageSection = dynamic(() => import('@/components/LanguageSection'));
const PricingNew = dynamic(() => import('@/components/PricingNew'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const FinalCTANew = dynamic(() => import('@/components/FinalCTANew'));
const Footer = dynamic(() => import('@/components/Footer'));

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
