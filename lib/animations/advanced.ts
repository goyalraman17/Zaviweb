import { Variants } from 'framer-motion';

/**
 * Advanced animations for world-class landing pages
 * Inspired by Stripe, Linear, Vercel, and Framer
 */

// 3D Card Tilt Effect
export const cardTilt = {
  initial: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Magnetic Hover Effect (for CTAs)
export const magneticHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: [0.23, 1, 0.32, 1],
  },
};

// Text Reveal (character by character)
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

// Scroll-triggered parallax
export const parallaxScroll = (offset: number = 50) => ({
  initial: { y: 0 },
  animate: { y: offset },
  transition: {
    duration: 0.5,
    ease: [0.23, 1, 0.32, 1],
  },
});

// Blob/organic shape float
export const floatingBlob: Variants = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    scale: [1, 1.1, 1],
    rotate: [0, 5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Stagger children with custom delay
export const staggerChildren = (delayChildren: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: delayChildren,
      delayChildren: 0.1,
    },
  },
});

// Scale and rotate on scroll
export const scaleRotateScroll: Variants = {
  initial: { scale: 0.8, rotate: -5, opacity: 0 },
  whileInView: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Glowing border animation
export const glowingBorder = {
  initial: { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' },
  hover: {
    boxShadow: '0 0 20px 5px rgba(99, 102, 241, 0.3)',
    transition: {
      duration: 0.3,
    },
  },
};

// Slide and fade from direction
export const slideFromDirection = (direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom'): Variants => {
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    top: { x: 0, y: -100 },
    bottom: { x: 0, y: 100 },
  };

  return {
    hidden: {
      ...directions[direction],
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };
};

// Elastic bounce
export const elasticBounce: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

// Shimmer loading effect
export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Counter animation (for numbers)
export const counterAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.5,
    ease: [0.23, 1, 0.32, 1],
  },
};

// Morph shape
export const morphShape: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
    },
  },
};

// Perspective card stack
export const cardStack = (index: number): Variants => ({
  initial: {
    y: index * 20,
    scale: 1 - index * 0.05,
    opacity: 1 - index * 0.2,
  },
  hover: {
    y: index * 10,
    scale: 1 - index * 0.02,
    transition: {
      duration: 0.3,
    },
  },
});

// Wave animation (for backgrounds)
export const waveAnimation = {
  animate: {
    d: [
      'M0 100 Q 250 50 500 100 T 1000 100 V 200 H 0 Z',
      'M0 100 Q 250 150 500 100 T 1000 100 V 200 H 0 Z',
      'M0 100 Q 250 50 500 100 T 1000 100 V 200 H 0 Z',
    ],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Typewriter effect config
export const typewriterConfig = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const letterAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Smooth page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: 0.3,
    ease: [0.23, 1, 0.32, 1],
  },
};

// Spotlight effect
export const spotlightEffect = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};
