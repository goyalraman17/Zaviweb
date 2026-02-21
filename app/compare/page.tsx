import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { comparisons, masterComparison, masterComparisonColumns } from '@/lib/comparisonData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Zavi AI vs Every Alternative — The Voice AGI That Replaces Typing, Prompting & Automation (2026)',
    description: 'Compare Zavi AI to Wispr Flow, ChatGPT, Claude, Gemini Live, Gboard, Dragon, Zapier, Siri & more. The only tool with voice input, zero prompting, screen awareness, and in-app execution. Free download.',
    alternates: { canonical: 'https://zavi.ai/compare' },
    openGraph: {
        title: 'Zavi AI vs Every Alternative — Voice AGI Comparison 2026',
        description: 'Dictation tools transcribe. Chat AI needs prompts. Zavi speaks, understands, and executes. See the full landscape comparison.',
        url: 'https://zavi.ai/compare',
    },
};

const categoryMeta: Record<string, { title: string; subtitle: string; description: string }> = {
    'voice-tools': {
        title: 'vs Voice & Dictation Tools',
        subtitle: 'Wispr Flow · Willow · Otter.ai · Dragon',
        description: 'Dictation tools turn speech into text. Zavi turns speech into intent and action — with 100+ languages, real-time translation, and mobile support they lack.',
    },
    'chat-ai': {
        title: 'vs Chat-First AI',
        subtitle: 'ChatGPT · Claude',
        description: 'Chat AI is powerful intelligence locked behind a prompt box. Zavi embeds that intelligence inside every app — triggered by voice, no copy-paste needed.',
    },
    'screen-assistants': {
        title: 'vs Screen-Aware Assistants',
        subtitle: 'Gemini Live · Siri',
        description: 'Screen-aware assistants can discuss what you see. Only Zavi can act on it — writing, replying, and executing inside the active app.',
    },
    'automation': {
        title: 'vs Automation & RPA',
        subtitle: 'Zapier · Make · OpenClaw',
        description: 'Automation tools execute pre-defined workflows. Zavi executes ad-hoc human decisions by voice — no setup, no triggers, no Zap-building.',
    },
    'keyboards': {
        title: 'vs Mobile Keyboards',
        subtitle: 'Google Gboard · SwiftKey',
        description: 'Default keyboards transcribe speech verbatim — filler words, grammar errors, and all. Zavi produces professional-quality text with AI cleanup.',
    },
};

const categoryOrder = ['voice-tools', 'chat-ai', 'screen-assistants', 'automation', 'keyboards'];

