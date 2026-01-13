import Hero from '@/components/Hero';
import LiveDemo from '@/components/LiveDemo';
import HowItWorks from '@/components/HowItWorks';
import Trust from '@/components/Trust';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <LiveDemo />
      <HowItWorks />
      <Trust />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </main>
  );
}
