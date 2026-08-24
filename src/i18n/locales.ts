/**
 * locales.ts — Locale registry shared by routes, layout and React islands.
 *
 * Single source of truth for the supported languages, their URL prefixes and
 * their homepage paths. The copy itself lives in `src/content/{locale}.ts`;
 * this module only describes the routing/SEO dimension of a locale.
 */

export type Locale = "es" | "en" | "de";

export const SUPPORTED_LOCALES: readonly Locale[] = ["es", "en", "de"];

/** Locale served at `/` (the canonical URL). */
export const DEFAULT_LOCALE: Locale = "es";

/** Non-default locales, each pre-rendered under its own prefix (`/en/`, `/de/`). */
export const ALTERNATE_LOCALES: readonly Locale[] = SUPPORTED_LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE,
);

/** URL prefix for a locale's route segment (empty for the default locale). */
export function routePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/** Absolute path of the homepage for a locale (`/`, `/en/`, `/de/`). */
export function homePath(locale: Locale): string {
  return `${routePrefix(locale)}/`;
}

/**
 * Path of the current page rewritten for another locale.
 * Strips an existing `/en` or `/de` prefix and prepends the target one, so it
 * keeps working if deeper per-locale routes are added later.
 * Falls back to the locale's homepage outside the browser (SSR/build).
 */
export function localeSwitchPath(target: Locale, pathname?: string): string {
  const path = pathname ?? (typeof window === "undefined" ? "/" : window.location.pathname);
  const rest = path.replace(/^\/(?:en|de)(?=\/|$)/, "");
  return `${routePrefix(target)}${rest === "" ? "/" : rest}`;
}