export default function ComparePage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavi.ai' },
        { name: 'Compare', url: 'https://zavi.ai/compare' },
    ]);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Compare</span>
                    </nav>

                    {/* Hero — Thesis-level positioning */}
                    <div className="mb-20">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            The Next Interface Shift<br />Is Voice to Action
                        </h1>
                        <div className="max-w-3xl">
                            <p className="text-xl text-gray-600 mb-4">
                                Every generational tech company owned an interface. Microsoft owned keyboard and mouse. Apple owned touch. Google owned search.
                            </p>
                            <p className="text-xl text-gray-600 mb-4">
                                The next interface is not chat. The next interface is <strong className="text-gray-900">voice as execution</strong>.
                            </p>
                            <p className="text-xl font-semibold text-blue-600">
                                Zavi is building the Voice AGI inside every app — turning natural human speech directly into action.
                            </p>
                        </div>
                    </div>

                    {/* The Problem — Why existing tools fail */}
                    <div className="mb-20 bg-gray-50 rounded-2xl p-8 sm:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Why Every Other Approach Falls Short</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <div className="text-2xl mb-3">🎙️</div>
                                <h3 className="font-bold text-gray-900 mb-2">Dictation Tools</h3>
                                <p className="text-sm text-gray-600">Turn speech into text. But text is not action. You still have to edit, format, and send manually.</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <div className="text-2xl mb-3">💬</div>
                                <h3 className="font-bold text-gray-900 mb-2">Chat AI</h3>
                                <p className="text-sm text-gray-600">Powerful intelligence locked in a chat window. Requires prompting, context-switching, and copy-paste.</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <div className="text-2xl mb-3">👁️</div>
                                <h3 className="font-bold text-gray-900 mb-2">Screen Assistants</h3>
                                <p className="text-sm text-gray-600">Can see your screen and discuss it. But they can&apos;t type, reply, or execute actions inside apps.</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <div className="text-2xl mb-3">⚙️</div>
                                <h3 className="font-bold text-gray-900 mb-2">Automation / RPA</h3>
                                <p className="text-sm text-gray-600">Pre-defined triggers for known workflows. Can&apos;t handle ad-hoc decisions or voice-triggered actions.</p>
                            </div>
                        </div>
                        <p className="text-center text-gray-500 mt-8 text-lg">
                            Zavi is the only platform that combines <strong className="text-gray-900">voice input + zero prompting + screen awareness + in-app execution</strong>.
                        </p>
                    </div>

                    {/* Master Comparison Matrix */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">The Capability Matrix</h2>
                        <p className="text-gray-600 mb-8">Seven capabilities. Five categories. Only one platform checks every box.</p>

                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="min-w-[800px] px-4 sm:px-0">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200">
                                            <th className="text-left py-4 px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider w-[200px]">
                                                Core Capability
                                            </th>
                                            {masterComparisonColumns.map((col) => (
                                                <th
                                                    key={col.key}
                                                    className={`text-center py-4 px-3 text-sm font-semibold uppercase tracking-wider ${col.key === 'zavi'
                                                            ? 'text-blue-600 bg-blue-50/60'
                                                            : 'text-gray-500'
                                                        }`}
                                                >
                                                    <div>{col.label}</div>
                                                    {col.examples && (
                                                        <div className="text-[10px] font-normal normal-case text-gray-400 mt-1">{col.examples}</div>
                                                    )}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {masterComparison.map((row, i) => (
                                            <tr key={row.capability} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-gray-50/30' : ''}`}>
                                                <td className="py-4 px-3 font-medium text-gray-900 text-sm">{row.capability}</td>
                                                {masterComparisonColumns.map((col) => {
                                                    const val = row[col.key];
                                                    const isZavi = col.key === 'zavi';
                                                    const isCheck = val === '✓';
                                                    const isCross = val === '✗';
                                                    return (
                                                        <td
                                                            key={col.key}
                                                            className={`py-4 px-3 text-center text-sm ${isZavi ? 'bg-blue-50/60' : ''} ${isCheck
                                                                    ? isZavi ? 'text-blue-600 font-bold text-lg' : 'text-green-600 font-bold text-lg'
                                                                    : isCross ? 'text-gray-300 text-lg' : 'text-gray-500'
                                                                }`}
                                                        >
                                                            {val}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Zavi Replaces Entire Interaction Layers */}
                    <div className="mb-20">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 sm:p-12 text-white">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Zavi Replaces Entire Interaction Layers</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div>
                                    <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">Free Layer — The Wedge</div>
                                    <h3 className="text-xl font-bold mb-3">Input Ownership</h3>
                                    <ul className="space-y-2 text-blue-100 text-sm">
                                        <li>• Replaces keyboards and typing</li>
                                        <li>• Replaces dictation tools</li>
                                        <li>• Replaces translation tools</li>
                                        <li>• Replaces Grammarly-style rewriting</li>
                                        <li>• Replaces copy-paste across apps</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">Paid Layer</div>
                                    <h3 className="text-xl font-bold mb-3">Screen Context</h3>
                                    <ul className="space-y-2 text-blue-100 text-sm">
                                        <li>• Replaces reading screens manually</li>
                                        <li>• Replaces copying context into chat AI</li>
                                        <li>• Replaces app-switching to act</li>
                                        <li>• Replaces &quot;handle this later&quot; workflows</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">Enterprise Layer</div>
                                    <h3 className="text-xl font-bold mb-3">Execution Infrastructure</h3>
                                    <ul className="space-y-2 text-blue-100 text-sm">
                                        <li>• Replaces manual CRM updates</li>
                                        <li>• Replaces rigid automations</li>
                                        <li>• Replaces command-based assistants</li>
                                        <li>• Replaces dashboards no one checks</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Individual Comparisons by Category */}
                    <div className="space-y-14 mb-20">
                        <h2 className="text-3xl font-bold text-gray-900">Detailed Head-to-Head Comparisons</h2>

                        {categoryOrder.map((cat) => {
                            const meta = categoryMeta[cat];
                            const catComparisons = comparisons.filter((c) => c.category === cat);
                            if (catComparisons.length === 0) return null;

                            return (
                                <div key={cat}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{meta.title}</h3>
                                    <p className="text-sm text-gray-400 mb-2">{meta.subtitle}</p>
                                    <p className="text-gray-600 mb-5">{meta.description}</p>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {catComparisons.map((comp) => (
                                            <Link
                                                key={comp.slug}
                                                href={`/compare/${comp.slug}`}
                                                className="group block p-6 border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all"
                                            >
                                                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    Zavi AI vs {comp.competitorName}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{comp.verdict}</p>
                                                <span className="text-blue-600 text-sm font-semibold">Read full comparison →</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-3">Speak Once. Everything Happens.</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                            AI that talks is impressive. AI that executes across all software and languages is inevitable. Try Zavi free today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/#download" className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-lg">
                                Download Free →
                            </Link>
                            <Link href="/#demo" className="inline-block px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 transition-colors text-lg">
                                Watch Live Demo →
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
