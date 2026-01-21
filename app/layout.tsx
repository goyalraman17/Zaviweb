import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

// Optimize font loading with Next.js font optimization
// Only load essential weights: 400 (regular), 600 (semibold), 700 (bold)
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Zavi AI – Voice Typing Keyboard for Android",
  description: "Stop typing. Start speaking. Turn natural speech into clean, professional text in any app.",
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
