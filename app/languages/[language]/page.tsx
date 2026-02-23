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
        description: `Use Zavi AI for ${data.language} voice typing and speech-to-text. ${data.intro.slice(0, 130)}`,
        alternates: { canonical: `https://zavivoice.com/languages/${data.slug}` },
        openGraph: {
            title: `${data.language} Voice Typing — Zavi AI`,
            description: `AI-powered voice typing for ${data.language}. ${data.description}`,
            url: `https://zavivoice.com/languages/${data.slug}`,
        },
    };
}

export default async function LanguagePage({ params }: { params: Promise<{ language: string }> }) {
    const { language } = await params;
    const data = getLanguage(language);
    if (!data) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Languages', url: 'https://zavivoice.com/languages' },
        { name: data.language, url: `https://zavivoice.com/languages/${data.slug}` },
    ]);

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
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
                        <Link href="/languages" className="hover:text-blue-600 transition-colors">Languages</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{data.language}</span>
                    </nav>
                </div>

                {/* Hero — unique intro per language */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="text-center">
                        <p className="text-6xl mb-4">{data.nativeName}</p>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Voice Typing in {data.language}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {data.intro}
                        </p>
                    </div>
                </div>

                {/* Language Stats */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 rounded-2xl p-6 text-center">
                            <p className="text-3xl font-bold text-blue-900">{data.speakers}</p>
                            <p className="text-blue-600 mt-1">Speakers worldwide</p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-6 text-center">
                            <p className="text-3xl font-bold text-blue-900">{data.regions}</p>
                            <p className="text-blue-600 mt-1">Primary regions</p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-6 text-center">
                            <p className="text-sm font-medium text-blue-600 mb-1">Script</p>
                            <p className="text-lg font-bold text-blue-900">{data.scriptInfo}</p>
                        </div>
                    </div>
                </div>

                {/* Unique Challenges Section */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why {data.language} Voice Typing Is a Game-Changer</h2>
                    <p className="text-gray-600 mb-8">{data.description} Here are the specific challenges Zavi AI solves for {data.language} speakers:</p>
                    <div className="space-y-4">
                        {data.challenges.map((challenge, i) => (
                            <div key={i} className="flex gap-4 items-start bg-gray-50 rounded-xl p-5">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                                <p className="text-gray-700">{challenge}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Unique Use Cases */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">How People Use Zavi for {data.language}</h2>
                    <div className="grid md:grid-cols-1 gap-6">
                        {data.useCases.map((useCase, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                                <p className="text-gray-600">{useCase.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How It Works — brief, language-specific */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">How {data.language} Voice Typing Works</h2>
                    <div className="space-y-8">
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">1</div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Speak in {data.language}</h3>
                                <p className="text-gray-600">Open any app and tap the microphone on your Zavi keyboard. Speak naturally in {data.language} ({data.nativeName}) — don&apos;t worry about fillers, pauses, or getting every word perfect.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">2</div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Polishes Your {data.language} Text</h3>
                                <p className="text-gray-600">Zavi&apos;s Zero-Prompting AI removes filler words, corrects grammar, adds punctuation, and handles {data.language}-specific formatting — including {data.scriptInfo.toLowerCase()}.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">3</div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Translate or Keep in {data.language}</h3>
                                <p className="text-gray-600">Get your output in clean {data.language} text, or instantly translate to English or any of 100+ other languages. Perfect for multilingual workflows across {data.regions}.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ — unique per language (also adds FAQPage schema) */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">{data.language} Voice Typing FAQ</h2>
                    <div className="space-y-4">
                        {data.faq.map((item, i) => (
                            <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <h3 className="font-semibold text-gray-900 text-left">{item.question}</h3>
                                    <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl shrink-0">+</span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-600">
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-10 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Try {data.language} Voice Typing Free</h2>
                        <p className="text-blue-100 text-lg mb-8">Download Zavi AI and start speaking in {data.language} today. No {data.language} keyboard needed.</p>
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
