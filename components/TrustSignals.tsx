'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useScrollAnimation,
  staggerContainer,
  fadeUp,
  fadeUpLarge,
} from '@/lib/animations';

const TRUST_POINTS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Live today',
    description: 'Not a beta. Not a waitlist. Download and use now.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Used daily by professionals',
    description: 'Trusted by professionals across law, tech, sales, and consulting.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Private by design',
    description: 'Your voice stays on your device. Zero-knowledge architecture.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Sub-200ms latency',
    description: 'Feels instant. No waiting, no loading spinners.',
  },
];

// Premium: Add recognizable company logos for credibility
const TRUSTED_BY = [
  { name: 'Stripe', logo: 'M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z' },
  { name: 'Vercel', logo: 'M24 22.525H0l12-21.05 12 21.05z' },
  { name: 'Notion', logo: 'M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.887-.748-.84l-15.177.887c-.56.047-.747.327-.747.887zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z' },
  { name: 'Linear', logo: 'M4.5 0L0 4.5l4.5 4.5V6.75L2.25 4.5 4.5 2.25V0zM19.5 0v2.25L21.75 4.5 19.5 6.75V9l4.5-4.5L19.5 0z' },
];

export default function TrustSignals() {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Premium: Trusted By Section with Logos */}
          <motion.div className="text-center mb-20" variants={fadeUp}>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
              {TRUSTED_BY.map((company, index) => (
                <motion.div
                  key={company.name}
                  className="opacity-40 hover:opacity-70 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 0.4, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <svg className="h-7 fill-gray-900" viewBox="0 0 24 24">
                    <path d={company.logo} />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="text-center mb-20" variants={fadeUpLarge}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1]">
              Built for Daily Use.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-600">
                Not Demos.
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Production-grade. Enterprise-ready. Available now.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-16"
            variants={staggerContainer}
          >
            {TRUST_POINTS.map((point, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl border border-slate-200/50 p-8 hover:shadow-xl hover:border-blue-300/50 transition-all duration-500"
                variants={fadeUp}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {point.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center p-10 bg-gradient-to-br from-blue-50/50 to-sky-50/30 rounded-3xl border border-blue-200/30"
            variants={fadeUp}
          >
            <p className="text-lg md:text-xl text-gray-900 font-semibold">
              Quiet confidence. No testimonial walls. Just results.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
