import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
