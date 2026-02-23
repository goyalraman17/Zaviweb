// Deployment trigger: GEO/AEO optimization for AI engine visibility
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/animated/ScrollProgress";
import JsonLd from "@/components/SEO/JsonLd";
import StickyDownloadCTA from "@/components/StickyDownloadCTA";
import {
  websiteSchema,
  organizationSchema,
  softwareApplicationSchema,
  faqSchema,
  howToSchema,
  videoObjectSchema,
  speakableSchema,
} from "@/lib/schemaData";

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
    default: "Zavi AI – Voice Typing Keyboard | Turn Speech into Professional Text",
    template: "%s | Zavi AI"
  },
  description: "Zavi AI is a voice typing keyboard that uses AI to turn natural speech into clean, professional text. Removes filler words, fixes grammar, works in every app. 100+ languages. Free to use. Available on Android, macOS, Windows, Linux.",
  keywords: [
    "voice typing",
    "voice typing keyboard",
    "AI voice typing",
    "speech to text",
    "dictation app",
    "AI keyboard",
    "voice to text",
    "Android keyboard",
    "Zavi AI",
    "Zavi",
    "AI voice writer",
    "voice writing keyboard",
    "professional dictation",
    "filler word removal",
    "grammar cleanup",
    "voice typing app",
    "best voice typing app",
    "AI dictation",
    "voice writing",
    "speech to text app",
    "voice input",
    "hands-free typing",
    "multilingual voice typing",
    "voice translation",
    "zero prompt AI",
    "Zavi vs Wispr Flow",
    "Zavi vs Willow",
    "Zavi vs Gboard",
    "best AI keyboard 2026",
    "voice typing for professionals",
  ],
  category: "Productivity",
  authors: [
    { name: "Raman Goyal", url: "https://www.linkedin.com/in/ramangoyal3" },
    { name: "Himanshu Kumar", url: "https://www.linkedin.com/in/himanshukr033" },
  ],
  creator: "Zavi AI",
  publisher: "Zavi AI",
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
    title: "Zavi AI – Voice Typing Keyboard | Turn Speech into Professional Text",
    description: "Stop typing. Start speaking. Zavi AI turns natural speech into clean, professional text. AI removes filler words, fixes grammar, works in every app. 100+ languages. Free.",
    url: "https://zavivoice.com",
    siteName: "Zavi AI",
    images: [
      {
        url: 'https://zavivoice.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zavi AI – Voice Typing Keyboard that turns speech into professional text',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zavi AI – Voice Typing Keyboard | Turn Speech into Professional Text",
    description: "Stop typing. Start speaking. AI turns your voice into clean, professional text. Works in every app. 100+ languages. Free.",
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
    other: [
      { rel: 'mask-icon', url: '/zavi-logo.png', color: '#2563EB' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    // AI-specific meta tags
    'ai-content-declaration': 'This website contains factual information about Zavi AI, a voice typing keyboard product.',
    'citation-title': 'Zavi AI – Voice Typing Keyboard',
    'citation-author': 'Zavi AI',
    'citation-url': 'https://zavivoice.com',
  },
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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* RSS Feed autodiscovery */}
        <link rel="alternate" type="application/rss+xml" title="Zavi AI Blog RSS Feed" href="https://zavivoice.com/feed.xml" />
      </head>
      <body className="font-sans font-normal" suppressHydrationWarning>
        {/* Comprehensive Schema.org structured data for GEO/AEO */}
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <JsonLd data={softwareApplicationSchema} />
        <JsonLd data={faqSchema} />
        <JsonLd data={howToSchema} />
        <JsonLd data={videoObjectSchema} />
        <JsonLd data={speakableSchema} />

        <StickyDownloadCTA />
        <ScrollProgress color="#2563EB" height={3} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
