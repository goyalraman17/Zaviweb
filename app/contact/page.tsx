import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: "Contact Us | Zavi",
  description: "Get in touch with Zavi. Contact our support team for help with the voice typing app.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 pt-20">
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-12">We're here to help. Reach out to us through any of the channels below.</p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Support */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-xl flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="white" strokeWidth="2"/>
                    <path d="M8 12H8.01M12 12H12.01M16 12H16.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Support</h2>
                <p className="text-base text-gray-700 mb-4">
                  For technical support, feature requests, or general questions about using Zavi.
                </p>
                <a href="mailto:support@zavi.ai" className="text-[#2563EB] hover:underline font-semibold">
                  support@zavi.ai
                </a>
              </div>

              {/* Business */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-xl flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Inquiries</h2>
                <p className="text-base text-gray-700 mb-4">
                  For partnerships, press inquiries, or enterprise solutions.
                </p>
                <a href="mailto:hello@zavi.ai" className="text-[#2563EB] hover:underline font-semibold">
                  hello@zavi.ai
                </a>
              </div>

              {/* Legal */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-xl flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Legal & Privacy</h2>
                <p className="text-base text-gray-700 mb-4">
                  For privacy concerns, data requests, or legal matters.
                </p>
                <a href="mailto:legal@zavi.ai" className="text-[#2563EB] hover:underline font-semibold">
                  legal@zavi.ai
                </a>
              </div>

              {/* Community */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-xl flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Community</h2>
                <p className="text-base text-gray-700 mb-4">
                  Join our community to share feedback, connect with other users, and stay updated.
                </p>
                <a href="mailto:community@zavi.ai" className="text-[#2563EB] hover:underline font-semibold">
                  community@zavi.ai
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Response Times</h2>
              <div className="space-y-3 text-base text-gray-700">
                <p><span className="font-semibold">Support inquiries:</span> We typically respond within 24 hours</p>
                <p><span className="font-semibold">Business inquiries:</span> We typically respond within 48 hours</p>
                <p><span className="font-semibold">Legal/Privacy matters:</span> We respond as quickly as possible, depending on complexity</p>
              </div>
            </div>

            {/* FAQ Reference */}
            <div className="text-center mb-12">
              <p className="text-lg text-gray-700 mb-6">
                Before reaching out, you might find your answer in our FAQ section.
              </p>
              <a
                href="/#faq"
                className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
              >
                View FAQ
              </a>
            </div>

            <div className="pt-8 border-t border-gray-300 text-center">
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-xl transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
