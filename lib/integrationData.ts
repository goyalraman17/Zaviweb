export interface Integration {
    id: string;
    name: string;
    slug: string;
    color: string;
    category: string;
    shortDesc: string;
    fullDesc: string;
    keyFeatures: string[];
    useCases: string[];
    faqs: { question: string; answer: string }[];
    metaTitle: string;
    metaDesc: string;
}

export const integrations: Integration[] = [
    {
        id: "gmail",
        name: "Gmail",
        slug: "gmail",
        color: "bg-red-50 text-red-600 border-red-100",
        category: "Communication",
        shortDesc: "Write, reply, and manage your emails hands-free on Android.",
        fullDesc: "Zavi AI transforms how you use Gmail on your Android device. Instead of tediously typing out long emails or fighting with autocorrect on a small keyboard, you can simply speak your thoughts. Zavi's advanced AI engine instantly transcribes, formats, and polishes your words into professional emails. Whether you're commuting, walking, or just prefer speaking, Zavi gives you the superpower to clear your inbox at 3x speed.",
        keyFeatures: [
            "Real-time voice-to-text accurately tuned for professional vocabulary.",
            "Instant grammar correction and professional tone rewriting.",
            "Works natively sitting perfectly inside the Gmail app on Android.",
            "Seamlessly insert recipient names, signatures, and boilerplate text using voice snippets."
        ],
        useCases: [
            "Replying to urgent meeting requests while walking.",
            "Drafting detailed project updates without touching the keyboard.",
            "Dictating complex, jargon-heavy client emails with 0 corrections."
        ],
        faqs: [
            {
                question: "Does Zavi work perfectly inside the Gmail Android app?",
                answer: "Yes, Zavi AI keyboard replaces your default Android keyboard, letting you dictate natively inside the Gmail compose window without switching apps."
            },
            {
                question: "Can it understand my specific industry terms?",
                answer: "Absolutely. Zavi features a Custom Dictionary where you can add acronyms, client names, and jargon to ensure 100% accuracy every time you email."
            }
        ],
        metaTitle: "Gmail Voice Typing Keyboard App for Android | Zavi AI",
        metaDesc: "Write and reply to Gmail emails 3x faster using the Zavi AI voice keyboard for Android. Experience perfect grammar and 0-latency dictation."
    },
    {
        id: "slack",
        name: "Slack",
        slug: "slack",
        color: "bg-purple-50 text-purple-600 border-purple-100",
        category: "Communication",
        shortDesc: "Post updates, reply to threads, and DM colleagues via voice.",
        fullDesc: "Keep your team updated without slowing down your workflow. With Zavi AI's deep integration into the Android keyboard, you can rapidly fire off Slack updates, reply to active threads, and shoot direct messages purely by voice. Zavi understands conversational contexts and auto-adds the perfect emojis, making you the fastest communicator on your team.",
        keyFeatures: [
            "Ultra-fast dictation for high-speed Slack threading.",
            "Emoji Auto-Location automatically adds the right emojis to your messages.",
            "Cycle between Casual, Professional, or Witty tones based on the channel.",
            "Never lose a thought with Infinite Stream Rotation holding up to 5 minutes of speech."
        ],
        useCases: [
            "Sending daily standup updates while making your morning coffee.",
            "Providing long, nuanced feedback in a crowded thread quickly.",
            "Firing off quick DMs with perfect spelling and zero typos."
        ],
        faqs: [
            {
                question: "Will Zavi accidentally send messages before I'm ready?",
                answer: "No. Zavi seamlessly outputs the text into your Slack input field. You review the perfectly transcribed text before hitting send yourself."
            },
            {
                question: "How does it handle Slack specific formatting?",
                answer: "Zavi understands commands like 'new paragraph' or 'create a bulleted list', formatting your Slack messages beautifully on the fly."
            }
        ],
        metaTitle: "Best Voice to Text Keyboard for Slack Android | Zavi AI",
        metaDesc: "Send Slack messages, reply to threads, and manage channels using your voice on Android. Download the Zavi AI dictation keyboard today."
    },
    {
        id: "whatsapp",
        name: "WhatsApp",
        slug: "whatsapp",
        color: "bg-green-50 text-green-600 border-green-100",
        category: "Messaging",
        shortDesc: "Convert voice notes to perfectly formatted text in WhatsApp.",
        fullDesc: "Stop sending annoying voice notes that your friends and colleagues can't listen to in public. Use Zavi AI on Android to dictate your thoughts perfectly into the WhatsApp chat box. Whether it's a quick reply or a long story, Zavi ensures your words are accurately transcribed in multiple languages, complete with punctuation.",
        keyFeatures: [
            "Live Translation across 15+ global languages instantly.",
            "Context-aware punctuation puts commas and periods exactly where they belong.",
            "Casual Tone engine perfectly matches WhatsApp conversations.",
            "Zero-latency processing so you never pause your conversation."
        ],
        useCases: [
            "Replying to group chats while your hands are full.",
            "Translating your English speech into Spanish text to message overseas clients instantly.",
            "Dictating long, emotional updates accurately without tiring your thumbs."
        ],
        faqs: [
            {
                question: "Is this better than WhatsApp's built-in voice notes?",
                answer: "Yes. Voice notes force the other person to listen. Zavi writes your voice out as perfect text, making it accessible and searchable for everyone in the chat."
            },
            {
                question: "Can I use multiple languages?",
                answer: "Yes, Zavi supports live translation natively inside WhatsApp. Speak in English, output in Hindi, Spanish, French, and more."
            }
        ],
        metaTitle: "WhatsApp Voice Typing App for Android | Zavi AI Keyboard",
        metaDesc: "Dictate messages effortlessly in WhatsApp on your Android phone. Experience flawless dictation, instant translations, and smart emojis with Zavi AI."
    },
    {
        id: "notion",
        name: "Notion",
        slug: "notion",
        color: "bg-gray-50 text-gray-900 border-gray-200",
        category: "Productivity",
        shortDesc: "Brainstorm, document, and outline in Notion using pure voice.",
        fullDesc: "Unshackle your creativity on Android. Notion is brilliant for organizing thoughts, but typing long documents on a phone is miserable. Zavi AI acts as your personal scribe. Speak your ideas out loud, let the AI structure them, and drop perfectly formatted text straight into your Notion pages, blocks, and databases.",
        keyFeatures: [
            "Smart formatting commands for headers, lists, and quotes.",
            "Magic Wand to instantly rewrite and summarize existing Notion text blocks.",
            "Infinite 5-minute sessions for uninterrupted brain dumps.",
            "Cloud History Vault recovers any lost dictated drafts."
        ],
        useCases: [
            "Brainstorming blog posts or meeting agendas on the go.",
            "Rapidly logging meeting action items into a Notion database.",
            "Fleshing out comprehensive project requirements via voice."
        ],
        faqs: [
            {
                question: "Does it support markdown formatting?",
                answer: "Yes, you can dictate structural commands, or use the Magic Wand post-transcription to instruct the AI to 'format this as a bulleted markdown list'."
            },
            {
                question: "Can I use it for heavy data entry?",
                answer: "Absolutely. With Custom Dictionary and Snippets, you can automate repetitive string entries into your Notion properties."
            }
        ],
        metaTitle: "Notion Voice Dictation Keyboard for Android | Zavi AI",
        metaDesc: "Write Notion docs, brainstorm ideas, and manage databases via voice on your Android device. Zavi is the smartest AI keyboard for Notion."
    },
    {
        id: "github",
        name: "GitHub",
        slug: "github",
        color: "bg-slate-50 text-slate-800 border-slate-200",
        category: "Development",
        shortDesc: "Review PRs, log issues, and reply to comments hands-free.",
        fullDesc: "Developers on the move rely on Zavi AI for Android to interact with GitHub effortlessly. Code reviews on a mobile device are tough, giving detailed feedback is even tougher. With Zavi, you can dictate long-form architectural feedback, log descriptive issues, and manage team updates using technical jargon that is captured with 100% accuracy.",
        keyFeatures: [
            "Custom Dictionary locks in complex technical terminology, API names, and syntax.",
            "Action-oriented tone profiles ensure concise, professional feedback.",
            "Live Web integration to quickly pull in documentation references while commenting.",
            "Instant formatting for code blocks and blockquotes."
        ],
        useCases: [
            "Providing deep, nuanced feedback on a Pull Request while away from your desk.",
            "Dictating complex bug recreation steps into a GitHub issue perfectly.",
            "Answering technical queries from junior devs in thread comments rapidly."
        ],
        faqs: [
            {
                question: "Will it understand my programming languages?",
                answer: "Yes, Zavi's underlying LLM natively understands development context, and you can enforce strict spelling for custom variables using your Custom Dictionary."
            },
            {
                question: "How do I format code blocks?",
                answer: "You can say 'start code block' and 'end code block', or simply dictate the logic and use the Magic Wand feature to prompt 'format as a python block'."
            }
        ],
        metaTitle: "GitHub Voice Typing for Code Reviews on Android | Zavi AI",
        metaDesc: "Review PRs, write issues, and comment on GitHub repositories using advanced AI voice dictation on Android. Highly accurate technical vocabulary handling."
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        slug: "linkedin",
        color: "bg-blue-50 text-blue-700 border-blue-100",
        category: "Social",
        shortDesc: "Draft professional posts and network effortlessly by speaking.",
        fullDesc: "Build your personal brand without getting bogged down by mobile typing. Zavi AI gives Android users the power to dictate compelling LinkedIn posts, thoughtful comments, and professional direct messages. Our Professional Profile Tone ensures you always sound polished and authoritative.",
        keyFeatures: [
            "One-tap 'Professional Tone' enforces high-quality corporate communication.",
            "Magic Wand formatting to break up long text into readable, engaging paragraphs.",
            "Emoji Auto-Location injects tasteful, work-appropriate icons.",
            "Seamless integration directly into the LinkedIn Android App text fields."
        ],
        useCases: [
            "Dictating a thought-leadership post right after a conference session.",
            "Sending personalized, high-quality audio-to-text connection requests.",
            "Replying thoughtfully to network comments while commuting."
        ],
        faqs: [
            {
                question: "Can it make my posts sound more engaging?",
                answer: "Yes! The Magic Wand feature can rewrite your raw thoughts into an engaging social media post format tailored for LinkedIn audiences."
            },
            {
                question: "Does it work in LinkedIn Messages?",
                answer: "Zavi works natively anywhere you can type on your Android, including LinkedIn DMs, post creators, and comment boxes."
            }
        ],
        metaTitle: "LinkedIn Voice Typing App for Networking on Android | Zavi AI",
        metaDesc: "Write LinkedIn posts, network, and comment like a pro using Zavi's AI voice typing keyboard on Android. Perfect grammar and professional tone included."
    }
];
