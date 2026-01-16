'use client';

import { motion } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useScrollAnimation, scrollReveal, getTransition } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fadeUp' | 'fade' | 'scale';
}

/**
 * Reusable animated section wrapper using global motion system
 * Triggers animation when element enters viewport
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  variant = 'fadeUp'
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useScrollAnimation(ref);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scrollReveal}
      transition={getTransition(undefined, undefined)}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
