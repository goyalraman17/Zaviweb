'use client';

import { motion } from 'framer-motion';

interface MorphingBlobProps {
  className?: string;
  color?: string;
  size?: number;
  duration?: number;
}

export default function MorphingBlob({
  className = '',
  color = 'rgba(99, 102, 241, 0.3)',
  size = 300,
  duration = 20,
}: MorphingBlobProps) {
  return (
    <div className={`absolute ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.5 }} />
          </linearGradient>
          <filter id="blob-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          </filter>
        </defs>

        <motion.path
          fill="url(#blob-gradient)"
          filter="url(#blob-blur)"
          animate={{
            d: [
              'M47.1,-57.1C59.9,-45.4,68.5,-28.9,71.1,-11.1C73.7,6.7,70.3,25.9,60.6,40.4C50.9,54.9,34.9,64.7,17.4,69.4C-0.1,74.1,-19.1,73.8,-35.5,67.1C-51.9,60.4,-65.7,47.3,-72.3,31.4C-78.9,15.5,-78.3,-3.2,-72.1,-19.5C-65.9,-35.8,-54.1,-49.7,-40.1,-61.1C-26.1,-72.5,-10,-81.4,4.1,-86.2C18.2,-91,34.3,-68.8,47.1,-57.1Z',
              'M39.4,-49.1C54.4,-39.3,71.9,-30.5,76.6,-17.9C81.3,-5.3,73.2,11.1,64.3,26.1C55.4,41.1,45.7,54.7,32.4,62.4C19.1,70.1,2.2,71.9,-13.5,68.5C-29.2,65.1,-43.7,56.5,-54.8,44.6C-65.9,32.7,-73.6,17.6,-74.4,1.9C-75.2,-13.8,-69.1,-30.1,-58.7,-42.5C-48.3,-54.9,-33.6,-63.4,-19.2,-71.3C-4.8,-79.2,9.3,-86.5,21.1,-85.1C32.9,-83.7,42.4,-73.6,47.1,-61.5C51.8,-49.4,51.7,-35.3,47.4,-22.8C43.1,-10.3,34.6,0.6,28.9,10.5C23.2,20.4,20.3,29.3,15.1,36.8C9.9,44.3,2.4,50.4,-6.5,52.9C-15.4,55.4,-25.7,54.3,-34.8,49.5C-43.9,44.7,-51.8,36.2,-55.9,26C-60,15.8,-60.3,4,-57.1,-6.5C-53.9,-17,-47.2,-26.2,-38.8,-34.6C-30.4,-43,-20.3,-50.6,-9.3,-56.2C1.7,-61.8,24.4,-58.9,39.4,-49.1Z',
              'M47.1,-57.1C59.9,-45.4,68.5,-28.9,71.1,-11.1C73.7,6.7,70.3,25.9,60.6,40.4C50.9,54.9,34.9,64.7,17.4,69.4C-0.1,74.1,-19.1,73.8,-35.5,67.1C-51.9,60.4,-65.7,47.3,-72.3,31.4C-78.9,15.5,-78.3,-3.2,-72.1,-19.5C-65.9,-35.8,-54.1,-49.7,-40.1,-61.1C-26.1,-72.5,-10,-81.4,4.1,-86.2C18.2,-91,34.3,-68.8,47.1,-57.1Z',
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: duration,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}
