'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export default function InfiniteMarquee({
  children,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: InfiniteMarqueeProps) {
  const directionMultiplier = direction === 'left' ? -1 : 1;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-8"
        animate={{
          x: directionMultiplier * -50 + '%',
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : {}}
      >
        {/* Duplicate content for seamless loop */}
        <div className="flex gap-8">{children}</div>
        <div className="flex gap-8" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
