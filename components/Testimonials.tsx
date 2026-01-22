'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TiltCard from './animated/TiltCard';

const testimonials = [
  {
    quote: "The writing quality is noticeably better than standard dictation. My emails sound like I typed them.",
    author: "Sarah Chen",
    role: "Product Manager",
  },
  {
    quote: "Saves me 15 minutes every day. I draft responses while walking between meetings.",
    author: "Marcus Rodriguez",
    role: "Operations Lead",
  },
  {
    quote: "Privacy-first design. Mic only activates when I press it. No recordings stored anywhere.",
    author: "Priya Patel",
    role: "Security Engineer",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-indigo-50/50 via-white to-violet-50/50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm font-semibold text-indigo-600 tracking-wider uppercase">Testimonials</span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-6">
            Trusted by professionals
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <TiltCard
                tiltAmount={8}
                scale={1.03}
                className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 relative overflow-hidden hover:shadow-2xl transition-shadow h-full"
              >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-full blur-2xl" />
              <svg className="w-10 h-10 text-indigo-600/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-base text-gray-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
