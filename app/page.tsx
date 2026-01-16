import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Metrics from '@/components/Metrics';
import PlatformDownload from '@/components/PlatformDownload';
import NotJustTranscription from '@/components/NotJustTranscription';
import LiveDemo from '@/components/LiveDemo';
import WorksEverywhere from '@/components/WorksEverywhere';
import HowItWorks from '@/components/HowItWorks';
import UseCases from '@/components/UseCases';
import Testimonials from '@/components/Testimonials';
import Trust from '@/components/Trust';
import ProTier from '@/components/ProTier';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <Hero />
        <Metrics />
        <PlatformDownload />
        <NotJustTranscription />
        <LiveDemo />
        <WorksEverywhere />
        <HowItWorks />
        <UseCases />
        <Testimonials />
        <Trust />
        <ProTier />
        <FAQ />
        <FinalCTA />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
