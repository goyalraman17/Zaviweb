// New conversion-focused components
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import HeroWithScreenshot from '@/components/HeroWithScreenshot';
import DeviceDownload from '@/components/DeviceDownload';
import PageAnalytics from '@/components/PageAnalytics';
import JsonLd from '@/components/SEO/JsonLd';
import { softwareApplicationSchema, faqSchema } from '@/lib/schemaData';

const MagicWand = dynamic(() => import('@/components/MagicWand'), {
  loading: () => <div className="h-96 bg-gray-50 flex items-center justify-center">Loading...</div>
});
// Lazy load below-the-fold components for better performance
const VideoDemo = dynamic(() => import('@/components/VideoDemo'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});
const LanguageTranslationHero = dynamic(() => import('@/components/LanguageTranslationHero'));
const Metrics = dynamic(() => import('@/components/Metrics'));
const KillYourKeyboard = dynamic(() => import('@/components/KillYourKeyboard'));
const AdaptsToYourRole = dynamic(() => import('@/components/AdaptsToYourRole'));
const OnTheGoOrAtYourDesk = dynamic(() => import('@/components/OnTheGoOrAtYourDesk'));
const PricingNew = dynamic(() => import('@/components/PricingNew'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const FinalCTA = dynamic(() => import('@/components/FinalCTA'));
const SuperpowersSection = dynamic(() => import('@/components/SuperpowersSection'));

export default function Home() {
  return (
    <>
      <PageAnalytics />
      <Navigation />
      
      {/* 
        Inject Application Schema specifically to the homepage
        Note: faqSchema should map closely to <FAQ /> rendered inside this page 
      */}
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd data={faqSchema} />
      
      <main className="overflow-hidden">
        {/* Hero with Screenshot - Immediate Hook */}
        <HeroWithScreenshot />

        {/* 1. Magic Wand Component - Instant Understanding */}
        <MagicWand />

        {/* 2. Metrics - High-Impact Social Proof early on */}
        <Metrics />

        {/* 3. Testimonials - Real people backing the initial claim */}
        <Testimonials />

        {/* 4. Device/Platform Download - Primary CTA 1 (Now armed with trust) */}
        <DeviceDownload />

        {/* 5. Superpowers - 27+ app integrations */}
        <SuperpowersSection />

        {/* 6. Kill Your Keyboard - Wow Moment */}
        <KillYourKeyboard />

        {/* 7. Language Translation Hero - Feature Differentiator */}
        <LanguageTranslationHero />

        {/* 8. Video Demo - Deep dive proof */}
        <VideoDemo />

        {/* 9. Adapts to Your Role - Personalization */}
        <AdaptsToYourRole />

        {/* 10. On-the-go or At Your Desk - Flexibility */}
        <OnTheGoOrAtYourDesk />

        {/* 9. Pricing - The Ask */}
        <PricingNew />

        {/* 10. FAQ - Overcome final objections */}
        <FAQ />

        {/* 11. Final CTA - The Last Conversion Push */}
        <FinalCTA />
      </main>
    </>
  );
}
