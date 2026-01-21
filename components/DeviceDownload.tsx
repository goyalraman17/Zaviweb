'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { analytics } from '@/lib/analytics';

type Platform = 'macOS' | 'Windows' | 'Linux' | 'iOS' | 'Android';

interface PlatformInfo {
  name: Platform;
  icon: JSX.Element;
  downloadUrl: string;
  label: string;
  comingSoon?: boolean;
}

const platforms: PlatformInfo[] = [
  {
    name: 'macOS',
    label: 'macOS',
    downloadUrl: 'https://zavi.ai/download/macos',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
      </svg>
    ),
  },
  {
    name: 'Windows',
    label: 'Windows',
    downloadUrl: 'https://zavi.ai/download/windows',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
      </svg>
    ),
  },
  {
    name: 'Linux',
    label: 'Linux',
    downloadUrl: 'https://zavi.ai/download/linux',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.61 2.03C13.26 2.12 13.19 2.24 13.19 2.71C13.19 3.12 13.24 3.21 13.61 3.21C14.1 3.21 14.21 3.12 14.21 2.38C14.21 1.81 14.15 1.71 13.75 1.71C13.65 1.71 13.61 1.81 13.61 2.03M11.45 2.05C11.1 2.14 11.03 2.26 11.03 2.73C11.03 3.14 11.08 3.23 11.45 3.23C11.94 3.23 12.05 3.14 12.05 2.4C12.05 1.83 11.99 1.73 11.59 1.73C11.49 1.73 11.45 1.83 11.45 2.05M7 7.5C7 11.09 7.92 13.86 9.39 15.03C10.15 15.61 10.43 15.96 10.43 16.21C10.43 16.38 10.36 16.5 10.22 16.5C10.08 16.5 9.61 16.17 9.17 15.77C7.89 14.64 7.14 13.32 6.75 11.5C6.5 10.36 6.5 7.64 6.75 6.5C7.14 4.68 7.89 3.36 9.17 2.23C9.61 1.83 10.08 1.5 10.22 1.5C10.36 1.5 10.43 1.62 10.43 1.79C10.43 2.04 10.15 2.39 9.39 2.97C7.92 4.14 7 6.91 7 7.5M17 7.5C17 11.09 16.08 13.86 14.61 15.03C13.85 15.61 13.57 15.96 13.57 16.21C13.57 16.38 13.64 16.5 13.78 16.5C13.92 16.5 14.39 16.17 14.83 15.77C16.11 14.64 16.86 13.32 17.25 11.5C17.5 10.36 17.5 7.64 17.25 6.5C16.86 4.68 16.11 3.36 14.83 2.23C14.39 1.83 13.92 1.5 13.78 1.5C13.64 1.5 13.57 1.62 13.57 1.79C13.57 2.04 13.85 2.39 14.61 2.97C16.08 4.14 17 6.91 17 7.5M12 19C12.82 19 13.5 18.33 13.5 17.5S12.82 16 12 16 10.5 16.67 10.5 17.5 11.18 19 12 19Z" />
      </svg>
    ),
  },
  {
    name: 'iOS',
    label: 'iOS',
    downloadUrl: 'https://apps.apple.com/app/zavi',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
      </svg>
    ),
  },
  {
    name: 'Android',
    label: 'Android',
    downloadUrl: 'https://play.google.com/store/apps/details?id=ai.zavi',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.61 15.15C16.15 15.15 15.77 15.53 15.77 16C15.77 16.46 16.15 16.85 16.61 16.85C17.07 16.85 17.45 16.46 17.45 16C17.45 15.53 17.07 15.15 16.61 15.15M7.41 15.15C6.95 15.15 6.57 15.53 6.57 16C6.57 16.46 6.95 16.85 7.41 16.85C7.87 16.85 8.25 16.46 8.25 16C8.25 15.53 7.87 15.15 7.41 15.15M16.91 10.14L18.58 7.26C18.67 7.09 18.61 6.88 18.45 6.79C18.28 6.69 18.07 6.75 18 6.92L16.29 9.83C14.95 9.22 13.5 8.9 12 8.91C10.47 8.91 9 9.24 7.73 9.82L6.04 6.91C5.95 6.74 5.74 6.68 5.57 6.78C5.4 6.87 5.35 7.08 5.44 7.25L7.1 10.13C4.25 11.69 2.29 14.58 2 18H22C21.72 14.59 19.77 11.7 16.91 10.14Z" />
      </svg>
    ),
  },
];

