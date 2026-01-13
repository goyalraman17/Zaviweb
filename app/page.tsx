import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import BeforeAfter from '@/components/BeforeAfter';
import Features from '@/components/Features';
import Audience from '@/components/Audience';
import HowItWorks from '@/components/HowItWorks';
import Privacy from '@/components/Privacy';
import Pro from '@/components/Pro';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Problem />
      <BeforeAfter />
      <Features />
      <Audience />
      <HowItWorks />
      <Privacy />
      <Pro />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </main>
  );
}
