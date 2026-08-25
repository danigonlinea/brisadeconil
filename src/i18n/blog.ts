/**
 * blog.ts — locale ↔ blog collection mapping.
 *
 * Each language ships its own markdown folder and therefore its own content
 * collection, so slugs can be localised (/blog/... , /en/blog/... ,
 * /de/blog/...). Keeping the mapping here means routes and templates never
 * hardcode a collection name.
 */
import type { Locale } from "./locales";

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
