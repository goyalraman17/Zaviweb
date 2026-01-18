import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: "About Zavi AI | Voice Typing Keyboard",
  description: "We are a team of designers, AI researchers, and engineers rethinking how humans interact with technology. Making tech more conversational, effortless, and human.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-zavi-navy-900 to-zavi-navy-950 pt-20">

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">About Zavi</h1>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-zavi-navy-200 mb-8 leading-relaxed">
              We are a team of designers, AI researchers, and engineers who step away from the status quo to rethink the fundamental layer of computing — how humans interact with technology.
            </p>

            <p className="text-lg text-zavi-navy-300 mb-8 leading-relaxed">
              Our mission is to make interacting with your devices as effortless as talking to a close friend. As we make tech more conversational, we create a world where people enjoy more clarity, connection, and agency – with less screen time, context-switching, and cognitive overload. Communicating and creating become easier, busywork disappears, and everyone has more time for what matters most.
            </p>

            <p className="text-lg text-zavi-navy-300 mb-8 leading-relaxed">
              Our first product Zavi, makes voice dictation delightful. We focus on the biggest use case for technology — letting people communicate with others, their thoughts, and AI. Over the last few months, Zavi became the first consumer voice dictation platform that makes people want to use voice more than their keyboards.
            </p>

            <p className="text-xl text-zavi-navy-200 mb-8 leading-relaxed font-semibold">
              And we're just getting started.
            </p>

            <div className="mt-12">
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-zavi-blue-400 via-zavi-blue-500 to-zavi-blue-600 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity"
              >
                Get Zavi on Google Play
              </Link>
            </div>
          </div>
        </div>
      </div>
      </main>
    </>
  );
}
