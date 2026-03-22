/**
 * Global Motion System
 * Centralized animation system for the entire application
 *
 * Usage:
 *
 * ```tsx
 * import { fadeUp, duration, easing, useScrollAnimation } from '@/lib/animations';
 *
 * function MyComponent() {
 *   const ref = useRef(null);
 *   const isInView = useScrollAnimation(ref);
 *
 *   return (
 *     <motion.div
 *       ref={ref}
 *       initial="hidden"
 *       animate={isInView ? "visible" : "hidden"}
 *       variants={fadeUp}
 *     >
 *       Content
 *     </motion.div>
 *   );
 * }
 * ```
 */

// Configuration
export {
  duration,
  easing,
  stagger,
  motion,
  viewport,
  shouldReduceMotion,
  getTransition,
  getStagger,
  type Duration,
  type Easing,
  type Stagger,
} from './motionConfig';

// Variants
export {
  fadeIn,
  fadeUp,
  fadeUpLarge,
  fadeDown,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  hoverLift,
  hoverScale,
  hoverScaleSubtle,
  pressCompression,
  tapFeedback,
  ctaPrimary,
  ctaSecondary,
  navItem,
  navItemActive,
  focusRing,
  errorShake,
  successPop,
  loadingSpinner,
  disabled,
  scrollReveal,
  headerReveal,
  pageTransition,
  modalBackdrop,
  modalContent,
} from './variants';

// Hooks
export {
  useScrollAnimation,
  useStaggerDelay,
  useParallax,
  useScrollOpacity,
  useScrollY,
  useScrollThreshold,
  useHeaderScroll,
  useHover,
  useFocus,
  useIntersection,
  useReducedMotion,
  useViewportSize,
} from './hooks';

// Utils
export {
  createTransition,
  createSpringTransition,
  createStaggerTransition,
  createFadeVariant,
  createSlideVariant,
  createScaleVariant,
  getStaggerDelay,
  getCascadeDelay,
  getScrollProgress,
  mapScrollToRange,
  willCauseLayoutShift,
  getGPUProperties,
  getWillChange,
  withReducedMotion,
  getAnimationARIA,
  debugAnimationPerformance,
  validateAnimationConfig,
} from './utils';
