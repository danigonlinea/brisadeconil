/**
 * blog.ts — locale ↔ blog collection mapping.
 *
 * Each language ships its own markdown folder and therefore its own content
 * collection, so slugs can be localised (/blog/... , /en/blog/... ,
 * /de/blog/...). Keeping the mapping here means routes and templates never
 * hardcode a collection name.
 */
import { DEFAULT_LOCALE, routePrefix, SUPPORTED_LOCALES, type Locale } from "./locales";

export type BlogCollection = "blog" | "blogEn" | "blogDe";

const COLLECTION_BY_LOCALE: Record<Locale, BlogCollection> = {
  es: "blog",
  en: "blogEn",
  de: "blogDe",
};

/** Content collection holding the posts for a locale. */
export function blogCollectionFor(locale: Locale): BlogCollection {
  return COLLECTION_BY_LOCALE[locale];
}

const BCP47_BY_LOCALE: Record<Locale, string> = {
  es: "es-ES",
  en: "en-GB",
  de: "de-DE",
};

/** BCP-47 tag used to format post dates in a locale. */
export function blogLocaleTag(locale: Locale): string {
  return BCP47_BY_LOCALE[locale];
}

/**
 * hreflang alternates for a blog post. The optional `translations` frontmatter
 * maps each sibling locale to that post's localised slug (slugs differ across
 * collections). The page's own URL is always included; x-default is appended
 * pointing at the Spanish version when it exists — a complete set per
 * Google's guidance. Posts without translations emit only their own entry,
 * which is equivalent to no hreflang set.
 */
export function blogPostHreflangs(
  locale: Locale,
  ownSlug: string,
  translations: Partial<Record<Locale, string>> | undefined,
  siteUrl: string,
): { lang: Locale | "x-default"; href: string }[] {
  const slugByLocale: Partial<Record<Locale, string>> = { ...translations, [locale]: ownSlug };
  const entries = SUPPORTED_LOCALES.filter((l) => slugByLocale[l]).map((l) => ({
    lang: l,
    href: `${siteUrl}${routePrefix(l)}/blog/${slugByLocale[l]}/`,
  }));
  if (!slugByLocale[DEFAULT_LOCALE]) return entries;
  return [
    ...entries,
    { lang: "x-default", href: `${siteUrl}/blog/${slugByLocale[DEFAULT_LOCALE]}/` },
  ];
}
