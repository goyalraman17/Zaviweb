'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  duration?: number;
  delay?: number;
  className?: string;
}

export default function RevealOnScroll({
  children,
  direction = 'bottom',
  duration = 0.8,
  delay = 0,
  className = '',
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const clipPaths = {
    left: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0% 0 0)',
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0)',
    },
    top: {
      hidden: 'inset(0 0 100% 0)',
      visible: 'inset(0 0 0% 0)',
    },
    bottom: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0% 0 0 0)',
    },
    center: {
      hidden: 'circle(0% at 50% 50%)',
      visible: 'circle(100% at 50% 50%)',
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        clipPath: clipPaths[direction].hidden,
        opacity: 0,
      }}
      animate={
        isInView
          ? {
              clipPath: clipPaths[direction].visible,
              opacity: 1,
            }
          : {
              clipPath: clipPaths[direction].hidden,
              opacity: 0,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
