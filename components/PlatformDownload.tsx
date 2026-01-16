'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

type Platform = 'mac' | 'windows' | 'linux' | 'ios' | 'android';

interface PlatformConfig {
  name: string;
  icon: JSX.Element;
  downloadUrl: string;
  badge?: string;
}

const platforms: Record<Platform, PlatformConfig> = {
  mac: {
    name: 'macOS',
    downloadUrl: '#',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M25.31 14.13c-.02-2.58 2.11-3.83 2.2-3.89-1.2-1.75-3.07-1.99-3.73-2.01-1.59-.16-3.1.93-3.9.93-.81 0-2.05-.91-3.37-.89-1.73.03-3.33.99-4.22 2.53-1.8 3.12-.46 7.74 1.29 10.27.85 1.24 1.87 2.63 3.21 2.58 1.31-.05 1.8-.84 3.38-.84 1.57 0 2.03.84 3.38.81 1.4-.02 2.28-1.27 3.13-2.51 1-1.43 1.41-2.81 1.43-2.89-.03-.01-2.74-1.05-2.77-4.16zm-2.52-7.45c.71-.86 1.19-2.06 1.06-3.25-1.03.04-2.27.68-3.01 1.54-.66.77-1.24 1.99-1.09 3.17 1.15.09 2.32-.58 3.04-1.46z"/>
      </svg>
    ),
  },
  windows: {
    name: 'Windows',
    downloadUrl: '#',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M4 4v11h11V4H4zm13 0v11h11V4H17zM4 17v11h11V17H4zm13 0v11h11V17H17z"/>
      </svg>
    ),
  },
  linux: {
    name: 'Linux',
    downloadUrl: '#',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 3c-1.38 0-2.5 1.12-2.5 2.5v2c0 .69-.56 1.25-1.25 1.25h-1.5c-.69 0-1.25.56-1.25 1.25v3c0 .69.56 1.25 1.25 1.25h1.5c.69 0 1.25.56 1.25 1.25v2c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5v-2c0-.69.56-1.25 1.25-1.25h1.5c.69 0 1.25-.56 1.25-1.25v-3c0-.69-.56-1.25-1.25-1.25h-1.5c-.69 0-1.25-.56-1.25-1.25v-2c0-1.38-1.12-2.5-2.5-2.5zm-4 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
    ),
  },
  ios: {
    name: 'iOS',
    downloadUrl: '#',
    badge: 'App Store',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M25.31 14.13c-.02-2.58 2.11-3.83 2.2-3.89-1.2-1.75-3.07-1.99-3.73-2.01-1.59-.16-3.1.93-3.9.93-.81 0-2.05-.91-3.37-.89-1.73.03-3.33.99-4.22 2.53-1.8 3.12-.46 7.74 1.29 10.27.85 1.24 1.87 2.63 3.21 2.58 1.31-.05 1.8-.84 3.38-.84 1.57 0 2.03.84 3.38.81 1.40-.02 2.28-1.27 3.13-2.51 1-1.43 1.41-2.81 1.43-2.89-.03-.01-2.74-1.05-2.77-4.16z"/>
      </svg>
    ),
  },
  android: {
    name: 'Android',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.pingpros.keyboard',
    badge: 'Google Play',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M4 7c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1zm3 0v13c0 1.1.9 2 2 2h2v5c0 .55.45 1 1 1s1-.45 1-1v-5h2v5c0 .55.45 1 1 1s1-.45 1-1v-5h2c1.1 0 2-.9 2-2V7H7zm21 0c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1zM10.73 3.27L11.88 2.12c.12-.12.12-.32 0-.44-.12-.12-.32-.12-.44 0L10.27 2.85c-.83-.38-1.77-.6-2.77-.6s-1.94.22-2.77.6L3.56 1.68c-.12-.12-.32-.12-.44 0-.12.12-.12.32 0 .44l1.15 1.15C3.42 4.02 3 5 3 6h10c0-1-.42-1.98-1.27-2.73z"/>
      </svg>
    ),
  },
};

export default function PlatformDownload() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [detectedOS, setDetectedOS] = useState<Platform | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) setDetectedOS('mac');
    else if (userAgent.includes('win')) setDetectedOS('windows');
    else if (userAgent.includes('linux')) setDetectedOS('linux');
    else if (userAgent.includes('iphone') || userAgent.includes('ipad')) setDetectedOS('ios');
    else if (userAgent.includes('android')) setDetectedOS('android');

    setSelectedPlatform(detectedOS);
  }, [detectedOS]);

  const activePlatform = selectedPlatform || detectedOS || 'mac';

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
              Download for your platform
            </h2>
            <p className="text-lg md:text-xl text-zavi-gray-text font-light max-w-2xl mx-auto">
              Zavi works across macOS, Windows, Linux, iOS, and Android. One account, everywhere you write.
            </p>
          </div>

          {/* Platform Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-12">
            {(Object.entries(platforms) as [Platform, PlatformConfig][]).map(([key, platform]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedPlatform(key)}
                className={`relative p-6 md:p-8 rounded-2xl border-2 transition-all ${
                  activePlatform === key
                    ? 'border-zavi-blue bg-zavi-blue-50 shadow-lg'
                    : 'border-zavi-border bg-white hover:border-zavi-gray-300 hover:shadow-md'
                }`}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 * Object.keys(platforms).indexOf(key) }}
              >
                <div className={`flex flex-col items-center gap-3 ${
                  activePlatform === key ? 'text-zavi-blue' : 'text-zavi-gray-600'
                }`}>
                  {platform.icon}
                  <span className="text-sm md:text-base font-semibold">{platform.name}</span>
                  {platform.badge && (
                    <span className="text-xs text-zavi-gray-text">{platform.badge}</span>
                  )}
                </div>
                {detectedOS === key && (
                  <motion.div
                    className="absolute top-2 right-2 bg-zavi-blue text-white text-xs px-2 py-1 rounded-full"
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

          {/* Download CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href={platforms[activePlatform].downloadUrl}
              className="inline-flex items-center gap-3 px-12 py-5 bg-zavi-blue text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download for {platforms[activePlatform].name}
            </motion.a>
            <p className="text-sm text-zavi-gray-text mt-6">
              Free to install · No account required · Works immediately
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
