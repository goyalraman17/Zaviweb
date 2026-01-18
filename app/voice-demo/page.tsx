'use client';

import {
  Hero,
  DemoCard,
  CurvedTextChaotic,
  CurvedTextPolished,
  TrustStrip,
  ToneSwitcher,
  DeviceGrid
} from '@/components/voice';

export default function VoiceDemoPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Curved Text Decoration - Chaotic */}
      <div className="px-6 py-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <CurvedTextChaotic />
        </div>
      </div>

      {/* Demo Card Section */}
      <DemoCard />

      {/* Curved Text Decoration - Polished */}
      <div className="px-6 py-8 bg-gradient-to-b from-white to-[#F5F1EC]/30">
        <div className="max-w-4xl mx-auto">
          <CurvedTextPolished />
        </div>
      </div>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Tone Switcher */}
      <ToneSwitcher />

      {/* Device Grid */}
      <DeviceGrid />

      {/* Footer Spacer */}
      <div className="h-16 bg-gradient-to-b from-white to-[#F5F1EC]/30" />
    </main>
  );
}
