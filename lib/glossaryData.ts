export interface GlossaryTerm {
    slug: string;
    term: string;
    shortDefinition: string;
    fullDefinition: string;
    relatedTerms: string[];
    seeAlso: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
    {
        slug: 'voice-typing',
        term: 'Voice Typing',
        shortDefinition: 'Using speech recognition to convert spoken words into typed text on a device.',
        fullDefinition: 'Voice typing (also called voice-to-text, dictation, or speech typing) is the process of speaking into a device\'s microphone and having your speech converted to written text in real-time. Modern AI voice typing tools like Zavi AI go beyond basic transcription — they use AI to clean up filler words, fix grammar, add punctuation, and restructure sentences into professional-quality written text. Voice typing is typically 3-4x faster than thumb typing on mobile devices.',
        relatedTerms: ['Speech to Text', 'Dictation', 'Voice Recognition'],
        seeAlso: ['speech-to-text', 'dictation', 'filler-words'],
    },
    {
        slug: 'speech-to-text',
        term: 'Speech to Text',
        shortDefinition: 'Technology that converts spoken language into written text using automatic speech recognition (ASR).',
        fullDefinition: 'Speech-to-text (STT), also known as automatic speech recognition (ASR), is the technology that converts spoken language into written text. Traditional STT systems transcribe speech verbatim, including filler words and grammatical errors. Advanced AI-powered STT tools like Zavi AI add an intelligence layer that cleans up, restructures, and improves the transcribed text to produce professional-quality output. STT technology is used in voice assistants, dictation apps, meeting transcription, and accessibility tools.',
        relatedTerms: ['Voice Typing', 'ASR', 'Voice Recognition'],
        seeAlso: ['voice-typing', 'voice-recognition', 'asr'],
    },
    {
        slug: 'filler-words',
        term: 'Filler Words',
        shortDefinition: 'Verbal placeholders like "um," "uh," "like," "you know," and "so" that appear in natural speech.',
        fullDefinition: 'Filler words (also called speech disfluencies or verbal fillers) are sounds or words used to fill pauses in speech. Common examples include "um," "uh," "like," "you know," "so," "basically," and "I mean." While natural in spoken conversation, filler words make written text look unprofessional. AI voice typing tools like Zavi AI automatically detect and remove filler words during transcription, producing clean text that reads as if it were carefully typed.',
        relatedTerms: ['Speech Disfluency', 'Verbal Fillers', 'AI Cleanup'],
        seeAlso: ['voice-typing', 'ai-cleanup', 'zero-prompting'],
    },
    {
        slug: 'zero-prompting',
        term: 'Zero Prompting',
        shortDefinition: 'AI technology that understands user intent without explicit instructions or commands.',
        fullDefinition: 'Zero Prompting (sometimes called Zero-Prompt AI) is an AI paradigm where the system automatically understands the user\'s intent and context without requiring explicit prompts, commands, or instructions. In the context of voice typing, Zero Prompting means the AI automatically determines whether to clean up casual speech, fix grammar, remove fillers, or restructure sentences based on the context — without the user saying "fix my grammar" or "remove filler words." Zavi AI pioneered this approach for voice typing, making AI assistance invisible and natural.',
        relatedTerms: ['Prompt Engineering', 'Context Understanding', 'AI Automation'],
        seeAlso: ['voice-typing', 'ai-cleanup'],
    },
    {
        slug: 'dictation',
        term: 'Dictation',
        shortDefinition: 'The practice of speaking text aloud for it to be transcribed, either by a person or by software.',
        fullDefinition: 'Dictation is the practice of speaking text aloud so it can be transcribed into written form. Historically, dictation involved speaking to a human transcriber. Today, digital dictation uses speech recognition technology to convert speech to text automatically. Modern AI dictation apps go beyond simple transcription to offer real-time grammar correction, filler word removal, and intelligent formatting. Dictation is commonly used by professionals, students, writers, and people with physical disabilities that make typing difficult.',
        relatedTerms: ['Voice Typing', 'Transcription', 'Speech Recognition'],
        seeAlso: ['voice-typing', 'speech-to-text', 'voice-recognition'],
    },
    {
        slug: 'voice-recognition',
        term: 'Voice Recognition',
        shortDefinition: 'Technology that identifies and processes human speech, either to identify the speaker or to understand spoken words.',
        fullDefinition: 'Voice recognition (or speech recognition) is the technology that enables machines to receive, interpret, and process human voice input. There are two main types: speaker recognition (identifying who is speaking) and speech recognition (understanding what is being said). In voice typing applications, speech recognition converts spoken words into text. Modern voice recognition systems use deep learning neural networks trained on millions of hours of speech data, achieving accuracy rates above 95% in optimal conditions.',
        relatedTerms: ['Speech Recognition', 'ASR', 'NLP'],
        seeAlso: ['speech-to-text', 'asr', 'voice-typing'],
    },
    {
        slug: 'asr',
        term: 'ASR (Automatic Speech Recognition)',
        shortDefinition: 'The computational process of converting spoken language into text without human intervention.',
        fullDefinition: 'Automatic Speech Recognition (ASR) is the computational process of converting spoken language into written text. ASR systems use acoustic models (to understand sounds), language models (to predict words), and pronunciation models (to map sounds to words). Modern ASR uses end-to-end deep learning models like Whisper, DeepSpeech, and proprietary models from Google, Apple, and Amazon. Zavi AI builds on top of ASR by adding an AI post-processing layer that transforms raw transcription into polished, professional text.',
        relatedTerms: ['Speech to Text', 'Voice Recognition', 'Whisper'],
        seeAlso: ['speech-to-text', 'voice-recognition'],
    },
    {
        slug: 'ai-cleanup',
        term: 'AI Cleanup',
        shortDefinition: 'The process of using artificial intelligence to automatically correct, format, and polish text from speech.',
        fullDefinition: 'AI Cleanup refers to the post-processing step in advanced voice typing where artificial intelligence analyzes raw transcribed text and improves it for written communication. This includes removing filler words ("um," "uh"), correcting grammar and punctuation, restructuring spoken-style sentences into written-style sentences, adding proper capitalization, and formatting text appropriately. AI Cleanup is what distinguishes modern AI voice typing tools like Zavi AI from basic transcription services like Google Voice Typing — the output is ready to send without manual editing.',
        relatedTerms: ['Filler Word Removal', 'Grammar Correction', 'Post-Processing'],
        seeAlso: ['filler-words', 'zero-prompting', 'voice-typing'],
    },
    {
        slug: 'wpm',
        term: 'WPM (Words Per Minute)',
        shortDefinition: 'A measurement of typing or speaking speed, counting the number of words produced in one minute.',
        fullDefinition: 'Words Per Minute (WPM) is the standard measure of text input speed. Average thumb typing on a smartphone is about 35-40 WPM. Average desktop typing is 40-60 WPM. Professional typists reach 80-100 WPM. Speaking speed averages 130-150 WPM. When comparing voice typing to traditional typing, the effective WPM matters more than raw speed — this accounts for time spent editing. With AI voice typing tools like Zavi AI that require no editing, the effective WPM is approximately 150, making voice typing 3-4x faster than thumb typing.',
        relatedTerms: ['Typing Speed', 'Input Speed', 'Productivity'],
        seeAlso: ['voice-typing'],
    },
    {
        slug: 'real-time-translation',
        term: 'Real-Time Translation',
        shortDefinition: 'Technology that instantly translates speech from one language to written text in another language.',
        fullDefinition: 'Real-time translation (also called live translation or simultaneous translation) is the process of converting speech in one language into text in a different language with minimal delay. In voice typing, this means speaking in Hindi and getting English text output, or vice versa. Zavi AI supports real-time translation across 100+ languages, making it particularly valuable for multilingual professionals, travelers, and international teams. Unlike traditional translation apps, voice-to-text translation happens inline as you type, directly within the app you\'re using.',
        relatedTerms: ['Machine Translation', 'Multilingual', 'Language Detection'],
        seeAlso: ['voice-typing', 'multilingual-voice-typing'],
    },
    {
        slug: 'multilingual-voice-typing',
        term: 'Multilingual Voice Typing',
        shortDefinition: 'Voice typing that supports multiple languages, including automatic language detection and code-switching.',
        fullDefinition: 'Multilingual voice typing is the ability to use voice-to-text in multiple languages, often with automatic language detection and support for code-switching (mixing languages in a single sentence). Advanced multilingual voice typing, like Zavi AI\'s implementation, can automatically detect which language you\'re speaking without manual selection, handle mid-sentence language switches, and even translate your speech into a different language in real-time. This is particularly valuable in multilingual regions like India, the EU, and Southeast Asia.',
        relatedTerms: ['Code-Switching', 'Language Detection', 'Translation'],
        seeAlso: ['real-time-translation', 'voice-typing'],
    },
    {
        slug: 'voice-ai-keyboard',
        term: 'Voice AI Keyboard',
        shortDefinition: 'A smartphone keyboard app that uses AI to enable intelligent voice typing across all applications.',
        fullDefinition: 'A Voice AI Keyboard is a keyboard application (primarily for smartphones) that integrates AI-powered voice typing as a core input method. Unlike standalone dictation apps, a Voice AI Keyboard works system-wide across all apps — WhatsApp, Gmail, Slack, Instagram, ChatGPT, and any other app with a text field. Zavi AI is a leading example of a Voice AI Keyboard, offering AI cleanup, filler word removal, grammar correction, and real-time translation built directly into the keyboard interface.',
        relatedTerms: ['AI Keyboard', 'Voice Typing', 'Smart Keyboard'],
        seeAlso: ['voice-typing', 'ai-cleanup'],
    },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
    return glossaryTerms.find((t) => t.slug === slug);
}

export function getAllGlossarySlugs(): string[] {
    return glossaryTerms.map((t) => t.slug);
}
