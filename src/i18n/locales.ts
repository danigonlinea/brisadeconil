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
 * Absolute path of a locale's blog index (`/blog/`, `/en/blog/`, `/de/blog/`).
 */
export function blogIndexPath(locale: Locale): string {
  return `${routePrefix(locale)}/blog/`;
}

/**
 * Absolute path of a single post in a locale
 * (`/blog/{slug}/`, `/en/blog/{slug}/`, `/de/blog/{slug}/`).
 */
export function blogPostPath(locale: Locale, slug: string): string {
  return `${routePrefix(locale)}/blog/${slug}/`;
}

/**
 * Language-switch targets for a page that exists under the same relative
 * path in every locale (homepage, blog index): the same page everywhere.
 */
export function samePathSwitchTargets(
  pathFor: (locale: Locale) => string,
): Record<Locale, string> {
  return { es: pathFor("es"), en: pathFor("en"), de: pathFor("de") };
}

/**
 * Language-switch targets for a blog post. When the post declares a
 * translated sibling for the target locale (the `translations` frontmatter
 * map), the switcher keeps the reader on the same article; otherwise it
 * falls back to the target locale's homepage.
 */
export function blogPostSwitchTargets(
  current: Locale,
  ownSlug: string,
  translations?: Partial<Record<Locale, string>>,
): Record<Locale, string> {
  const targets = {} as Record<Locale, string>;
  for (const target of SUPPORTED_LOCALES) {
    if (target === current) {
      targets[target] = blogPostPath(current, ownSlug);
      continue;
    }
    const sibling = translations?.[target];
    targets[target] = sibling
      ? blogPostPath(target, sibling)
      : homePath(target);
  }
  return targets;
}

/**
 * Language-switch targets for a page that only exists in one locale
 * (Spanish-only SEO landings and legal pages have no translated siblings):
 * the page itself in the current locale, the target locale's homepage
 * everywhere else.
 */
export function singleLocaleSwitchTargets(
  current: Locale,
  ownPath: string,
): Record<Locale, string> {
  const targets = {} as Record<Locale, string>;
  for (const target of SUPPORTED_LOCALES) {
    targets[target] = target === current ? ownPath : homePath(target);
  }
  return targets;
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
