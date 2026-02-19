export interface LanguagePageData {
    slug: string;
    language: string;
    nativeName: string;
    speakers: string;
    regions: string;
    description: string;
}

export const languages: LanguagePageData[] = [
    { slug: 'hindi', language: 'Hindi', nativeName: 'हिन्दी', speakers: '600+ million', regions: 'India, Nepal, Fiji', description: 'Hindi is the most widely spoken language in India and the fourth most spoken language globally.' },
    { slug: 'spanish', language: 'Spanish', nativeName: 'Español', speakers: '550+ million', regions: 'Spain, Latin America, USA', description: 'Spanish is the second most spoken language by native speakers and is used across 20+ countries.' },
    { slug: 'french', language: 'French', nativeName: 'Français', speakers: '310+ million', regions: 'France, Canada, Africa', description: 'French is an official language in 29 countries and is widely used in international diplomacy.' },
    { slug: 'german', language: 'German', nativeName: 'Deutsch', speakers: '130+ million', regions: 'Germany, Austria, Switzerland', description: 'German is the most spoken native language in Europe and a key business language globally.' },
    { slug: 'japanese', language: 'Japanese', nativeName: '日本語', speakers: '125+ million', regions: 'Japan', description: 'Japanese is spoken primarily in Japan and features three writing systems: hiragana, katakana, and kanji.' },
    { slug: 'korean', language: 'Korean', nativeName: '한국어', speakers: '80+ million', regions: 'South Korea, North Korea', description: 'Korean uses the Hangul alphabet, widely considered one of the most efficient writing systems.' },
    { slug: 'mandarin-chinese', language: 'Mandarin Chinese', nativeName: '普通话', speakers: '920+ million', regions: 'China, Taiwan, Singapore', description: 'Mandarin Chinese is the most spoken language in the world by native speakers.' },
    { slug: 'arabic', language: 'Arabic', nativeName: 'العربية', speakers: '370+ million', regions: 'Middle East, North Africa', description: 'Arabic is an official language of 26 countries and the liturgical language of Islam.' },
    { slug: 'portuguese', language: 'Portuguese', nativeName: 'Português', speakers: '260+ million', regions: 'Brazil, Portugal, Mozambique', description: 'Portuguese is spoken across four continents and is the most spoken language in South America.' },
    { slug: 'russian', language: 'Russian', nativeName: 'Русский', speakers: '250+ million', regions: 'Russia, Eastern Europe, Central Asia', description: 'Russian is the most spoken Slavic language and is widely used across former Soviet countries.' },
    { slug: 'italian', language: 'Italian', nativeName: 'Italiano', speakers: '85+ million', regions: 'Italy, Switzerland, San Marino', description: 'Italian is a Romance language known for its musical quality and cultural significance.' },
    { slug: 'dutch', language: 'Dutch', nativeName: 'Nederlands', speakers: '30+ million', regions: 'Netherlands, Belgium, Suriname', description: 'Dutch is spoken in the Netherlands and Belgium, and is closely related to English and German.' },
    { slug: 'turkish', language: 'Turkish', nativeName: 'Türkçe', speakers: '85+ million', regions: 'Turkey, Cyprus, Central Asia', description: 'Turkish is an agglutinative language spoken across Turkey and parts of Central Asia.' },
    { slug: 'polish', language: 'Polish', nativeName: 'Polski', speakers: '45+ million', regions: 'Poland, diaspora worldwide', description: 'Polish is a West Slavic language and one of the official languages of the European Union.' },
    { slug: 'swedish', language: 'Swedish', nativeName: 'Svenska', speakers: '13+ million', regions: 'Sweden, Finland', description: 'Swedish is a North Germanic language closely related to Norwegian and Danish.' },
    { slug: 'thai', language: 'Thai', nativeName: 'ภาษาไทย', speakers: '60+ million', regions: 'Thailand', description: 'Thai is a tonal language with its own unique script, spoken primarily in Thailand.' },
    { slug: 'vietnamese', language: 'Vietnamese', nativeName: 'Tiếng Việt', speakers: '85+ million', regions: 'Vietnam, diaspora', description: 'Vietnamese is a tonal language that uses the Latin alphabet with additional diacritics.' },
    { slug: 'indonesian', language: 'Indonesian', nativeName: 'Bahasa Indonesia', speakers: '200+ million', regions: 'Indonesia', description: 'Indonesian is the official language of Indonesia, the fourth most populous country in the world.' },
    { slug: 'tamil', language: 'Tamil', nativeName: 'தமிழ்', speakers: '80+ million', regions: 'India, Sri Lanka, Singapore', description: 'Tamil is one of the oldest living languages in the world, with over 2,000 years of literary tradition.' },
    { slug: 'bengali', language: 'Bengali', nativeName: 'বাংলা', speakers: '270+ million', regions: 'Bangladesh, India (West Bengal)', description: 'Bengali is the seventh most spoken language in the world and the national language of Bangladesh.' },
    { slug: 'telugu', language: 'Telugu', nativeName: 'తెలుగు', speakers: '90+ million', regions: 'India (Andhra Pradesh, Telangana)', description: 'Telugu is a Dravidian language and one of the most spoken languages in India.' },
    { slug: 'marathi', language: 'Marathi', nativeName: 'मराठी', speakers: '95+ million', regions: 'India (Maharashtra)', description: 'Marathi is an Indo-Aryan language and the official language of Maharashtra, India.' },
    { slug: 'urdu', language: 'Urdu', nativeName: 'اردو', speakers: '230+ million', regions: 'Pakistan, India', description: 'Urdu is the national language of Pakistan and one of the 22 scheduled languages of India.' },
    { slug: 'malay', language: 'Malay', nativeName: 'Bahasa Melayu', speakers: '290+ million', regions: 'Malaysia, Indonesia, Brunei', description: 'Malay is the basis of Indonesian and Malaysian languages, spoken in Southeast Asia.' },
    { slug: 'swahili', language: 'Swahili', nativeName: 'Kiswahili', speakers: '100+ million', regions: 'East Africa (Kenya, Tanzania, Uganda)', description: 'Swahili is the most widely spoken African language and a lingua franca across East Africa.' },
];

export function getLanguage(slug: string): LanguagePageData | undefined {
    return languages.find((l) => l.slug === slug);
}

export function getAllLanguageSlugs(): string[] {
    return languages.map((l) => l.slug);
}
