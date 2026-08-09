/**
 * analytics.ts — small client-side helper to send Google Analytics 4 events
 * via the global gtag() function injected by the inline Google tag snippet in
 * BaseLayout.astro. Guards against the server and against GA not being loaded.
 */

type GtagCommand = "config" | "event" | "set" | "js";

type GtagFn = {
  (
    command: GtagCommand,
    target: string,
    params?: Record<string, unknown>,
  ): void;
};

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
    /** Set by the inline GA snippet in BaseLayout.astro once the consent banner is accepted. */
    __brisaConsentLoaded?: boolean;
  }
}

/**
 * Send a GA4 event.
 * - Returns silently on the server (SSR) or if gtag() isn't available yet.
 * - Params go straight to gtag("event", name, params).
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}

export default trackEvent;
