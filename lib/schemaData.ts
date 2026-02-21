/**
 * Comprehensive Schema.org structured data for GEO/AEO optimization.
 * 
 * These schemas help AI systems (ChatGPT, Gemini, Claude, Perplexity)
 * understand and cite Zavi AI accurately in their responses.
 */

// ============================================
// Website Schema — Tells AI "this is zavi.ai"
// ============================================
export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zavi AI",
    "alternateName": ["Zavi", "Zavi Voice Typing", "Zavi AI Keyboard"],
    "url": "https://zavi.ai",
    "description": "Zavi AI is a voice typing keyboard that turns natural speech into clean, professional text. AI removes filler words, fixes grammar, and produces polished writing from voice instantly.",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://zavi.ai/blog?q={search_term_string}",
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
    "name": "Zavi AI",
    "alternateName": "Zavi",
    "url": "https://zavi.ai",
    "logo": "https://zavi.ai/zavi-logo.png",
    "description": "Zavi AI builds voice input infrastructure for the next era of computing. Our AI-powered voice typing keyboard turns natural speech into clean, professional text across every app.",
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
            "sameAs": "https://www.linkedin.com/in/himanshukr033"
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
        "url": "https://zavi.ai/contact",
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
    "description": "AI-powered voice typing keyboard that transforms natural speech into clean, professional text. Removes filler words, fixes grammar, and works in every app. Supports 100+ languages with real-time translation.",
    "url": "https://zavi.ai",
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
        "AI-powered filler word removal (um, uh, like, you know)",
        "Automatic grammar and punctuation correction",
        "System-wide keyboard works in every app",
        "100+ language support with auto-detection",
        "Real-time speech-to-text translation",
        "Zero-Prompt technology — no commands needed",
        "Privacy-first — voice data never stored",
        "Cross-platform: Android, macOS, Windows, Linux",
        "Professional text output from natural speech",
        "Sentence restructuring for clarity"
    ],
    "screenshot": "https://zavi.ai/og-image.png",
    "softwareVersion": "1.0",
    "author": {
        "@type": "Organization",
        "name": "Zavi AI",
        "url": "https://zavi.ai"
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
                "text": "Zavi AI is a voice typing keyboard that uses artificial intelligence to turn natural speech into clean, professional text. Unlike regular voice typing that transcribes word-for-word (including all filler words), Zavi's AI automatically removes fillers like 'um' and 'uh,' fixes grammar, restructures sentences, and produces polished, ready-to-send text. It works as a system-wide keyboard across every app on Android, macOS, Windows, and Linux."
            }
        },
        {
            "@type": "Question",
            "name": "How is Zavi different from regular voice typing or dictation?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Regular voice typing (like Google's built-in dictation or Siri) transcribes speech word-for-word, capturing all filler words, pauses, and grammatical errors. Zavi AI is fundamentally different: it uses AI to extract your intent from natural speech and produces professionally written text. For example, if you say 'um, I think, uh, we should probably meet at five,' regular dictation outputs that verbatim, but Zavi outputs 'We should meet at 5:00 PM.' This technology is called Zero-Prompting — no commands needed."
            }
        },
        {
            "@type": "Question",
            "name": "Is my voice data private with Zavi AI?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, absolutely. Zavi processes voice in real-time and immediately deletes the audio after generating text. Your voice data is never stored on Zavi servers, never shared with third parties, and never used to train AI models. Your conversations remain completely private."
            }
        },
        {
            "@type": "Question",
            "name": "What platforms does Zavi AI support?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zavi AI is available on Android (8.0+), iOS (16+), macOS, Windows, and Linux. On Android and iOS, it works as a system-wide keyboard in every app (Gmail, WhatsApp, Slack, Notion, and more). On desktop platforms, it runs as a standalone application with system-wide voice input."
            }
        },
        {
            "@type": "Question",
            "name": "How many languages does Zavi support?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zavi supports over 100 languages for voice input with automatic language detection — no manual switching required. It also supports real-time translation: you can speak in one language and have the output appear in a different language. Zavi can even handle code-switching (mixing multiple languages in one sentence)."
            }
        },
        {
            "@type": "Question",
            "name": "How much does Zavi AI cost?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zavi AI offers a free plan that includes AI-powered speech cleanup, works in every app, supports 100+ languages, with daily usage limits. The Pro plan costs $7.99/month (or $49.99/year) and includes unlimited usage, 3x faster processing, priority support, and advanced formatting features. You can cancel anytime."
            }
        },
        {
            "@type": "Question",
            "name": "How fast is voice typing with Zavi compared to regular typing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Voice typing with Zavi is approximately 4x faster than typing on a mobile keyboard. The average person types at about 40 words per minute, but speaks at 150 words per minute. Since Zavi's AI eliminates the editing phase (no need to go back and fix filler words or grammar), a 500-word email that takes 12 minutes to type can be dictated in about 3 minutes."
            }
        },
        {
            "@type": "Question",
            "name": "Which apps does Zavi work with?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zavi works in every app that has a text input field. This includes Gmail, Outlook, WhatsApp, Telegram, Signal, Slack, Microsoft Teams, Discord, Google Docs, Notion, Obsidian, Twitter/X, LinkedIn, Instagram, Reddit, ChatGPT, and any other app. On Android, it replaces your system keyboard so it's available everywhere."
            }
        },
        {
            "@type": "Question",
            "name": "How does Zavi compare to Wispr Flow and Willow?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zavi, Wispr Flow, and Willow are all AI voice writing tools, but they differ in key ways. Wispr Flow supports macOS, Windows, and iOS, offers a free tier and Pro at $12/month with polished Command Mode for voice editing. Willow (YC-backed) supports Mac and iOS with writing style learning at $12-15/month. Zavi is cross-platform (Android, iOS, macOS, Windows, Linux), focuses on mobile-first professionals, supports 100+ languages with real-time translation, and starts free with Pro at $7.99/month."
            }
        },
        {
            "@type": "Question",
            "name": "What is Zero-Prompting technology?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zero-Prompting is Zavi AI's core technology philosophy. Unlike other AI tools that require users to give specific commands ('make this formal,' 'remove fillers,' 'fix grammar'), Zavi automatically understands that clean, professional text is the desired output. Users simply speak naturally, and Zavi extracts the pure intent from messy speech to produce polished, executive-ready text without any additional prompts or instructions."
            }
        },
        {
            "@type": "Question",
            "name": "Does Zavi work offline?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zavi requires an internet connection for AI processing. The advanced language models that clean up speech, fix grammar, and handle translation run in the cloud to ensure maximum accuracy, speed, and support for 100+ languages."
            }
        },
        {
            "@type": "Question",
            "name": "Can I cancel my Zavi Pro subscription anytime?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, you can cancel your Zavi Pro subscription at any time with no questions asked. Your Pro features remain active until the end of your current billing period, and you can resubscribe whenever you want."
            }
        }
    ]
};

