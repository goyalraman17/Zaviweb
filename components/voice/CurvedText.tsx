'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

interface CurvedTextProps {
  text: string;
  subtitle?: string;
  variant?: 'swirl' | 'arc' | 'wave';
  className?: string;
}

export default function CurvedText({
  text,
  subtitle,
  variant = 'swirl',
  className = ''
}: CurvedTextProps) {
  const pathVariants = {
    swirl: "M 50,200 Q 100,50 250,100 T 450,200",
    arc: "M 50,150 Q 250,50 450,150",
    wave: "M 50,150 Q 150,100 250,150 T 450,150"
  };

  const selectedPath = pathVariants[variant];

  return (
    <motion.div
      {...fadeIn}
      className={`relative overflow-visible ${className}`}
    >
      <svg
        viewBox="0 0 500 250"
        className="w-full h-auto"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <path
            id={`curve-${variant}`}
            d={selectedPath}
            fill="none"
          />

          {/* Gradient for text */}
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9B86BD" />
            <stop offset="50%" stopColor="#B8A6D4" />
            <stop offset="100%" stopColor="#9B86BD" />
          </linearGradient>
        </defs>

        {/* Decorative path stroke */}
        <motion.path
          d={selectedPath}
          stroke="#E8DFD0"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Curved text */}
        <text className="text-lg md:text-xl lg:text-2xl font-light" fill="url(#textGradient)">
          <textPath
            href={`#curve-${variant}`}
            startOffset="50%"
            textAnchor="middle"
            className="font-serif italic"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
          >
            {text}
          </textPath>
        </text>

        {/* Animated dots along path */}
        <motion.circle
          r="4"
          fill="#9B86BD"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            offsetPath: `path("${selectedPath}")`,
          }}
        >
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
          >
            <mpath href={`#curve-${variant}`} />
          </animateMotion>
        </motion.circle>
      </svg>

      {/* Optional subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-sm md:text-base text-[#9B86BD] font-medium mt-4"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

// Preset variants for common use cases
export function CurvedTextChaotic() {
  return (
    <CurvedText
      text="Honestly things been kind of chaotic…"
      subtitle="Your natural voice"
      variant="swirl"
      className="py-8"
    />
  );
}

export function CurvedTextPolished() {
  return (
    <CurvedText
      text="Removed filler words · Perfect grammar · Professional tone"
      subtitle="Instant transformation"
      variant="arc"
      className="py-8"
    />
  );
}

export function CurvedTextFeature() {
  return (
    <CurvedText
      text="Speak freely, sound professional"
      variant="wave"
      className="py-6"
    />
  );
}
