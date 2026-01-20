'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { fadeUp, staggerContainerSlow } from '@/lib/animations';

export default function VideoDemo() {
  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #E8E5F5 0%, #F5E8F0 50%, #E5F0F5 100%)',
      }}
    >
      <div className="container-large">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-display text-[#1a1a1a] mb-4">
              See Zavi in Action
            </h2>
            <p className="text-body-lg text-gray-700 max-w-2xl mx-auto">
              Watch how Zavi transforms your voice into polished, professional text in real-time
            </p>
          </motion.div>

          {/* Video Player Placeholder */}
          <motion.div variants={fadeUp} className="relative">
            {/* Video Container */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm cursor-pointer group hover:bg-black/30 transition-all duration-300">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  {/* Pulsing Ring */}
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />

                  {/* Play Button */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-[#5381d2] ml-1 fill-current" />
                  </div>
                </motion.div>
              </div>

              {/* Placeholder Content - Replace with actual video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/40">
                  <svg
                    className="w-32 h-32 mx-auto mb-4 opacity-20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="2.18" strokeWidth="1.5" />
                    <line x1="7" y1="2" x2="7" y2="22" strokeWidth="1.5" />
                    <line x1="17" y1="2" x2="17" y2="22" strokeWidth="1.5" />
                    <line x1="2" y1="12" x2="22" y2="12" strokeWidth="1.5" />
                    <line x1="2" y1="7" x2="7" y2="7" strokeWidth="1.5" />
                    <line x1="2" y1="17" x2="7" y2="17" strokeWidth="1.5" />
                    <line x1="17" y1="17" x2="22" y2="17" strokeWidth="1.5" />
                    <line x1="17" y1="7" x2="22" y2="7" strokeWidth="1.5" />
                  </svg>
                  <p className="text-sm font-medium">Video Demo Placeholder</p>
                </div>
              </div>

              {/* Gradient Overlay for Visual Polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#6B7FE8]/20 to-[#8B5CF6]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#F472B6]/20 to-[#60A5FA]/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Key Features Below Video */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                title: 'Real-Time Processing',
                description: 'See your words refined instantly as you speak',
              },
              {
                title: 'Natural Speech',
                description: 'No need to change how you talk',
              },
              {
                title: 'Universal Compatibility',
                description: 'Works in any app on your device',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80"
              >
                <h3 className="text-lg font-semibold text-[#34384c] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
