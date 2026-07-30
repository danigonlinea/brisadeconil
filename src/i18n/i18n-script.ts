/**
 * i18n-script.ts
 *
 * This module exports a string that gets embedded as an inline <script> in
 * BaseLayout. It runs before first paint to:
 *   1. Detect locale (localStorage → navigator.language → 'es')
 *   2. Set document.documentElement.lang
 *   3. Apply all data-i18n translations to the DOM
 *
 * The translations object is inlined at build time via Astro's is:inline +
 * set:html. No external request, no flash.
 */

import { t, SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from './translations';

/**
 * Returns the JS source to embed inline.
 * Called once at build time in BaseLayout.astro.
 */
export function buildI18nScript(): string {
  // Serialise the full translation table as a JS object literal.
  // Only the values (not the TS types) end up in the bundle.
  const translationsJSON = JSON.stringify(t);
  const localesJSON = JSON.stringify(SUPPORTED_LOCALES);
  const defaultLocale = DEFAULT_LOCALE;

  return `
(function () {
  var STORAGE_KEY = 'brisa-locale';
  var SUPPORTED = ${localesJSON};
  var DEFAULT = '${defaultLocale}';
  var T = ${translationsJSON};

  function detectLocale() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var lang = (navigator.language || '').toLowerCase();
    if (lang.startsWith('de')) return 'de';
    if (lang.startsWith('en')) return 'en';
    return DEFAULT;
  }

  function applyLocale(locale) {
    // 1. Set lang attribute
    document.documentElement.lang = locale;

    // 2. Translate all [data-i18n] elements (text content)
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (T[key] && T[key][locale] !== undefined) {
        el.textContent = T[key][locale];
      }
    });

    // 3. Translate all [data-i18n-html] elements (inner HTML — for rich text)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (T[key] && T[key][locale] !== undefined) {
        el.innerHTML = T[key][locale];
      }
    });

    // 4. Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (T[key] && T[key][locale] !== undefined) {
        el.setAttribute('placeholder', T[key][locale]);
      }
    });

    // 5. Translate aria-label attributes
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (T[key] && T[key][locale] !== undefined) {
        el.setAttribute('aria-label', T[key][locale]);
      }
    });

    // 6. Mark active locale on <html> for CSS / switcher
    document.documentElement.setAttribute('data-locale', locale);

    // 7. Dispatch event so React islands can react
    window.dispatchEvent(new CustomEvent('brisa:locale-change', { detail: { locale: locale } }));
  }

  // Expose globally so LanguageSwitcher can call it
  window.__brisaSetLocale = function (locale) {
    if (SUPPORTED.indexOf(locale) === -1) return;
    localStorage.setItem(STORAGE_KEY, locale);
    applyLocale(locale);
  };

  window.__brisaGetLocale = function () {
    return document.documentElement.getAttribute('data-locale') || DEFAULT;
  };

  // Run on load
  var locale = detectLocale();
  applyLocale(locale);
})();
`.trim();
}
