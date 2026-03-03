/**
 * Comprehensive Schema.org structured data for GEO/AEO optimization.
 * 
 * These schemas help AI systems (ChatGPT, Gemini, Claude, Perplexity)
 * understand and cite Zavi AI accurately in their responses.
 */

// ============================================
// Website Schema — Tells AI "this is zavivoice.com"
// ============================================
export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zavi",
    "alternateName": ["Zavi AI", "Zavi Voice Typing", "Zavi AI Keyboard", "Zavi App", "Zavi Voice"],
    "url": "https://zavivoice.com",
    "description": "Zavi is the Voice to Action OS. Most voice tools just transcribe. Zavi types, edits, and takes action across every app. Speak naturally — clean grammar, zero filler words.",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://zavivoice.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US",
    "publisher": {
        "@type": "Organization",
        "name": "Zavi AI"
    }
};

// ============================================
// Organization Schema — Company identity
// ============================================
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zavi",
    "alternateName": ["Zavi AI", "Zavi Voice", "Zavi App"],
    "url": "https://zavivoice.com",
    "logo": "https://zavivoice.com/zavi-logo.png",
    "description": "Zavi AI builds the Voice to Action OS. Our cross-platform voice layer turns natural speech into actions across every app with clean grammar and zero filler words. Magic Wand and Agent Mode included.",
    "foundingDate": "2023",
    "founders": [
        {
            "@type": "Person",
            "name": "Raman Goyal",
            "jobTitle": "Founder & CEO",
            "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "University of Edinburgh"
            },
            "sameAs": "https://www.linkedin.com/in/ramangoyal3"
        },
        {
            "@type": "Person",
            "name": "Himanshu Kumar",
            "jobTitle": "Co-founder & CTO",
            "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "IIT Kharagpur"
            },
            "sameAs": "https://www.linkedin.com/in/hsyvy/"
        }
    ],
    "sameAs": [
        "https://x.com/zavivoice",
        "https://linkedin.com/company/zavivoice/",
        "https://www.instagram.com/zavivoice/",
        "https://www.youtube.com/@goyalraman17",
        "https://www.reddit.com/user/Vanilla-Green/"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "url": "https://zavivoice.com/contact",
        "contactType": "customer support"
    }
};

// ============================================
// Software Application Schema — Product details
// ============================================
export const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Zavi AI Voice Typing Keyboard",
    "alternateName": ["Zavi AI", "Zavi Keyboard", "Zavi Voice Typing"],
    "description": "Voice to Action OS that types, edits, and executes across every app. Speak naturally with clean grammar and zero filler words. Includes Magic Wand for in-place editing and Agent Mode for executing tasks.",
    "url": "https://zavivoice.com",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Android, iOS, macOS, Windows, Linux",
    "offers": [
        {
            "@type": "Offer",
            "name": "Free Plan",
            "price": "0",
            "priceCurrency": "USD",
            "description": "AI speech cleanup, works in every app, 100+ languages, daily usage limits"
        },
        {
            "@type": "Offer",
            "name": "Pro Plan (Monthly)",
            "price": "7.99",
            "priceCurrency": "USD",
            "billingIncrement": "P1M",
            "description": "Unlimited usage, 3x faster processing, priority support, advanced formatting"
        },
        {
            "@type": "Offer",
            "name": "Pro Plan (Annual)",
            "price": "49.99",
            "priceCurrency": "USD",
            "billingIncrement": "P1Y",
            "description": "Unlimited usage, 3x faster processing, priority support, advanced formatting — 2 months free"
        }
    ],
    "featureList": [
        "Voice Agent — Execute cross-app commands via speech",
        "Magic Wand — In-place voice editing for text correction",
        "AI-powered filler word removal (um, uh, like, you know)",
        "4 Writing Tones (Professional, Casual, Chat, Witty)",
        "Automatic grammar and punctuation correction",
        "System-wide keyboard works in every app",
        "19 typing languages and 15 target translation languages",
        "Real-time speech-to-text translation",
        "Contextual Emojis — Auto-insert appropriate emojis",
        "Privacy-first — voice data never stored or used for training",
        "Cross-platform: Android, iOS, macOS, Windows, Linux"
    ],
    "screenshot": "https://zavivoice.com/og-image.png",
    "softwareVersion": "1.0",
    "author": {
        "@type": "Organization",
        "name": "Zavi AI",
        "url": "https://zavivoice.com"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "120",
        "bestRating": "5",
        "worstRating": "1"
    }
};

