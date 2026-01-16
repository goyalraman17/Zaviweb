'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { pageTransition } from '@/lib/animations';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Reusable page transition wrapper
 * Can be used for individual sections or full page transitions
 */
export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      style={{ willChange: 'opacity' }}
    >
      {children}
    </motion.div>
  );
}
