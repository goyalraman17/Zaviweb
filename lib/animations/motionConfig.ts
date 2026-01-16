/**
 * Global Motion System Configuration
 * Centralized animation settings for the entire application
 *
 * Performance Notes:
 * - All animations use only transform and opacity (GPU-accelerated)
 * - Durations optimized for 60fps on mobile
 * - Reduced motion support built-in
 */

// ============================================
// DURATION SCALE
// ============================================
export const duration = {
  fast: 0.2,      // Micro-interactions, hovers
  base: 0.4,      // Standard transitions
  slow: 0.6,      // Entrance animations, major transitions
  slower: 0.8,    // Hero sections, dramatic reveals
} as const;

// ============================================
// PREMIUM EASING CURVES
// ============================================
export const easing = {
  // Smooth, natural easing for most transitions
  smooth: [0.22, 1, 0.36, 1],

  // Snappy, responsive easing for micro-interactions
  snappy: [0.4, 0, 0.2, 1],

  // Gentle, flowing easing for entrances
  gentle: [0.25, 0.46, 0.45, 0.94],

  // Spring-like easing for playful interactions
  spring: [0.68, -0.55, 0.265, 1.55],

  // Emphasized easing for important actions
  emphasized: [0.83, 0, 0.17, 1],
} as const;

// ============================================
// STAGGER RULES
// ============================================
export const stagger = {
  fast: 0.05,     // Quick succession
  base: 0.1,      // Standard stagger
  slow: 0.15,     // Deliberate reveals
  slower: 0.2,    // Dramatic sequences
} as const;

// ============================================
// MOTION VALUES
// ============================================
export const motion = {
  // Y-axis movement (GPU-safe)
  y: {
    small: 10,
    base: 20,
    large: 40,
  },

  // Scale transforms
  scale: {
    subtle: 1.02,
    base: 1.05,
    lift: 1.1,
  },

  // Opacity values
  opacity: {
    hidden: 0,
    subtle: 0.6,
    visible: 1,
  },
} as const;

// ============================================
// REDUCED MOTION SUPPORT
// ============================================
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Gets motion-safe transition settings
 * Returns instant transitions if user prefers reduced motion
 */
export const getTransition = (
  customDuration?: number,
  customEasing?: readonly number[] | number[]
) => {
  if (shouldReduceMotion()) {
    return {
      duration: 0.01,
      ease: 'linear' as const,
    };
  }

  return {
    duration: customDuration ?? duration.base,
    ease: customEasing ?? easing.smooth,
  };
};

/**
 * Gets motion-safe stagger settings
 */
export const getStagger = (staggerDelay: number = stagger.base) => {
  if (shouldReduceMotion()) {
    return 0;
  }
  return staggerDelay;
};

// ============================================
// VIEWPORT THRESHOLDS
// ============================================
export const viewport = {
  // How much of element must be visible to trigger
  amount: 0.3,

  // Trigger once or every time
  once: true,

  // Margin before trigger (negative = earlier trigger)
  margin: '-100px',
} as const;

// ============================================
// TYPE EXPORTS
// ============================================
export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
export type Stagger = keyof typeof stagger;