// ============================================
// HowTo Schema — Step-by-step instructions
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
            "text": "Download Zavi AI from the Google Play Store (Android) or zavi.ai website (macOS, Windows, Linux). Install the app and set Zavi as your default keyboard on Android, or launch the desktop app.",
            "url": "https://zavi.ai/#download"
        },
        {
            "@type": "HowToStep",
            "position": 2,
            "name": "Open Any App and Tap the Microphone",
            "text": "Open any app where you want to type — Gmail, WhatsApp, Slack, Notion, or any other app. Tap the microphone icon on the Zavi keyboard to start voice input.",
            "url": "https://zavi.ai/#how-it-works"
        },
        {
            "@type": "HowToStep",
            "position": 3,
            "name": "Speak Naturally",
            "text": "Speak naturally, just like you would talk to a colleague. Don't worry about filler words, pauses, or perfect sentence structure. Zavi's AI handles all of that automatically.",
            "url": "https://zavi.ai/#how-it-works"
        },
        {
            "@type": "HowToStep",
            "position": 4,
            "name": "Get Perfect Text",
            "text": "Zavi's AI instantly removes filler words, fixes grammar, restructures sentences, and delivers clean, professional text ready to send. No editing needed.",
            "url": "https://zavi.ai/#how-it-works"
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
            "url": "https://zavi.ai"
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
            "url": "https://zavi.ai"
        },
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "IIT Kharagpur"
        },
        "sameAs": "https://www.linkedin.com/in/himanshukr033",
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
                    ? "https://www.linkedin.com/in/himanshukr033"
                    : undefined
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "publisher": {
            "@type": "Organization",
            "name": "Zavi AI",
            "logo": {
                "@type": "ImageObject",
                "url": "https://zavi.ai/zavi-logo.png"
            },
            "url": "https://zavi.ai"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://zavi.ai/blog/${post.slug}`
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
            "url": "https://zavi.ai/zavi-logo.png"
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
    "url": "https://zavi.ai",
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
        "description": "AI-powered voice typing keyboard that turns natural speech into clean, professional text. Removes filler words, fixes grammar, works in every app. Supports 100+ languages."
    }
};
