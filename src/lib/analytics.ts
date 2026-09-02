/**
 * analytics.ts — client-side helper to send Google Analytics 4 events
 * via the global gtag() function injected by the inline Google tag snippet in
 * BaseLayout.astro. Guards against the server and against GA not being loaded.
 *
 * Event taxonomy (keep in sync with docs/analytics-events.md if it exists):
 * - page_view          — explicit page view (SPA view transitions)
 * - scroll_depth       — 25/50/75/100% milestones
 * - section_view       — a section enters the viewport
 * - blog_post_view     — a blog post loads
 * - blog_card_click    — click on a blog index card
 * - blog_cta_click     — click on end-of-post booking CTA
 * - outbound_link      — click on an external link
 * - heartbeat          — periodic engagement ping
 * - utm_capture        — UTM parameters from the landing URL
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

/* ──────────────────────────────────────────────────────────────────────────
 * 1. Explicit page view — for Astro view transitions (SPA-like navigation).
 *    GA4 catches the first page_view automatically, but subsequent
 *    client-side navigations need an explicit call.
 * ────────────────────────────────────────────────────────────────────────── */

export function trackPageView(pageLocation?: string, pageTitle?: string) {
  trackEvent("page_view", {
    page_location: pageLocation ?? window.location.href,
    page_title: pageTitle ?? document.title,
  });
}

/* ──────────────────────────────────────────────────────────────────────────
 * 2. Scroll depth — milestone percentages (25/50/75/100).
 *    Caller is responsible for firing each milestone only once per page.
 * ────────────────────────────────────────────────────────────────────────── */

export function trackScrollDepth(percent: number, pageLocation?: string) {
  trackEvent("scroll_depth", {
    percent,
    page_location: pageLocation ?? window.location.href,
  });
}

/* ──────────────────────────────────────────────────────────────────────────
 * 3. Section view — a section enters the viewport.
 *    Used to track which parts of the page the user actually sees.
 * ────────────────────────────────────────────────────────────────────────── */

export function trackSectionView(sectionId: string, sectionName?: string) {
  trackEvent("section_view", {
    section_id: sectionId,
    section_name: sectionName ?? sectionId,
  });
}

/* ──────────────────────────────────────────────────────────────────────────
 * 4. Blog events.
 * ────────────────────────────────────────────────────────────────────────── */

export function trackBlogPostView(params: {
  slug: string;
  title: string;
  locale: string;
  pub_date?: string;
}) {
  trackEvent("blog_post_view", params);
}

export function trackBlogCardClick(params: {
  slug: string;
  title: string;
  position: number;
}) {
  trackEvent("blog_card_click", params);
}

export function trackBlogCtaClick(slug: string) {
  trackEvent("blog_cta_click", { slug });
}

/* ──────────────────────────────────────────────────────────────────────────
 * 5. Outbound link — click on a link that leaves the site.
 * ────────────────────────────────────────────────────────────────────────── */

export function trackOutbound(url: string, linkText?: string) {
  trackEvent("outbound_link", {
    link_url: url,
    link_text: linkText ?? "",
  });
}

/* ──────────────────────────────────────────────────────────────────────────
 * 6. Heartbeat — periodic engagement ping (every ~15s).
 *    Lets us measure real time-on-page even when the user reads without
 *    scrolling or clicking.
 * ────────────────────────────────────────────────────────────────────────── */

export function trackHeartbeat(pageLocation?: string, elapsedSeconds?: number) {
  trackEvent("heartbeat", {
    page_location: pageLocation ?? window.location.href,
    elapsed_seconds: elapsedSeconds ?? 0,
  });
}

/* ──────────────────────────────────────────────────────────────────────────
 * 7. UTM capture — read UTM params from the landing URL once per session.
 * ────────────────────────────────────────────────────────────────────────── */

export function trackUtmParameters() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const utmTerm = params.get("utm_term");
  const utmContent = params.get("utm_content");

  if (utmSource || utmMedium || utmCampaign || utmTerm || utmContent) {
    trackEvent("utm_capture", {
      utm_source: utmSource ?? "(direct)",
      utm_medium: utmMedium ?? "(none)",
      utm_campaign: utmCampaign ?? "(none)",
      utm_term: utmTerm ?? "(none)",
      utm_content: utmContent ?? "(none)",
    });
  }
}

export default trackEvent;
