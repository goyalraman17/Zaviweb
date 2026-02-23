'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { analytics } from '@/lib/analytics';

type Platform = 'iOS' | 'Android' | 'macOS' | 'Windows' | 'Linux';

interface PlatformInfo {
  name: Platform;
  icon: JSX.Element;
  downloadUrl: string;
  label: string;
  comingSoon?: boolean;
}

const platforms: PlatformInfo[] = [
  {
    name: 'Android',
    label: 'Android',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.61 15.15C16.15 15.15 15.77 15.53 15.77 16C15.77 16.46 16.15 16.85 16.61 16.85C17.07 16.85 17.45 16.46 17.45 16C17.45 15.53 17.07 15.15 16.61 15.15M7.41 15.15C6.95 15.15 6.57 15.53 6.57 16C6.57 16.46 6.95 16.85 7.41 16.85C7.87 16.85 8.25 16.46 8.25 16C8.25 15.53 7.87 15.15 7.41 15.15M16.91 10.14L18.58 7.26C18.67 7.09 18.61 6.88 18.45 6.79C18.28 6.69 18.07 6.75 18 6.92L16.29 9.83C14.95 9.22 13.5 8.9 12 8.91C10.47 8.91 9 9.24 7.73 9.82L6.04 6.91C5.95 6.74 5.74 6.68 5.57 6.78C5.4 6.87 5.35 7.08 5.44 7.25L7.1 10.13C4.25 11.69 2.29 14.58 2 18H22C21.72 14.59 19.77 11.7 16.91 10.14Z" />
      </svg>
    ),
  },
  {
    name: 'iOS',
    label: 'iOS',
    downloadUrl: 'https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
      </svg>
    ),
  },
  {
    name: 'macOS',
    label: 'macOS',
    downloadUrl: '/downloads/Zavi_AI.dmg',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
      </svg>
    ),
  },
  {
    name: 'Windows',
    label: 'Windows',
    downloadUrl: '/downloads/Zavi_Windows.exe',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
      </svg>
    ),
  },
  {
    name: 'Linux',
    label: 'Linux',
    downloadUrl: '/downloads/Zavi_Linux.deb',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 12V8H18V12H20M4 12V8H6V12H4M16.5 13.5C16.5 14.33 15.83 15 15 15S13.5 14.33 13.5 13.5 14.17 12 15 12 16.5 12.67 16.5 13.5M10.5 13.5C10.5 14.33 9.83 15 9 15S7.5 14.33 7.5 13.5 8.17 12 9 12 10.5 12.67 10.5 13.5M19 13V18C19 19.11 18.11 20 17 20H15V22H13V20H11V22H9V20H7C5.9 20 5 19.11 5 18V13C5 11.9 5.9 11 7 11H17C18.11 11 19 11.9 19 13M12 2C9 2 7 4.5 7 7V9H17V7C17 4.5 15 2 12 2Z" />
      </svg>
    ),
  },
];

