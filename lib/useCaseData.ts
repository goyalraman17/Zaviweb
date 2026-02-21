export interface UseCase {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    icon: string;
    problem: string;
    solution: string;
    howItWorks: string[];
    benefits: { title: string; description: string }[];
    exampleBefore: string;
    exampleAfter: string;
    targetAudience: string[];
    faqItems: { question: string; answer: string }[];
    relatedUseCases: string[];
}

export const useCases: UseCase[] = [
    {
        slug: 'email',
        title: 'Voice Typing for Email',
        metaTitle: 'Voice Typing for Email — Draft Emails 4x Faster with Zavi AI',
        metaDescription: 'Use Zavi AI to draft professional emails by voice. Speak naturally and get polished, grammar-perfect emails in Gmail, Outlook, and every email app. Free download.',
        heroTitle: 'Draft Professional Emails by Voice',
        heroSubtitle: 'Speak naturally. Zavi removes filler words, fixes grammar, and delivers ready-to-send emails in seconds.',
        icon: '✉️',
        problem: 'The average professional sends 40+ emails per day and spends 2.5 hours writing them. Typing on mobile is slow (38 WPM), and even desktop typing (40 WPM) can\'t keep up with the pace of modern communication. The result: rushed, error-filled emails or a growing inbox of unread messages.',
        solution: 'Zavi AI lets you dictate emails at 150 WPM — 4x faster than typing. The AI automatically removes filler words, fixes grammar, adds proper punctuation, and restructures sentences for clarity. Your emails sound polished and professional, even when you\'re dictating while walking between meetings.',
        howItWorks: [
            'Open Gmail, Outlook, or any email app',
            'Tap the Zavi microphone icon on your keyboard',
            'Speak your email naturally — include any "umms" or pauses',
            'Zavi delivers clean, professional text ready to send',
        ],
        benefits: [
            { title: '4x Faster', description: 'Draft a 200-word email in under 90 seconds by voice instead of 5 minutes typing.' },
            { title: 'Zero Editing', description: 'AI removes filler words and fixes grammar. No proofreading needed.' },
            { title: 'Works Everywhere', description: 'Gmail, Outlook, Apple Mail, Yahoo — any email app on any device.' },
            { title: 'Professional Tone', description: 'AI ensures your emails sound polished and well-structured, even from casual speech.' },
        ],
        exampleBefore: 'Um, hey John, so I was thinking, uh, we should probably like meet up next Tuesday, you know, to go over the Q3 numbers and um, figure out what\'s going on with the budget situation.',
        exampleAfter: 'Hi John, I\'d like to schedule a meeting next Tuesday to review the Q3 numbers and discuss the budget situation. Does that work for you?',
        targetAudience: ['Sales professionals', 'Executives', 'Remote workers', 'Customer support teams', 'Anyone who writes 10+ emails/day'],
        faqItems: [
            { question: 'Does Zavi work in Gmail?', answer: 'Yes. Zavi works as a system-wide keyboard, so it works in Gmail, Outlook, Apple Mail, Yahoo Mail, and every other email app on your device.' },
            { question: 'Can I dictate long emails?', answer: 'Yes. Zavi handles emails of any length. The AI maintains context and coherence even for multi-paragraph messages.' },
            { question: 'Will my emails sound natural?', answer: 'Yes. Zavi\'s Zero-Prompting AI understands professional communication norms and produces text that reads naturally — not robotic.' },
        ],
        relatedUseCases: ['whatsapp', 'slack', 'students'],
    },
    {
        slug: 'whatsapp',
        title: 'Voice Typing for WhatsApp',
        metaTitle: 'Voice Typing for WhatsApp — Send Polished Messages by Voice | Zavi AI',
        metaDescription: 'Use Zavi AI to send polished WhatsApp messages by voice. No more voice notes — get clean, readable text messages from natural speech. Free download.',
        heroTitle: 'WhatsApp Messages, Without the Typing',
        heroSubtitle: 'Stop sending voice notes. Speak naturally and send clean, readable text messages instead.',
        icon: '💬',
        problem: 'Voice notes on WhatsApp are inconvenient for recipients — they can\'t skim them, search them, or read them quietly. But typing long messages on a phone is painfully slow. You\'re stuck choosing between convenience for yourself (voice notes) or convenience for the recipient (typed text).',
        solution: 'Zavi gives you the best of both worlds. Speak as naturally as you would for a voice note, and Zavi converts it to clean, polished text. Your recipients get readable messages they can search and skim, while you get the speed of voice input.',
        howItWorks: [
            'Open any WhatsApp chat',
            'Tap the Zavi microphone icon on your keyboard',
            'Speak your message naturally',
            'Clean, formatted text appears — tap send',
        ],
        benefits: [
            { title: 'No More Voice Notes', description: 'Send readable text messages at the speed of speaking. Best of both worlds.' },
            { title: 'Polished Messages', description: 'AI removes "umms" and fixes grammar. Your messages look intentional.' },
            { title: 'Multilingual', description: 'Speak in Hindi, get text in English — or any of 100+ language combinations.' },
            { title: 'Group Chat Ready', description: 'Quickly respond to group chats without slow thumb typing.' },
        ],
        exampleBefore: 'Hey so like I\'m running a bit late, um, probably gonna be there in like 20 minutes or so, you know, traffic is really bad today.',
        exampleAfter: 'Hey, I\'m running about 20 minutes late — traffic is really bad today. See you soon!',
        targetAudience: ['Mobile-first communicators', 'Multilingual users', 'Busy professionals', 'Anyone tired of voice notes'],
        faqItems: [
            { question: 'Does Zavi replace the WhatsApp keyboard?', answer: 'Zavi replaces your device\'s system keyboard, so it works in WhatsApp and every other app. You can switch between Zavi and your default keyboard anytime.' },
            { question: 'Can I speak in Hindi and type in English?', answer: 'Yes. Zavi supports real-time translation between 100+ languages. Speak in Hindi, get polished English text — or any language combination.' },
            { question: 'Does Zavi work in WhatsApp groups?', answer: 'Yes. Zavi works wherever there\'s a text input field. Type in 1-on-1 chats, groups, WhatsApp Business, and WhatsApp Status.' },
        ],
        relatedUseCases: ['email', 'slack', 'accessibility'],
    },
    {
        slug: 'students',
        title: 'Voice Typing for Students',
        metaTitle: 'Voice Typing for Students — Write Essays 4x Faster | Zavi AI',
        metaDescription: 'Students: write essays, take lecture notes, and study faster with Zavi AI voice typing. Speak naturally, get polished academic text. Free for students.',
        heroTitle: 'Write Essays 4x Faster by Speaking',
        heroSubtitle: 'Turn lecture notes, essay drafts, and study materials into polished text — just by speaking.',
        icon: '🎓',
        problem: 'Students spend hours typing essays, transcribing lecture notes, and writing research papers. Writer\'s block makes it worse — staring at a blank page is demoralizing. On mobile, typing is even slower, making it hard to capture ideas on the go.',
        solution: 'Zavi AI lets students dictate their thoughts at the speed of speech. The AI cleans up your natural speaking into well-structured academic writing. It\'s like having a personal editor who works in real-time. Beat writer\'s block by just talking through your ideas.',
        howItWorks: [
            'Open Google Docs, Notion, Word, or any writing app',
            'Tap the Zavi microphone and start speaking your ideas',
            'Zavi converts your speech into structured, grammatically correct text',
            'Review, refine, and submit your work',
        ],
        benefits: [
            { title: 'Beat Writer\'s Block', description: 'Just talk through your ideas. It\'s easier to speak than to stare at a blank page.' },
            { title: '4x Faster Drafting', description: 'A 1,000-word essay takes 25 minutes typing — or 7 minutes speaking with Zavi.' },
            { title: 'Better Grammar', description: 'AI fixes grammar and sentence structure automatically. Fewer red marks.' },
            { title: 'Study Anywhere', description: 'Dictate notes while walking, commuting, or between classes on your phone.' },
        ],
        exampleBefore: 'So basically the French Revolution started because, um, there was a lot of inequality, like the third estate was paying all the taxes and the, uh, nobility and clergy weren\'t paying anything, which was really unfair.',
        exampleAfter: 'The French Revolution was primarily driven by deep social inequality. The Third Estate bore the entire tax burden while the nobility and clergy were exempt, creating widespread resentment among the common people.',
        targetAudience: ['University students', 'High school students', 'Graduate researchers', 'ESL students', 'Students with disabilities'],
        faqItems: [
            { question: 'Is Zavi free for students?', answer: 'Zavi offers a generous free plan that\'s perfect for daily student use. Pro ($7.99/month) unlocks unlimited usage for heavy essay-writing periods.' },
            { question: 'Can Zavi help with academic writing?', answer: 'Yes. Zavi\'s AI restructures casual speech into clear, well-structured prose suitable for academic assignments. It fixes grammar, punctuation, and sentence flow automatically.' },
            { question: 'Does Zavi work in Google Docs?', answer: 'Yes. Zavi works in Google Docs, Microsoft Word, Notion, Obsidian, and every app with a text input field.' },
        ],
        relatedUseCases: ['email', 'accessibility', 'whatsapp'],
    },
    {
        slug: 'accessibility',
        title: 'Voice Typing for RSI & Carpal Tunnel',
        metaTitle: 'Voice Typing for RSI & Carpal Tunnel — Hands-Free Typing | Zavi AI',
        metaDescription: 'Reduce hand strain with Zavi AI voice typing. Ideal for RSI, carpal tunnel, arthritis, and mobility limitations. Type hands-free with AI-polished text.',
        heroTitle: 'Type Without Your Hands',
        heroSubtitle: 'Professional-quality writing without touching a keyboard. Designed for people with RSI, carpal tunnel, and mobility limitations.',
        icon: '♿',
        problem: 'Millions of professionals suffer from repetitive strain injury (RSI), carpal tunnel syndrome, arthritis, or other conditions that make typing painful or impossible. Traditional voice typing produces unusable text full of filler words that requires extensive editing — defeating the purpose of hands-free input.',
        solution: 'Zavi AI eliminates the editing phase entirely. Speak naturally, and the AI produces clean, professional text with zero hand involvement. No going back to fix filler words. No correcting grammar. No restructuring sentences. Just speak and send.',
        howItWorks: [
            'Set Zavi as your default keyboard or launch the desktop app',
            'Tap the microphone (or use keyboard shortcut on desktop)',
            'Speak naturally — don\'t worry about filler words or pauses',
            'Clean, error-free text appears instantly. No editing needed.',
        ],
        benefits: [
            { title: 'Zero Hand Strain', description: 'Dictate emails, messages, and documents without touching a keyboard.' },
            { title: 'No Editing Required', description: 'Unlike basic dictation, Zavi\'s AI produces ready-to-send text. No going back to fix errors.' },
            { title: 'All Day Productivity', description: 'Maintain your output level even on high-pain days. Voice is always available.' },
            { title: 'Every App, Every Platform', description: 'Works in email, Slack, Docs, WhatsApp — across Android, iOS, Mac, Windows, and Linux.' },
        ],
        exampleBefore: 'Um, I need to, uh, let the team know that I\'m going to be, like, working from home tomorrow because of my, um, doctor\'s appointment in the morning.',
        exampleAfter: 'I\'ll be working from home tomorrow due to a morning doctor\'s appointment. I\'ll be online by noon.',
        targetAudience: ['People with RSI', 'Carpal tunnel sufferers', 'Arthritis patients', 'People with mobility limitations', 'Occupational therapy patients'],
        faqItems: [
            { question: 'Is Zavi better than Dragon for accessibility?', answer: 'For general writing and communication, yes. Zavi costs $7.99/month vs Dragon\'s $150-699+, works on all platforms including mobile, requires no voice training, and produces cleaner text with AI cleanup. Dragon is still better for specialized medical/legal dictation.' },
            { question: 'Can I use Zavi all day without limits?', answer: 'The free plan has daily limits. Pro ($7.99/month) offers unlimited usage — essential for users who rely on voice typing as their primary input method.' },
            { question: 'Does Zavi work with screen readers?', answer: 'Zavi is designed to work alongside assistive technologies. The keyboard integrates with your device\'s accessibility settings.' },
        ],
        relatedUseCases: ['email', 'students', 'slack'],
    },
    {
        slug: 'slack',
        title: 'Voice Typing for Slack & Teams',
        metaTitle: 'Voice Typing for Slack & Microsoft Teams — Message Faster | Zavi AI',
        metaDescription: 'Send polished Slack and Microsoft Teams messages by voice with Zavi AI. Stop typing, start speaking. AI removes filler words and fixes grammar automatically.',
        heroTitle: 'Slack & Teams Messages, at the Speed of Speech',
        heroSubtitle: 'Respond to workspace messages instantly. Speak naturally, send polished text.',
        icon: '💼',
        problem: 'Knowledge workers spend 2+ hours daily in Slack and Teams. Quick messages become a time sink when you\'re typing context switches, status updates, and project discussions. On mobile, it\'s even worse — thumb typing a multi-line Slack message is painfully slow.',
        solution: 'Zavi AI lets you respond to Slack and Teams messages at the speed of thought. Speak your response naturally, and Zavi delivers clean, professional text. Reply to channels, DMs, and threads without the typing bottleneck.',
        howItWorks: [
            'Open Slack, Microsoft Teams, Discord, or any workspace app',
            'Tap into a message field and activate Zavi mic',
            'Speak your response naturally',
            'Polished text appears — hit send',
        ],
        benefits: [
            { title: 'Instant Responses', description: 'Reply to Slack messages in seconds instead of minutes of typing.' },
            { title: 'Professional Tone', description: 'AI ensures your messages are clear and professional — no hasty typos.' },
            { title: 'Thread Context', description: 'Dictate detailed thread replies without the pain of long-form mobile typing.' },
            { title: 'Cross-Platform', description: 'Works in Slack, Teams, Discord, Zoom Chat, and every messaging platform.' },
        ],
        exampleBefore: 'Hey team, so um, I just finished reviewing the, uh, design mockups and I think they look really good, um, but we need to like, update the color palette on the, you know, the landing page section.',
        exampleAfter: 'Hey team, I just finished reviewing the design mockups — they look great. One thing: we need to update the color palette on the landing page section.',
        targetAudience: ['Remote workers', 'Product managers', 'Engineering teams', 'Customer success teams', 'Startup teams'],
        faqItems: [
            { question: 'Does Zavi work in Slack?', answer: 'Yes. Zavi works as a system-wide keyboard, so it works in Slack, Microsoft Teams, Discord, Zoom Chat, and every other messaging app on your device.' },
            { question: 'Can I use Zavi for Slack threads?', answer: 'Yes. Zavi works in any text input field — main channels, DMs, threads, and even Slack\'s search bar.' },
            { question: 'Does it work on Slack mobile?', answer: 'Yes. Zavi works on both mobile (Android/iOS) and desktop. On mobile, it replaces your keyboard. On desktop, it runs as a standalone app.' },
        ],
        relatedUseCases: ['email', 'whatsapp', 'students'],
    },
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
    return useCases.find(uc => uc.slug === slug);
}
