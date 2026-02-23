import Navigation from '@/components/Navigation';
import { useCases, getUseCaseBySlug } from '@/lib/useCaseData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import type { Metadata } from 'next';

interface UseCasePageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: UseCasePageProps): Promise<Metadata> {
    const { slug } = await params;
    const uc = getUseCaseBySlug(slug);
    if (!uc) return { title: 'Not Found' };

    return {
        title: uc.metaTitle,
        description: uc.metaDescription,
        alternates: { canonical: `https://zavivoice.com/use-cases/${uc.slug}` },
        openGraph: {
            title: uc.metaTitle,
            description: uc.metaDescription,
            url: `https://zavivoice.com/use-cases/${uc.slug}`,
        },
    };
}

export async function generateStaticParams() {
    return useCases.map(uc => ({ slug: uc.slug }));
}

export default async function UseCasePage({ params }: UseCasePageProps) {
    const { slug } = await params;
    const uc = getUseCaseBySlug(slug);
    if (!uc) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Use Cases', url: 'https://zavivoice.com/use-cases' },
        { name: uc.title, url: `https://zavivoice.com/use-cases/${uc.slug}` },
    ]);

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: uc.faqItems.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    };

    const relatedCases = uc.relatedUseCases
        .map(s => useCases.find(u => u.slug === s))
        .filter(Boolean);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={faqSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/use-cases" className="hover:text-blue-600 transition-colors">Use Cases</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{uc.title}</span>
                    </nav>

                    {/* Hero */}
                    <div className="mb-14">
                        <div className="text-5xl mb-4">{uc.icon}</div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{uc.heroTitle}</h1>
                        <p className="text-xl text-gray-600 max-w-2xl">{uc.heroSubtitle}</p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <Link href="/download" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                                Download Zavi Free
                            </Link>
                            <Link href="/demo" className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl border border-gray-300 hover:border-gray-400 transition-colors">
                                Try Live Demo
                            </Link>
                        </div>
                    </div>

                    {/* The Problem */}
                    <div className="mb-14">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
                        <p className="text-gray-600 leading-relaxed">{uc.problem}</p>
                    </div>

                    {/* The Solution */}
                    <div className="mb-14">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Zavi AI Solves This</h2>
                        <p className="text-gray-600 leading-relaxed">{uc.solution}</p>
                    </div>

                    {/* Before / After Example */}
                    <div className="mb-14">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">See the Difference</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-6">
                                <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-3">❌ What you say</p>
                                <p className="text-gray-700 italic leading-relaxed">&ldquo;{uc.exampleBefore}&rdquo;</p>
                            </div>
                            <div className="rounded-xl border-2 border-green-200 bg-green-50/50 p-6">
                                <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">✅ What Zavi types</p>
                                <p className="text-gray-900 font-medium leading-relaxed">&ldquo;{uc.exampleAfter}&rdquo;</p>
                            </div>
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="mb-14">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {uc.howItWorks.map((step, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                                        {i + 1}
                                    </div>
                                    <p className="text-gray-700">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-14">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Professionals Choose Zavi</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {uc.benefits.map((b) => (
                                <div key={b.title} className="p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                                    <p className="text-sm text-gray-600">{b.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Who It's For */}
                    <div className="mb-14">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Is This For?</h2>
                        <div className="flex flex-wrap gap-2">
                            {uc.targetAudience.map(audience => (
                                <span key={audience} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                    {audience}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mb-14">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {uc.faqItems.map((faq) => (
                                <div key={faq.question} className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center mb-14">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{uc.heroTitle}</h2>
                        <p className="text-blue-100 mb-6">Download Zavi AI for free and start today.</p>
                        <Link href="/download" className="inline-flex px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                            Download Free
                        </Link>
                    </div>

                    {/* Related Use Cases */}
                    {relatedCases.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Use Cases</h2>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {relatedCases.map((rc) => rc && (
                                    <Link key={rc.slug} href={`/use-cases/${rc.slug}`} className="group block p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                                        <div className="text-3xl mb-2">{rc.icon}</div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">{rc.title}</h3>
                                        <p className="text-sm text-gray-500">{rc.heroSubtitle}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
