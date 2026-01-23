// New conversion-focused components
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import HeroWithScreenshot from '@/components/HeroWithScreenshot';
import DeviceDownload from '@/components/DeviceDownload';
import StickyCTA from '@/components/StickyCTA';
import PageAnalytics from '@/components/PageAnalytics';

// Lazy load below-the-fold components for better performance
const VideoDemo = dynamic(() => import('@/components/VideoDemo'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});
const LanguageTranslationHero = dynamic(() => import('@/components/LanguageTranslationHero'));
const Metrics = dynamic(() => import('@/components/Metrics'));
const KillYourKeyboard = dynamic(() => import('@/components/KillYourKeyboard'));
const AdaptsToYourRole = dynamic(() => import('@/components/AdaptsToYourRole'));
const OnTheGoOrAtYourDesk = dynamic(() => import('@/components/OnTheGoOrAtYourDesk'));
const LanguageSection = dynamic(() => import('@/components/LanguageSection'));
const PricingNew = dynamic(() => import('@/components/PricingNew'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const FinalCTANew = dynamic(() => import('@/components/FinalCTANew'));

/**
 * Zavi Marketing Website - Conversion-Optimized Flow
 *
 * POSITIONING: "The Voice Writing Layer" - Not transcription, not writing tools, but voice-first structured writing
 * UNIQUE DIFFERENTIATOR: Multi-language voice writing with instant language switching
 *
 * Optimized funnel: Hook → DIFFERENTIATE → DOWNLOAD → Demonstrate → PROOF → Personalize → Price → TESTIMONIALS → Objections → Convert
 *
 * 1. Hero + Live Demo (immediate hook - clear value prop)
 * 2. Language Translation Hero (multi-language switching - switch languages instantly!)
 * 3. Device Download (CONVERSION OPPORTUNITY - auto-detect device, one-click download)
 * 4. Video Demo (prove it works - visual demonstration)
 * 5. Metrics (impressive stats - 5x faster, <2s response, 100+ languages) ← NEW
 * 6. Voice Typing Demo (use cases - emails, ChatGPT, ideas)
 * 7. Kill Your Keyboard (wow moment - smart editing magic)
 * 8. Adapts to Your Role (deep personalization - see yourself using it)
 * 9. Pricing (convert while interest is HIGH)
 * 10. Testimonials (real customer stories with names and results) ← NEW
 * 11. On-the-go or At Your Desk (flexibility - works everywhere)
 * 12. FAQ (handle objections before they leave)
 * 13. Language Support (supporting detail - multilingual proof)
 * 14. Final CTA (last conversion push)
 */
export default function Home() {
  return (
    <>
      <PageAnalytics />
      <Navigation />
      <main className="overflow-hidden">
        {/* Hero with Screenshot - Immediate Hook */}
        <HeroWithScreenshot />

        {/* Language Translation Hero - BIGGEST DIFFERENTIATOR */}
        <LanguageTranslationHero />

        {/* Device Download - PRIMARY CONVERSION POINT */}
        <DeviceDownload />

        {/* Video Demo - Prove It Works */}
        <VideoDemo />

        {/* Metrics - Social Proof Stats (NEW) */}
        <Metrics />

        {/* Kill Your Keyboard - Wow Moment */}
        <KillYourKeyboard />

        {/* Adapts to Your Role - Deep Personalization */}
        <AdaptsToYourRole />

        {/* Pricing - Convert While Excited */}
        <PricingNew />

        {/* Testimonials - Customer Stories (NEW) */}
        <Testimonials />

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
