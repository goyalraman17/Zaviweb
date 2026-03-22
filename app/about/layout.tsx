import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Zavi — The Voice Agent OS | Founded by Raman Goyal & Himanshu Kumar",
    description: "Zavi is the Voice Agent OS built by Raman Goyal (Edinburgh, Antler, EF) and Himanshu Kumar (IIT Kharagpur, ex-Nvidia, ex-AMD). Speak naturally, Zavi types, transforms text, and executes tasks across 27+ apps. #7 Product of the Day on Product Hunt with 171 upvotes. Rated 5/5 on iOS and Android.",
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: "About Zavi — The Voice Agent OS",
        description: "Built by a 2-person team from IIT Kharagpur, Edinburgh, Nvidia, and Antler. Zavi turns voice into action across every app. #7 on Product Hunt with zero marketing spend.",
        url: "https://zavivoice.com/about",
    },
    twitter: {
        card: 'summary_large_image',
        title: "About Zavi — The Voice Agent OS",
        description: "Built by Raman Goyal (Edinburgh) and Himanshu Kumar (IIT Kharagpur, ex-Nvidia). Voice to action across every app.",
    },
    keywords: [
        "Zavi",
        "Zavi AI",
        "about Zavi",
        "Zavi founders",
        "Raman Goyal",
        "Himanshu Kumar",
        "voice agent OS",
        "voice typing startup",
        "voice AI company",
        "Zavi team",
    ],
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
