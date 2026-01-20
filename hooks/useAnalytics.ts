import { useEffect, useRef } from 'react';
import { analytics, AnalyticsEventName } from '@/lib/analytics';

/**
 * Hook to track page views
 */
export function usePageView(path?: string) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pagePath = path || window.location.pathname;
      analytics.pageView(pagePath);
    }
  }, [path]);
}

/**
 * Hook to track scroll depth
 */
export function useScrollDepth() {
  const maxScrollRef = useRef(0);
  const trackedMilestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      // Track max scroll
      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent;
      }

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedMilestonesRef.current.has(milestone)) {
          trackedMilestonesRef.current.add(milestone);
          analytics.track('scroll_depth', {
            depth: milestone,
            page: window.location.pathname,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

/**
 * Hook to track time on page
 */
export function useTimeOnPage() {
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const reportTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000); // in seconds
      analytics.track('time_on_page', {
        duration: timeSpent,
        page: window.location.pathname,
      });
    };

    // Report when user leaves
    window.addEventListener('beforeunload', reportTimeOnPage);

    // Also report at intervals (30s, 60s, 120s, 300s)
    const intervals = [30, 60, 120, 300];
    const timeouts: NodeJS.Timeout[] = [];

    intervals.forEach((seconds) => {
      const timeout = setTimeout(() => {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
        analytics.track('time_on_page', {
          duration: timeSpent,
          milestone: seconds,
          page: window.location.pathname,
        });
      }, seconds * 1000);
      timeouts.push(timeout);
    });

    return () => {
      window.removeEventListener('beforeunload', reportTimeOnPage);
      timeouts.forEach(clearTimeout);
    };
  }, []);
}

/**
 * Hook to track CTA clicks
 */
export function useTrackCTA(location: string) {
  return (ctaText: string, destination?: string) => {
    analytics.track('cta_click', {
      location,
      text: ctaText,
      destination: destination || 'unknown',
    });
  };
}

/**
 * Hook to track demo interactions
 */
export function useTrackDemo() {
  return {
    trackStart: () => analytics.track('demo_start'),
    trackStop: () => analytics.track('demo_stop'),
    trackComplete: (rawLength: number, polishedLength: number) => {
      analytics.track('demo_complete', {
        raw_length: rawLength,
        polished_length: polishedLength,
        compression_ratio: rawLength > 0 ? polishedLength / rawLength : 0,
      });
    },
    trackInsert: () => analytics.track('demo_insert'),
    trackEdit: () => analytics.track('demo_edit'),
    trackUndo: () => analytics.track('demo_undo'),
    trackLanguageChange: (from: string, to: string) => {
      analytics.track('demo_language_change', { from, to });
    },
    trackToneChange: (tone: string) => {
      analytics.track('demo_tone_change', { tone });
    },
  };
}

/**
 * Hook to track pricing interactions
 */
export function useTrackPricing() {
  return {
    trackView: () => analytics.track('pricing_view'),
    trackToggleBilling: (cycle: 'monthly' | 'annual') => {
      analytics.track('pricing_toggle_billing', { cycle });
    },
    trackPlanClick: (plan: string, price?: number) => {
      analytics.track('pricing_plan_click', { plan, price });
    },
  };
}
