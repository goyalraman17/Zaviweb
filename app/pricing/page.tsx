import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing — Zavi AI Voice Typing Keyboard | Free & Pro Plans',
    description: 'Zavi AI pricing: Free plan with AI voice typing in 100+ languages, or Pro at $4.99/month for unlimited usage. Compare plans, features, and FAQs.',
    alternates: { canonical: 'https://zavi.ai/pricing' },
    openGraph: {
        title: 'Zavi AI Pricing — Voice Typing That Pays for Itself',
        description: 'Free AI voice typing or Pro at $4.99/month. Save 40+ hours/year typing. Works in every app.',
        url: 'https://zavi.ai/pricing',
    },
};

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Everything you need to start voice typing with AI',
        features: [
            'AI-powered filler word removal',
            'Grammar & punctuation correction',
            'Works in every app (WhatsApp, Gmail, Slack, etc.)',
            '100+ language support',
            'Automatic language detection',
            'Daily usage limits apply',
        ],
        cta: 'Download Free',
        ctaHref: '/#download',
        highlight: false,
    },
    {
        name: 'Pro',
        price: '$4.99',
        period: 'per month',
        yearlyPrice: '$39.99/year (save 33%)',
        description: 'Unlimited voice typing for professionals who want maximum productivity',
        features: [
            'Everything in Free, plus:',
            'Unlimited daily usage',
            '3x faster processing speed',
            'Real-time translation (speak in one language, type in another)',
            'Advanced sentence restructuring',
            'Priority AI processing',
            'Priority support',
        ],
        cta: 'Get Pro',
        ctaHref: '/#download',
        highlight: true,
    },
];

const comparisonFeatures = [
    { feature: 'AI filler word removal', free: '✅', pro: '✅' },
    { feature: 'Grammar & punctuation fix', free: '✅', pro: '✅' },
    { feature: 'Works in every app', free: '✅', pro: '✅' },
    { feature: '100+ languages', free: '✅', pro: '✅' },
    { feature: 'Auto language detection', free: '✅', pro: '✅' },
    { feature: 'Daily usage', free: 'Limited', pro: 'Unlimited' },
    { feature: 'Processing speed', free: 'Standard', pro: '3x faster' },
    { feature: 'Real-time translation', free: '❌', pro: '✅' },
    { feature: 'Advanced restructuring', free: '❌', pro: '✅' },
    { feature: 'Priority support', free: '❌', pro: '✅' },
];

const faqs = [
    {
        question: 'Is Zavi AI really free?',
        answer: 'Yes! The Free plan includes AI voice typing with filler word removal, grammar correction, 100+ language support, and works in every app. There are daily usage limits, but most casual users won\'t hit them.',
    },
    {
        question: 'What happens when I hit the daily limit on Free?',
        answer: 'You can continue using basic voice typing without AI cleanup, or wait until the next day when your AI usage resets. Upgrading to Pro removes all limits.',
    },
    {
        question: 'Is Pro worth it?',
        answer: 'If you send more than 10 messages or emails per day, Pro pays for itself quickly. At $4.99/month, you save 5-10 hours of editing time per month. That\'s less than the cost of a cup of coffee for hours of saved time.',
    },
    {
        question: 'Can I cancel Pro anytime?',
        answer: 'Yes. Pro is a monthly or yearly subscription with no commitment. Cancel anytime and keep using the Free plan.',
    },
    {
        question: 'Do you offer team or enterprise pricing?',
        answer: 'Yes! Contact us at team@zavi.ai for custom team pricing with centralized billing, usage analytics, and volume discounts.',
    },
    {
        question: 'How does Zavi compare to Wispr Flow pricing?',
        answer: 'Wispr Flow offers a free tier (2,000 words/week) and Pro at $12/month. Zavi Pro is $4.99/month (58% cheaper). Both have free tiers. Zavi also supports Android, real-time translation, and Linux.',
    },
    {
        question: 'How does Zavi compare to Dragon pricing?',
        answer: 'Dragon NaturallySpeaking desktop costs $150-699+ for a one-time license. Dragon cloud subscriptions cost $15-55/month. Zavi Pro is $4.99/month — dramatically more affordable for general voice typing.',
    },
];

