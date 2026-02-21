import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { comparisons, masterComparison, masterComparisonColumns } from '@/lib/comparisonData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Zavi AI vs Every Alternative — Voice AGI Comparison (2026)',
    description: 'See how Zavi AI compares to ChatGPT, Gemini Live, Wispr Flow, Zapier, Siri, and more. Zavi is the only Voice AGI that turns speech into execution across all apps and languages.',
    alternates: { canonical: 'https://zavi.ai/compare' },
    openGraph: {
        title: 'Zavi AI vs Every Alternative — The Voice AGI Comparison',
        description: 'Voice tools transcribe. Chat AI requires prompting. Zavi executes. See the full landscape comparison.',
        url: 'https://zavi.ai/compare',
    },
};

const categoryMeta: Record<string, { title: string; description: string }> = {
    'voice-tools': {
        title: 'Voice & Dictation Tools',
        description: 'Traditional dictation tools capture your words. Zavi captures your intent.',
    },
    'chat-ai': {
        title: 'Chat-First AI',
        description: 'Chat AI is brilliant — but it lives in a chat window. Zavi lives in every app.',
    },
    'screen-assistants': {
        title: 'Screen-Aware Assistants',
        description: 'They can see your screen. But only Zavi can act on it.',
    },
    'automation': {
        title: 'Automation & RPA',
        description: 'Automation requires pre-configuration. Zavi executes from voice in the moment.',
    },
    'keyboards': {
        title: 'Mobile Keyboards',
        description: 'Default keyboards transcribe verbatim. Zavi understands and cleans up your speech.',
    },
};

const categoryOrder = ['chat-ai', 'screen-assistants', 'voice-tools', 'automation', 'keyboards'];

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

                    {/* Hero */}
                    <div className="mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Zavi vs the Entire Landscape
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mb-2">
                            Voice tools transcribe. Chat AI requires prompting. Screen assistants discuss. Automation is rigid.
                        </p>
                        <p className="text-xl font-semibold text-blue-600">
                            Zavi is the only platform that takes natural speech and turns it into executed actions inside any app.
                        </p>
                    </div>

                    {/* Master Comparison Table */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">The Capability Matrix</h2>
                        <p className="text-gray-600 mb-8">How Zavi compares across every category of AI tool — not just dictation.</p>

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
                                                            ? 'text-blue-600 bg-blue-50/50'
                                                            : 'text-gray-500'
                                                        }`}
                                                >
                                                    <div>{col.label}</div>
                                                    {col.examples && (
                                                        <div className="text-[10px] font-normal normal-case text-gray-400 mt-1">
                                                            {col.examples}
                                                        </div>
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
                                                            className={`py-4 px-3 text-center text-sm ${isZavi ? 'bg-blue-50/50' : ''
                                                                } ${isCheck
                                                                    ? isZavi ? 'text-blue-600 font-bold text-lg' : 'text-green-600 font-bold text-lg'
                                                                    : isCross
                                                                        ? 'text-gray-300 text-lg'
                                                                        : 'text-gray-500'
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

                    {/* Key Insight */}
                    <div className="mb-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-10 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            End-to-end voice → action
                        </h2>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-2">
                            No other tool combines natural voice input, zero prompting, screen awareness, and in-app execution.
                        </p>
                        <p className="text-white font-semibold text-lg">
                            Zavi is the only one with ✓ across every row.
                        </p>
                    </div>

                    {/* Individual Comparisons by Category */}
                    <div className="space-y-16">
                        <h2 className="text-3xl font-bold text-gray-900">Detailed Comparisons</h2>

                        {categoryOrder.map((cat) => {
                            const meta = categoryMeta[cat];
                            const categoryComparisons = comparisons.filter((c) => c.category === cat);
                            if (categoryComparisons.length === 0) return null;

                            return (
                                <div key={cat}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{meta.title}</h3>
                                    <p className="text-gray-500 mb-6">{meta.description}</p>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {categoryComparisons.map((comp) => (
                                            <Link
                                                key={comp.slug}
                                                href={`/compare/${comp.slug}`}
                                                className="group block p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
                                            >
                                                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    Zavi vs {comp.competitorName}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{comp.competitorDescription}</p>
                                                <span className="text-blue-600 text-sm font-medium">Full comparison →</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="mt-20 bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">The Fastest Way to Understand Zavi</h2>
                        <p className="text-gray-600 text-lg mb-6">Watch speech turn into execution across all layers. Book a 20-minute live demo.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/#download" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                                Download Free →
                            </Link>
                            <Link href="/#demo" className="inline-block px-8 py-3 border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                                Watch Demo →
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
