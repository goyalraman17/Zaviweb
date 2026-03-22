import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema, softwareApplicationSchema } from '@/lib/schemaData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const platformData: Record<string, {
    name: string;
    fullName: string;
    downloadUrl: string;
    extension: string;
    requirement: string;
    steps: string[];
    metaTitle: string;
    metaDescription: string;
    introText: string;
    detailText: string;
}> = {
    macos: {
        name: 'macOS',
        fullName: 'Apple Mac (Intel & Apple Silicon)',
        downloadUrl: '/Zavi_AI.dmg',
        extension: '.dmg',
        requirement: 'macOS 12+',
        steps: [
            'Download the Zavi.dmg file',
            'Double-click to open and drag Zavi to Applications',
            'Open Zavi and follow the accessibility setup',
            'Start speaking into any app!'
        ],
        metaTitle: 'Download Zavi AI for Mac — Free Voice Typing App for macOS',
        metaDescription: 'Download Zavi AI for macOS. Turn your voice into clean, professional text on your Mac. AI removes filler words, fixes grammar, and works in every app. Free to start.',
        introText: 'Zavi AI for macOS transforms your Mac into a voice-first workstation. Speak naturally into any app — Gmail, Slack, Notion, Google Docs, or any text field — and get polished, professional text without touching the keyboard. Zavi runs as a lightweight menu bar app with system-wide voice input.',
        detailText: 'The Mac version supports both Intel and Apple Silicon processors. After installation, Zavi integrates with macOS Accessibility to provide system-wide voice typing. Simply press the shortcut key in any app and start speaking. Your voice is processed by AI that removes filler words, fixes grammar, and restructures sentences in real-time. Zavi also includes Magic Wand for in-place text editing and Voice Agent for cross-app commands.',
    },
    windows: {
        name: 'Windows',
        fullName: 'Microsoft Windows (x64)',
        downloadUrl: '/downloads/Zavi_Windows.exe',
        extension: '.exe',
        requirement: 'Windows 10+',
        steps: [
            'Download Zavi_Windows.exe',
            'Run the installer and follow instructions',
            'Launch Zavi from your desktop or Start menu',
            'Use the shortcut key to start speaking'
        ],
        metaTitle: 'Download Zavi AI for Windows — Free Voice Typing App for PC',
        metaDescription: 'Download Zavi AI for Windows 10 and 11. AI voice typing that removes filler words, fixes grammar, and works in every PC app. Free download, no credit card.',
        introText: 'Zavi AI for Windows brings intelligent voice typing to your PC. Speak naturally into any application — Microsoft Word, Outlook, Chrome, Teams, or any text input — and get clean, professional text instantly. Zavi runs in your system tray and is always one shortcut key away.',
        detailText: 'The Windows version supports Windows 10 and 11 on 64-bit systems. After installation, Zavi sits in your system tray ready to activate with a customizable keyboard shortcut. The AI engine processes your speech in real-time, removing filler words like "um" and "uh," correcting grammar, and restructuring sentences for professional clarity. Perfect for emails, documents, chat messages, and any writing task.',
    },
    linux: {
        name: 'Linux',
        fullName: 'Linux (.deb for Debian/Ubuntu)',
        downloadUrl: '/downloads/Zavi_Linux.deb',
        extension: '.deb',
        requirement: 'Ubuntu 20.04+ / Debian',
        steps: [
            'Download the .deb package',
            'Install via Software Center or terminal: sudo dpkg -i Zavi_Linux.deb',
            'Open Zavi from your applications menu',
            'Voice type in any Linux window'
        ],
        metaTitle: 'Download Zavi AI for Linux — Free Voice Typing App for Ubuntu & Debian',
        metaDescription: 'Download Zavi AI for Linux. AI-powered voice typing for Ubuntu, Debian, and derivatives. Removes filler words, fixes grammar. Free .deb package.',
        introText: 'Zavi AI for Linux brings professional-grade voice typing to your desktop. Available as a .deb package for Debian-based distributions including Ubuntu, Linux Mint, and Pop!_OS. Speak into any text field across your Linux desktop and get polished, AI-enhanced text.',
        detailText: 'Install the .deb package using your Software Center or via terminal with dpkg. Zavi integrates with your Linux desktop environment to provide system-wide voice input. The AI processes your speech in real-time — removing filler words, correcting grammar, and formatting text professionally. Supports 100+ languages with automatic detection and real-time translation.',
    },
    ios: {
        name: 'iOS',
        fullName: 'iPhone & iPad',
        downloadUrl: 'https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802',
        extension: 'App Store',
        requirement: 'iOS 16.0+',
        steps: [
            'Get Zavi from the Apple App Store',
            'Go to Settings > General > Keyboard',
            'Add "Zavi" and enable Full Access',
            'Switch to Zavi and tap the mic to speak!'
        ],
        metaTitle: 'Download Zavi AI for iPhone & iPad — Free Voice Action Engine for iOS',
        metaDescription: 'Download Zavi AI keyboard for iOS. AI voice typing that removes filler words, fixes grammar, and works in every iPhone and iPad app. Free on the App Store.',
        introText: 'Zavi AI for iOS replaces your iPhone and iPad keyboard with an intelligent voice typing system. Speak naturally in any app — iMessage, WhatsApp, Gmail, Notes, Slack, or any text field — and get clean, professionally written text. No more thumb typing or autocorrect frustrations.',
        detailText: 'After installing from the App Store, enable Zavi in Settings > General > Keyboard > Keyboards > Add New Keyboard. Enable Full Access to allow AI processing. Once set up, switch to the Zavi keyboard in any app and tap the microphone icon to start speaking. Zavi\'s AI removes filler words, fixes grammar, and restructures your speech into polished text. The iOS version also includes Magic Wand for transforming existing text and Voice Agent for cross-app actions.',
    },
    android: {
        name: 'Android',
        fullName: 'Android Smartphones & Tablets',
        downloadUrl: 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard',
        extension: 'Play Store',
        requirement: 'Android 8.0+',
        steps: [
            'Get Zavi on Google Play',
            'Open the Zavi app and follow the setup',
            'Enable Zavi in your Keyboard Settings',
            'Tap the mic icon in any app to speak!'
        ],
        metaTitle: 'Download Zavi AI for Android — Free Voice Action Engine',
        metaDescription: 'Download Zavi AI for Android. Background agents, 27+ app integrations, voice typing with AI cleanup. Free on Google Play. 5-star rated.',
        introText: 'Zavi AI for Android is a system-wide keyboard that replaces your default typing experience with intelligent voice input. Speak naturally in any app — Gmail, WhatsApp, Telegram, Slack, Instagram, or any text field — and get polished, error-free text instantly. Rated 5 stars on Google Play.',
        detailText: 'Download from Google Play and follow the quick setup to enable Zavi as your default keyboard. Once enabled, Zavi is available in every app on your device. Tap the microphone icon and speak naturally — the AI removes filler words like "um" and "uh," corrects grammar and punctuation, and restructures your sentences for clarity. Android users also get access to Magic Wand (voice-powered text editing), Voice Agent (cross-app commands), 100+ language support, and real-time translation.',
    }
};

