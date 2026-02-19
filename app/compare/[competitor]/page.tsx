import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { comparisons, getComparison, getAllComparisonSlugs } from '@/lib/comparisonData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    return getAllComparisonSlugs().map((slug) => ({ competitor: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ competitor: string }> }): Promise<Metadata> {
    const { competitor } = await params;
    const data = getComparison(competitor);
    if (!data) return {};

    return {
        title: data.metaTitle,
        description: data.metaDescription,
        alternates: { canonical: `https://zavi.ai/compare/${data.slug}` },
        openGraph: {
            title: data.metaTitle,
            description: data.metaDescription,
            url: `https://zavi.ai/compare/${data.slug}`,
            type: 'article',
        },
    };
}

export default async function ComparisonPage({ params }: { params: Promise<{ competitor: string }> }) {
    const { competitor } = await params;
    const data = getComparison(competitor);
    if (!data) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavi.ai' },
        { name: 'Compare', url: 'https://zavi.ai/compare' },
        { name: `Zavi AI vs ${data.competitorName}`, url: `https://zavi.ai/compare/${data.slug}` },
    ]);

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={faqSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                {/* Breadcrumb */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/compare" className="hover:text-blue-600 transition-colors">Compare</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">vs {data.competitorName}</span>
                    </nav>
                </div>

                {/* Hero */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{data.heroTitle}</h1>
                    <p className="text-xl text-gray-600 mb-6">{data.heroSubtitle}</p>
                    <p className="text-sm text-gray-400">Last updated: February 2026</p>
                </div>

                {/* Quick Verdict */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-blue-900 mb-3">⚡ Quick Verdict</h2>
                        <p className="text-blue-800 text-lg font-medium mb-4">{data.verdict}</p>
                        <p className="text-blue-700">{data.verdictDetail}</p>
                    </div>
                </div>

                {/* Feature Comparison Table */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Feature-by-Feature Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Feature</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-blue-600 uppercase tracking-wider">Zavi AI</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">{data.competitorName}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.features.map((feature, i) => (
                                    <tr key={feature.name} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                                        <td className="py-4 px-4 font-medium text-gray-900">{feature.name}</td>
                                        <td className="py-4 px-4 text-gray-700">{feature.zavi}</td>
                                        <td className="py-4 px-4 text-gray-700">{feature.competitor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Advantages */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-green-900 mb-4">✅ Why Choose Zavi AI</h3>
                            <ul className="space-y-3">
                                {data.zaviAdvantages.map((adv) => (
                                    <li key={adv} className="flex items-start gap-3">
                                        <span className="text-green-600 mt-0.5 shrink-0">•</span>
                                        <span className="text-green-800">{adv}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-gray-700 mb-4">🔹 Why Choose {data.competitorName}</h3>
                            <ul className="space-y-3">
                                {data.competitorAdvantages.map((adv) => (
                                    <li key={adv} className="flex items-start gap-3">
                                        <span className="text-gray-500 mt-0.5 shrink-0">•</span>
                                        <span className="text-gray-700">{adv}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {data.faqItems.map((item) => (
                            <div key={item.question} className="border border-gray-200 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-10 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Try Zavi AI?</h2>
                        <p className="text-blue-100 text-lg mb-8">Download free on Android. Also available on macOS, Windows, and Linux.</p>
                        <Link href="/#download" className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-lg">
                            Download Free →
                        </Link>
                    </div>
                </div>

                {/* Other Comparisons */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Comparisons</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {comparisons.filter(c => c.slug !== data.slug).map((comp) => (
                            <Link
                                key={comp.slug}
                                href={`/compare/${comp.slug}`}
                                className="block p-5 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                            >
                                <p className="font-semibold text-gray-900">Zavi AI vs {comp.competitorName}</p>
                                <p className="text-sm text-gray-500 mt-1">View comparison →</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