// ============================================
// FAQ Schema — Critical for AI answer extraction
// ============================================
export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is Zavi AI?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zavi AI is a voice agent that works across every app on your phone and computer. Speak naturally, and Zavi removes filler words, fixes grammar, and produces clean text — or executes tasks like sending emails, messaging on Slack, and searching the web. It works as a system-wide keyboard on iOS and Android, and as a desktop app on macOS, Windows, and Linux."
            }
        },
        {
            "@type": "Question",
            "name": "What can voice agents do?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Voice agents let you control apps by speaking. Say 'email John that the meeting is moved to 3pm' and Zavi drafts and sends it in Gmail. Say 'message the team on Slack that the deploy is done' and it happens. Agents work across 27+ integrations including Gmail, Slack, WhatsApp, Notion, Calendar, GitHub, LinkedIn, and more — all from a single voice command."
            }
        },
        {
            "@type": "Question",
            "name": "What is the Magic Wand?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Magic Wand lets you highlight any text in any app and transform it by voice. Say 'make this more professional,' 'translate to Japanese,' or 'summarize this in 2 sentences' — and the text is rewritten in-place instantly. No copy-pasting, no switching apps."
            }
        },
        {
            "@type": "Question",
            "name": "Is my voice data private?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Your voice is processed in real-time and immediately deleted. We never store, share, or use your audio to train models. Zavi is built with a privacy-first architecture — voice data is processed and discarded instantly."
            }
        },
        {
            "@type": "Question",
            "name": "How fast is Zavi compared to typing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zavi is approximately 5x faster than typing. The average person types at 40 words per minute but speaks at 150 words per minute. Since Zavi eliminates the editing phase entirely (AI handles filler removal and grammar), a 500-word email that takes 12 minutes to type can be dictated in about 3 minutes."
            }
        },
        {
            "@type": "Question",
            "name": "What's included in the free plan?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The free plan includes 1,000 words per day of AI-powered voice typing with filler word removal, grammar correction, Magic Wand, voice commands, all 27+ integrations, translation, tone control, and emoji — across every app. No credit card required. Upgrade to Pro ($7.99/month) for unlimited usage."
            }
        },
        {
            "@type": "Question",
            "name": "Which platforms does Zavi support?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zavi works on all 5 major platforms: iOS, Android (8.0+), macOS, Windows, and Linux. On mobile, it integrates as a system-wide keyboard in every app. On desktop, it runs as a standalone application with system-wide voice input."
            }
        },
        {
            "@type": "Question",
            "name": "How does multi-language translation work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zavi supports 100+ languages with automatic detection. Speak in one language and get the output in another — in real-time. For example, speak in Hindi and get polished English text, or speak in Spanish and get professional French output. Zavi also handles code-switching (mixing languages in one sentence)."
            }
        },
        {
            "@type": "Question",
            "name": "How does Zavi compare to Wispr Flow?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wispr Flow costs $12/month and works on Mac, Windows, and iOS. Zavi starts free, costs $7.99/month for Pro, and works on all 5 platforms including Android and Linux. Zavi also includes voice agents with 27+ app integrations, real-time translation across 100+ languages, and the Magic Wand for in-place text transformation — features Wispr doesn't offer."
            }
        },
        {
            "@type": "Question",
            "name": "Can I cancel anytime?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Cancel anytime with no questions asked. Your Pro features remain active until the end of your billing period, and you can resubscribe whenever you want."
            }
        }
    ]
};

// ============================================
// HowTo Schema 
// ============================================
export const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use Zavi AI Voice Typing",
    "description": "Learn how to use Zavi AI to type 4x faster by speaking naturally. Zavi turns your voice into clean, professional text in any app.",
    "totalTime": "PT2M",
    "step": [
        {
            "@type": "HowToStep",
            "position": 1,
            "name": "Download and Install Zavi",
            "text": "Download Zavi AI from the Google Play Store (Android) or zavivoice.com website (macOS, Windows, Linux). Install the app and set Zavi as your default keyboard on Android, or launch the desktop app.",
            "url": "https://zavivoice.com/#download"
        },
        {
            "@type": "HowToStep",
            "position": 2,
            "name": "Open Any App and Tap the Microphone",
            "text": "Open any app where you want to type — Gmail, WhatsApp, Slack, Notion, or any other app. Tap the microphone icon on the Zavi keyboard to start voice input.",
            "url": "https://zavivoice.com/#how-it-works"
        },
        {
            "@type": "HowToStep",
            "position": 3,
            "name": "Speak Naturally",
            "text": "Speak naturally, just like you would talk to a colleague. Don't worry about filler words, pauses, or perfect sentence structure. Zavi's AI handles all of that automatically.",
            "url": "https://zavivoice.com/#how-it-works"
        },
        {
            "@type": "HowToStep",
            "position": 4,
            "name": "Get Perfect Text",
            "text": "Zavi's AI instantly removes filler words, fixes grammar, restructures sentences, and delivers clean, professional text ready to send. No editing needed.",
            "url": "https://zavivoice.com/#how-it-works"
        }
    ]
};

