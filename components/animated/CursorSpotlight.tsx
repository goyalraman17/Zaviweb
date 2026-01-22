'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface CursorSpotlightProps {
  size?: number;
  blur?: number;
  color?: string;
  intensity?: number;
}

export default function CursorSpotlight({
  size = 600,
  blur = 100,
  color = 'rgba(99, 102, 241, 0.15)',
  intensity = 1,
}: CursorSpotlightProps) {
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        opacity: isVisible ? intensity : 0,
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          left: mouseX,
          top: mouseY,
          x: '-50%',
          y: '-50%',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
        }}
      />
    </motion.div>
  );
}
