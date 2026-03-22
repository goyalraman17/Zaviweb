import Navigation from '@/components/Navigation';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema, softwareApplicationSchema } from '@/lib/schemaData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Download Zavi AI — Free Voice Action Engine for All 5 Platforms',
    description: 'Download Zavi AI free. Background agents, 27+ app integrations, WhatsApp bot, Magic Wand, and 100+ language translation. Available on Android, iOS, macOS, Windows, and Linux.',
    alternates: { canonical: 'https://zavivoice.com/download' },
    openGraph: {
        title: 'Download Zavi AI — Your Personal Jarvis. Free.',
        description: 'Background agents that run while you sleep. 27+ app integrations. WhatsApp bot reporting. Available on all 5 platforms.',
        url: 'https://zavivoice.com/download',
        images: [{ url: 'https://zavivoice.com/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Download Zavi AI — Voice to Action OS',
        description: 'Speak to type, command, and automate. Free on Android, iOS, Mac, Windows, and Linux.',
    },
};

const platforms = [
    {
        name: 'iOS',
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
        ),
        req: 'iOS 16+',
        cta: 'Get on App Store',
        href: 'https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802',
    },
    {
        name: 'Android',
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.61 15.15C16.15 15.15 15.77 15.53 15.77 16C15.77 16.46 16.15 16.85 16.61 16.85C17.07 16.85 17.45 16.46 17.45 16C17.45 15.53 17.07 15.15 16.61 15.15M7.41 15.15C6.95 15.15 6.57 15.53 6.57 16C6.57 16.46 6.95 16.85 7.41 16.85C7.87 16.85 8.25 16.46 8.25 16C8.25 15.53 7.87 15.15 7.41 15.15M16.91 10.14L18.58 7.26C18.67 7.09 18.61 6.88 18.45 6.79C18.28 6.69 18.07 6.75 18 6.92L16.29 9.83C14.95 9.22 13.5 8.9 12 8.91C10.47 8.91 9 9.24 7.73 9.82L6.04 6.91C5.95 6.74 5.74 6.68 5.57 6.78C5.4 6.87 5.35 7.08 5.44 7.25L7.1 10.13C4.25 11.69 2.29 14.58 2 18H22C21.72 14.59 19.77 11.7 16.91 10.14Z" />
            </svg>
        ),
        req: 'Android 8.0+',
        cta: 'Get on Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard',
    },
    {
        name: 'macOS',
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
        ),
        req: 'macOS 12+',
        cta: 'Download .dmg',
        href: '/Zavi_AI.dmg',
    },
    {
        name: 'Windows',
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
            </svg>
        ),
        req: 'Windows 10+',
        cta: 'Download .exe',
        href: '/downloads/Zavi_Windows.exe',
    },
    {
        name: 'Linux',
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 12V8H18V12H20M4 12V8H6V12H4M16.5 13.5C16.5 14.33 15.83 15 15 15S13.5 14.33 13.5 13.5 14.17 12 15 12 16.5 12.67 16.5 13.5M10.5 13.5C10.5 14.33 9.83 15 9 15S7.5 14.33 7.5 13.5 8.17 12 9 12 10.5 12.67 10.5 13.5M19 13V18C19 19.11 18.11 20 17 20H15V22H13V20H11V22H9V20H7C5.9 20 5 19.11 5 18V13C5 11.9 5.9 11 7 11H17C18.11 11 19 11.9 19 13M12 2C9 2 7 4.5 7 7V9H17V7C17 4.5 15 2 12 2Z" />
            </svg>
        ),
        req: 'Ubuntu 20.04+',
        cta: 'Download .deb',
        href: '/downloads/Zavi_Linux.deb',
    },
];

const whatYouGet = [
    { emoji: '🎙️', title: 'Voice Typing', desc: 'Speak naturally. Zavi removes filler words, fixes grammar, and types perfect text.' },
    { emoji: '🤖', title: 'Background Agents', desc: '"Summarize my inbox every morning and WhatsApp me." Runs on schedule, reports back.' },
    { emoji: '🪄', title: 'Magic Wand', desc: 'Highlight any text, speak to transform it. "Make this professional" — done.' },
    { emoji: '💬', title: 'WhatsApp Bot', desc: 'Agents message you back. Approve emails, get summaries, run workflows from chat.' },
    { emoji: '🌍', title: '100+ Languages', desc: 'Speak Hindi, get English. Speak English, get French. Real-time translation.' },
    { emoji: '🔌', title: '27+ Integrations', desc: 'Gmail, Slack, GitHub, Notion, Calendar, LinkedIn, Telegram, and more.' },
];

