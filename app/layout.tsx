// Deployment trigger: GEO/AEO optimization for AI engine visibility
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/animated/ScrollProgress';
import JsonLd from '@/components/SEO/JsonLd';
import StickyDownloadCTA from '@/components/StickyDownloadCTA';
import { websiteSchema, organizationSchema } from '@/lib/schemaData';

// Optimize font loading with Next.js font optimization
// Only load essential weights: 400 (regular), 600 (semibold), 700 (bold)
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zavivoice.com'),
  alternates: {
    canonical: '/',
    types: {
      'text/plain': '/llms.txt',
    },
  },
  title: {
    default: 'Zavi AI | Free AI Voice Dictation for Every App',
    template: '%s | Zavi AI',
  },
  description:
    'Download Zavi free. Speak naturally in any app on Android, iOS, Mac, Windows, or Linux and get polished text in the language you choose. Magic Wand edits selected text in place.',
  keywords: [
    'Zavi',
    'Zavi AI',
    'Zavi AI voice dictation',
    'AI voice dictation',
    'Zavi app',
    'multilingual dictation',
    'voice translator',
    'voice to polished text',
    'voice assistant app',
    'voice typing',
    'voice writing app',
    'AI voice typing',
    'speech to text',
    'dictation app',
    'AI keyboard',
    'voice to text',
    'AI voice writer',
    'voice writing keyboard',
    'professional dictation',
    'filler word removal',
    'voice typing app',
    'best voice typing app',
    'AI dictation',
    'speech to text app',
    'voice input',
    'hands-free typing',
    'multilingual voice typing',
    'voice translation',
    'Zavi vs Wispr Flow',
    'Zavi vs Siri',
    'Zavi vs Gboard',
    'best AI keyboard 2026',
    'voice typing for professionals',
  ],
  category: 'Productivity',
  authors: [
    { name: 'Raman Goyal', url: 'https://www.linkedin.com/in/ramangoyal3' },
    { name: 'Himanshu Kumar', url: 'https://www.linkedin.com/in/hsyvy/' },
  ],
  creator: 'Zavi AI',
  publisher: 'Zavi AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'Zavi AI | Free AI Voice Dictation for Every App',
    description:
      'Speak naturally across Android, iOS, Mac, Windows, and Linux. Zavi writes polished multilingual text in any app, with Magic Wand for quick edits.',
    url: 'https://zavivoice.com',
    siteName: 'Zavi AI',
    images: [
      {
        url: 'https://zavivoice.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zavi AI voice dictation across Android, iOS, Mac, Windows, and Linux',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zavi AI | Free AI Voice Dictation for Every App',
    description:
      'Download Zavi free. Speak in any app and get polished text in the language you choose.',
    creator: '@zavivoice',
    site: '@zavivoice',
    images: ['https://zavivoice.com/twitter-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [{ rel: 'mask-icon', url: '/zavi-logo.png', color: '#2563EB' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth`}
    >
      <head>
        {/* Font preconnect for ~200ms faster font load on mobile */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for analytics and external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        {/* RSS Feed autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Zavi AI Blog RSS Feed"
          href="https://zavivoice.com/feed.xml"
        />
      </head>
      <body className="font-sans font-normal" suppressHydrationWarning>
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />

        <StickyDownloadCTA />
        <ScrollProgress color="#0a0a0a" height={2} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
