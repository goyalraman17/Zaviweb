'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TiltCard from './animated/TiltCard';
import JsonLd from '@/components/SEO/JsonLd';
import { generateReviewSchema } from '@/lib/schemaData';

const testimonials = [
  {
    quote: "I told Zavi to summarize my emails every morning on WhatsApp. I haven't opened Gmail in a week. This is genuinely life-changing.",
    author: "Sarah Chen",
    role: "Product Manager",
    rating: 5,
  },
  {
    quote: "The background agents are insane. I set one to watch Slack for incidents and text me. It caught a P0 at 2 AM before anyone else noticed.",
    author: "Marcus Rodriguez",
    role: "Engineering Lead",
    rating: 5,
  },
  {
    quote: "Privacy-first design. Mic only activates when I press it. No recordings stored. The only voice tool my security team approved.",
    author: "Priya Patel",
    role: "Security Engineer",
    rating: 5,
  },
  {
    quote: "Ditched Wispr Flow ($12/mo) and Zapier ($20/mo). Zavi does both — voice typing AND automations — for $7.99. On every platform.",
    author: "David Kim",
    role: "Software Engineer",
    rating: 5,
  },
  {
    quote: "I dictate in Spanish and it types perfect English emails. The Magic Wand lets me highlight any text and say 'make this formal' — it just works.",
    author: "Elena Rossi",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote: "I said 'draft replies to my 5 urgent emails' while driving. By the time I parked, all 5 drafts were ready for review. This is Jarvis.",
    author: "James Holden",
    role: "Startup Founder",
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
          <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">Real users. Real results.</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-6">
            Loved by people who hate typing
          </h2>
        </motion.div>

        {/* Infinite Marquee Container */}
        <div className="relative overflow-hidden w-full max-w-[100vw] py-8" style={{ touchAction: 'pan-y' }}>
          {/* Left and Right Gradient Masks for smooth fade-out */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

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
              // Pause on hover (desktop) and touch start (mobile)
              whileHover={{ animationPlayState: 'paused' }}
              style={{ touchAction: 'pan-y' }}
            >
              {/* Double the array to ensure an infinite seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="w-[300px] sm:w-[350px] md:w-[450px] flex-shrink-0">
                  <div itemScope itemProp="review" itemType="https://schema.org/Review" className="h-full">
                    <TiltCard
                      tiltAmount={8}
                      scale={1.03}
                      className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 relative overflow-hidden hover:shadow-2xl transition-shadow h-full"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-sky-500/5 rounded-full blur-2xl" />
                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
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

        {/* CTA after social proof */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/#download"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-[#0a0a0a] rounded-xl hover:bg-[#1a1a1a] transition-all"
          >
            Join them — download Zavi free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