export default function DeviceDownload() {
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) setDetectedPlatform('macOS');
      else if (userAgent.includes('win')) setDetectedPlatform('Windows');
      else if (userAgent.includes('iphone') || userAgent.includes('ipad')) setDetectedPlatform('iOS');
      else if (userAgent.includes('android')) setDetectedPlatform('Android');
      else if (userAgent.includes('linux')) setDetectedPlatform('Linux');
    }
  }, []);

  const handleDownload = (platform: Platform, url: string) => {
    analytics.track('download_click', {
      platform,
      detected_platform: detectedPlatform || 'unknown',
      is_detected: platform === detectedPlatform,
    });
    window.location.href = url;
  };

  return (
    <section className="py-16 md:py-24 bg-white" id="download">
      <div className="container-large">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3"
          >
            Works Everywhere
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto space-y-2"
          >
            <p>Mac. Windows. iPhone. Android. Linux.</p>
            <p className="text-lg text-gray-500">Click your device to download.</p>
          </motion.div>

          {/* Platform Grid */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto"
          >
            {platforms.map((platform) => {
              const isDetected = platform.name === detectedPlatform;
              const isComingSoon = platform.comingSoon;

              return (
                <motion.button
                  key={platform.name}
                  onClick={() => !isComingSoon && handleDownload(platform.name, platform.downloadUrl)}
                  disabled={isComingSoon}
                  className={`
                    relative group p-6 md:p-8 rounded-2xl border-2 transition-all duration-300
                    ${isDetected
                      ? 'bg-gradient-to-br from-indigo-600 to-violet-600 border-indigo-600 text-white shadow-xl scale-105'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:shadow-lg hover:scale-105'
                    }
                    ${isComingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: platforms.indexOf(platform) * 0.1, duration: 0.5 }}
                  whileHover={!isComingSoon ? {
                    y: -8,
                    boxShadow: isDetected
                      ? "0 25px 50px -12px rgba(99, 102, 241, 0.6)"
                      : "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                  } : {}}
                  whileTap={!isComingSoon ? { scale: 0.95 } : {}}
                >
                  {/* Detected Badge */}
                  {isDetected && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Your Device
                      </span>
                    </div>
                  )}

                  {/* Coming Soon Badge */}
                  {isComingSoon && (
                    <div className="absolute -top-3 right-2">
                      <span className="inline-block px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                        Soon
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-3">
                    {/* Icon */}
                    <div className={`
                      transition-transform duration-300
                      ${isDetected ? 'text-white' : 'text-gray-600 group-hover:text-[#6B7FE8]'}
                      ${!isComingSoon && 'group-hover:scale-110'}
                    `}>
                      {platform.icon}
                    </div>

                    {/* Label */}
                    <span className={`
                      text-lg font-semibold
                      ${isDetected ? 'text-white' : 'text-gray-900'}
                    `}>
                      {platform.label}
                    </span>

                    {/* Download Text */}
                    {!isComingSoon && (
                      <span className={`
                        text-sm font-medium
                        ${isDetected ? 'text-white/90' : 'text-gray-500 group-hover:text-[#6B7FE8]'}
                      `}>
                        {isDetected ? 'Download Now' : 'Get Free'}
                      </span>
                    )}
                  </div>

                  {/* Hover Effect */}
                  {!isComingSoon && !isDetected && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6B7FE8]/0 to-[#8B5CF6]/0 group-hover:from-[#6B7FE8]/5 group-hover:to-[#8B5CF6]/5 transition-all duration-300" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Trust Pill Badges */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-semibold text-emerald-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free Download
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-semibold text-blue-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              No Card
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-50 border border-violet-200 rounded-full text-sm font-semibold text-violet-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Instant Setup
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm font-semibold text-amber-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              50K+ Users
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
