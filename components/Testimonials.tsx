'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TiltCard from './animated/TiltCard';
import JsonLd from '@/components/SEO/JsonLd';
import { generateReviewSchema } from '@/lib/schemaData';

const testimonials = [
  {
    quote: "The writing quality is noticeably better than standard dictation. My emails sound like I typed them.",
    author: "Sarah Chen",
    role: "Product Manager",
    rating: 5,
  },
  {
    quote: "Saves me 15 minutes every day. I draft responses while walking between meetings.",
    author: "Marcus Rodriguez",
    role: "Operations Lead",
    rating: 5,
  },
  {
    quote: "Privacy-first design. Mic only activates when I press it. No recordings stored anywhere.",
    author: "Priya Patel",
    role: "Security Engineer",
    rating: 5,
  },
  {
    quote: "I ditched my $12/mo Wispr Flow subscription. Zavi is faster, cheaper, and works on my Android phone too.",
    author: "David Kim",
    role: "Software Engineer",
    rating: 5,
  },
  {
    quote: "The multi-language translation is insane. I dictate in Spanish and it instantly types perfect English emails to my clients.",
    author: "Elena Rossi",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote: "Finally a dictation tool that doesn't make me sound like a robot. The 'Witty' tone setting is my secret weapon.",
    author: "James Holden",
    role: "Copywriter",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reviewSchema = generateReviewSchema(
    testimonials.map(t => ({ author: t.author, role: t.role, content: t.quote }))
  );

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/50">
      <JsonLd data={reviewSchema} />
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">Testimonials</span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-6">
            Trusted by professionals
          </h2>
        </motion.div>

        {/* Infinite Marquee Container */}
        <div className="relative overflow-hidden w-full max-w-[100vw] py-8">
          {/* Left and Right Gradient Masks for smooth fade-out */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          <div className="flex">
            <motion.div
              className="flex gap-8 px-4"
              animate={{
                x: ["0%", "-50%"]
              }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
            >
              {/* Double the array to ensure an infinite seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="w-[350px] md:w-[450px] flex-shrink-0">
                  <div itemScope itemProp="review" itemType="https://schema.org/Review" className="h-full">
                    <TiltCard
                      tiltAmount={8}
                      scale={1.03}
                      className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 relative overflow-hidden hover:shadow-2xl transition-shadow h-full"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-sky-500/5 rounded-full blur-2xl" />
                      <svg className="w-10 h-10 text-blue-600/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-base text-gray-700 leading-relaxed mb-6 relative z-10" itemProp="reviewBody">
                        "{testimonial.quote}"
                      </p>
                      <div className="sr-only" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                        <meta itemProp="ratingValue" content={String(testimonial.rating)} />
                        <meta itemProp="bestRating" content="5" />
                      </div>
                      <div className="sr-only" itemProp="itemReviewed" itemScope itemType="https://schema.org/SoftwareApplication">
                        <meta itemProp="name" content="Zavi AI" />
                      </div>

                      <div className="flex items-center gap-3 relative z-10" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-semibold text-sm">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm" itemProp="name">
                            {testimonial.author}
                          </div>
                          <div className="text-xs text-gray-500">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
