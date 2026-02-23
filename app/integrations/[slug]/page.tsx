import Navigation from '@/components/Navigation';
import { integrations, Integration } from '@/lib/integrationData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import type { Metadata } from 'next';

interface IntegrationPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IntegrationPageProps): Promise<Metadata> {
    const { slug } = await params;
    const int = integrations.find(i => i.slug === slug);
    if (!int) return { title: 'Not Found' };

    return {
        title: int.metaTitle,
        description: int.metaDesc,
        alternates: { canonical: `https://zavivoice.com/integrations/${int.slug}` },
        openGraph: {
            title: int.metaTitle,
            description: int.metaDesc,
            url: `https://zavivoice.com/integrations/${int.slug}`,
        },
    };
}

export async function generateStaticParams() {
    return integrations.map(int => ({ slug: int.slug }));
}

export default async function IntegrationPage({ params }: IntegrationPageProps) {
    const { slug } = await params;
    const int = integrations.find(i => i.slug === slug);
    if (!int) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Integrations', url: 'https://zavivoice.com/integrations' },
        { name: int.name, url: `https://zavivoice.com/integrations/${int.slug}` },
    ]);

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: int.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    };

    const relatedIntegrations = integrations
        .filter(i => i.slug !== int.slug)
        .slice(0, 3); // Show max 3 other apps

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
                        <Link href="/integrations" className="hover:text-blue-600 transition-colors">Integrations</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{int.name}</span>
                    </nav>

                    {/* Hero */}
                    <div className="mb-14 text-center md:text-left">
                        <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${int.color}`}>
                            {int.category}
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Voice Typing for <br className="hidden md:block" />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{int.name}</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl md:mx-0 mx-auto leading-relaxed mb-8">
                            {int.shortDesc}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link href="/download" className="inline-flex items-center justify-center px-8 py-4 bg-zavi-blue text-white font-bold rounded-xl hover:bg-zavi-blue-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                Download Zavi Free
                            </Link>
                            <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all">
                                See Live Demo
                            </Link>
                        </div>
                    </div>

                    {/* Full Description */}
                    <div className="mb-16 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">How it works with {int.name}</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">{int.fullDesc}</p>
                    </div>

                    {/* Key Features Grid */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Superpower Features</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {int.keyFeatures.map((feature, i) => (
                                <div key={i} className="flex gap-4 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors bg-white">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-slate-700 font-medium">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Use Cases List */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Perfect for when you need to:</h2>
                        <div className="space-y-4">
                            {int.useCases.map((useCase, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border-l-4 border-blue-500">
                                    <p className="text-slate-700 font-medium">{useCase}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {int.faqs.map((faq, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.question}</h3>
                                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-14 text-center mb-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Control {int.name} with your Voice</h2>
                        <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg relative z-10">
                            Stop typing and start speaking. Download Zavi AI on macOS, Windows, Linux, iOS, or Android today and unlock a 3x faster dictation workflow.
                        </p>
                        <Link href="/download" className="relative z-10 inline-flex px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                            Get Zavi App Free
                        </Link>
                    </div>

                    {/* Related Integrations */}
                    {relatedIntegrations.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">More Connected Apps</h2>
                            <div className="grid sm:grid-cols-3 gap-6">
                                {relatedIntegrations.map((app) => (
                                    <Link key={app.slug} href={`/integrations/${app.slug}`} className="group block p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all bg-white">
                                        <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold mb-4 ${app.color}`}>
                                            {app.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{app.name}</h3>
                                        <p className="text-sm text-slate-600 line-clamp-2">{app.shortDesc}</p>
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
