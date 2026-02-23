import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { glossaryTerms, getGlossaryTerm, getAllGlossarySlugs } from '@/lib/glossaryData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    return getAllGlossarySlugs().map((slug) => ({ term: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
    const { term: slug } = await params;
    const data = getGlossaryTerm(slug);
    if (!data) return {};

    return {
        title: `What Is ${data.term}? Definition & Explanation | Zavi AI Glossary`,
        description: `${data.term}: ${data.shortDefinition} Learn more about ${data.term.toLowerCase()} and how it relates to voice typing and AI dictation.`,
        alternates: { canonical: `https://zavivoice.com/glossary/${data.slug}` },
        openGraph: {
            title: `What Is ${data.term}? | Zavi AI Glossary`,
            description: data.shortDefinition,
            url: `https://zavivoice.com/glossary/${data.slug}`,
        },
    };
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ term: string }> }) {
    const { term: slug } = await params;
    const data = getGlossaryTerm(slug);
    if (!data) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Glossary', url: 'https://zavivoice.com/glossary' },
        { name: data.term, url: `https://zavivoice.com/glossary/${data.slug}` },
    ]);

    const definitionSchema = {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        name: data.term,
        description: data.fullDefinition,
        url: `https://zavivoice.com/glossary/${data.slug}`,
        inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: 'Zavi AI Voice Typing Glossary',
            url: 'https://zavivoice.com/glossary',
        },
    };

    const relatedTerms = data.seeAlso
        .map((s) => glossaryTerms.find((t) => t.slug === s))
        .filter(Boolean);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={definitionSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/glossary" className="hover:text-blue-600 transition-colors">Glossary</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{data.term}</span>
                    </nav>

                    {/* Definition Card */}
                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{data.term}</h1>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                            <p className="text-lg text-blue-900 font-medium">{data.shortDefinition}</p>
                        </div>
                        <div className="prose prose-lg prose-slate">
                            <p className="text-gray-600 leading-relaxed">{data.fullDefinition}</p>
                        </div>
                    </div>

                    {/* Related Terms */}
                    <div className="mb-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Also Known As</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.relatedTerms.map((rt) => (
                                <span key={rt} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                                    {rt}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* See Also */}
                    {relatedTerms.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Terms</h2>
                            <div className="space-y-3">
                                {relatedTerms.map((rt) => rt && (
                                    <Link
                                        key={rt.slug}
                                        href={`/glossary/${rt.slug}`}
                                        className="block p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                                    >
                                        <p className="font-semibold text-gray-900">{rt.term}</p>
                                        <p className="text-sm text-gray-500 mt-1">{rt.shortDefinition}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-3">Experience {data.term} with Zavi AI</h2>
                        <p className="text-blue-100 mb-6">Download Zavi AI and see AI voice typing in action.</p>
                        <Link href="/#download" className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                            Download Free →
                        </Link>
                    </div>

                    {/* Browse All */}
                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Browse All Terms</h2>
                        <div className="flex flex-wrap gap-2">
                            {glossaryTerms.filter(t => t.slug !== data.slug).map((t) => (
                                <Link
                                    key={t.slug}
                                    href={`/glossary/${t.slug}`}
                                    className="px-3 py-1.5 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all"
                                >
                                    {t.term}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
