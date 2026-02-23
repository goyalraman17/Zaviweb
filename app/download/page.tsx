import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema, softwareApplicationSchema } from '@/lib/schemaData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Download Zavi AI — Free Voice Typing App for Android, iOS, Mac, Windows, Linux',
    description: 'Download Zavi AI voice typing keyboard for free. Available on Android, iOS, macOS, Windows, and Linux. Turn speech into clean, professional text in every app.',
    alternates: { canonical: 'https://zavivoice.com/download' },
    openGraph: {
        title: 'Download Zavi AI — Voice Typing That Replaces Your Keyboard',
        description: 'Free AI voice typing for Android, iOS, Mac, Windows, and Linux. Speak naturally, get polished text. No editing needed.',
        url: 'https://zavivoice.com/download',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Download Zavi AI — Free Voice Typing App',
        description: 'Turn your voice into clean, professional text. Download free for all platforms.',
    },
};

const platforms = [
    {
        name: 'Android',
        icon: '🤖',
        status: 'Available',
        requirement: 'Android 8.0+',
        description: 'System-wide AI keyboard. Works in every app — Gmail, WhatsApp, Slack, and more.',
        cta: 'Get on Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard',
        highlight: true,
    },
    {
        name: 'iOS',
        icon: '🍎',
        status: 'Available',
        requirement: 'iOS 16+',
        description: 'AI voice typing keyboard for iPhone and iPad. Works system-wide in every app.',
        cta: 'Get on App Store',
        href: 'https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802',
        highlight: true,
    },
    {
        name: 'macOS',
        icon: '💻',
        status: 'Available',
        requirement: 'macOS 12+',
        description: 'Desktop voice typing app. Speak into any app on your Mac.',
        cta: 'Download for Mac',
        href: '/downloads/Zavi_AI.dmg',
        highlight: false,
    },
    {
        name: 'Windows',
        icon: '🪟',
        status: 'Available',
        requirement: 'Windows 10+',
        description: 'Desktop voice typing for Windows. System-wide voice input.',
        cta: 'Download for Windows',
        href: '/#download',
        highlight: false,
    },
    {
        name: 'Linux',
        icon: '🐧',
        status: 'Available',
        requirement: 'Ubuntu 20.04+ / Debian',
        description: 'Voice typing for Linux desktops. Available as .deb package.',
        cta: 'Download .deb',
        href: '/downloads/Zavi_0.1.0_amd64.deb',
        highlight: false,
    },
];

export default function DownloadPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Download', url: 'https://zavivoice.com/download' },
    ]);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={softwareApplicationSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Download</span>
                    </nav>

                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Download Zavi AI
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
                            Stop typing. Start speaking. Get Zavi on every device you use.
                        </p>
                        <p className="text-gray-500">
                            Free to download • No credit card required • Works in every app
                        </p>
                    </div>

                    {/* Platform Cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {platforms.map((platform) => (
                            <div
                                key={platform.name}
                                className={`rounded-2xl p-6 border-2 transition-all hover:shadow-lg ${platform.highlight
                                    ? 'border-blue-200 bg-blue-50/50'
                                    : 'border-gray-200 bg-white'
                                    }`}
                            >
                                <div className="text-4xl mb-3">{platform.icon}</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{platform.name}</h2>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                        ✓ {platform.status}
                                    </span>
                                    <span className="text-xs text-gray-500">{platform.requirement}</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-5">{platform.description}</p>
                                <a
                                    href={platform.href}
                                    className={`block text-center px-5 py-3 rounded-xl font-semibold transition-all ${platform.highlight
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                        }`}
                                    target={platform.href.startsWith('http') ? '_blank' : undefined}
                                    rel={platform.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    {platform.cta}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* How to Get Started */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Get Started in 60 Seconds</h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                            {[
                                { step: '1', title: 'Download & Install', desc: 'Get Zavi from your app store or download page. Set as your default keyboard on mobile.' },
                                { step: '2', title: 'Tap the Microphone', desc: 'Open any app. Tap the mic icon on the Zavi keyboard and speak naturally.' },
                                { step: '3', title: 'Get Perfect Text', desc: 'Zavi removes filler words, fixes grammar, and delivers polished text. Send it.' },
                            ].map((item) => (
                                <div key={item.step} className="text-center">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trust Section */}
                    <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center mb-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Trusted by Professionals Worldwide</h2>
                        <div className="flex items-center justify-center gap-8 flex-wrap mb-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-blue-600">4.8★</p>
                                <p className="text-sm text-gray-500">App Rating</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-blue-600">100+</p>
                                <p className="text-sm text-gray-500">Languages</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-blue-600">4x</p>
                                <p className="text-sm text-gray-500">Faster than typing</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Your voice is processed in real-time and immediately deleted. Never stored, never shared.
                        </p>
                    </div>

                    {/* FAQ */}
                    <div className="max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Download FAQ</h2>
                        <div className="space-y-6">
                            {[
                                { q: 'Is Zavi AI free to download?', a: 'Yes. Zavi is free to download on all platforms. The free plan includes AI voice typing with filler word removal, grammar correction, and 100+ language support. Pro unlocks unlimited usage for $7.99/month.' },
                                { q: 'Does Zavi work on iPhone?', a: 'Yes. Zavi AI is available on iOS 16+ as a system-wide keyboard. Download from the App Store and enable it in Settings → General → Keyboard → Keyboards → Add New Keyboard → Zavi.' },
                                { q: 'How do I set Zavi as my default keyboard?', a: 'On Android: Settings → Language & Input → Default Keyboard → Zavi. On iOS: Settings → General → Keyboard → Keyboards → Add Zavi. On desktop, Zavi runs as a standalone app.' },
                                { q: 'Is my data safe?', a: 'Yes. Zavi processes your voice in real-time and immediately deletes the audio. We never store, share, or use your voice data to train AI models.' },
                            ].map((faq) => (
                                <div key={faq.q} className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                                    <p className="text-gray-600">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to type 4x faster?</h2>
                        <p className="text-blue-100 mb-6">Start saving 1+ hours every day with voice-to-text that actually works.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.pingpros.keyboard"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                            >
                                Download for Android
                            </a>
                            <a
                                href="https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-400 transition-colors"
                            >
                                Download for iOS
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
