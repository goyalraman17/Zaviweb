'use client';

import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';

export default function TrustStrip() {
  const companies = [
    { name: 'TechCorp', initial: 'TC' },
    { name: 'Innovate', initial: 'IN' },
    { name: 'Digital', initial: 'DG' },
    { name: 'Future Labs', initial: 'FL' },
    { name: 'NextGen', initial: 'NG' },
    { name: 'CloudBase', initial: 'CB' }
  ];

  return (
    <section className="px-6 py-12 md:py-16 bg-gradient-to-b from-white to-[#F5F1EC]/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...fadeIn}
          className="text-center mb-10"
        >
          <p className="text-sm md:text-base text-[#9B86BD] font-medium uppercase tracking-wider">
            Trusted by teams at
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="group cursor-pointer"
            >
              {/* Logo placeholder using initials */}
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#E8DFD0]/40 to-[#D4C4E8]/40 flex items-center justify-center transition-all duration-300 group-hover:from-[#E8DFD0]/70 group-hover:to-[#D4C4E8]/70 group-hover:shadow-lg">
                  <span className="text-xl md:text-2xl font-bold text-[#5A5766]/60 group-hover:text-[#5A5766] transition-colors duration-300">
                    {company.initial}
                  </span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-[#9B86BD]/0 group-hover:bg-[#9B86BD]/10 blur-xl transition-all duration-300 -z-10" />
              </div>

              {/* Company name (visible on hover) */}
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: 'auto' }}
                className="text-xs md:text-sm text-[#5A5766] font-medium text-center mt-2 hidden md:block"
              >
                {company.name}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust statement */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm md:text-base text-[#5A5766] font-light max-w-2xl mx-auto">
            Experience the 5-star voice typing experience that's transforming professional communication
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Alternative variant with actual logo SVG placeholders
export function TrustStripLogos() {
  return (
    <section className="px-6 py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...fadeIn}
          className="text-center mb-10"
        >
          <p className="text-sm md:text-base text-[#9B86BD] font-medium uppercase tracking-wider">
            Trusted by teams at
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-16"
        >
          {[1, 2, 3, 4, 5].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              {/* SVG logo placeholder */}
              <div className="w-24 h-12 md:w-32 md:h-16 bg-gradient-to-r from-[#5A5766]/20 to-[#5A5766]/10 rounded-lg flex items-center justify-center">
                <span className="text-xs text-[#5A5766]/50 font-medium">
                  LOGO {index}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle divider */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E8DFD0]" />
          <div className="w-2 h-2 rounded-full bg-[#9B86BD]/30" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E8DFD0]" />
        </div>
      </div>
    </section>
  );
}
