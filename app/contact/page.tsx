import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: "Contact Us | Zavi AI",
  description: "Get in touch with the Zavi AI team. Contact support for help with voice typing, or reach out for partnerships and enterprise solutions.",
  alternates: { canonical: 'https://zavivoice.com/contact' },
  openGraph: {
    title: 'Contact Us — Zavi AI',
    description: 'Get in touch with the Zavi AI team. Product support, partnerships, and enterprise inquiries.',
    url: 'https://zavivoice.com/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-20">
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-[#111827] tracking-tight mb-6">
              Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">great together</span>
            </h1>
            <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
              Reach out anytime. You’ll hear directly from the team behind Zavi.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-20 text-left">
              {/* Product & Support */}
              <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#2563EB]">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12H8.01M12 12H12.01M16 12H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Product & Support</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Technical support, feature requests, or general questions about using Zavi. We're all ears for your feedback!
                </p>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Talk to Himanshu</span>
                  <a href="mailto:himanshu@zavivoice.com" className="text-xl font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors">
                    himanshu@zavivoice.com
                  </a>
                </div>
              </div>

              {/* Partnerships & Enterprise */}
              <div className="group bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#2563EB]">
                    <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Partnerships & Enterprise</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  For partnerships, press inquiries, enterprise solutions, or any wild suggestions you might have.
                </p>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Talk to Raman</span>
                  <a href="mailto:raman@zavivoice.com" className="text-xl font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors">
                    raman@zavivoice.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="max-w-2xl mx-auto bg-blue-50/50 rounded-2xl p-6 border border-blue-100 mb-16">
              <p className="text-gray-700 italic">
                "We try to get back to everyone within 24 hours. If it's urgent, just mention it in the subject line!"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                Back to Home
              </Link>
              <a
                href="/#faq"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl border border-gray-200 hover:border-gray-300 transition-all"
              >
                Check FAQs
              </a>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
