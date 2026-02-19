import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { languages, getLanguage, getAllLanguageSlugs } from '@/lib/languageData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    return getAllLanguageSlugs().map((slug) => ({ language: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
    const { language } = await params;
    const data = getLanguage(language);
    if (!data) return {};

    return {
        title: `Voice Typing in ${data.language} — AI Speech to Text | Zavi AI`,
        description: `Use Zavi AI for ${data.language} voice typing and speech-to-text. Speak naturally in ${data.language} (${data.nativeName}) and get clean, professional text with AI grammar correction. ${data.speakers} speakers supported.`,
        alternates: { canonical: `https://zavi.ai/languages/${data.slug}` },
        openGraph: {
            title: `${data.language} Voice Typing — Zavi AI`,
            description: `AI-powered voice typing for ${data.language}. Speak in ${data.nativeName}, get polished text. ${data.speakers} speakers.`,
            url: `https://zavi.ai/languages/${data.slug}`,
        },
    };
}

export default async function LanguagePage({ params }: { params: Promise<{ language: string }> }) {
    const { language } = await params;
    const data = getLanguage(language);
    if (!data) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavi.ai' },
        { name: 'Languages', url: 'https://zavi.ai/languages' },
        { name: data.language, url: `https://zavi.ai/languages/${data.slug}` },
    ]);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                {/* Breadcrumb */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/languages" className="hover:text-blue-600 transition-colors">Languages</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{data.language}</span>
                    </nav>
                </div>

                {/* Hero */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="text-center">
                        <p className="text-6xl mb-4">{data.nativeName}</p>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Voice Typing in {data.language}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Speak naturally in {data.language} and get clean, professional text with AI-powered grammar correction and filler word removal.
                        </p>
                    </div>
                </div>

                {/* Language Info */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center">
                            <p className="text-3xl font-bold text-blue-900">{data.speakers}</p>
                            <p className="text-blue-600 mt-1">Speakers worldwide</p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-6 text-center">
                            <p className="text-3xl font-bold text-blue-900">100+</p>
                            <p className="text-blue-600 mt-1">Languages supported</p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-6 text-center">
                            <p className="text-3xl font-bold text-blue-900">4x</p>
                            <p className="text-blue-600 mt-1">Faster than typing</p>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">How {data.language} Voice Typing Works with Zavi AI</h2>
                    <div className="space-y-8">
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">1</div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Speak Naturally in {data.language}</h3>
                                <p className="text-gray-600">Open any app — WhatsApp, Gmail, Slack, or any text field — and tap the microphone icon on your Zavi keyboard. Speak in {data.language} ({data.nativeName}) as naturally as you would to a friend. Don&apos;t worry about fillers, pauses, or grammar.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">2</div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Cleans Up Your Speech</h3>
                                <p className="text-gray-600">Zavi&apos;s Zero-Prompting AI automatically removes filler words, fixes grammar, adds proper punctuation, and restructures sentences into clean, professional {data.language} text. No editing needed.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">3</div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Or Translate to Another Language</h3>
                                <p className="text-gray-600">Speak in {data.language} and get the output in English, Spanish, French, or any of 100+ languages. Perfect for multilingual communication, international business, or writing in a language you don&apos;t type well in.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Features */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">{data.language} Voice Typing Features</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">🎤 Natural {data.language} Speech Recognition</h3>
                            <p className="text-gray-600">Optimized for natural {data.language} speech patterns, including colloquial expressions, code-switching, and regional dialects common in {data.regions}.</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">✨ AI Grammar Correction</h3>
                            <p className="text-gray-600">Automatic grammar, punctuation, and sentence structure correction specifically tuned for {data.language} writing conventions.</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">🌍 {data.language} ↔ Translation</h3>
                            <p className="text-gray-600">Speak in {data.language} and instantly get text in English, or speak in English and output in {data.language}. Works with all 100+ supported languages.</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">📱 Works in Every App</h3>
                            <p className="text-gray-600">Use {data.language} voice typing in WhatsApp, Gmail, Slack, Notion, Instagram, ChatGPT — any app with a text field. Zavi works as a system-wide keyboard.</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-10 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Try {data.language} Voice Typing Free</h2>
                        <p className="text-blue-100 text-lg mb-8">Download Zavi AI and start speaking in {data.language} today.</p>
                        <Link href="/#download" className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-lg">
                            Download Free →
                        </Link>
                    </div>
                </div>

                {/* Other Languages */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Voice Typing in Other Languages</h2>
                    <div className="flex flex-wrap gap-3">
                        {languages.filter(l => l.slug !== data.slug).slice(0, 15).map((lang) => (
                            <Link
                                key={lang.slug}
                                href={`/languages/${lang.slug}`}
                                className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            >
                                {lang.nativeName} {lang.language}
                            </Link>
                        ))}
                        <Link href="/languages" className="px-4 py-2 border border-blue-200 rounded-full text-sm text-blue-600 font-medium hover:bg-blue-50 transition-all">
                            View all 100+ →
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
