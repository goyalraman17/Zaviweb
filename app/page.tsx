// Maximum conversion homepage — Jarvis positioning
// Every section answers: "Why should I install this right now?"
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import HeroWithScreenshot from '@/components/HeroWithScreenshot';
import BackgroundAgents from '@/components/BackgroundAgents';
import PageAnalytics from '@/components/PageAnalytics';
import JsonLd from '@/components/SEO/JsonLd';
import { softwareApplicationSchema, faqSchema } from '@/lib/schemaData';

// Lazy load below-the-fold for performance
const WhatsAppBot = dynamic(() => import('@/components/WhatsAppBot'));
const VideoDemo = dynamic(() => import('@/components/VideoDemo'));
const KillYourKeyboard = dynamic(() => import('@/components/KillYourKeyboard'));
const ProblemSolution = dynamic(() => import('@/components/ProblemSolution'));
const UseCaseShowcase = dynamic(() => import('@/components/UseCaseShowcase'));
const MagicWand = dynamic(() => import('@/components/MagicWand'), {
  loading: () => <div className="h-96 bg-gray-50" />
});
const LanguageTranslation = dynamic(() => import('@/components/LanguageTranslationHero'));
const SuperpowersSection = dynamic(() => import('@/components/SuperpowersSection'));
const PrivacyStrip = dynamic(() => import('@/components/PrivacyStrip'));
const Metrics = dynamic(() => import('@/components/Metrics'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const PricingNew = dynamic(() => import('@/components/PricingNew'));
const DeviceDownload = dynamic(() => import('@/components/DeviceDownload'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const FinalCTA = dynamic(() => import('@/components/FinalCTA'));

export default function Home() {
  return (
    <>
      <PageAnalytics />
      <Navigation />
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd data={faqSchema} />
      
      <main className="overflow-hidden">
        {/* 1. HERO */}
        <HeroWithScreenshot />

        {/* 2. BACKGROUND AGENTS — biggest differentiator */}
        <BackgroundAgents />

        {/* 3. WHATSAPP BOT */}
        <WhatsAppBot />

        {/* 4. VIDEO DEMO */}
        <VideoDemo />

        {/* 5. BEFORE/AFTER */}
        <KillYourKeyboard />

        {/* 6. PROBLEM → SOLUTION */}
        <ProblemSolution />

        {/* 7. USE CASES */}
        <UseCaseShowcase />

        {/* 8. MAGIC WAND */}
        <MagicWand />

        {/* 9. LANGUAGE TRANSLATION */}
        <LanguageTranslation />

        {/* 10. SUPERPOWERS */}
        <SuperpowersSection />

        {/* 11. PRIVACY */}
        <PrivacyStrip />

        {/* 12. SOCIAL PROOF */}
        <Metrics />
        <Testimonials />

        {/* 13. PRICING */}
        <PricingNew />

        {/* 14. DOWNLOAD */}
        <DeviceDownload />

        {/* 15. FAQ */}
        <FAQ />

        {/* 16. FINAL CTA */}
        <FinalCTA />
      </main>
      {/* NOTE: StickyDownloadCTA is global in layout.tsx — do not add another one here */}
    </>
  );
}
