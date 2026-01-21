import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: "About Zavi | Voice Typing Keyboard",
  description: "We are a team of designers, AI researchers, and engineers rethinking how humans interact with technology. Making tech more conversational, effortless, and human.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-20">
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8">About Zavi</h1>

            <div className="space-y-8">
              {/* Mission Statement */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <p className="text-xl text-gray-800 leading-relaxed">
                  We are a team of designers, AI researchers, and engineers who step away from the status quo to rethink the fundamental layer of computing — how humans interact with technology.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Our mission is to make interacting with your devices as effortless as talking to a close friend. As we make tech more conversational, we create a world where people enjoy more clarity, connection, and agency – with less screen time, context-switching, and cognitive overload.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Communicating and creating become easier, busywork disappears, and everyone has more time for what matters most.
                </p>
              </div>

              {/* Product */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Product</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Our first product, Zavi, makes voice dictation delightful. We focus on the biggest use case for technology — letting people communicate with others, their thoughts, and AI.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Over the last few months, Zavi became the first consumer voice dictation platform that makes people want to use voice more than their keyboards.
                </p>
              </div>

              {/* Key Features Highlight */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Sets Us Apart</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#6B7FE8] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">Advanced AI that understands natural speech patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#6B7FE8] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">Automatic formatting and grammar correction in real-time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#6B7FE8] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">Seamless integration across all your favorite apps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#6B7FE8] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">Privacy-focused design with secure data handling</span>
                  </li>
                </ul>
              </div>

              {/* Future */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  And we're just getting started.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of users who have already transformed the way they communicate.
                </p>
                <Link
                  href="/#try-demo"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#6B7FE8] to-[#8B5CF6] text-white font-semibold rounded-xl hover:shadow-xl transition-all"
                >
                  Try Zavi Free
                </Link>
              </div>

              {/* Back to Home */}
              <div className="pt-8 border-t border-gray-300 text-center">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