export default function DeviceDownload() {
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null);
  const [selectedForAccess, setSelectedForAccess] = useState<Platform | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const platform = window.navigator.platform?.toLowerCase() || '';

      if (userAgent.includes('android')) {
        setDetectedPlatform('Android');
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod') ||
        (platform.includes('mac') && navigator.maxTouchPoints > 1)) {
        setDetectedPlatform('iOS');
      } else if (userAgent.includes('mac')) {
        setDetectedPlatform('macOS');
      } else if (userAgent.includes('win')) {
        setDetectedPlatform('Windows');
      }
    }
  }, []);

  const handleAction = (platform: Platform, info: PlatformInfo) => {
    if (info.comingSoon) {
      setSelectedForAccess(platform);
      setIsSubmitted(false);
      // Scroll to the email form if needed or just focus
    } else {
      analytics.track('download_click', {
        platform,
        detected_platform: detectedPlatform || 'unknown',
        is_detected: platform === detectedPlatform,
      });
      // External URLs (e.g. Play Store) open in new tab
      // Local files use anchor with download attribute to force binary download
      if (info.downloadUrl.startsWith('http')) {
        window.open(info.downloadUrl, '_blank');
      } else {
        const link = document.createElement('a');
        link.href = info.downloadUrl;
        link.download = info.downloadUrl.split('/').pop() || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    analytics.track('waitlist_signup', {
      platform: selectedForAccess || 'Unknown',
      email: email
    });

    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => {
      setSelectedForAccess(null);
      setIsSubmitted(false);
    }, 3000);
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
            Get Zavi AI
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto space-y-3 px-4"
          >
            <p className="font-medium text-gray-900">Live on Android, iOS, Mac, Windows, and Linux.</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full font-semibold border border-green-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                1,000 Free Words Every Day
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-600 rounded-full font-medium border border-gray-200">
                No Credit Card Needed
              </span>
            </div>
          </motion.div>

          {/* Platform Grid */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto mb-12 px-4 md:px-0"
          >
            {platforms.map((platform) => {
              const isDetected = platform.name === detectedPlatform;
              const isAndroid = platform.name === 'Android';
              const isActualSelected = selectedForAccess === platform.name;

              return (
                <motion.button
                  key={platform.name}
                  onClick={() => handleAction(platform.name, platform)}
                  className={`
                    relative group p-6 md:p-8 rounded-2xl border-2 transition-all duration-300
                    ${(isAndroid || platform.name === 'iOS' || platform.name === 'macOS' || platform.name === 'Linux' || platform.name === 'Windows')
                      ? 'bg-gradient-to-br from-blue-600 to-sky-500 border-blue-600 text-white shadow-xl scale-105 z-10'
                      : isActualSelected
                        ? 'border-zavi-blue-400 bg-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-zavi-blue-300 hover:shadow-lg'
                    }
                  `}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Status Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20">
                    {(isAndroid || platform.name === 'iOS' || platform.name === 'macOS' || platform.name === 'Linux' || platform.name === 'Windows') ? (
                      <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-green-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-lg border-2 border-white">
                        Live Now
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-200 shadow-sm">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {isDetected && !(isAndroid || platform.name === 'iOS' || platform.name === 'macOS' || platform.name === 'Linux' || platform.name === 'Windows') && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <span className="px-2 py-0.5 bg-zavi-blue text-white text-[9px] font-bold rounded-full">
                        Your Device
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-3">
                    <div className={`
                      transition-transform duration-300 group-hover:scale-110
                      ${(isAndroid || platform.name === 'iOS' || platform.name === 'macOS' || platform.name === 'Linux' || platform.name === 'Windows') ? 'text-white' : 'text-slate-400 group-hover:text-zavi-blue-500'}
                    `}>
                      {platform.icon}
                    </div>

                    <span className={`text-lg font-bold ${(isAndroid || platform.name === 'iOS' || platform.name === 'macOS' || platform.name === 'Linux' || platform.name === 'Windows') ? 'text-white' : 'text-slate-900'}`}>
                      {platform.label}
                    </span>

                    <span className={`
                      text-sm font-semibold
                      ${(isAndroid || platform.name === 'iOS' || platform.name === 'macOS' || platform.name === 'Linux' || platform.name === 'Windows') ? 'text-white/90' : 'text-zavi-blue-500'}
                    `}>
                      {(isAndroid || platform.name === 'iOS' || platform.name === 'macOS' || platform.name === 'Linux' || platform.name === 'Windows') ? 'Download' : 'Join Waitlist'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Waitlist Form */}
          <AnimatePresence mode="wait">
            {selectedForAccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md mx-auto p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-inner mt-8"
              >
                {!isSubmitted ? (
                  <>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Join the Waitlist for {selectedForAccess}</h3>
                    <p className="text-slate-600 mb-6 text-sm">We'll notify you as soon as the {selectedForAccess} version is ready for preview.</p>
                    <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-zavi-blue-500 focus:border-zavi-blue-500 outline-none transition-all"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-zavi-blue text-white font-bold rounded-xl hover:bg-zavi-blue-600 transition-all shadow-md"
                      >
                        Join
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="py-4"
                  >
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">You're on the list!</h3>
                    <p className="text-slate-600 text-sm">We'll reach out to {email} soon.</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Proof Badges */}
          <motion.div
            variants={fadeUp}
            className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-slate-400">5/5</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">App Store & Play Store Rating</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

