/**
 * Animation Utility Functions
 * Helper functions for animation logic
 */

import { Transition, Variant } from 'framer-motion';
import { duration, easing, stagger, shouldReduceMotion } from './motionConfig';

// ============================================
// TRANSITION BUILDERS
// ============================================

/**
 * Creates a custom transition with optional overrides
 */
export function createTransition(options?: {
  duration?: number;
  ease?: number[] | string;
  delay?: number;
  type?: 'tween' | 'spring';
}): Transition {
  if (shouldReduceMotion()) {
    return {
      duration: 0.01,
      ease: 'linear',
    };
  }

  return {
    duration: options?.duration ?? duration.base,
    ease: options?.ease ?? easing.smooth,
    delay: options?.delay ?? 0,
    type: options?.type ?? 'tween',
  };
}

/**
 * Creates a spring transition
 */
export function createSpringTransition(options?: {
  stiffness?: number;
  damping?: number;
  mass?: number;
  delay?: number;
}): Transition {
  if (shouldReduceMotion()) {
    return {
      duration: 0.01,
      ease: 'linear',
    };
  }

  return {
    type: 'spring',
    stiffness: options?.stiffness ?? 300,
    damping: options?.damping ?? 30,
    mass: options?.mass ?? 1,
    delay: options?.delay ?? 0,
  };
}

/**
 * Creates a stagger transition for container
 */
export function createStaggerTransition(options?: {
  staggerChildren?: number;
  delayChildren?: number;
  staggerDirection?: 1 | -1;
}): Transition {
  if (shouldReduceMotion()) {
    return {
      staggerChildren: 0,
      delayChildren: 0,
    };
  }

  return {
    staggerChildren: options?.staggerChildren ?? stagger.base,
    delayChildren: options?.delayChildren ?? 0.1,
    staggerDirection: options?.staggerDirection ?? 1,
  };
}

// ============================================
// VARIANT BUILDERS
// ============================================

/**
 * Creates a fade-in variant with custom values
 */
export function createFadeVariant(options?: {
  from?: number;
  to?: number;
  duration?: number;
}): { hidden: Variant; visible: Variant } {
  return {
    hidden: {
      opacity: options?.from ?? 0,
    },
    visible: {
      opacity: options?.to ?? 1,
      transition: createTransition({ duration: options?.duration }),
    },
  };
}

/**
 * Creates a slide variant with custom direction and distance
 */
export function createSlideVariant(options?: {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  fade?: boolean;
  duration?: number;
}): { hidden: Variant; visible: Variant } {
  const direction = options?.direction ?? 'up';
  const distance = options?.distance ?? 20;
  const fade = options?.fade ?? true;

  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const multiplier = direction === 'up' || direction === 'left' ? 1 : -1;

  return {
    hidden: {
      [axis]: distance * multiplier,
      ...(fade && { opacity: 0 }),
    },
    visible: {
      [axis]: 0,
      ...(fade && { opacity: 1 }),
      transition: createTransition({ duration: options?.duration }),
    },
  };
}

/**
 * Creates a scale variant
 */
export function createScaleVariant(options?: {
  from?: number;
  to?: number;
  fade?: boolean;
  duration?: number;
}): { hidden: Variant; visible: Variant } {
  const fade = options?.fade ?? true;

  return {
    hidden: {
      scale: options?.from ?? 0.95,
      ...(fade && { opacity: 0 }),
    },
    visible: {
      scale: options?.to ?? 1,
      ...(fade && { opacity: 1 }),
      transition: createTransition({ duration: options?.duration }),
    },
  };
}

// ============================================
// ANIMATION TIMING HELPERS
// ============================================

/**
 * Calculates stagger delay for an item at given index
 */
export function getStaggerDelay(
  index: number,
  baseDelay: number = stagger.base,
  initialDelay: number = 0
): number {
  if (shouldReduceMotion()) return 0;
  return initialDelay + (index * baseDelay);
}

/**
 * Calculates cascade delay (exponential stagger)
 */
export function getCascadeDelay(
  index: number,
  baseDelay: number = stagger.base,
  multiplier: number = 1.2
): number {
  if (shouldReduceMotion()) return 0;
  return baseDelay * Math.pow(multiplier, index);
}

// ============================================
// SCROLL UTILITIES
// ============================================

/**
 * Calculates scroll progress percentage
 */
export function getScrollProgress(
  scrollY: number,
  elementTop: number,
  elementHeight: number,
  windowHeight: number
): number {
  const start = elementTop - windowHeight;
  const end = elementTop + elementHeight;
  const distance = end - start;
  const progress = (scrollY - start) / distance;

  return Math.max(0, Math.min(1, progress));
}

/**
 * Maps scroll progress to value range
 */
export function mapScrollToRange(
  progress: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number {
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;

  const clampedProgress = Math.max(inMin, Math.min(inMax, progress));
  const normalizedProgress = (clampedProgress - inMin) / (inMax - inMin);

  return outMin + normalizedProgress * (outMax - outMin);
}

// ============================================
// PERFORMANCE UTILITIES
// ============================================

/**
 * Checks if element will cause layout shift
 */
export function willCauseLayoutShift(property: string): boolean {
  const layoutAffectingProps = [
    'width', 'height', 'top', 'left', 'right', 'bottom',
    'margin', 'padding', 'border', 'font-size', 'line-height'
  ];

  return layoutAffectingProps.some(prop => property.includes(prop));
}

/**
 * Gets GPU-accelerated CSS properties only
 */
export function getGPUProperties(style: Record<string, any>): Record<string, any> {
  const gpuProps = ['opacity', 'transform', 'filter', 'backdrop-filter'];

  return Object.keys(style).reduce((acc, key) => {
    if (gpuProps.some(prop => key.includes(prop))) {
      acc[key] = style[key];
    }
    return acc;
  }, {} as Record<string, any>);
}

/**
 * Applies will-change hint for optimization
 */
export function getWillChange(...properties: string[]): string {
  if (shouldReduceMotion()) return 'auto';
  return properties.join(', ');
}

// ============================================
// ACCESSIBILITY UTILITIES
// ============================================

/**
 * Wraps animation function with reduced motion check
 */
export function withReducedMotion<T>(
  animatedValue: T,
  staticValue: T
): T {
  return shouldReduceMotion() ? staticValue : animatedValue;
}

/**
 * Gets ARIA attributes for animated elements
 */
export function getAnimationARIA(isAnimating: boolean) {
  return {
    'aria-live': isAnimating ? 'polite' : 'off',
    'aria-busy': isAnimating,
  };
}

// ============================================
// DEBUGGING UTILITIES
// ============================================

/**
 * Logs animation performance metrics
 */
export function debugAnimationPerformance(
  name: string,
  startTime: number,
  endTime: number
) {
  if (process.env.NODE_ENV === 'development') {
    const duration = endTime - startTime;
    const fps = 1000 / duration;

    console.log(`Animation: ${name}`);
    console.log(`Duration: ${duration.toFixed(2)}ms`);
    console.log(`Approximate FPS: ${fps.toFixed(2)}`);

    if (fps < 60) {
      console.warn(`⚠️ Animation "${name}" may be janky (${fps.toFixed(2)} FPS)`);
    }
  }
}

/**
 * Validates animation configuration
 */
export function validateAnimationConfig(config: any): boolean {
  if (config.duration && config.duration > 1) {
    console.warn('⚠️ Animation duration > 1s may feel slow');
  }

  if (config.delay && config.delay > 0.5) {
    console.warn('⚠️ Animation delay > 500ms may feel unresponsive');
  }

  return true;
}
