'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';

type Platform = 'mac' | 'windows' | 'linux' | 'ios' | 'android';

interface PlatformConfig {
  name: string;
  icon: JSX.Element;
  downloadUrl: string;
  badge?: string;
  comingSoon?: boolean;
}

const platforms: Record<Platform, PlatformConfig> = {
  android: {
    name: 'Android',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard',
    badge: 'Google Play',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M4 7c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1zm3 0v13c0 1.1.9 2 2 2h2v5c0 .55.45 1 1 1s1-.45 1-1v-5h2v5c0 .55.45 1 1 1s1-.45 1-1v-5h2c1.1 0 2-.9 2-2V7H7zm21 0c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1zM10.73 3.27L11.88 2.12c.12-.12.12-.32 0-.44-.12-.12-.32-.12-.44 0L10.27 2.85c-.83-.38-1.77-.6-2.77-.6s-1.94.22-2.77.6L3.56 1.68c-.12-.12-.32-.12-.44 0-.12.12-.12.32 0 .44l1.15 1.15C3.42 4.02 3 5 3 6h10c0-1-.42-1.98-1.27-2.73z" />
      </svg>
    ),
  },
  mac: {
    name: 'macOS',
    downloadUrl: '/downloads/Zavi_AI.dmg',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M25.31 14.13c-.02-2.58 2.11-3.83 2.2-3.89-1.2-1.75-3.07-1.99-3.73-2.01-1.59-.16-3.1.93-3.9.93-.81 0-2.05-.91-3.37-.89-1.73.03-3.33.99-4.22 2.53-1.8 3.12-.46 7.74 1.29 10.27.85 1.24 1.87 2.63 3.21 2.58 1.31-.05 1.8-.84 3.38-.84 1.57 0 2.03.84 3.38.81 1.4-.02 2.28-1.27 3.13-2.51 1-1.43 1.41-2.81 1.43-2.89-.03-.01-2.74-1.05-2.77-4.16zm-2.52-7.45c.71-.86 1.19-2.06 1.06-3.25-1.03.04-2.27.68-3.01 1.54-.66.77-1.24 1.99-1.09 3.17 1.15.09 2.32-.58 3.04-1.46z" />
      </svg>
    ),
  },
  windows: {
    name: 'Windows',
    downloadUrl: '/downloads/Zavi_Windows.exe',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M4 4v11h11V4H4zm13 0v11h11V4H17zM4 17v11h11V17H4zm13 0v11h11V17H17z" />
      </svg>
    ),
  },
  linux: {
    name: 'Linux',
    downloadUrl: '/downloads/Zavi_Linux.deb',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M20 12V8H18V12H20M4 12V8H6V12H4M16.5 13.5C16.5 14.33 15.83 15 15 15S13.5 14.33 13.5 13.5 14.17 12 15 12 16.5 12.67 16.5 13.5M10.5 13.5C10.5 14.33 9.83 15 9 15S7.5 14.33 7.5 13.5 8.17 12 9 12 10.5 12.67 10.5 13.5M19 13V18C19 19.11 18.11 20 17 20H15V22H13V20H11V22H9V20H7C5.9 20 5 19.11 5 18V13C5 11.9 5.9 11 7 11H17C18.11 11 19 11.9 19 13M12 2C9 2 7 4.5 7 7V9H17V7C17 4.5 15 2 12 2Z" />
      </svg>
    ),
  },
  ios: {
    name: 'iOS',
    downloadUrl: 'https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802',
    badge: 'App Store',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M25.31 14.13c-.02-2.58 2.11-3.83 2.2-3.89-1.2-1.75-3.07-1.99-3.73-2.01-1.59-.16-3.1.93-3.9.93-.81 0-2.05-.91-3.37-.89-1.73.03-3.33.99-4.22 2.53-1.8 3.12-.46 7.74 1.29 10.27.85 1.24 1.87 2.63 3.21 2.58 1.31-.05 1.8-.84 3.38-.84 1.57 0 2.03.84 3.38.81 1.40-.02 2.28-1.27 3.13-2.51 1-1.43 1.41-2.81 1.43-2.89-.03-.01-2.74-1.05-2.77-4.16z" />
      </svg>
    ),
  },
};

export default function PlatformDownload() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [detectedOS, setDetectedOS] = useState<Platform | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod') || userAgent.includes('mobile') || (userAgent.includes('mac') && navigator.maxTouchPoints > 1)) setDetectedOS('ios');
    else if (userAgent.includes('android')) setDetectedOS('android');
    else if (userAgent.includes('mac')) setDetectedOS('mac');
    else if (userAgent.includes('win')) setDetectedOS('windows');
    else if (userAgent.includes('linux')) setDetectedOS('linux');

    setSelectedPlatform(detectedOS || 'android');
  }, [detectedOS]);

  const activePlatform = selectedPlatform || 'android';
  const platformInfo = platforms[activePlatform];

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    analytics.track('waitlist_signup', {
      platform: activePlatform,
      email: email
    });

    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section ref={ref} data-section="download" className="py-32 md:py-40 bg-white border-y border-zavi-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zavi-charcoal mb-6">
              Get Zavi AI
            </h2>
            <p className="text-lg md:text-xl text-zavi-gray-text font-light max-w-2xl mx-auto">
              Live on Android, iOS, macOS, Windows, and Linux.
            </p>
          </div>

          {/* Platform Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-12">
            {(Object.entries(platforms) as [Platform, PlatformConfig][]).map(([key, platform]) => (
              <motion.button
                key={key}
                onClick={() => {
                  setSelectedPlatform(key);
                  setIsSubmitted(false);
                }}
                className={`relative p-6 md:p-8 rounded-2xl border-2 transition-all ${activePlatform === key
                  ? 'border-zavi-blue bg-zavi-blue-50 shadow-lg'
                  : 'border-zavi-border bg-white hover:border-zavi-gray-300 hover:shadow-md'
                  }`}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 * Object.keys(platforms).indexOf(key) }}
              >
                <div className={`flex flex-col items-center gap-3 ${activePlatform === key ? 'text-zavi-blue' : 'text-zavi-gray-600'
                  }`}>
                  {platform.icon}
                  <span className="text-sm md:text-base font-semibold">{platform.name}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                    {platform.comingSoon ? 'Soon' : 'Live'}
                  </span>
                </div>
                {detectedOS === key && (
                  <motion.div
                    className="absolute top-2 right-2 bg-zavi-blue text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Detected
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Action CTA */}
          <motion.div
            className="text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {(activePlatform === 'android' || activePlatform === 'ios') ? (
              <>
                <motion.a
                  href={platformInfo.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-12 py-5 bg-zavi-blue text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all w-full justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download for {platformInfo.name}
                </motion.a>
                <p className="text-sm text-zavi-gray-text mt-6 font-medium">
                  Free to install · No credit card · Works inside all apps
                </p>
              </>
            ) : (
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Join the {platformInfo.name} Waitlist</h3>
                    <p className="text-sm text-slate-600 mb-6">Be the first to know when we launch on {platformInfo.name}.</p>
                    <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-zavi-blue-500"
                      />
                      <button type="submit" className="px-6 py-3 bg-zavi-blue text-white font-bold rounded-xl hover:bg-zavi-blue-600 shadow-md">
                        Join
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="font-bold text-slate-900">Success! You're on the list.</p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

