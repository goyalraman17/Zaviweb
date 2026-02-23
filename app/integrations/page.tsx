import Navigation from '@/components/Navigation';
import { integrations } from '@/lib/integrationData';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Zavi AI Voice Integrations & Superpowers',
    description: 'Control macOS, Windows, Linux, Android and iOS applications hands-free with Zavi AI. Explore all 27+ app integrations.',
    alternates: {
        canonical: 'https://zavivoice.com/integrations',
    },
};

export default function IntegrationsDirectory() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Integrations', url: 'https://zavivoice.com/integrations' },
    ]);

    // Group integrations by category
    const groupedIntegrations = integrations.reduce((acc, int) => {
        if (!acc[int.category]) {
            acc[int.category] = [];
        }
        acc[int.category].push(int);
        return acc;
    }, {} as Record<string, typeof integrations>);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <div className="text-center md:text-left mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Give Zavi <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Superpowers</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl md:mx-0 mx-auto leading-relaxed">
                            Turn your voice into your operating system. Connect Zavi AI to your favorite tools, use cases, and AI models to command your workflow 3x faster across macOS, Windows, iOS, and Android.
                        </p>
                    </div>

                    {/* Integration Grid Categories */}
                    {Object.entries(groupedIntegrations).map(([category, apps]) => (
                        <div key={category} className="mb-16">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-3">
                                {category}
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {apps.map((app) => (
                                    <Link key={app.slug} href={`/integrations/${app.slug}`} className="group block relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                                        <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${app.color}`}>
                                            {category}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                                            {app.name}
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors line-clamp-3">
                                            {app.shortDesc}
                                        </p>

                                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* App Teaser CTA */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 md:p-14 text-center mt-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl z-0" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Don't see your app here?</h2>
                        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg relative z-10">
                            Zavi AI natively functions right inside any text box on your device anyway. So even if it's not strictly an API "Superpower", you can dictate perfectly into it right now.
                        </p>
                        <Link href="/download" className="relative z-10 inline-flex px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg">
                            Download Zavi Default Apps
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
