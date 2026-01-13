'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    quote: "Zavi has completely changed how I respond to messages. I can walk and compose detailed emails at the same time. The AI cleanup is so good, no one knows I'm using voice.",
    author: "Sarah Chen",
    role: "Product Manager",
    rating: 5
  },
  {
    quote: "As a content creator, I was skeptical about voice typing. But Zavi actually understands context and structure. I've written entire blog posts while commuting. Game changer.",
    author: "Marcus Rodriguez",
    role: "Tech Blogger",
    rating: 5
  },
  {
    quote: "The privacy-first approach sold me. No recordings stored, mic only on when I tap—exactly what I needed. Plus the text quality is better than any voice tool I've tried.",
    author: "Priya Patel",
    role: "Privacy Advocate",
    rating: 5
  }
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-gradient-to-b from-white to-zavi-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zavi-gray-900 mb-6">
            Loved by users worldwide
          </h2>
          <p className="text-lg md:text-xl text-zavi-gray-600 max-w-2xl mx-auto">
            Join thousands who've already made the switch
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zavi-gray-100 hover:shadow-lg transition-shadow"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 1L12.5 7.5H19L14 11.5L16 18L10 14L4 18L6 11.5L1 7.5H7.5L10 1Z"
                      fill="#1a8cff"
                    />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-base text-zavi-gray-700 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zavi-blue-400 to-zavi-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-zavi-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-zavi-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
