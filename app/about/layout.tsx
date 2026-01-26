import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us | Zavi AI – The Team Behind Your Voice",
    description: "Learn about Zavi AI's mission to eliminate the gap between thought and writing. Meet our team building the future of voice-first computing.",
    openGraph: {
        title: "About Zavi AI – Building Voice Input Infrastructure",
        description: "Meet the team building voice input for the next era of computing. Our mission is to make keyboards optional.",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
