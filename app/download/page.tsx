import Navigation from '@/components/Navigation';
import FAQ from '@/components/FAQ';
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

const mobilePlatforms = [
    {
        name: 'iOS',
        icon: (
            <svg className="w-10 h-10 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
        ),
        status: 'Available',
        requirement: 'iOS 16+',
        description: 'AI voice typing keyboard for iPhone and iPad. Works system-wide in every app.',
        cta: 'Get on App Store',
        href: 'https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802',
        highlight: true,
    },
    {
        name: 'Android',
        icon: (
            <svg className="w-10 h-10 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.61 15.15C16.15 15.15 15.77 15.53 15.77 16C15.77 16.46 16.15 16.85 16.61 16.85C17.07 16.85 17.45 16.46 17.45 16C17.45 15.53 17.07 15.15 16.61 15.15M7.41 15.15C6.95 15.15 6.57 15.53 6.57 16C6.57 16.46 6.95 16.85 7.41 16.85C7.87 16.85 8.25 16.46 8.25 16C8.25 15.53 7.87 15.15 7.41 15.15M16.91 10.14L18.58 7.26C18.67 7.09 18.61 6.88 18.45 6.79C18.28 6.69 18.07 6.75 18 6.92L16.29 9.83C14.95 9.22 13.5 8.9 12 8.91C10.47 8.91 9 9.24 7.73 9.82L6.04 6.91C5.95 6.74 5.74 6.68 5.57 6.78C5.4 6.87 5.35 7.08 5.44 7.25L7.1 10.13C4.25 11.69 2.29 14.58 2 18H22C21.72 14.59 19.77 11.7 16.91 10.14Z" />
            </svg>
        ),
        status: 'Available',
        requirement: 'Android 8.0+',
        description: 'System-wide AI keyboard. Works in every app — Gmail, WhatsApp, Slack, and more.',
        cta: 'Get on Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard',
        highlight: true,
    }
];

const desktopPlatforms = [
    {
        name: 'macOS',
        icon: (
            <svg className="w-10 h-10 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
        ),
        status: 'Available',
        requirement: 'macOS 12+',
        description: 'Desktop voice typing app. Speak into any app on your Mac.',
        cta: 'Download for Mac',
        href: '/Zavi_AI.dmg',
        highlight: true,
    },
    {
        name: 'Windows',
        icon: (
            <svg className="w-10 h-10 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
            </svg>
        ),
        status: 'Available',
        requirement: 'Windows 10+',
        description: 'Desktop voice typing for Windows. System-wide voice input.',
        cta: 'Download for Windows',
        href: '/downloads/Zavi_Windows.exe',
        highlight: true,
    },
    {
        name: 'Linux',
        icon: (
            <svg className="w-10 h-10 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 12V8H18V12H20M4 12V8H6V12H4M16.5 13.5C16.5 14.33 15.83 15 15 15S13.5 14.33 13.5 13.5 14.17 12 15 12 16.5 12.67 16.5 13.5M10.5 13.5C10.5 14.33 9.83 15 9 15S7.5 14.33 7.5 13.5 8.17 12 9 12 10.5 12.67 10.5 13.5M19 13V18C19 19.11 18.11 20 17 20H15V22H13V20H11V22H9V20H7C5.9 20 5 19.11 5 18V13C5 11.9 5.9 11 7 11H17C18.11 11 19 11.9 19 13M12 2C9 2 7 4.5 7 7V9H17V7C17 4.5 15 2 12 2Z" />
            </svg>
        ),
        status: 'Available',
        requirement: 'Ubuntu 20.04+ / Debian',
        description: 'Voice typing for Linux desktops. Available as .deb package.',
        cta: 'Download for Linux',
        href: '/downloads/Zavi_Linux.deb',
        highlight: true,
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

            <main className="min-h-screen bg-[#FAFAFA] pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Download</span>
                    </nav>

                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
                            Download Zavi AI
                        </h1>
                        <p className="text-xl text-slate-700 max-w-2xl mx-auto mb-4 font-medium">
                            Stop typing. Start speaking. Get Zavi on every device you use.
                        </p>
                        <p className="text-slate-500 font-medium">
                            Free to download • No credit card required • Works in every app
                        </p>
                    </div>

                    {/* Mobile Platforms (iOS and Android first) */}
                    <div className="grid sm:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
                        {mobilePlatforms.map((platform) => (
                            <div
                                key={platform.name}
                                className={`rounded-3xl p-8 border-2 transition-all hover:-translate-y-1 hover:shadow-xl ${platform.highlight
                                    ? 'border-blue-500 bg-white ring-4 ring-blue-50 shadow-lg'
                                    : 'border-slate-200 bg-white'
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">{platform.icon}</div>
                                    <h2 className="text-3xl font-bold text-slate-900">{platform.name}</h2>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
                                        ✓ {platform.status}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-500">{platform.requirement}</span>
                                </div>
                                <p className="text-slate-600 text-base mb-8 min-h-[48px] font-medium leading-relaxed">{platform.description}</p>
                                <a
                                    href={platform.href}
                                    className={`block text-center px-6 py-4 rounded-2xl font-bold text-lg transition-all ${platform.highlight
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg shadow-md hover:scale-[1.02]'
                                        : 'bg-slate-900 text-white hover:bg-slate-800'
                                        }`}
                                    target={platform.href.startsWith('http') ? '_blank' : undefined}
                                    rel={platform.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    {platform.cta}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Platforms */}
                    <div className="grid sm:grid-cols-3 gap-6 mb-24 max-w-6xl mx-auto">
                        {desktopPlatforms.map((platform) => (
                            <div
                                key={platform.name}
                                className="rounded-3xl p-8 border-2 border-slate-200 bg-white transition-all hover:border-blue-400 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">{platform.icon}</div>
                                    <h2 className="text-2xl font-bold text-slate-900">{platform.name}</h2>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
                                        ✓ {platform.status}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-500">{platform.requirement}</span>
                                </div>
                                <p className="text-slate-600 text-base mb-8 min-h-[48px] font-medium leading-relaxed">{platform.description}</p>
                                <a
                                    href={platform.href}
                                    className="block text-center px-6 py-4 rounded-2xl font-bold text-lg bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
                                    target={platform.href.startsWith('http') ? '_blank' : undefined}
                                    rel={platform.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    {platform.cta}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Trust Section */}
                    <div className="bg-white rounded-[2.5rem] p-10 md:p-14 text-center mb-20 border border-slate-200 shadow-sm max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Trusted by Professionals Worldwide</h2>
                        <div className="flex flex-wrap items-center justify-center gap-12 mb-8">
                            <div className="text-center">
                                <p className="text-4xl font-black text-blue-600 mb-1">5.0★</p>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">App Rating</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-black text-blue-600 mb-1">100+</p>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Languages</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-black text-blue-600 mb-1">4x</p>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Faster to Write</p>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm font-medium">
                            Your voice is processed in real-time and immediately deleted. Never stored, never shared.
                        </p>
                    </div>

                    {/* FAQ */}
                    <FAQ />
                </div>
            </main>
        </>
    );
}
