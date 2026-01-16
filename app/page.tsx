import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SpeedMagic from '@/components/SpeedMagic';
import WorksEverywhereNew from '@/components/WorksEverywhereNew';
import HowItWorks from '@/components/HowItWorks';
import UseCases from '@/components/UseCases';
import Trust from '@/components/Trust';
import Testimonials from '@/components/Testimonials';
import PlatformDownload from '@/components/PlatformDownload';
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
        <SpeedMagic />
        <WorksEverywhereNew />
        <HowItWorks />
        <UseCases />
        <Trust />
        <Testimonials />
        <PlatformDownload />
        <ProTier />
        <FAQ />
        <FinalCTA />
        <Footer />
        <StickyCTA />
      </main>
    </>
  );
}
