export interface ComparisonFeature {
    name: string;
    zavi: string;
    competitor: string;
}

export interface ComparisonData {
    slug: string;
    competitorName: string;
    competitorDescription: string;
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    verdict: string;
    verdictDetail: string;
    features: ComparisonFeature[];
    zaviAdvantages: string[];
    competitorAdvantages: string[];
    faqItems: { question: string; answer: string }[];
}

export const comparisons: ComparisonData[] = [
    {
        slug: 'wispr-flow',
        competitorName: 'Wispr Flow',
        competitorDescription: 'Wispr Flow is a desktop-only AI voice dictation tool for macOS and Windows that offers contextual voice editing and command mode.',
        metaTitle: 'Zavi AI vs Wispr Flow: Which AI Voice Typing Is Better? (2026)',
        metaDescription: 'Detailed comparison of Zavi AI and Wispr Flow. Compare pricing ($4.99 vs $10/mo), platform support, features, and accuracy. Find out which AI voice dictation tool is best for you.',
        heroTitle: 'Zavi AI vs Wispr Flow',
        heroSubtitle: 'Both tools use AI to turn speech into clean text. But they serve different needs. Here\'s an honest, detailed comparison.',
        verdict: 'Zavi AI wins for mobile-first professionals and multilingual users. Wispr Flow excels for desktop power users who need voice editing commands.',
        verdictDetail: 'If you primarily type on your phone and need voice typing in WhatsApp, Gmail, Slack, and every other mobile app, Zavi is the clear choice — it works as a system-wide Android keyboard. If you\'re desktop-only and want advanced voice editing commands (like "select the last paragraph" or "make this more formal"), Wispr Flow has a more mature command mode. For price-conscious users, Zavi\'s free tier and $4.99/mo Pro plan are significantly cheaper than Wispr Flow\'s $10/month.',
        features: [
            { name: 'Price', zavi: 'Free / $4.99/mo Pro', competitor: '$10/month' },
            { name: 'Platforms', zavi: 'Android, macOS, Windows, Linux', competitor: 'macOS, Windows only' },
            { name: 'Mobile Support', zavi: '✅ Full Android keyboard', competitor: '❌ Desktop only' },
            { name: 'Filler Word Removal', zavi: '✅ Automatic', competitor: '✅ Automatic' },
            { name: 'Grammar Correction', zavi: '✅ Automatic', competitor: '✅ Automatic' },
            { name: 'Languages', zavi: '100+ with auto-detection', competitor: '~30 languages' },
            { name: 'Real-Time Translation', zavi: '✅ Speak in one language, output in another', competitor: '❌ No translation' },
            { name: 'Voice Commands', zavi: '🔜 Coming soon', competitor: '✅ Advanced command mode' },
            { name: 'Works in All Apps', zavi: '✅ System-wide keyboard', competitor: '✅ System-wide on desktop' },
            { name: 'Free Tier', zavi: '✅ Generous free plan', competitor: '❌ No free tier' },
            { name: 'Privacy', zavi: 'Audio deleted immediately', competitor: 'Cloud processing' },
            { name: 'RAM Usage', zavi: 'Lightweight', competitor: '1GB+' },
        ],
        zaviAdvantages: [
            'Works on mobile (Android) — Wispr Flow is desktop-only',
            '100+ languages with real-time translation vs ~30 languages',
            'Half the price: $4.99/mo vs $10/mo',
            'Generous free plan available',
            'Lightweight — minimal RAM usage',
            'Privacy-first: audio deleted immediately after processing',
        ],
        competitorAdvantages: [
            'Advanced voice command mode for editing text by voice',
            'Deep contextual editing (edit specific paragraphs, change tone)',
            'More mature desktop integration',
            'Longer dictation session memory',
        ],
        faqItems: [
            {
                question: 'Is Zavi AI cheaper than Wispr Flow?',
                answer: 'Yes. Zavi AI offers a free plan and a Pro plan at $4.99/month ($39.99/year). Wispr Flow costs $10/month with no free tier. Zavi is 50% cheaper at the Pro level.',
            },
            {
                question: 'Does Wispr Flow work on Android?',
                answer: 'No. Wispr Flow is desktop-only (macOS and Windows). Zavi AI works on Android as a system-wide keyboard, plus macOS, Windows, and Linux.',
            },
            {
                question: 'Which has better filler word removal?',
                answer: 'Both Zavi AI and Wispr Flow offer excellent AI-powered filler word removal. Both automatically strip "um," "uh," "like," and other verbal fillers from your speech.',
            },
            {
                question: 'Can Wispr Flow translate speech in real-time?',
                answer: 'No. Wispr Flow does not offer real-time translation. Zavi AI supports speaking in one language and outputting in another across 100+ languages.',
            },
        ],
    },
    {
        slug: 'gboard',
        competitorName: 'Google Gboard',
        competitorDescription: 'Gboard is Google\'s free keyboard app for Android and iOS with built-in voice typing, swipe typing, GIF search, and Google Search integration.',
        metaTitle: 'Zavi AI vs Gboard: Why AI Voice Typing Beats Default Dictation (2026)',
        metaDescription: 'Compare Zavi AI and Google Gboard voice typing. Gboard transcribes word-for-word; Zavi removes fillers, fixes grammar, and produces professional text. See the full comparison.',
        heroTitle: 'Zavi AI vs Google Gboard',
        heroSubtitle: 'Gboard is free and reliable. But its voice typing is stuck in 2015. Here\'s what you get when voice typing actually uses AI.',
        verdict: 'Zavi AI is the clear upgrade for anyone who wants professional-quality text from voice. Gboard is fine for basic, quick transcription.',
        verdictDetail: 'Gboard\'s voice typing is a basic transcription engine — it captures your words verbatim, including every "um," "uh," and grammatical error. Zavi AI is fundamentally different: it uses AI to extract your intent and produce clean, professional text. The difference is like comparing a tape recorder to an executive assistant. If you send more than 10 messages or emails per day, Zavi Pro at $4.99/month pays for itself in the first hour of time saved.',
        features: [
            { name: 'Price', zavi: 'Free / $4.99/mo Pro', competitor: 'Free' },
            { name: 'AI Filler Removal', zavi: '✅ Automatic (um, uh, like, you know)', competitor: '❌ Transcribes fillers verbatim' },
            { name: 'Grammar Correction', zavi: '✅ Automatic', competitor: '❌ No grammar correction' },
            { name: 'Sentence Restructuring', zavi: '✅ Converts speech grammar to written grammar', competitor: '❌ Verbatim transcription only' },
            { name: 'Effective Speed', zavi: '~150 WPM (no editing needed)', competitor: '~80 WPM (after editing fillers/grammar)' },
            { name: 'Languages', zavi: '100+ with auto-detection', competitor: '50+ languages' },
            { name: 'Real-Time Translation', zavi: '✅ Speak in one language, output in another', competitor: '❌ No voice translation' },
            { name: 'Swipe Typing', zavi: '🔜 Coming soon', competitor: '✅ Excellent swipe typing' },
            { name: 'GIF & Emoji Search', zavi: '❌ Voice-focused', competitor: '✅ Built-in GIF/emoji search' },
            { name: 'Google Search Integration', zavi: '❌ Not included', competitor: '✅ Search from keyboard' },
            { name: 'Text Prediction', zavi: 'Basic', competitor: '✅ Advanced next-word prediction' },
            { name: 'Privacy', zavi: 'Audio deleted immediately', competitor: 'Sent to Google servers' },
        ],
        zaviAdvantages: [
            'AI removes filler words automatically — Gboard transcribes everything verbatim',
            'Automatic grammar and punctuation correction',
            'Professional-quality text output, no editing needed',
            '~150 WPM effective speed vs ~80 WPM with Gboard (after editing)',
            'Real-time translation across 100+ languages',
            'Privacy-first: audio deleted immediately',
        ],
        competitorAdvantages: [
            'Completely free with no limitations',
            'Excellent swipe/gesture typing',
            'Built-in GIF search, emoji search, Google Search',
            'Advanced next-word prediction',
            'Pre-installed on most Android devices',
            'Deep Google ecosystem integration',
        ],
        faqItems: [
            {
                question: 'Why should I switch from Gboard to Zavi AI?',
                answer: 'If you primarily use voice typing, Zavi AI is a massive upgrade over Gboard. Gboard transcribes your speech word-for-word, including filler words and grammar errors. Zavi uses AI to remove fillers, fix grammar, and produce clean professional text — effectively making voice typing 2x faster because you skip the editing step.',
            },
            {
                question: 'Is Gboard voice typing good enough?',
                answer: 'For quick, casual messages where accuracy doesn\'t matter much, Gboard is fine. But for professional emails, work messages, or any text longer than a sentence, Gboard\'s verbatim transcription requires significant editing. Zavi eliminates this editing step entirely.',
            },
            {
                question: 'Does Zavi have swipe typing like Gboard?',
                answer: 'Zavi is currently focused on voice-first input. Swipe typing is on the roadmap. If you need both voice and swipe typing, you can easily switch between Zavi and Gboard as needed — Android supports multiple keyboards.',
            },
            {
                question: 'Can I use both Gboard and Zavi AI?',
                answer: 'Yes! Android allows multiple keyboards. You can set Zavi as your default for voice typing and switch to Gboard for swipe typing or GIF search when needed.',
            },
        ],
    },
    {
        slug: 'willow',
        competitorName: 'Willow Voice',
        competitorDescription: 'Willow is a macOS-only voice dictation app focused on ultra-low latency local processing, offering near-instant transcription without cloud dependency.',
        metaTitle: 'Zavi AI vs Willow: Cross-Platform AI vs Ultra-Fast Local Dictation (2026)',
        metaDescription: 'Compare Zavi AI and Willow voice dictation. Willow offers 200ms local processing on Mac; Zavi offers cross-platform support, 100+ languages, and real-time translation. Full comparison.',
        heroTitle: 'Zavi AI vs Willow',
        heroSubtitle: 'Willow is blazing fast on Mac. Zavi works everywhere. Here\'s how to choose between speed and versatility.',
        verdict: 'Zavi AI wins for cross-platform users and multilingual professionals. Willow excels for Mac-only users who prioritize ultra-low latency.',
        verdictDetail: 'If you work exclusively on a Mac and want the absolute fastest transcription experience with zero cloud dependency, Willow\'s 200ms local processing is unbeatable. But if you need voice typing on your phone, work across multiple platforms, communicate in multiple languages, or want real-time translation, Zavi AI is far more versatile. Zavi supports Android, macOS, Windows, and Linux, offers 100+ languages, and costs less. Most professionals need voice typing on both mobile and desktop, which makes Zavi the more practical choice.',
        features: [
            { name: 'Price', zavi: 'Free / $4.99/mo Pro', competitor: '$8/month' },
            { name: 'Platforms', zavi: 'Android, macOS, Windows, Linux', competitor: 'macOS only' },
            { name: 'Mobile Support', zavi: '✅ Full Android keyboard', competitor: '❌ No mobile' },
            { name: 'Processing', zavi: 'Cloud (fast)', competitor: 'Local (ultra-fast ~200ms)' },
            { name: 'Latency', zavi: '<2 seconds', competitor: '~200ms' },
            { name: 'Filler Removal', zavi: '✅ Automatic', competitor: '✅ In AI mode' },
            { name: 'Grammar Correction', zavi: '✅ Automatic', competitor: '✅ In AI mode' },
            { name: 'Languages', zavi: '100+ with auto-detection', competitor: '~20 languages' },
            { name: 'Real-Time Translation', zavi: '✅ Speak in one language, output in another', competitor: '❌ No translation' },
            { name: 'Offline Mode', zavi: '❌ Requires internet', competitor: '✅ Fully offline' },
            { name: 'Privacy', zavi: 'Audio deleted immediately after cloud processing', competitor: '✅ All processing on-device' },
            { name: 'Free Tier', zavi: '✅ Generous free plan', competitor: '❌ Paid only' },
        ],
        zaviAdvantages: [
            'Works on Android, macOS, Windows, AND Linux — Willow is Mac-only',
            '100+ languages vs ~20 languages',
            'Real-time translation (speak in Hindi, get English text)',
            'Cheaper: $4.99/mo vs $8/mo, plus a free tier',
            'System-wide keyboard on Android',
        ],
        competitorAdvantages: [
            'Ultra-low latency (~200ms) local processing',
            'Works fully offline — no internet needed',
            'All processing stays on-device (maximum privacy)',
            'No cloud dependency',
        ],
        faqItems: [
            {
                question: 'Is Willow faster than Zavi AI?',
                answer: 'Yes, Willow\'s local processing is faster at ~200ms latency vs Zavi\'s ~2 seconds. However, Zavi\'s cloud processing enables more advanced AI cleanup, 100+ language support, and real-time translation that local processing cannot match.',
            },
            {
                question: 'Does Willow work on Android or Windows?',
                answer: 'No. Willow is exclusively available on macOS. Zavi AI works on Android, macOS, Windows, and Linux.',
            },
            {
                question: 'Which is more private, Zavi or Willow?',
                answer: 'Willow is more private by design since all processing happens locally on your Mac — no data leaves your device. Zavi processes audio in the cloud but immediately deletes it after generating text. Neither stores your voice data.',
            },
            {
                question: 'Can I use Zavi AI offline?',
                answer: 'No. Zavi requires an internet connection for cloud-based AI processing. This enables advanced features like 100+ language support and real-time translation. Willow works fully offline.',
            },
        ],
    },
    {
        slug: 'otter-ai',
        competitorName: 'Otter.ai',
        competitorDescription: 'Otter.ai is an AI meeting assistant and transcription tool that records, transcribes, and summarizes meetings, lectures, and conversations.',
        metaTitle: 'Zavi AI vs Otter.ai: Voice Keyboard vs Meeting Transcription (2026)',
        metaDescription: 'Compare Zavi AI and Otter.ai. Zavi is an AI voice typing keyboard for everyday text input; Otter.ai is a meeting transcription tool. See which is right for your needs.',
        heroTitle: 'Zavi AI vs Otter.ai',
        heroSubtitle: 'These tools sound similar but solve completely different problems. Here\'s which one you actually need.',
        verdict: 'They\'re complementary, not competitors. Use Zavi for typing by voice in apps. Use Otter for recording and transcribing meetings.',
        verdictDetail: 'Zavi AI and Otter.ai serve fundamentally different use cases. Zavi is a voice typing keyboard — it replaces your keyboard so you can type by voice in WhatsApp, Gmail, Slack, and every other app in real-time. Otter.ai is a meeting tool — it records and transcribes meetings, lectures, and conversations into searchable notes. If you want to type faster by speaking, use Zavi. If you want to transcribe and summarize meetings, use Otter. Many professionals use both.',
        features: [
            { name: 'Price', zavi: 'Free / $4.99/mo Pro', competitor: 'Free / $16.99/mo Pro' },
            { name: 'Primary Use', zavi: 'Voice typing keyboard (replace typing)', competitor: 'Meeting transcription & notes' },
            { name: 'Real-Time Typing', zavi: '✅ Type in any app by voice', competitor: '❌ Not a keyboard' },
            { name: 'Meeting Recording', zavi: '❌ Not a meeting tool', competitor: '✅ Records & transcribes meetings' },
            { name: 'Works in Every App', zavi: '✅ System-wide keyboard', competitor: '❌ Standalone app only' },
            { name: 'Filler Removal', zavi: '✅ Automatic', competitor: '⚠️ In summaries only' },
            { name: 'Grammar Correction', zavi: '✅ Automatic', competitor: '❌ Verbatim transcription' },
            { name: 'AI Summaries', zavi: '❌ Not included', competitor: '✅ Meeting summaries' },
            { name: 'Speaker ID', zavi: '❌ Single user', competitor: '✅ Multi-speaker detection' },
            { name: 'Languages', zavi: '100+ languages', competitor: 'English primarily' },
            { name: 'Translation', zavi: '✅ Real-time', competitor: '❌ No' },
            { name: 'Platforms', zavi: 'Android, macOS, Windows, Linux', competitor: 'Web, iOS, Android' },
        ],
        zaviAdvantages: [
            'Works as a keyboard in every app — Otter is a standalone app',
            'Real-time voice typing for messages, emails, and documents',
            'AI grammar correction and filler removal in real-time',
            '100+ languages with real-time translation',
            'Much cheaper: $4.99/mo vs $16.99/mo',
        ],
        competitorAdvantages: [
            'Records and transcribes full meetings',
            'AI meeting summaries with action items',
            'Multi-speaker identification',
            'Integrates with Zoom, Google Meet, Microsoft Teams',
            'Searchable conversation archive',
        ],
        faqItems: [
            {
                question: 'Can Otter.ai be used as a keyboard?',
                answer: 'No. Otter.ai is a meeting transcription tool, not a keyboard. It cannot replace your keyboard for typing in WhatsApp, Gmail, or other apps. Zavi AI is designed specifically as a voice typing keyboard that works in every app.',
            },
            {
                question: 'Can Zavi AI record meetings?',
                answer: 'No. Zavi AI is a voice typing keyboard for real-time text input. It does not record or transcribe meetings. For meeting transcription, Otter.ai is a better choice.',
            },
            {
                question: 'Should I use Zavi or Otter?',
                answer: 'It depends on your needs. Use Zavi if you want to type faster by speaking in everyday apps (email, messaging, documents). Use Otter if you need to record and transcribe meetings. Many professionals use both — Zavi for daily typing and Otter for meetings.',
            },
        ],
    },
];

export function getComparison(slug: string): ComparisonData | undefined {
    return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
    return comparisons.map((c) => c.slug);
}
