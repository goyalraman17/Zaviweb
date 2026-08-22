// Homepage flow:
// promise -> live product proof -> visual features -> trust -> pricing -> install
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import HeroWithScreenshot from '@/components/HeroWithScreenshot';
import PageAnalytics from '@/components/PageAnalytics';
import JsonLd from '@/components/SEO/JsonLd';
import {
  softwareApplicationSchema,
  faqSchema,
  videoObjectSchema,
} from '@/lib/schemaData';

// Lazy load below-the-fold for performance
const LandingVisualStory = dynamic(
  () => import('@/components/LandingVisualStory')
);
const FeatureVisualShowcase = dynamic(
  () => import('@/components/FeatureVisualShowcase')
);
const PrivacyStrip = dynamic(() => import('@/components/PrivacyStrip'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const PricingNew = dynamic(() => import('@/components/PricingNew'));
const DeviceDownload = dynamic(() => import('@/components/DeviceDownload'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const FinalCTA = dynamic(() => import('@/components/FinalCTA'));

// Hidden for current positioning. Restore by uncommenting these imports and the
// matching JSX calls below.
// const BackgroundAgents = dynamic(() => import('@/components/BackgroundAgents'));
// const WhatsAppBot = dynamic(() => import('@/components/WhatsAppBot'));
// const SuperpowersSection = dynamic(() => import('@/components/SuperpowersSection'));

export const metadata: Metadata = {
  title: 'Free AI Voice Dictation for Every App',
  description:
    'Download Zavi free. Speak naturally in any app on Android, iOS, Mac, or Windows and get polished text where your cursor is.',
  alternates: {
    canonical: 'https://zavivoice.com',
  },
  openGraph: {
    title: 'Zavi AI | Free AI Voice Dictation for Every App',
    description:
      'Speak in any app, on any device. Zavi removes filler words, fixes grammar, and polishes your dictated text. Magic Wand edits selected text in place.',
    url: 'https://zavivoice.com',
    images: [
      {
        url: 'https://zavivoice.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zavi AI | Free AI Voice Dictation for Every App',
    description:
      'Hold the mic, talk naturally, and get polished text in the app you are already using. Download free.',
  },
};

export default function Home() {
  return (
    <>
      <PageAnalytics />
      <Navigation />
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={videoObjectSchema} />

      <main className="overflow-hidden">
        {/* 1. HERO */}
        <HeroWithScreenshot />

        {/* 2. WORKS-EVERYWHERE + SPEED STORY */}
        <LandingVisualStory />

        {/* 3. THREE CORE PRODUCT FLOWS */}
        <FeatureVisualShowcase />

        {/* Voice command / agent sections are intentionally hidden for now.
            They diluted the core positioning: speak anywhere, get polished multilingual text.
            Restore with: <BackgroundAgents /> */}

        {/* WhatsApp / approval control is intentionally hidden for now.
            It reads like an agent product instead of a dictation product.
            Restore with: <WhatsAppBot /> */}

        {/* Integrations / command surface is intentionally hidden for now.
            Keep the page focused on the daily download habit.
            Restore with: <SuperpowersSection /> */}

        {/* 4. TRUST */}
        <PrivacyStrip />
        <Testimonials />

        {/* 5. PRICING */}
        <PricingNew />

        {/* 6. DOWNLOAD OPTIONS */}
        <DeviceDownload />

        {/* 7. FAQ */}
        <FAQ />

        {/* 8. FINAL CTA */}
        <FinalCTA />
      </main>
      {/* NOTE: StickyDownloadCTA is global in layout.tsx — do not add another one here */}
    </>
  );
}
