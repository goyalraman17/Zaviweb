import Navigation from '@/components/Navigation';
import { useCases } from '@/lib/useCaseData';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Use Cases — How Professionals Use Zavi AI Voice Typing',
    description: 'Discover how professionals use Zavi AI voice typing for email, WhatsApp, Slack, academic writing, and accessibility. See real before/after examples.',
    alternates: { canonical: 'https://zavi.ai/use-cases' },
    openGraph: {
        title: 'Zavi AI Use Cases — Voice Typing for Every Professional',
        description: 'Email, WhatsApp, Slack, essays, accessibility — see how Zavi AI transforms voice into action across every use case.',
        url: 'https://zavi.ai/use-cases',
    },
};

export default function UseCasesPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavi.ai' },
        { name: 'Use Cases', url: 'https://zavi.ai/use-cases' },
    ]);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Use Cases</span>
                    </nav>

                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Voice Typing for Every Use Case
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Zavi AI works in every app. See how professionals save hours every week with AI-powered voice typing.
                        </p>
                    </div>

                    {/* Use Case Cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {useCases.map((uc) => (
                            <Link
                                key={uc.slug}
                                href={`/use-cases/${uc.slug}`}
                                className="group block p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
                            >
                                <div className="text-4xl mb-3">{uc.icon}</div>
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                    {uc.title}
                                </h2>
                                <p className="text-gray-600 text-sm mb-4">{uc.heroSubtitle}</p>
                                <span className="text-blue-600 text-sm font-semibold group-hover:underline">
                                    Learn more →
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Ready to stop typing?
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Download Zavi AI and start speaking your way to better productivity.
                        </p>
                        <Link href="/download" className="inline-flex px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                            Download Free
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
