const fs = require('fs');

const path = './lib/schemaData.ts';
let code = fs.readFileSync(path, 'utf8');

const questionsToKeep = [
  "What is Zavi AI?",
  "What can voice agents do?",
  "What is the Magic Wand?",
  "Is my voice data private?",
  "How fast is Zavi compared to typing?",
  "What's included in the free plan?",
  "Which platforms does Zavi support?",
  "How does multi-language translation work?",
  "How does Zavi compare to Wispr Flow?",
  "Can I cancel anytime?"
];

// In this exact file, the faqSchema's answers in components/FAQ.tsx might not have identical name keys as the schema names.
// Oh wait, FAQ.tsx uses "What is Zavi AI?", "What can voice agents do?", "What is the Magic Wand?"
// Let's just create a completely explicit simplified chunk and replace faqSchema snippet.

let replacer = `export const faqSchema = {
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
};`;

const startIdx = code.indexOf('export const faqSchema = {');
const endIdx = code.indexOf('export const howToSchema = {');
if (startIdx !== -1 && endIdx !== -1) {
    const updated = code.substring(0, startIdx) + replacer + "\n\n// ============================================\n// HowTo Schema \n// ============================================\n" + code.substring(endIdx);
    fs.writeFileSync(path, updated);
}

