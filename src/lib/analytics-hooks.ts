/**
 * analytics-hooks.ts — vanilla JS setup helpers for page-level analytics.
 * Safe to call from inline <script> tags in Astro templates.
 * Each helper is idempotent: calling it twice won't double-track.
 */

import {
  trackScrollDepth,
  trackHeartbeat,
  trackSectionView,
  trackPageView,
} from "./analytics";

/* ──────────────────────────────────────────────────────────────────────────
 * Scroll depth tracking — fires 25/50/75/100% milestones once per page.
 * Uses a single scroll listener with throttling (250ms).
 * ────────────────────────────────────────────────────────────────────────── */

let scrollDepthState = {
  fired: new Set<number>(),
  attached: false,
};

export function setupScrollDepthTracking(milestones: number[] = [25, 50, 75, 100]) {
  if (typeof window === "undefined" || scrollDepthState.attached) return;
  scrollDepthState.attached = true;

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        ticking = false;
        return;
      }
      const percent = Math.round((scrollTop / docHeight) * 100);
      for (const m of milestones) {
        if (percent >= m && !scrollDepthState.fired.has(m)) {
          scrollDepthState.fired.add(m);
          trackScrollDepth(m);
        }
      }
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ──────────────────────────────────────────────────────────────────────────
 * Heartbeat — periodic engagement ping every N seconds.
 * Only runs while the page is visible (pauses on tab switch).
 * ────────────────────────────────────────────────────────────────────────── */

let heartbeatState = {
  intervalId: null as ReturnType<typeof setInterval> | null,
  elapsed: 0,
  attached: false,
};

export function setupHeartbeat(intervalSeconds = 15) {
  if (typeof window === "undefined" || heartbeatState.attached) return;
  heartbeatState.attached = true;

  function tick() {
    // Don't count time when the tab is hidden
    if (document.hidden) return;
    heartbeatState.elapsed += intervalSeconds;
    trackHeartbeat(undefined, heartbeatState.elapsed);
  }

  heartbeatState.intervalId = setInterval(tick, intervalSeconds * 1000);

  // Pause when tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && heartbeatState.intervalId) {
      clearInterval(heartbeatState.intervalId);
      heartbeatState.intervalId = null;
    } else if (!document.hidden && !heartbeatState.intervalId) {
      heartbeatState.intervalId = setInterval(tick, intervalSeconds * 1000);
    }
  });
}

/* ──────────────────────────────────────────────────────────────────────────
 * Section view tracking — fires when a section enters the viewport.
 * Uses IntersectionObserver. Tracks each section only once.
 * ────────────────────────────────────────────────────────────────────────── */

let sectionViewState = {
  observer: null as IntersectionObserver | null,
  attached: false,
};

export function setupSectionViewTracking(
  selector = "[data-track-section]",
  threshold = 0.25,
) {
  if (typeof window === "undefined" || sectionViewState.attached) return;
  sectionViewState.attached = true;

  const sections = document.querySelectorAll(selector);
  if (sections.length === 0) return;

  sectionViewState.observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const sectionId = el.id || el.dataset.trackSection || "unknown";
          const sectionName = el.dataset.trackSectionName || sectionId;
          trackSectionView(sectionId, sectionName);
          sectionViewState.observer?.unobserve(el);
        }
      }
    },
    { threshold },
  );

  sections.forEach((s) => sectionViewState.observer!.observe(s));
}

/* ──────────────────────────────────────────────────────────────────────────
 * View transition page_view — re-fires page_view on Astro client-side
 * navigation (view transitions). GA4 only fires the initial page_view.
 * ────────────────────────────────────────────────────────────────────────── */

let viewTransitionState = {
  attached: false,
};

export function setupViewTransitionTracking() {
  if (typeof window === "undefined" || viewTransitionState.attached) return;
  viewTransitionState.attached = true;

  // Astro emits this event after each view transition
  document.addEventListener("astro:page-load", () => {
    trackPageView();
  });
}

/* ──────────────────────────────────────────────────────────────────────────
 * Reset — useful for testing or manual re-initialization.
 * ────────────────────────────────────────────────────────────────────────── */

export function resetAnalyticsState() {
  scrollDepthState = { fired: new Set(), attached: false };
  if (heartbeatState.intervalId) clearInterval(heartbeatState.intervalId);
  heartbeatState = { intervalId: null, elapsed: 0, attached: false };
  if (sectionViewState.observer) sectionViewState.observer.disconnect();
  sectionViewState = { observer: null, attached: false };
  viewTransitionState = { attached: false };
}
