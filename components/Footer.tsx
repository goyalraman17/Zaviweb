'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const columns = [
  {
    title: 'Product',
    links: [
      ['Download', '/download'],
      ['Pricing', '/#pricing'],
      ['Use cases', '/use-cases'],
      ['Compare', '/compare'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Blog', '/blog'],
      ['Changelog', '/changelog'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
      ['Data controls', '/contact'],
    ],
  },
] as const;

const socials = [
  ['X', 'https://x.com/zavivoice'],
  ['LinkedIn', 'https://linkedin.com/company/zavivoice/'],
  ['Instagram', 'https://www.instagram.com/zavivoice/'],
  ['YouTube', 'https://www.youtube.com/@goyalraman17'],
] as const;

const badges = [
  [
    'https://startupfa.me/s/zavi?utm_source=www.zavivoice.com',
    'https://startupfa.me/badges/featured-badge-small.webp',
    'Featured on Startup Fame',
  ],
  [
    'https://www.toolpilot.ai',
    'https://www.toolpilot.ai/cdn/shop/files/f-w_690x151_crop_center.png',
    'Featured on ToolPilot',
  ],
  [
    'https://twelve.tools',
    'https://twelve.tools/badge0-light.svg',
    'Featured on Twelve Tools',
  ],
  [
    'https://turbo0.com/item/zavi',
    'https://img.turbo0.com/badge-listed-light.svg',
    'Listed on Turbo0',
  ],
] as const;

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#111416] pb-10 pt-14 text-white md:pb-10 md:pt-16 lg:pt-20">
      <div className="container-large">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-b border-white/15 pb-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:pb-12">
            <motion.div
              initial={{ opacity: 0.86, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href="/"
                className="hidden items-center gap-3 sm:inline-flex"
              >
                <Image
                  src="/zavi-logo.png"
                  alt="Zavi"
                  width={42}
                  height={42}
                  className="brightness-0 invert"
                />
                <span className="text-2xl font-black">Zavi</span>
              </Link>
              <h2 className="max-w-xl text-4xl font-black tracking-tight sm:mt-6 sm:text-5xl">
                Your thoughts were never meant for a keyboard.
              </h2>
              <p className="mt-5 max-w-md text-base text-slate-300">
                Speak naturally. Write beautifully. Anywhere.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-6">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    {column.title}
                  </h3>
                  <div className="mt-5 space-y-3">
                    {column.links.map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        className="block text-sm font-semibold text-slate-300 transition hover:translate-x-1 hover:text-white"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="select-none overflow-hidden border-b border-white/15 py-7 sm:py-9"
          >
            <motion.p
              className="whitespace-nowrap text-center text-[22vw] font-black leading-[0.75] tracking-[-0.075em] text-white/[0.12] sm:text-[18vw]"
              animate={{ x: ['-1.5%', '1.5%', '-1.5%'] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            >
              ZAVI
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-6 pt-7">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <p className="text-xs font-semibold text-slate-400">
                © 2026 Zavi. Speak more, type less.
              </p>
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                {socials.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-slate-400 transition hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 opacity-80 transition hover:opacity-100">
              {badges.map(([href, src, alt]) => (
                <a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="h-6 w-auto rounded-sm bg-white"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
