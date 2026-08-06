/**
 * Content index — per-locale content resolver.
 *
 * The server renders the correct locale at build time via
 * localized routes (/es, /en, /de). Components call `getContent(locale)`
 * with the locale passed down from the page.
 *
 * Supported locales: es | en | de
 */
import type { Locale } from '../i18n/translations';

/** Shape shared by every locale content module (es/en/de are structurally identical). */
export type Content = typeof import('./es');

/**
 * Load the content module for a locale.
 * Falls back to Spanish for unknown/empty values.
 */
export async function getContent(locale: Locale): Promise<Content> {
  switch (locale) {
    case 'en':
      return (await import('./en')) as Content;
    case 'de':
      return (await import('./de')) as Content;
    default:
      return (await import('./es')) as Content;
  }
}

export type { Locale } from '../i18n/translations';
