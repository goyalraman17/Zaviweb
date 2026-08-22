'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { analytics } from '@/lib/analytics';
import { detectPlatform } from '@/lib/platform';
import { DESKTOP_PLATFORM_PAGES, WINDOWS_STORE_URL } from '@/lib/desktopBuilds';
import { handlePlatformDownloadFlow } from '@/lib/clientDownloadFlow';

type Platform = 'iOS' | 'Android' | 'macOS' | 'Windows';

const platforms = [
  {
    name: 'macOS' as const,
    label: 'Mac',
    detail: 'macOS 12+',
    icon: '/icons/apple.svg',
    href: DESKTOP_PLATFORM_PAGES.macos,
  },
  {
    name: 'Windows' as const,
    label: 'Windows',
    detail: 'Windows 10+',
    icon: '/icons/windows.svg',
    href: WINDOWS_STORE_URL,
  },
  {
    name: 'iOS' as const,
    label: 'iPhone & iPad',
    detail: 'iOS 16+',
    icon: '/icons/apple.svg',
    href: 'https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802',
  },
  {
    name: 'Android' as const,
    label: 'Android',
    detail: 'Android 8+',
    icon: '/icons/android.svg',
    href: 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard',
  },
];

export default function DeviceDownload() {
  const [detected, setDetected] = useState<Platform | null>(null);

  useEffect(() => {
    const found = detectPlatform({
      userAgent: navigator.userAgent,
      maxTouchPoints: navigator.maxTouchPoints,
    });
    if (found !== 'Unknown' && found !== 'Linux') setDetected(found);
  }, []);

  const download = (platform: (typeof platforms)[number]) => {
    analytics.track('download_click', {
      platform: platform.name,
      detected_platform: detected || 'unknown',
      is_detected: platform.name === detected,
    });
    handlePlatformDownloadFlow(platform.name, { fallbackHref: platform.href });
  };

  return (
    <section
      id="download"
      className="overflow-hidden bg-white py-20 sm:py-28 lg:py-36"
    >
      <div className="container-large">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0.84, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
              Every device
            </p>
            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
              Take your voice everywhere.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
              Choose a platform. Your first 1,000 words every day are free.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((platform, index) => {
              const isDetected = platform.name === detected;
              return (
                <motion.button
                  type="button"
                  key={platform.name}
                  onClick={() => download(platform)}
                  initial={{ opacity: 0.78, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.035,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -7, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex min-h-[230px] flex-col items-start justify-between overflow-hidden rounded-[2rem] border p-6 text-left transition-shadow hover:shadow-xl ${isDetected ? 'border-slate-950 bg-slate-950 text-white shadow-xl' : 'border-slate-200 bg-slate-50 text-slate-950'}`}
                >
                  {isDetected && (
                    <span className="absolute right-4 top-4 rounded-full bg-blue-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                      This device
                    </span>
                  )}
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isDetected ? 'bg-white/10 text-white' : 'bg-white text-slate-700 shadow-sm'}`}
                  >
                    <Image
                      src={platform.icon}
                      alt=""
                      width={25}
                      height={25}
                      className={isDetected ? 'brightness-0 invert' : ''}
                    />
                  </span>
                  <div>
                    <h3 className="text-xl font-black">{platform.label}</h3>
                    <p
                      className={`mt-1 text-xs ${isDetected ? 'text-slate-300' : 'text-slate-500'}`}
                    >
                      {platform.detail}
                    </p>
                    <span
                      className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${isDetected ? 'text-blue-300' : 'text-blue-600'}`}
                    >
                      Get Zavi{' '}
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
