import Link from 'next/link';

export const metadata = {
  title: "About Zavi AI | Voice Writing Platform",
  description: "Learn about Zavi AI and our mission to make communication faster and more natural through AI-powered voice writing.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zavi-navy-900 to-zavi-navy-950">
      {/* Header */}
      <header className="py-6 border-b border-zavi-navy-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="5" width="12" height="2" rx="1" fill="#1a8cff"/>
                <path d="M8 7Q9 9 10 11T11 17" stroke="#1a8cff" strokeWidth="2.5" strokeLinecap="round"/>
                <rect x="6" y="17" width="12" height="2" rx="1" fill="#1a8cff"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Zavi AI</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">About Zavi</h1>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-zavi-navy-200 mb-6 leading-relaxed">
              Zavi AI is redefining how people communicate. We built an AI-powered voice writing platform that transforms natural speech into professional text—instantly, across all your devices.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">Our Mission</h2>
            <p className="text-lg text-zavi-navy-300 mb-6 leading-relaxed">
              We believe communication should be effortless. Typing is slow and tedious. Traditional dictation captures every "um" and "uh," leaving you to clean up the mess. We knew there was a better way.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">What Makes Zavi Different</h2>
            <p className="text-lg text-zavi-navy-300 mb-6 leading-relaxed">
              Zavi isn't just voice-to-text—it's an AI writing assistant that works everywhere you write. We remove filler words, fix grammar, and structure your thoughts into clear, professional text. All in real-time, across every platform.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">Privacy First</h2>
            <p className="text-lg text-zavi-navy-300 mb-6 leading-relaxed">
              Your privacy is non-negotiable. Zavi's microphone only activates when you tap. We process your speech and immediately delete the audio—we never store recordings. Your data is encrypted, and you maintain full control.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">Built for Everyone</h2>
            <p className="text-lg text-zavi-navy-300 mb-6 leading-relaxed">
              Whether you're a professional composing emails, a creator capturing ideas, or someone who simply prefers speaking to typing—Zavi was built for you. We support 100+ languages and work on Mac, Windows, Linux, iOS, and Android.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">Join Us</h2>
            <p className="text-lg text-zavi-navy-300 mb-8 leading-relaxed">
              Over 50,000 professionals have already made the switch to Zavi. Join a community of people who think faster than they type.
            </p>

            <div className="mt-12">
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-zavi-blue-400 via-zavi-blue-500 to-zavi-blue-600 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity"
              >
                Download Zavi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
