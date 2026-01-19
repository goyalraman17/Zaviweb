import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: "How It Works | Zavi",
  description: "Learn how Zavi transforms your voice into polished text in seconds.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">How It Works</h1>
            <p className="text-lg text-gray-600 mb-12">Transform your voice into polished text in seconds</p>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#6B7FE8] to-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Speak Naturally</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Press the microphone button or hold the space key and start speaking. Talk naturally - no need to worry about "ums," "ahs," or pauses. Zavi understands your natural speech patterns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#6B7FE8] to-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">AI Processes Your Speech</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our advanced AI transcribes your voice in real-time, removing filler words, fixing grammar, and formatting your text professionally. All processing happens instantly and securely.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#6B7FE8] to-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Polished Text</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Receive perfectly formatted, professional text ready to use in any app. Whether it's an email, document, or message, your words are polished and ready to send.
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes Zavi Different</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">Works in every app - no copy-pasting required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">Automatically removes filler words and fixes grammar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">Supports 100+ languages with professional formatting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg text-gray-700">Custom dictionary for industry-specific terms</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center mt-12 pt-8 border-t border-gray-300">
                <Link
                  href="/try-free"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#6B7FE8] to-[#8B5CF6] text-white font-semibold rounded-xl hover:shadow-xl transition-all"
                >
                  Try Zavi Free
                </Link>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
