/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/downloads/Zavi_AI.dmg',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Zavi_AI.dmg"',
          },
          {
            key: 'Content-Type',
            value: 'application/x-apple-diskimage',
          },
        ],
      },
      {
        source: '/downloads/Zavi_0.1.0_amd64.deb',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Zavi_0.1.0_amd64.deb"',
          },
          {
            key: 'Content-Type',
            value: 'application/octet-stream',
          },
        ],
      },
      // Serve llms.txt files with proper content type for AI crawlers
      {
        source: '/llms.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      // Security and caching headers for all pages
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // Serve llms.txt at .well-known/llms.txt as well (emerging standard path)
      {
        source: '/.well-known/llms.txt',
        destination: '/llms.txt',
      },
    ];
  },
}

module.exports = nextConfig
