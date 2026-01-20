/**
 * Analytics utility for tracking user events
 * Provider-agnostic design - works with GA4, Mixpanel, PostHog, etc.
 */

export type AnalyticsEventName =
  // Page Events
  | 'page_view'
  // CTA Events
  | 'cta_click'
  | 'cta_hero_click'
  | 'cta_pricing_click'
  | 'cta_final_click'
  | 'cta_nav_click'
  // Demo Events
  | 'demo_start'
  | 'demo_stop'
  | 'demo_complete'
  | 'demo_insert'
  | 'demo_edit'
  | 'demo_undo'
  | 'demo_language_change'
  | 'demo_tone_change'
  // Pricing Events
  | 'pricing_view'
  | 'pricing_toggle_billing'
  | 'pricing_plan_click'
  // Navigation Events
  | 'nav_link_click'
  | 'nav_scroll_to_section'
  // Engagement Events
  | 'scroll_depth'
  | 'time_on_page'
  | 'video_play'
  | 'video_complete';

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  properties?: Record<string, string | number | boolean>;
  timestamp?: number;
}

class Analytics {
  private isEnabled = true;
  private events: AnalyticsEvent[] = [];

  /**
   * Track an analytics event
   */
  track(name: AnalyticsEventName, properties?: Record<string, string | number | boolean>) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
    };

    // Store event locally
    this.events.push(event);

    // Send to analytics providers
    this.sendToProviders(event);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }
  }

  /**
   * Track page view
   */
  pageView(path: string, properties?: Record<string, string | number | boolean>) {
    if (typeof window === 'undefined') return;

    const pageViewEvent = {
      name: 'page_view' as const,
      properties: {
        path,
        url: window.location.href,
        referrer: document.referrer,
        ...properties,
      },
    };

    this.sendToProviders(pageViewEvent);
  }

  /**
   * Send event to analytics providers
   */
  private sendToProviders(event: AnalyticsEvent) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.name, event.properties);
    }

    // Mixpanel
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      (window as any).mixpanel.track(event.name, event.properties);
    }

    // PostHog
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture(event.name, event.properties);
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', event.name, event.properties);
    }
  }

  /**
   * Identify user (for logged-in tracking)
   */
  identify(userId: string, traits?: Record<string, any>) {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag('set', { user_id: userId });
      }

      // Mixpanel
      if ((window as any).mixpanel) {
        (window as any).mixpanel.identify(userId);
        if (traits) (window as any).mixpanel.people.set(traits);
      }

      // PostHog
      if ((window as any).posthog) {
        (window as any).posthog.identify(userId, traits);
      }
    }
  }

  /**
   * Reset user identity (on logout)
   */
  reset() {
    if (typeof window !== 'undefined') {
      if ((window as any).mixpanel) (window as any).mixpanel.reset();
      if ((window as any).posthog) (window as any).posthog.reset();
    }
  }

  /**
   * Enable/disable tracking
   */
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  /**
   * Get all tracked events (for debugging)
   */
  getEvents() {
    return this.events;
  }
}

// Export singleton instance
export const analytics = new Analytics();
