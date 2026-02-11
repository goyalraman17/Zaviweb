/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/downloads/Zavi.dmg',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Zavi.dmg"',
          },
          {
            key: 'Content-Type',
            value: 'application/octet-stream',
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
    ];
  },
}

module.exports = nextConfig
