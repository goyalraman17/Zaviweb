'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export default function ScrollProgress({
  color = '#6366F1',
  height = 3,
  position = 'top',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 z-50 origin-left"
      style={{
        [position]: 0,
        scaleX,
        height: `${height}px`,
        background: `linear-gradient(90deg, ${color}, #8B5CF6)`,
      }}
    />
  );
}
