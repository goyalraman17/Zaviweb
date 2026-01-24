import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Zavi AI – Voice Typing Keyboard',
        short_name: 'Zavi AI',
        description: 'Stop typing. Start speaking. Turn natural speech into clean, professional text.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563EB',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            // Enhance this with 192x192 and 512x512 png icons in public folder for full PWA support
        ],
    }
}
