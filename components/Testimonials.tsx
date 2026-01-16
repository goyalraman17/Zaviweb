'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
    <section ref={ref} className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-zavi-charcoal mb-6">
            Trusted by professionals
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-zavi-paper/50 rounded-xl p-8 border border-zavi-border"
            >
              {/* Quote */}
              <p className="text-base text-zavi-charcoal leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author - clean, minimal */}
              <div>
                <div className="font-semibold text-zavi-charcoal text-sm mb-1">
                  {testimonial.author}
                </div>
                <div className="text-sm text-zavi-gray-text">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
