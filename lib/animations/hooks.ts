/**
 * Custom Animation Hooks
 * Reusable hooks for common animation patterns
 */

import { useEffect, useState, RefObject } from 'react';
import { useInView, useScroll, useTransform, MotionValue } from 'framer-motion';
import { viewport, shouldReduceMotion } from './motionConfig';

// ============================================
// VIEWPORT INTERSECTION HOOKS
// ============================================

/**
 * Hook for scroll-triggered entrance animations
 * Returns true when element enters viewport
 *
 * @param ref - React ref to the element to observe
 * @param options - Override default viewport options
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  options?: {
    amount?: number;
    once?: boolean;
    margin?: string;
  }
) {
  const isInView = useInView(ref, {
    amount: options?.amount ?? viewport.amount,
    once: options?.once ?? viewport.once,
    margin: (options?.margin ?? viewport.margin) as any,
  });

  // If reduced motion is preferred, always return true (no animation)
  if (shouldReduceMotion()) {
    return true;
  }

  return isInView;
}

/**
 * Hook for staggered animation timing
 * Returns delay based on index and base delay
 *
 * @param index - Index of the item in the list
 * @param baseDelay - Base delay in seconds
 */
export function useStaggerDelay(index: number, baseDelay: number = 0.1): number {
  if (shouldReduceMotion()) {
    return 0;
  }
  return index * baseDelay;
}

// ============================================
// SCROLL PROGRESS HOOKS
// ============================================

/**
 * Hook for scroll-based parallax effects
 * Returns scroll progress value
 *
 * @param ref - React ref to the element
 */
export function useParallax(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // If reduced motion, return static value
  if (shouldReduceMotion()) {
    const staticValue = {
      get: () => 0,
      set: () => {},
    } as MotionValue<number>;
    return staticValue;
  }

  return scrollYProgress;
}

/**
 * Hook for scroll-based opacity fade
 */
export function useScrollOpacity(ref: RefObject<HTMLElement>) {
  const scrollProgress = useParallax(ref);

  return useTransform(
    scrollProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );
}

/**
 * Hook for scroll-based Y transform
 */
export function useScrollY(
  ref: RefObject<HTMLElement>,
  distance: number = 100
) {
  const scrollProgress = useParallax(ref);

  return useTransform(
    scrollProgress,
    [0, 1],
    [0, distance]
  );
}

// ============================================
// HEADER SCROLL HOOKS
// ============================================

/**
 * Hook for detecting scroll past threshold
 * Returns true when scrolled past threshold
 *
 * @param threshold - Scroll threshold in pixels
 */
export function useScrollThreshold(threshold: number = 50): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // If reduced motion, don't animate
    if (shouldReduceMotion()) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}

/**
 * Hook for header scroll state with direction
 * Returns object with scroll position and direction
 */
export function useHeaderScroll() {
  const [scrollState, setScrollState] = useState({
    isScrolled: false,
    isScrollingDown: false,
    scrollY: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;

      setScrollState({
        isScrolled: scrollY > 50,
        isScrollingDown: scrollY > lastScrollY && scrollY > 50,
        scrollY,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Initial check
    updateScrollState();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
}

// ============================================
// HOVER STATE HOOKS
// ============================================

/**
 * Hook for managing hover state
 * Returns hover state and handlers
 */
export function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  return {
    isHovered,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };
}

// ============================================
// FOCUS STATE HOOKS
// ============================================

/**
 * Hook for managing focus state
 * Returns focus state and handlers
 */
export function useFocus() {
  const [isFocused, setIsFocused] = useState(false);

  return {
    isFocused,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };
}

// ============================================
// INTERSECTION OBSERVER HOOK
// ============================================

/**
 * Hook for manual intersection observer
 * More flexible than useInView
 */
export function useIntersection(
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: options?.threshold ?? 0.3,
        rootMargin: options?.rootMargin ?? '-100px',
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}

// ============================================
// REDUCED MOTION HOOK
// ============================================

/**
 * Hook to check if user prefers reduced motion
 * Updates on preference change
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    shouldReduceMotion()
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

// ============================================
// VIEWPORT SIZE HOOK
// ============================================

/**
 * Hook to get viewport dimensions
 * Useful for responsive animations
 */
export function useViewportSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