export default function PricingPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavi.ai' },
        { name: 'Pricing', url: 'https://zavi.ai/pricing' },
    ]);

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Zavi AI Voice Typing Keyboard',
        description: 'AI-powered voice typing keyboard that turns natural speech into clean, professional text.',
        brand: { '@type': 'Brand', name: 'Zavi AI' },
        url: 'https://zavi.ai',
        offers: [
            {
                '@type': 'Offer',
                name: 'Free Plan',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                description: 'AI voice typing with daily limits. Filler removal, grammar correction, 100+ languages.',
            },
            {
                '@type': 'Offer',
                name: 'Pro Plan (Monthly)',
                price: '4.99',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: '4.99',
                    priceCurrency: 'USD',
                    billingDuration: 'P1M',
                },
                description: 'Unlimited AI voice typing, 3x speed, real-time translation, priority support.',
            },
            {
                '@type': 'Offer',
                name: 'Pro Plan (Yearly)',
                price: '39.99',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: '39.99',
                    priceCurrency: 'USD',
                    billingDuration: 'P1Y',
                },
                description: 'Unlimited AI voice typing, 3x speed, real-time translation, priority support. Save 33%.',
            },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    };

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={productSchema} />
            <JsonLd data={faqSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Simple, transparent pricing
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Start free with AI voice typing. Upgrade to Pro when you want unlimited usage and real-time translation.
                        </p>
                    </div>

                    {/* Plans */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-20">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`rounded-2xl p-8 ${plan.highlight
                                    ? 'bg-blue-600 text-white ring-4 ring-blue-600/20 shadow-xl'
                                    : 'bg-white border-2 border-gray-200'
                                    }`}
                            >
                                {plan.highlight && (
                                    <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">Most Popular</span>
                                )}
                                <h2 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h2>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className={`text-5xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                                    <span className={`text-lg ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>/{plan.period}</span>
                                </div>
                                {plan.yearlyPrice && (
                                    <p className={`text-sm mb-4 ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan.yearlyPrice}</p>
                                )}
                                <p className={`mb-6 ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>{plan.description}</p>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className={`mt-1 ${plan.highlight ? 'text-blue-200' : 'text-blue-600'}`}>✓</span>
                                            <span className={plan.highlight ? 'text-white' : 'text-gray-700'}>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={plan.ctaHref}
                                    className={`block text-center px-6 py-3 rounded-xl font-semibold transition-all ${plan.highlight
                                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Feature Comparison Table */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Feature Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full max-w-2xl mx-auto">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Feature</th>
                                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Free</th>
                                        <th className="text-center py-3 px-4 text-sm font-semibold text-blue-600">Pro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonFeatures.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                                            <td className="py-3 px-4 text-sm text-gray-700">{row.feature}</td>
                                            <td className="py-3 px-4 text-sm text-center text-gray-600">{row.free}</td>
                                            <td className="py-3 px-4 text-sm text-center text-gray-900 font-medium">{row.pro}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Value Proposition */}
                    <div className="bg-blue-50 rounded-2xl p-8 md:p-12 mb-20 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            $4.99/month saves you 40+ hours per year
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto mb-6">
                            Average professionals type 2-3 hours daily. Voice typing at 150 WPM vs 40 WPM thumb typing means you save 15-20 minutes per hour of typing. That&apos;s 5-10 hours saved per month — for less than a coffee.
                        </p>
                        <div className="flex items-center justify-center gap-8 flex-wrap">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-blue-600">3-4x</p>
                                <p className="text-sm text-gray-500">Faster than typing</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-blue-600">150</p>
                                <p className="text-sm text-gray-500">Words per minute</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-blue-600">0</p>
                                <p className="text-sm text-gray-500">Edits needed</p>
                            </div>
                        </div>
                    </div>

                    {/* Competitor Pricing Comparison */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How We Compare on Price</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {[
                                { name: 'Zavi AI Pro', price: '$4.99/mo', note: 'AI voice keyboard', highlight: true },
                                { name: 'Wispr Flow', price: '$12/mo', note: 'Voice dictation', highlight: false },
                                { name: 'Otter.ai Pro', price: '$16.99/mo', note: 'Meeting transcription', highlight: false },
                                { name: 'Dragon', price: '$150-699+', note: 'One-time license', highlight: false },
                            ].map((comp) => (
                                <div key={comp.name} className={`rounded-xl p-5 text-center ${comp.highlight ? 'bg-blue-600 text-white' : 'bg-gray-50 border border-gray-200'}`}>
                                    <p className={`text-sm font-medium mb-1 ${comp.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{comp.name}</p>
                                    <p className={`text-2xl font-bold ${comp.highlight ? 'text-white' : 'text-gray-900'}`}>{comp.price}</p>
                                    <p className={`text-xs mt-1 ${comp.highlight ? 'text-blue-200' : 'text-gray-400'}`}>{comp.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, i) => (
                                <div key={i} className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
