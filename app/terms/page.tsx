import Link from 'next/link';

export const metadata = {
  title: "Terms of Service | Zavi AI",
  description: "Zavi AI's terms of service. Read our terms and conditions for using the voice typing keyboard.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6 border-b border-zavi-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit">
            <div className="w-10 h-10 bg-gradient-to-br from-zavi-blue-400 to-zavi-blue-600 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="5" width="12" height="2" rx="1" fill="white"/>
                <path d="M8 7Q9 9 10 11T11 17" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <rect x="6" y="17" width="12" height="2" rx="1" fill="white"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-zavi-gray-900">Zavi AI</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-zavi-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-zavi-gray-600 mb-12">Last updated: January 13, 2026</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">1. Acceptance of Terms</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              By accessing or using Zavi AI ("Zavi," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our service.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">2. Description of Service</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              Zavi is an AI-powered voice typing keyboard application for Android devices. The service converts speech to text while removing filler words, correcting grammar, and improving structure.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">3. User Responsibilities</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              You agree to:
            </p>
            <ul className="list-disc pl-6 text-lg text-zavi-gray-700 mb-6 space-y-2">
              <li>Provide accurate information when creating an account</li>
              <li>Use Zavi in compliance with all applicable laws and regulations</li>
              <li>Not use the service for illegal, harmful, or abusive purposes</li>
              <li>Not attempt to reverse engineer, decompile, or hack the application</li>
              <li>Not use automated systems to access the service</li>
              <li>Keep your account credentials secure</li>
            </ul>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">4. Free and Pro Tiers</h2>

            <h3 className="text-2xl font-semibold text-zavi-gray-900 mt-8 mb-3">Free Tier</h3>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              The free version includes basic features with daily usage limits. We reserve the right to modify these limits at any time.
            </p>

            <h3 className="text-2xl font-semibold text-zavi-gray-900 mt-8 mb-3">Pro Tier</h3>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              Pro subscriptions provide unlimited usage and additional features. Subscriptions are billed through the Google Play Store and are subject to Google's terms and refund policies.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">5. Intellectual Property</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              All content, features, and functionality of Zavi—including but not limited to software, text, graphics, logos, and AI models—are owned by Zavi AI and protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">6. Privacy and Data</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              Your use of Zavi is also governed by our Privacy Policy. We do not store voice recordings. All audio is processed and immediately deleted. For full details, please review our <Link href="/privacy" className="text-zavi-blue-600 hover:underline">Privacy Policy</Link>.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">7. Service Availability</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              We strive to provide reliable service but cannot guarantee uninterrupted access. We may:
            </p>
            <ul className="list-disc pl-6 text-lg text-zavi-gray-700 mb-6 space-y-2">
              <li>Modify, suspend, or discontinue any aspect of the service</li>
              <li>Impose limits on features or access</li>
              <li>Perform maintenance that temporarily affects availability</li>
            </ul>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              Zavi is provided "as is" without warranties of any kind, either express or implied. We do not warrant that:
            </p>
            <ul className="list-disc pl-6 text-lg text-zavi-gray-700 mb-6 space-y-2">
              <li>The service will be error-free or uninterrupted</li>
              <li>Transcriptions will always be 100% accurate</li>
              <li>The service will meet your specific requirements</li>
              <li>Defects will be corrected</li>
            </ul>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">9. Limitation of Liability</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              To the fullest extent permitted by law, Zavi AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">10. Termination</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              We may terminate or suspend your access immediately, without prior notice, for:
            </p>
            <ul className="list-disc pl-6 text-lg text-zavi-gray-700 mb-6 space-y-2">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Abuse of the service</li>
            </ul>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              You may terminate your account at any time by uninstalling the app and contacting us to delete your data.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">11. Changes to Terms</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              We reserve the right to modify these Terms at any time. Significant changes will be notified through the app or via email. Continued use after changes constitutes acceptance of the new Terms.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">12. Governing Law</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              These Terms are governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">13. Contact Information</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              For questions about these Terms, contact us at:
            </p>
            <p className="text-lg text-zavi-gray-700 mb-6">
              Email: <a href="mailto:legal@zavi.ai" className="text-zavi-blue-600 hover:underline">legal@zavi.ai</a>
            </p>

            <div className="mt-12 pt-8 border-t border-zavi-gray-200">
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-zavi-blue-400 via-zavi-blue-500 to-zavi-blue-600 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
