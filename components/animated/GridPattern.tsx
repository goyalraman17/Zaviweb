'use client';

import { motion } from 'framer-motion';

interface GridPatternProps {
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  opacity?: number;
  animate?: boolean;
}

export default function GridPattern({
  className = '',
  width = 40,
  height = 40,
  strokeWidth = 1,
  opacity = 0.2,
  animate = true,
}: GridPatternProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d={`M ${width} 0 L 0 0 0 ${height}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-indigo-500"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                animate
                  ? {
                      pathLength: 1,
                      opacity: opacity,
                    }
                  : { pathLength: 1, opacity: opacity }
              }
              transition={{
                pathLength: { duration: 2, ease: 'easeInOut' },
                opacity: { duration: 0.5 },
              }}
            />
          </pattern>

          {/* Gradient overlay for fade effect */}
          <radialGradient id="grid-gradient">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid-pattern)" />

        {/* Fade at edges */}
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-gradient)"
          opacity="0.3"
        />
      </svg>

      {/* Animated dots at intersections */}
      {animate && (
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-indigo-500 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
