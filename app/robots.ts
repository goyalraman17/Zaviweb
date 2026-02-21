import { MetadataRoute } from 'next'

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
        ],
        sitemap: 'https://zavi.ai/sitemap.xml',
    }
}
