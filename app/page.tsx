import Hero from '@/components/Hero';
import NotJustTranscription from '@/components/NotJustTranscription';
import LiveDemo from '@/components/LiveDemo';
import WorksEverywhere from '@/components/WorksEverywhere';
import HowItWorks from '@/components/HowItWorks';
import UseCases from '@/components/UseCases';
import Trust from '@/components/Trust';
import ProTier from '@/components/ProTier';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <NotJustTranscription />
      <LiveDemo />
      <WorksEverywhere />
      <HowItWorks />
      <UseCases />
      <Trust />
      <ProTier />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </main>
  );
}
