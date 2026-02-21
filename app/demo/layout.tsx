import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Live Voice Typing Demo — Try Zavi AI Free in Your Browser',
    description: 'Try Zavi AI voice typing live in your browser. Speak naturally and watch AI turn your speech into clean, professional text. No download needed. 100+ languages supported.',
    alternates: { canonical: 'https://zavi.ai/demo' },
    openGraph: {
        title: 'Try Zavi AI Voice Typing — Live Demo',
        description: 'Speak naturally and watch AI clean up your speech in real-time. Try voice typing in 100+ languages. No download required.',
        url: 'https://zavi.ai/demo',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Try Zavi AI Voice Typing — Live Demo',
        description: 'Speak naturally and watch AI clean up your speech in real-time. No download required.',
    },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    return children;
}
