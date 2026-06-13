// Homepage flow:
// problem -> core solution -> proof -> translation -> trust -> install
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
const VideoDemo = dynamic(() => import('@/components/VideoDemo'));
const KillYourKeyboard = dynamic(() => import('@/components/KillYourKeyboard'));
const ProblemSolution = dynamic(() => import('@/components/ProblemSolution'));
const UseCaseShowcase = dynamic(() => import('@/components/UseCaseShowcase'));
const MagicWand = dynamic(() => import('@/components/MagicWand'), {
  loading: () => <div className="h-96 bg-gray-50" />,
});
const LanguageTranslation = dynamic(
  () => import('@/components/LanguageTranslationHero')
);
const PrivacyStrip = dynamic(() => import('@/components/PrivacyStrip'));
const Metrics = dynamic(() => import('@/components/Metrics'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const PricingNew = dynamic(() => import('@/components/PricingNew'));
const DeviceDownload = dynamic(() => import('@/components/DeviceDownload'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const FinalCTA = dynamic(() => import('@/components/FinalCTA'));

export const metadata: Metadata = {
  title: 'Free AI Voice Dictation for Every App',
  description:
    'Download Zavi free. Speak naturally in any app on Android, iOS, Mac, Windows, or Linux and get polished text in the language you choose.',
  alternates: {
    canonical: 'https://zavivoice.com',
  },
  openGraph: {
    title: 'Zavi AI | Free AI Voice Dictation for Every App',
    description:
      'Speak in any app, on any device. Zavi turns rough multilingual speech into clean text and Magic Wand edits selected text in place.',
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
      'Speak naturally across Android, iOS, Mac, Windows, and Linux. Download free.',
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

        {/* 2. THE BROAD PROBLEM */}
        <ProblemSolution />

        {/* 3. CORE PRODUCT PROOF */}
        <KillYourKeyboard />

        {/* 4. SEE IT IN ACTION */}
        <VideoDemo />

        {/* 5. WHAT PEOPLE USE IT FOR */}
        <UseCaseShowcase />

        {/* Voice command / agent sections are intentionally hidden for now.
            They diluted the core positioning: speak anywhere, get polished multilingual text. */}

        {/* 6. IN-PLACE EDITING */}
        <MagicWand />

        {/* WhatsApp / approval control is intentionally hidden for now.
            It reads like an agent product instead of a dictation product. */}

        {/* 7. MULTILINGUAL WRITING */}
        <LanguageTranslation />

        {/* Integrations / command surface is intentionally hidden for now.
            Keep the page focused on the daily download habit. */}

        {/* 8. TRUST */}
        <PrivacyStrip />
        <Metrics />
        <Testimonials />

        {/* 9. PRICING */}
        <PricingNew />

        {/* 10. DOWNLOAD */}
        <DeviceDownload />

        {/* 11. FAQ */}
        <FAQ />

        {/* 12. FINAL CTA */}
        <FinalCTA />
      </main>
      {/* NOTE: StickyDownloadCTA is global in layout.tsx — do not add another one here */}
    </>
  );
}
