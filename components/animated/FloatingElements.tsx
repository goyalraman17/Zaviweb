'use client';

import { motion } from 'framer-motion';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export default function FloatingElements({ count = 5, className = '' }: FloatingElementsProps) {
  const elements = Array.from({ length: count });

  const randomDelay = () => Math.random() * 2;
  const randomDuration = () => 15 + Math.random() * 10;
  const randomSize = () => 100 + Math.random() * 200;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: randomSize(),
            height: randomSize(),
            background: `radial-gradient(circle, ${
              i % 3 === 0
                ? 'rgba(99, 102, 241, 0.4)'
                : i % 3 === 1
                ? 'rgba(139, 92, 246, 0.4)'
                : 'rgba(59, 130, 246, 0.4)'
            } 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: randomDuration(),
            repeat: Infinity,
            delay: randomDelay(),
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
