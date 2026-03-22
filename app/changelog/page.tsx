import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Changelog — What\'s New in Zavi AI',
    description: 'See the latest updates, features, and improvements in Zavi AI. From voice typing to autonomous background agents — we ship fast.',
    alternates: { canonical: 'https://zavivoice.com/changelog' },
    openGraph: {
        title: 'Changelog — What\'s New in Zavi AI',
        description: 'See the latest updates, features, and improvements in Zavi AI. From voice typing to autonomous background agents — we ship fast.',
        url: 'https://zavivoice.com/changelog',
    },
};

interface ChangelogEntry {
    version: string;
    date: string;
    title: string;
    changes: { type: 'feature' | 'improvement' | 'fix'; text: string }[];
}

const changelog: ChangelogEntry[] = [
    {
        version: '3.0',
        date: 'March 2026',
        title: 'Autonomous Background Agents & WhatsApp Bot',
        changes: [
            { type: 'feature', text: 'Background Agents — create scheduled automations with a single voice command ("Summarize my inbox every morning at 8 AM and WhatsApp me")' },
            { type: 'feature', text: 'WhatsApp & Telegram Bot — agents report back, ask for approvals, and let you run workflows from a text message' },
            { type: 'feature', text: 'Agent Builder — dynamically creates cron jobs from natural language via Cloud Scheduler + Firestore' },
            { type: 'feature', text: 'Long-term Memory — Zavi remembers context across sessions for smarter agent behavior' },
            { type: 'feature', text: 'Desktop System Control — change volume, create Reminders, read clipboard, toggle dark mode via voice' },
            { type: 'feature', text: 'Hybrid Execution — desktop app handles local actions while cloud handles integrations seamlessly' },
            { type: 'improvement', text: 'Expanded to 27+ app integrations: Gmail, Slack, GitHub, Notion, Calendar, LinkedIn, WhatsApp, Telegram, iMessage, and more' },
            { type: 'improvement', text: '200+ additional tools available for agent workflows' },
            { type: 'improvement', text: 'New Jarvis-style website with conversion-optimized landing page' },
            { type: 'fix', text: 'Fixed stream rotation edge cases during long dictation sessions (>5 minutes)' },
        ],
    },
    {
        version: '2.7',
        date: 'Early March 2026',
        title: 'Outlook Integration & Razorpay Billing',
        changes: [
            { type: 'feature', text: 'Microsoft Outlook integration — read, draft, and send Outlook emails by voice' },
            { type: 'feature', text: 'Razorpay subscription billing — seamless Pro upgrade from the website' },
            { type: 'feature', text: 'Browser automation — web search and browser actions via agents' },
            { type: 'improvement', text: 'Improved LLM classifier — faster tool category detection reduces tool count from 20+ to 3-5 relevant ones per request' },
            { type: 'fix', text: 'Fixed OAuth token refresh for long-running agent sessions' },
        ],
    },
    {
        version: '2.6',
        date: 'Late February 2026',
        title: 'Premium UI Overhaul & Automation Pipelines',
        changes: [
            { type: 'feature', text: 'Premium Footer Overhaul — beautifully redesigned footer with clean layouts, serif typography, and massive branding' },
            { type: 'feature', text: 'Premium Magic Wand UI — introduced GlowCard hover effects, glassmorphism floating islands, and ambient particles' },
            { type: 'feature', text: 'End-to-end voice-to-AI execution pipelines for multi-step automation workflows' },
            { type: 'improvement', text: 'Expanded "vs Competitors" comparisons with 5 detailed new breakdown pages' },
            { type: 'fix', text: 'Fixed Next.js download handler to correctly serve Mac DMG and Linux DEB files with accurate filenames' },
        ],
    },
    {
        version: '2.5',
        date: 'Early February 2026',
        title: 'iOS Auto-Return & System Reliability',
        changes: [
            { type: 'feature', text: 'Implemented iOS "Auto-Return" — Zavi instantly switches back to your previous app (e.g., WhatsApp) after handling voice input' },
            { type: 'improvement', text: 'Greatly improved iOS Keyboard audio session handling and background task resilience' },
            { type: 'fix', text: 'Fixed an issue where tapping the microphone button on the iOS keyboard extension occasionally felt unresponsive' },
            { type: 'fix', text: 'Resolved "Error occurred. Tap to retry" message states affecting offline voice processing flow' },
        ],
    },
    {
        version: '2.4',
        date: 'February 2026',
        title: 'Multilingual Mastery & New Languages',
        changes: [
            { type: 'feature', text: 'Added real-time translation across 100+ languages — speak in one language, get text in another' },
            { type: 'feature', text: 'Automatic language detection — no need to manually switch between languages' },
            { type: 'feature', text: 'Code-switching support — mix languages in a single sentence seamlessly' },
            { type: 'improvement', text: 'Improved voice recognition accuracy for Hindi, Tamil, and Bengali' },
            { type: 'improvement', text: 'Faster processing speed — voice-to-text latency reduced by 30%' },
            { type: 'fix', text: 'Fixed rare issue where long dictation sessions would drop the last few words' },
        ],
    },
    {
        version: '2.3',
        date: 'January 2026',
        title: 'Desktop Launch & Cross-Platform Support',
        changes: [
            { type: 'feature', text: 'Launched Zavi AI for macOS — voice typing now works on your Mac' },
            { type: 'feature', text: 'Launched Zavi AI for Windows — full desktop support' },
            { type: 'feature', text: 'Linux support added (AppImage and .deb packages)' },
            { type: 'improvement', text: 'New AI model for better filler word detection — catches "basically," "I mean," "technically"' },
            { type: 'improvement', text: 'Improved punctuation placement accuracy by 25%' },
            { type: 'fix', text: 'Fixed keyboard switching issues on Samsung devices' },
        ],
    },
    {
        version: '2.2',
        date: 'December 2025',
        title: 'Professional Mode & Team Features',
        changes: [
            { type: 'feature', text: 'Professional Mode — AI optimizes output for formal business communication' },
            { type: 'feature', text: 'Team plan launched with centralized billing and usage analytics' },
            { type: 'improvement', text: 'Background noise handling improved — works better in cafés and open offices' },
            { type: 'improvement', text: 'Reduced app size by 40% for faster installation' },
            { type: 'fix', text: 'Fixed clipboard integration issues on Android 14+' },
        ],
    },
    {
        version: '2.1',
        date: 'November 2025',
        title: 'AI Cleanup Engine v2',
        changes: [
            { type: 'feature', text: 'Next-generation AI cleanup engine — better context understanding for longer dictation' },
            { type: 'feature', text: 'Smart paragraph detection — automatically breaks text into readable paragraphs' },
            { type: 'improvement', text: 'Grammar correction accuracy improved by 35% across all languages' },
            { type: 'improvement', text: 'Sentence restructuring now handles complex, multi-clause sentences' },
            { type: 'fix', text: 'Fixed rare crash when switching between apps during dictation' },
        ],
    },
    {
        version: '2.0',
        date: 'October 2025',
        title: 'Zero-Prompting Launch',
        changes: [
            { type: 'feature', text: 'Introduced Zero-Prompting technology — AI understands your intent without commands' },
            { type: 'feature', text: 'Completely redesigned Android keyboard with premium UI' },
            { type: 'feature', text: 'Launched free tier with generous daily limits' },
            { type: 'improvement', text: 'Voice recognition speed improved by 50%' },
            { type: 'improvement', text: 'Added support for 50 additional languages' },
        ],
    },
];

