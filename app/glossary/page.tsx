import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { glossaryTerms } from '@/lib/glossaryData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Voice Typing Glossary — AI Speech to Text Terms & Definitions | Zavi AI',
    description: 'Learn the key terms behind voice typing, speech-to-text, AI dictation, and voice AI technology. From ASR to Zero Prompting, understand the technology that powers modern voice input.',
    alternates: { canonical: 'https://zavi.ai/glossary' },
};

export default function GlossaryPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavi.ai' },
        { name: 'Glossary', url: 'https://zavi.ai/glossary' },
    ]);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Glossary</span>
                    </nav>

                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Voice Typing Glossary</h1>
                    <p className="text-xl text-gray-600 mb-12">Key terms and definitions for voice typing, speech-to-text, and AI dictation technology.</p>

                    <div className="space-y-4">
                        {glossaryTerms.map((term) => (
                            <Link
                                key={term.slug}
                                href={`/glossary/${term.slug}`}
                                className="group block p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                            >
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{term.term}</h2>
                                <p className="text-gray-600">{term.shortDefinition}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
