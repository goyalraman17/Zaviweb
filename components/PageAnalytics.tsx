'use client';

import { usePageView, useScrollDepth, useTimeOnPage } from '@/hooks/useAnalytics';

/**
 * Page-level analytics tracking component
 * Tracks page views, scroll depth, and time on page
 */
export default function PageAnalytics() {
  usePageView();
  useScrollDepth();
  useTimeOnPage();

  return null;
}
