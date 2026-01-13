import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy | Zavi AI",
  description: "Zavi AI's privacy policy. Learn how we protect your data and respect your privacy.",
};

export default function PrivacyPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-zavi-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-zavi-gray-600 mb-12">Last updated: January 13, 2026</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">Introduction</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              At Zavi AI, your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your information when you use our voice typing keyboard application.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">Information We Collect</h2>

            <h3 className="text-2xl font-semibold text-zavi-gray-900 mt-8 mb-3">Voice Data</h3>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              When you use Zavi's voice typing feature, your voice is temporarily processed to convert speech to text. This audio data is:
            </p>
            <ul className="list-disc pl-6 text-lg text-zavi-gray-700 mb-6 space-y-2">
              <li>Only captured when you explicitly tap the microphone button</li>
              <li>Processed immediately to generate text</li>
              <li>Deleted immediately after processing</li>
              <li>Never stored, saved, or retained on our servers</li>
            </ul>

            <h3 className="text-2xl font-semibold text-zavi-gray-900 mt-8 mb-3">Usage Data</h3>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              We may collect anonymous usage statistics to improve our service, including:
            </p>
            <ul className="list-disc pl-6 text-lg text-zavi-gray-700 mb-6 space-y-2">
              <li>Feature usage frequency</li>
              <li>Error reports and crash logs</li>
              <li>Device type and Android version</li>
              <li>Language preferences</li>
            </ul>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              This data is aggregated and cannot be used to identify individual users.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">How We Use Your Information</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              We use collected information solely to:
            </p>
            <ul className="list-disc pl-6 text-lg text-zavi-gray-700 mb-6 space-y-2">
              <li>Provide and improve voice typing functionality</li>
              <li>Fix bugs and enhance performance</li>
              <li>Analyze usage patterns to develop new features</li>
              <li>Ensure service security and prevent abuse</li>
            </ul>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">Data Security</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-lg text-zavi-gray-700 mb-6 space-y-2">
              <li>All data transmission is encrypted using TLS/SSL</li>
              <li>Audio processing happens in secure, isolated environments</li>
              <li>Access to systems is strictly controlled and monitored</li>
              <li>Regular security audits and updates</li>
            </ul>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">Your Rights</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-lg text-zavi-gray-700 mb-6 space-y-2">
              <li>Request access to your data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of anonymous analytics</li>
              <li>Export your data in a portable format</li>
            </ul>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">Third-Party Services</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              Zavi uses trusted third-party services for:
            </p>
            <ul className="list-disc pl-6 text-lg text-zavi-gray-700 mb-6 space-y-2">
              <li>Cloud-based speech processing (when on-device processing is unavailable)</li>
              <li>Analytics and crash reporting</li>
              <li>Payment processing for Pro subscriptions</li>
            </ul>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              These services are bound by strict data processing agreements and comply with applicable privacy regulations.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">Children's Privacy</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              Zavi is not intended for use by children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">Changes to This Policy</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              We may update this Privacy Policy periodically. We will notify users of significant changes through the app or via email. Continued use of Zavi after changes indicates acceptance of the updated policy.
            </p>

            <h2 className="text-3xl font-bold text-zavi-gray-900 mt-12 mb-4">Contact Us</h2>
            <p className="text-lg text-zavi-gray-700 mb-6 leading-relaxed">
              If you have questions about this Privacy Policy or your data, please contact us at:
            </p>
            <p className="text-lg text-zavi-gray-700 mb-6">
              Email: <a href="mailto:privacy@zavi.ai" className="text-zavi-blue-600 hover:underline">privacy@zavi.ai</a>
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
