import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
            // Explicitly allow AI crawlers for GEO/AEO
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'ChatGPT-User', allow: '/' },
            { userAgent: 'OAI-SearchBot', allow: '/' },
            { userAgent: 'Claude-Web', allow: '/' },
            { userAgent: 'ClaudeBot', allow: '/' },
            { userAgent: 'Google-Extended', allow: '/' },
            { userAgent: 'Googlebot', allow: '/' },
            { userAgent: 'Bingbot', allow: '/' },
            { userAgent: 'PerplexityBot', allow: '/' },
            { userAgent: 'Applebot-Extended', allow: '/' },
            { userAgent: 'cohere-ai', allow: '/' },
            { userAgent: 'Bytespider', allow: '/' },
            { userAgent: 'Meta-ExternalAgent', allow: '/' },
            { userAgent: 'Amazonbot', allow: '/' },
            // Additional AI crawlers
            { userAgent: 'anthropic-ai', allow: '/' },
            { userAgent: 'Claude-SearchBot', allow: '/' },
            { userAgent: 'Gemini-Web', allow: '/' },
            { userAgent: 'GeminiBot', allow: '/' },
            { userAgent: 'Grok', allow: '/' },
            { userAgent: 'xAI-Bot', allow: '/' },
            { userAgent: 'DuckAssistBot', allow: '/' },
            { userAgent: 'YouBot', allow: '/' },
            { userAgent: 'Applebot', allow: '/' },
            { userAgent: 'Meta-ExternalFetcher', allow: '/' },
            { userAgent: 'facebookexternalhit', allow: '/' },
            { userAgent: 'Twitterbot', allow: '/' },
            { userAgent: 'LinkedInBot', allow: '/' },
            { userAgent: 'WhatsApp', allow: '/' },
        ],
        sitemap: 'https://zavivoice.com/sitemap.xml',
    }
}