// ============================================
// About Page Person Schemas
// ============================================
export const founderSchemas = [
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Raman Goyal",
        "jobTitle": "Founder & CEO",
        "worksFor": {
            "@type": "Organization",
            "name": "Zavi AI",
            "url": "https://zavivoice.com"
        },
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "University of Edinburgh"
        },
        "sameAs": "https://www.linkedin.com/in/ramangoyal3",
        "description": "Founder and CEO of Zavi AI. Previously built voice AI systems. Founded Zavi to eliminate the gap between human thought and written communication."
    },
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Himanshu Kumar",
        "jobTitle": "Co-founder & CTO",
        "worksFor": {
            "@type": "Organization",
            "name": "Zavi AI",
            "url": "https://zavivoice.com"
        },
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "IIT Kharagpur"
        },
        "sameAs": "https://www.linkedin.com/in/hsyvy/",
        "description": "Co-founder and CTO of Zavi AI. Deep expertise in ML systems and infrastructure. Builds the technology behind Zavi's AI-powered voice-to-text transformation."
    }
];

// ============================================
// Blog Article Schema Generator
// ============================================
export function generateArticleSchema(post: {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    slug: string;
    category: string;
    tags: string[];
    content: string;
}) {
    // Strip HTML tags to get plain text for wordCount estimation
    const plainText = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = plainText.split(/\s+/).length;

    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
            "@type": "Person",
            "name": post.author,
            "url": post.author === "Raman Goyal"
                ? "https://www.linkedin.com/in/ramangoyal3"
                : post.author === "Himanshu Kumar"
                    ? "https://www.linkedin.com/in/hsyvy/"
                    : undefined
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "publisher": {
            "@type": "Organization",
            "name": "Zavi AI",
            "logo": {
                "@type": "ImageObject",
                "url": "https://zavivoice.com/zavi-logo.png"
            },
            "url": "https://zavivoice.com"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://zavivoice.com/blog/${post.slug}`
        },
        "articleSection": post.category,
        "keywords": post.tags.join(', '),
        "wordCount": wordCount,
        "inLanguage": "en-US",
        "isAccessibleForFree": true
    };
}

// ============================================
// Breadcrumb Schema Generator
// ============================================
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}

// ============================================
// VideoObject Schema — Demo video rich results
// ============================================
export const videoObjectSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Zavi AI Voice Typing Demo — See It in Action",
    "description": "Watch how Zavi AI transforms natural speech into clean, professional text. See filler word removal, grammar correction, and real-time processing in action.",
    "thumbnailUrl": "https://img.youtube.com/vi/rkBgOnhopyg/maxresdefault.jpg",
    "uploadDate": "2025-10-15",
    "duration": "PT2M30S",
    "contentUrl": "https://www.youtube.com/watch?v=rkBgOnhopyg",
    "embedUrl": "https://www.youtube.com/embed/rkBgOnhopyg",
    "publisher": {
        "@type": "Organization",
        "name": "Zavi AI",
        "logo": {
            "@type": "ImageObject",
            "url": "https://zavivoice.com/zavi-logo.png"
        }
    },
    "potentialAction": {
        "@type": "SeekToAction",
        "target": "https://www.youtube.com/watch?v=rkBgOnhopyg&t={seek_to_second_number}",
        "startOffset-input": "required name=seek_to_second_number"
    }
};

// ============================================
// SpeakableSpecification — Voice assistant compatibility
// ============================================
export const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Zavi AI — Voice Typing Keyboard",
    "url": "https://zavivoice.com",
    "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
            "h1",
            "[itemProp='description']",
            ".sr-only"
        ]
    },
    "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Zavi AI",
        "description": "Zavi AI — Voice to Action OS. Live on iOS, Android, Mac, Windows, Linux. Free to start. Most voice tools just transcribe. Zavi types, edits, and takes action across every app."
    }
};

// ============================================
// Review Schema Generator — Individual and Aggregate snippets
// ============================================
export function generateReviewSchema(testimonials: { author: string; role: string; content: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Zavi AI Voice Typing Keyboard",
        "applicationCategory": "ProductivityApplication",
        "operatingSystem": "Android, macOS, Windows, Linux",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": testimonials.length.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": testimonials.map(t => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": t.author
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "reviewBody": t.content
        }))
    };
}
