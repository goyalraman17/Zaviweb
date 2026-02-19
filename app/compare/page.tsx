import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { comparisons } from '@/lib/comparisonData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compare Zavi AI vs Competitors — Voice Typing App Comparisons',
    description: 'See how Zavi AI compares to Wispr Flow, Google Gboard, Willow, Otter.ai, and other voice typing tools. Detailed feature-by-feature comparisons with pricing, accuracy, and platform support.',
    alternates: { canonical: 'https://zavi.ai/compare' },
    openGraph: {
        title: 'Compare Zavi AI vs Competitors',
        description: 'Feature-by-feature comparisons of the best voice typing and AI dictation tools.',
        url: 'https://zavi.ai/compare',
    },
};

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
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Compare</span>
                    </nav>

                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Compare Zavi AI</h1>
                    <p className="text-xl text-gray-600 mb-12">See how Zavi AI stacks up against other voice typing and dictation tools. Honest, detailed comparisons.</p>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {comparisons.map((comp) => (
                            <Link
                                key={comp.slug}
                                href={`/compare/${comp.slug}`}
                                className="group block p-8 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    Zavi AI vs {comp.competitorName}
                                </h2>
                                <p className="text-gray-600 mb-4">{comp.competitorDescription}</p>
                                <span className="text-blue-600 font-medium">View full comparison →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
