'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';

interface Device {
  name: string;
  icon: string;
  description: string;
  color: string;
  bgGradient: string;
}

export default function DeviceGrid() {
  const devices: Device[] = [
    {
      name: 'iOS',
      icon: '📱',
      description: 'Speak on the go with your iPhone',
      color: '#5A5766',
      bgGradient: 'from-[#E8DFD0]/50 to-[#F5F1EC]/30'
    },
    {
      name: 'Android',
      icon: '🤖',
      description: 'Voice typing for every Android device',
      color: '#7B9B8A',
      bgGradient: 'from-[#B8D4C8]/50 to-[#D4E8DC]/30'
    },
    {
      name: 'macOS',
      icon: '💻',
      description: 'Seamless integration with your Mac',
      color: '#5A5766',
      bgGradient: 'from-[#D4C4E8]/50 to-[#E8DCF4]/30'
    },
    {
      name: 'Windows',
      icon: '🪟',
      description: 'Powerful voice tools for Windows',
      color: '#9B86BD',
      bgGradient: 'from-[#C4B8D8]/50 to-[#D8CCE8]/30'
    },
    {
      name: 'Linux',
      icon: '🐧',
      description: 'Open-source voice typing freedom',
      color: '#7B9B8A',
      bgGradient: 'from-[#B8D4C8]/50 to-[#C8E4D8]/30'
    },
    {
      name: 'Web',
      icon: '🌐',
      description: 'Works anywhere, no install needed',
      color: '#9B86BD',
      bgGradient: 'from-[#E8DFD0]/50 to-[#F8EFE0]/30'
    }
  ];

  return (
    <section className="px-6 py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            {...fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#34384c] mb-4"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
          >
            Voice typing{' '}
            <span className="text-[#9B86BD]">everywhere</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="text-lg md:text-xl text-[#5A5766]"
          >
            Use your voice on any device, anywhere
          </motion.p>
        </motion.div>

        {/* Device Grid */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {devices.map((device, index) => (
            <motion.div
              key={device.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card */}
              <div
                className={`relative bg-gradient-to-br ${device.bgGradient} rounded-3xl p-8 md:p-10 h-full transition-all duration-300 group-hover:shadow-xl group-hover:shadow-black/10`}
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-md flex items-center justify-center text-4xl md:text-5xl group-hover:shadow-lg transition-shadow duration-300">
                    {device.icon}
                  </div>
                </motion.div>

                {/* Device Name */}
                <h3
                  className="text-2xl md:text-3xl font-bold mb-3 transition-colors duration-300"
                  style={{ color: device.color }}
                >
                  {device.name}
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg text-[#5A5766] leading-relaxed font-light">
                  {device.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute bottom-8 right-8 flex items-center gap-2 text-sm font-medium"
                  style={{ color: device.color }}
                >
                  Learn more
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>

                {/* Decorative corner accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-bl-full"
                  style={{ backgroundColor: device.color }}
                />
              </div>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 -z-10 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300"
                style={{ backgroundColor: device.color }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-[#9B86BD] to-[#B8A6D4] text-white font-semibold text-base md:text-lg rounded-full shadow-lg shadow-[#9B86BD]/30 hover:shadow-xl hover:shadow-[#9B86BD]/40 transition-all duration-300"
          >
            Download for your device
          </motion.button>

          <p className="mt-4 text-sm md:text-base text-[#5A5766]/70">
            Free to try · No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Compact variant for smaller sections
export function DeviceGridCompact() {
  const devices = [
    { icon: '📱', label: 'iOS' },
    { icon: '🤖', label: 'Android' },
    { icon: '💻', label: 'Mac' },
    { icon: '🪟', label: 'Windows' },
    { icon: '🐧', label: 'Linux' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {devices.map((device, index) => (
        <motion.div
          key={device.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.1, y: -4 }}
          className="flex flex-col items-center gap-2 p-4 bg-[#F5F1EC] rounded-2xl hover:bg-[#E8DFD0] transition-colors duration-300 cursor-pointer min-w-[80px]"
        >
          <span className="text-3xl md:text-4xl">{device.icon}</span>
          <span className="text-xs md:text-sm font-medium text-[#5A5766]">
            {device.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// Icon-only variant for minimal spaces
export function DeviceIconStrip() {
  const icons = ['📱', '🤖', '💻', '🪟', '🐧', '🌐'];

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05, type: 'spring' }}
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          className="text-2xl md:text-3xl cursor-pointer"
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
}
