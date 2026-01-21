// New conversion-focused components
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import HeroWithScreenshot from '@/components/HeroWithScreenshot';
import VoiceTypingDemo from '@/components/VoiceTypingDemo';
import StickyCTA from '@/components/StickyCTA';
import PageAnalytics from '@/components/PageAnalytics';

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

/**
 * Zavi Marketing Website - Conversion-Optimized Flow
 *
 * Optimized funnel: Hook → Demonstrate → Personalize → Price → Bonus Features → Handle Objections → Convert
 *
 * 1. Hero + Live Demo (immediate hook - interactive value)
 * 2. Video Demo (prove it works - visual demonstration)
 * 3. Voice Typing Demo (use cases - emails, ChatGPT, ideas)
 * 4. Kill Your Keyboard (wow moment - smart editing magic)
 * 5. Adapts to Your Role (deep personalization - see yourself using it)
 * 6. Pricing (convert while interest is HIGH)
 * 7. Language Translation Hero (bonus value - global unlock)
 * 8. On-the-go or At Your Desk (flexibility - works everywhere)
 * 9. FAQ (handle objections before they leave)
 * 10. Language Support (supporting detail - multilingual proof)
 * 11. Final CTA (last conversion push)
 */
export default function Home() {
  return (
    <>
      <PageAnalytics />
      <Navigation />
      <main className="overflow-hidden">
        {/* Hero with Screenshot - Immediate Hook */}
        <HeroWithScreenshot />

        {/* Video Demo - Prove It Works */}
        <VideoDemo />

        {/* Voice Typing Demo - Relatable Use Cases */}
        <VoiceTypingDemo />

        {/* Kill Your Keyboard - Wow Moment */}
        <KillYourKeyboard />

        {/* Adapts to Your Role - Deep Personalization */}
        <AdaptsToYourRole />

        {/* Pricing - Convert While Excited */}
        <PricingNew />

        {/* Language Translation Hero - Bonus Global Value */}
        <LanguageTranslationHero />

        {/* On-the-go or At Your Desk - Flexibility Everywhere */}
        <OnTheGoOrAtYourDesk />

        {/* FAQ - Handle Objections */}
        <FAQ />

        {/* Language Support - Multilingual Proof */}
        <LanguageSection />

        {/* Final CTA - Last Conversion Push */}
        <FinalCTANew />

        {/* Sticky mobile CTA */}
        <StickyCTA />
      </main>
    </>
  );
}
