// Deployment trigger: Reverting SEO changes to fix demo issues
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/animated/ScrollProgress";
import JsonLd from "@/components/SEO/JsonLd";
import StickyDownloadCTA from "@/components/StickyDownloadCTA";

// Optimize font loading with Next.js font optimization
// Only load essential weights: 400 (regular), 600 (semibold), 700 (bold)
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zavi.ai'),
  alternates: {
    canonical: '/',
  },
  title: "Zavi AI – Voice Typing Keyboard for Android",
  description: "Stop typing. Start speaking. Turn natural speech into clean, professional text in any app.",
  keywords: [
    "voice typing",
    "speech to text",
    "dictation app",
    "Android keyboard",
    "Zavi AI",
    "AI voice writer",
    "voice writing keyboard",
    "professional dictation",
    "filler word removal",
    "grammar cleanup"
  ],
  category: "Productivity",
  authors: [{ name: "Zavi AI" }],
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
    title: "Zavi AI – Voice Typing Keyboard for Android",
    description: "Stop typing. Start speaking. Turn natural speech into clean, professional text in any app.",
    url: "https://zavi.ai", // Replace with your actual domain
    siteName: "Zavi AI",
    images: [
      {
        url: 'https://zavi.ai/og-image.png', // Add an engaging Open Graph image
        width: 1200,
        height: 630,
        alt: 'Zavi AI Voice Typing Keyboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zavi AI – Voice Typing Keyboard for Android",
    description: "Stop typing. Start speaking. Turn natural speech into clean, professional text in any app.",
    creator: '@zavivoice', // Add your Twitter handle
    images: ['https://zavi.ai/twitter-image.png'], // Add a Twitter-specific image
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
  manifest: '/site.webmanifest', // Add a web app manifest
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
      <body className="font-sans font-normal" suppressHydrationWarning>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Zavi AI",
            "operatingSystem": "Android, macOS, Windows, Linux",
            "applicationCategory": "ProductivityApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Zavi AI",
            "url": "https://zavi.ai",
            "logo": "https://zavi.ai/zavi-logo.png",
            "sameAs": [
              "https://twitter.com/zavivoice"
            ]
          }}
        />
        <StickyDownloadCTA />
        <ScrollProgress color="#2563EB" height={3} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
