/**
 * Reusable Animation Variants
 * Standardized motion patterns for the entire application
 */

import { Variants } from 'framer-motion';
import { duration, easing, motion, getTransition, stagger } from './motionConfig';

// ============================================
// ENTRANCE ANIMATIONS
// ============================================

/**
 * Fade in animation (opacity only)
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: motion.opacity.hidden,
  },
  visible: {
    opacity: motion.opacity.visible,
    transition: getTransition(duration.base, easing.smooth),
  },
};

/**
 * Fade up animation (opacity + y-axis)
 * Standard entrance for most content
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: motion.opacity.hidden,
    y: motion.y.base,
  },
  visible: {
    opacity: motion.opacity.visible,
    y: 0,
    transition: getTransition(duration.slow, easing.smooth),
  },
};

/**
 * Fade up with larger movement
 * For hero sections and dramatic entrances
 */
export const fadeUpLarge: Variants = {
  hidden: {
    opacity: motion.opacity.hidden,
    y: motion.y.large,
  },
  visible: {
    opacity: motion.opacity.visible,
    y: 0,
    transition: getTransition(duration.slower, easing.gentle),
  },
};

/**
 * Fade down animation (for headers/navigation)
 */
export const fadeDown: Variants = {
  hidden: {
    opacity: motion.opacity.hidden,
    y: -motion.y.base,
  },
  visible: {
    opacity: motion.opacity.visible,
    y: 0,
    transition: getTransition(duration.base, easing.smooth),
  },
};

// ============================================
// STAGGERED CONTAINER ANIMATIONS
// ============================================

/**
 * Container for staggered children (fast)
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: motion.opacity.hidden },
  visible: {
    opacity: motion.opacity.visible,
    transition: {
      staggerChildren: stagger.fast,
      delayChildren: 0.1,
    },
  },
};

/**
 * Container for staggered children (base)
 */
export const staggerContainer: Variants = {
  hidden: { opacity: motion.opacity.hidden },
  visible: {
    opacity: motion.opacity.visible,
    transition: {
      staggerChildren: stagger.base,
      delayChildren: 0.15,
    },
  },
};

/**
 * Container for staggered children (slow)
 */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: motion.opacity.hidden },
  visible: {
    opacity: motion.opacity.visible,
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// HOVER ANIMATIONS
// ============================================

/**
 * Subtle lift on hover (for cards, buttons)
 */
export const hoverLift = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: getTransition(duration.fast, easing.snappy),
  },
};

/**
 * Scale up on hover (for icons, images)
 */
export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: motion.scale.base,
    transition: getTransition(duration.fast, easing.snappy),
  },
};

/**
 * Subtle scale for buttons
 */
export const hoverScaleSubtle = {
  rest: { scale: 1 },
  hover: {
    scale: motion.scale.subtle,
    transition: getTransition(duration.fast, easing.snappy),
  },
};

// ============================================
// PRESS/TAP ANIMATIONS
// ============================================

/**
 * Press compression feedback
 */
export const pressCompression = {
  scale: 0.97,
  transition: getTransition(duration.fast, easing.snappy),
};

/**
 * Tap feedback for mobile
 */
export const tapFeedback = {
  scale: 0.95,
  transition: { duration: 0.1 },
};

// ============================================
// CTA EMPHASIS ANIMATIONS
// ============================================

/**
 * Primary CTA hover (lift + scale)
 */
export const ctaPrimary = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: getTransition(duration.fast, easing.snappy),
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/**
 * Secondary CTA hover (subtle scale only)
 */
export const ctaSecondary = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: getTransition(duration.fast, easing.snappy),
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// ============================================
// NAVIGATION ANIMATIONS
// ============================================

/**
 * Nav item hover
 */
export const navItem = {
  rest: {
    opacity: 0.8,
    y: 0,
  },
  hover: {
    opacity: 1,
    y: -1,
    transition: getTransition(duration.fast, easing.snappy),
  },
};

/**
 * Active nav item state
 */
export const navItemActive: Variants = {
  inactive: {
    opacity: 0.8,
    scale: 1,
  },
  active: {
    opacity: 1,
    scale: 1.05,
    transition: getTransition(duration.base, easing.emphasized),
  },
};

// ============================================
// FORM FIELD ANIMATIONS
// ============================================

/**
 * Focus state for form fields
 */
export const focusRing: Variants = {
  idle: {
    scale: 1,
    opacity: 0,
  },
  focused: {
    scale: 1,
    opacity: 1,
    transition: getTransition(duration.fast, easing.snappy),
  },
};

/**
 * Error state animation
 */
export const errorShake: Variants = {
  idle: { x: 0 },
  error: {
    x: [-5, 5, -5, 5, 0],
    transition: {
      duration: 0.4,
      ease: easing.snappy,
    },
  },
};

/**
 * Success state animation
 */
export const successPop: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// ============================================
// LOADING STATES
// ============================================

/**
 * Loading spinner rotation
 */
export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

/**
 * Disabled state (reduced opacity)
 */
export const disabled: Variants = {
  enabled: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
    transition: getTransition(duration.fast, easing.smooth),
  },
};

// ============================================
// SCROLL-BASED ANIMATIONS
// ============================================

/**
 * Scroll reveal (for viewport entry)
 */
export const scrollReveal: Variants = {
  hidden: {
    opacity: motion.opacity.hidden,
    y: motion.y.base,
  },
  visible: {
    opacity: motion.opacity.visible,
    y: 0,
    transition: getTransition(duration.slow, easing.smooth),
  },
};

/**
 * Header background reveal on scroll - Wispr Flow Style
 */
export const headerReveal: Variants = {
  top: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    backdropFilter: 'blur(0px)',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
  },
  visible: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    transition: getTransition(duration.base, easing.smooth),
  },
  scrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: getTransition(duration.base, easing.smooth),
  },
};

// ============================================
// PAGE TRANSITION ANIMATIONS
// ============================================

/**
 * Page fade transition
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: getTransition(duration.base, easing.smooth),
  },
  exit: {
    opacity: 0,
    transition: getTransition(duration.fast, easing.smooth),
  },
};

// ============================================
// MODAL/OVERLAY ANIMATIONS
// ============================================

/**
 * Modal backdrop animation
 */
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: getTransition(duration.base, easing.smooth),
  },
};

/**
 * Modal content animation
 */
export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: getTransition(duration.base, easing.emphasized),
  },
};