const validPlatforms = Object.keys(platformData);

export function generateStaticParams() {
    return validPlatforms.map((platform) => ({ platform }));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }): Promise<Metadata> {
    const { platform } = await params;
    const data = platformData[platform?.toLowerCase()];
    if (!data) return {};

    return {
        title: data.metaTitle,
        description: data.metaDescription,
        alternates: { canonical: `https://zavivoice.com/download/${platform}` },
        openGraph: {
            title: data.metaTitle,
            description: data.metaDescription,
            url: `https://zavivoice.com/download/${platform}`,
        },
    };
}

export default async function PlatformDownloadPage({ params }: { params: Promise<{ platform: string }> }) {
    const { platform } = await params;
    const data = platformData[platform?.toLowerCase()];
    if (!data) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Download', url: 'https://zavivoice.com/download' },
        { name: data.name, url: `https://zavivoice.com/download/${platform}` },
    ]);

    const isExternalLink = data.downloadUrl.startsWith('http');

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={softwareApplicationSchema} />

            <main className="min-h-screen bg-slate-50 pt-20 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/download" className="hover:text-blue-600 transition-colors">Download</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{data.name}</span>
                    </nav>

                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                            Download Zavi for <span className="text-blue-600">{data.name}</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                            Transform your voice into professional text on {data.fullName}. Think faster than you type.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
                        {/* Download Card */}
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-200/50 border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                                Install Zavi
                            </h2>

                            <a
                                href={data.downloadUrl}
                                className="inline-flex items-center justify-center gap-3 w-full py-5 bg-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all active:translate-y-0"
                                target={isExternalLink ? '_blank' : undefined}
                                rel={isExternalLink ? 'noopener noreferrer' : undefined}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                                {isExternalLink ? `Get it on ${data.extension}` : `Download ${data.extension}`}
                            </a>

                            <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium tracking-wide uppercase">Requirement</span>
                                    <span className="text-slate-900 font-bold">{data.requirement}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium tracking-wide uppercase">Version</span>
                                    <span className="text-slate-900 font-bold">Latest (v1.0.5)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium tracking-wide uppercase">License</span>
                                    <span className="text-slate-900 font-bold text-green-600">Free to Start</span>
                                </div>
                            </div>
                        </div>

                        {/* Guide Card */}
                        <div className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</span>
                                Quick Start Guide
                            </h2>

                            <div className="space-y-6">
                                {data.steps.map((step: string, i: number) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-medium text-slate-400">
                                            {i + 1}
                                        </div>
                                        <p className="text-slate-300 font-medium leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-4 bg-slate-800 rounded-2xl border border-slate-700">
                                <p className="text-xs text-slate-400 italic">
                                    &quot;Zavi replaces your keyboard with a high-fidelity voice engine that removes &apos;ums&apos;, fixes grammar, and knows your personal context.&quot;
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* About this platform — unique SEO content */}
                    <div className="max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">About Zavi AI for {data.name}</h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">{data.introText}</p>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">{data.detailText}</p>

                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Features on {data.name}</h3>
                        <ul className="space-y-3 text-slate-600 text-lg">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 mt-1 shrink-0">✓</span>
                                <span><strong>AI Voice Typing</strong> — Speak naturally and get clean, professional text with automatic filler word removal and grammar correction</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 mt-1 shrink-0">✓</span>
                                <span><strong>Magic Wand</strong> — Highlight text and transform it by voice: &quot;make this shorter,&quot; &quot;translate to Spanish,&quot; &quot;make this more professional&quot;</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 mt-1 shrink-0">✓</span>
                                <span><strong>Voice Agent</strong> — Execute cross-app actions: &quot;email Sarah about the meeting&quot; or &quot;message the team on Slack&quot;</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 mt-1 shrink-0">✓</span>
                                <span><strong>100+ Languages</strong> — Speak in one language, type in another with real-time translation and automatic language detection</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 mt-1 shrink-0">✓</span>
                                <span><strong>Privacy First</strong> — Voice is processed in real-time and immediately deleted. Never stored, never shared</span>
                            </li>
                        </ul>
                    </div>

                    {/* Back link */}
                    <div className="text-center">
                        <p className="text-slate-500 mb-6 font-medium">Looking for another device?</p>
                        <Link href="/download" className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                            View All Platforms
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
