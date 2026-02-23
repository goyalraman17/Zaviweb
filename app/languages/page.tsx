import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { languages } from '@/lib/languageData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Voice Typing in 100+ Languages — AI Speech to Text | Zavi AI',
    description: 'Zavi AI supports voice typing in 100+ languages including Hindi, Spanish, French, German, Japanese, Korean, Arabic, Chinese, and more. Speak naturally, get clean text with AI grammar correction.',
    alternates: { canonical: 'https://zavivoice.com/languages' },
    openGraph: {
        title: 'Voice Typing in 100+ Languages — Zavi AI',
        description: 'AI-powered voice typing in Hindi, Spanish, French, German, Japanese, Korean, Arabic, Chinese, and 100+ more languages.',
        url: 'https://zavivoice.com/languages',
    },
};

export default function LanguagesPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Languages', url: 'https://zavivoice.com/languages' },
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
                        <span className="text-gray-900 font-medium">Languages</span>
                    </nav>

                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Voice Typing in 100+ Languages</h1>
                    <p className="text-xl text-gray-600 mb-4 max-w-3xl">
                        Zavi AI supports voice typing with AI grammar correction, filler word removal, and real-time translation in over 100 languages. Speak naturally in your language, get clean professional text.
                    </p>
                    <p className="text-gray-500 mb-12">Click any language below to learn more about voice typing support.</p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {languages.map((lang) => (
                            <Link
                                key={lang.slug}
                                href={`/languages/${lang.slug}`}
                                className="group block p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                            >
                                <p className="text-2xl mb-1">{lang.nativeName}</p>
                                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{lang.language}</h2>
                                <p className="text-sm text-gray-500 mt-1">{lang.speakers} speakers</p>
                                <p className="text-sm text-gray-400">{lang.regions}</p>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-blue-900 mb-3">Don&apos;t See Your Language?</h2>
                        <p className="text-blue-700 mb-6">Zavi AI supports 100+ languages total. The languages listed above are our most popular ones with dedicated pages. If your language isn&apos;t listed, it&apos;s likely still supported.</p>
                        <Link href="/#download" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                            Try Zavi AI Free →
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