const commands = [
    '"Reply to Sarah saying I approve the budget."',
    '"Summarize my inbox every morning at 8 AM."',
    '"Watch #engineering on Slack and alert me."',
    '"Translate this email to Japanese."',
    '"Draft a LinkedIn post about our launch."',
    '"Text mom that I\'ll be home by 7."',
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

            <main className="min-h-screen bg-white pt-20 md:pt-28 pb-16 md:pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Download</span>
                    </nav>

                    {/* Hero — Outcome-Focused, Not Feature-Focused */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-semibold mb-6">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            5/5 on iOS & Android
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0a0a0a] mb-6" style={{ lineHeight: 1.05 }}>
                            Install Zavi.{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                                Start commanding.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-3 font-medium">
                            Your personal Jarvis — voice typing, background agents, and 27+ app integrations. All from your keyboard.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-400 font-medium">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                Free — 1,000 words/day
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                Set up in 30 seconds
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                No credit card
                            </span>
                        </div>
                    </div>

                    {/* Platform Grid — All 5 Equal */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
                        {platforms.map((p) => (
                            <a
                                key={p.name}
                                href={p.href}
                                target={p.href.startsWith('http') ? '_blank' : undefined}
                                rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all text-center flex flex-col items-center"
                            >
                                <div className="text-gray-700 group-hover:text-blue-600 transition-colors mb-3">
                                    {p.icon}
                                </div>
                                <h2 className="text-lg font-bold text-[#0a0a0a] mb-1">{p.name}</h2>
                                <p className="text-xs text-gray-400 mb-4">{p.req}</p>
                                <span className="mt-auto w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#0a0a0a] text-white group-hover:bg-blue-600 transition-colors">
                                    {p.cta}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* What You Can Say — Real Commands */}
                    <div className="mb-20">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] text-center mb-3 tracking-tight">
                            What you can say after installing
                        </h2>
                        <p className="text-center text-gray-400 mb-10 font-medium">Real commands. Real results. Right away.</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {commands.map((cmd, i) => (
                                <div key={i} className="bg-gray-50 rounded-xl px-5 py-4 border border-gray-100 flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                                        </svg>
                                    </div>
                                    <p className="text-[14px] text-gray-600 font-medium italic">{cmd}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What You Get — Features Grid */}
                    <div className="mb-20">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] text-center mb-3 tracking-tight">
                            Everything included. Free to start.
                        </h2>
                        <p className="text-center text-gray-400 mb-10 font-medium">No feature gates on the free plan. Just a daily word limit.</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {whatYouGet.map((item, i) => (
                                <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <div className="text-2xl mb-3">{item.emoji}</div>
                                    <h3 className="text-base font-bold text-[#0a0a0a] mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Proof Strip */}
                    <div className="bg-slate-50 rounded-2xl p-8 md:p-10 text-center mb-20 border border-gray-100">
                        <div className="flex flex-wrap items-center justify-center gap-10 mb-6">
                            <div className="text-center">
                                <p className="text-3xl font-black text-[#0a0a0a]">5.0 <span className="text-yellow-400">★</span></p>
                                <p className="text-xs text-gray-400 font-medium mt-1">App Store Rating</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-black text-[#0a0a0a]">5x</p>
                                <p className="text-xs text-gray-400 font-medium mt-1">Faster than typing</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-black text-[#0a0a0a]">27+</p>
                                <p className="text-xs text-gray-400 font-medium mt-1">App integrations</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-black text-[#0a0a0a]">&lt;200ms</p>
                                <p className="text-xs text-gray-400 font-medium mt-1">Latency</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                Audio never stored
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                Never used for training
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                Mic only when you tap
                            </span>
                        </div>
                    </div>

                    {/* System Requirements — Compact */}
                    <div className="mb-20">
                        <h2 className="text-2xl font-bold text-[#0a0a0a] text-center mb-6">System Requirements</h2>
                        <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-100/50">
                                        <th className="text-left py-3 px-5 font-semibold text-gray-500 uppercase text-xs tracking-wider">Platform</th>
                                        <th className="text-left py-3 px-5 font-semibold text-gray-500 uppercase text-xs tracking-wider">Minimum</th>
                                        <th className="text-left py-3 px-5 font-semibold text-gray-500 uppercase text-xs tracking-wider">Format</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { platform: 'iOS', min: 'iOS 16.0+', format: 'App Store' },
                                        { platform: 'Android', min: 'Android 8.0+', format: 'Google Play' },
                                        { platform: 'macOS', min: 'macOS 12 (Monterey)+', format: '.dmg' },
                                        { platform: 'Windows', min: 'Windows 10+ (64-bit)', format: '.exe' },
                                        { platform: 'Linux', min: 'Ubuntu 20.04+ / Debian 11+', format: '.deb' },
                                    ].map((r, i) => (
                                        <tr key={r.platform} className={i < 4 ? 'border-b border-gray-100' : ''}>
                                            <td className="py-3 px-5 font-medium text-gray-900">{r.platform}</td>
                                            <td className="py-3 px-5 text-gray-500">{r.min}</td>
                                            <td className="py-3 px-5 text-gray-500">{r.format}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FAQ */}
                    <FAQ />
                </div>
            </main>
        </>
    );
}