const typeStyles = {
    feature: { label: 'New', bg: 'bg-green-100', text: 'text-green-700' },
    improvement: { label: 'Improved', bg: 'bg-blue-100', text: 'text-blue-700' },
    fix: { label: 'Fixed', bg: 'bg-amber-100', text: 'text-amber-700' },
};

export default function ChangelogPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Changelog', url: 'https://zavivoice.com/changelog' },
    ]);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />

            <main className="min-h-screen bg-white pt-20 md:pt-28 pb-16 md:pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Changelog</span>
                    </nav>

                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Changelog</h1>
                    <p className="text-xl text-gray-600 mb-12">What&apos;s new in Zavi AI. We ship fast — here&apos;s what&apos;s been improving.</p>

                    <div className="space-y-12">
                        {changelog.map((entry) => (
                            <div key={entry.version} className="relative pl-8 border-l-2 border-blue-200">
                                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-blue-600 rounded-full border-4 border-white" />
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-blue-600">v{entry.version} · {entry.date}</p>
                                    <h2 className="text-2xl font-bold text-gray-900 mt-1">{entry.title}</h2>
                                </div>
                                <ul className="space-y-3">
                                    {entry.changes.map((change, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full shrink-0 mt-0.5 ${typeStyles[change.type].bg} ${typeStyles[change.type].text}`}>
                                                {typeStyles[change.type].label}
                                            </span>
                                            <span className="text-gray-600">{change.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
