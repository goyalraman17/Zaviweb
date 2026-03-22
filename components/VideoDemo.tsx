// VideoDemo.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState, useRef } from 'react';
import { fadeUp, staggerContainerSlow } from '@/lib/animations';

export default function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = 'T_fGpNvSEuA';
  const sectionRef = useRef<HTMLElement>(null);
  // Only load background iframe when section is visible on screen
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section
      ref={sectionRef}
      id="video-demo"
      className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50"
    >
      <div className="container-large">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0a] tracking-tight mb-4">
              See Zavi in action
            </h2>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium">
              Watch how a messy, rambling voice note becomes a polished professional email in under a second.
            </p>
          </motion.div>

          {/* Video Player Container */}
          <motion.div variants={fadeUp} className="relative">
            <div className="relative aspect-video w-full max-w-5xl mx-auto bg-gray-900 rounded-2xl md:rounded-[1.5rem] shadow-2xl overflow-hidden">

              {!isPlaying ? (
                /* Thumbnail / Play Button State */
                <div
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                  role="button"
                  aria-label="Play Zavi demo video"
                >
                  {/* Only load background video when section is visible */}
                  {isInView && (
                    <div className="absolute inset-0 w-full h-full pointer-events-none scale-105">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&showinfo=0`}
                        title="Zavi Preview"
                        loading="lazy"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                  )}

                  {/* Fallback gradient when not in view */}
                  {!isInView && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900" />
                  )}

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                      <div className="relative w-16 h-16 md:w-24 md:h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                        <Play className="w-7 h-7 md:w-10 md:h-10 text-[#5381d2] ml-1 fill-current" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              ) : (
                /* YouTube Iframe State — full player */
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1&showinfo=0&modestbranding=1`}
                  title="Zavi Demo Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            {[
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Real-Time' },
              { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Natural Speech' },
              { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Works Everywhere' },
            ].map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-xs font-semibold text-blue-700 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
