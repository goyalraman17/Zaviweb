import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Zavi AI – Team, Mission & Vision | Voice Typing Keyboard",
    description: "Zavi AI was founded in 2023 by Raman Goyal (University of Edinburgh) and Himanshu Kumar (IIT Kharagpur) to build voice input infrastructure. Our mission: eliminate the gap between human thought and written communication. Meet the team building the future of voice-first computing.",
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: "About Zavi AI – The Team Building Voice Input Infrastructure",
        description: "Founded in 2023 by Raman Goyal and Himanshu Kumar. Meet the team building voice input for the next era of computing, making keyboards optional for 8 billion people.",
        url: "https://zavi.ai/about",
    },
    twitter: {
        card: 'summary_large_image',
        title: "About Zavi AI – The Team Behind Your Voice Typing Keyboard",
        description: "Founded in 2023 by Raman Goyal (University of Edinburgh) and Himanshu Kumar (IIT Kharagpur). Building voice-first computing.",
    },
    keywords: [
        "Zavi AI team",
        "Zavi AI founders",
        "Raman Goyal",
        "Himanshu Kumar",
        "voice AI company",
        "voice typing startup",
        "about Zavi",
    ],
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
