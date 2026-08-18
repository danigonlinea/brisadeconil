/**
 * i18n-script.ts
 *
 * This module exports a string that gets embedded as an inline <script> in
 * BaseLayout. It runs before first paint to:
 *   1. Detect locale (localStorage → navigator.language → 'es')
 *   2. Set document.documentElement.lang
 *   3. Apply all data-i18n translations to the DOM
 *
 * Only the DEFAULT locale table is inlined (keeps the HTML light for the
 * content-to-code ratio). The other locales are served as static JSON
 * (src/pages/i18n/[locale].json.ts) and fetched on demand when the visitor
 * switches language, with a fallback to the default locale.
 */

import { t, SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./translations";

/** Flatten one locale's strings into a plain { key: string } map. */
function flatLocale(locale: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of Object.keys(t)) {
    const entry = t[key];
    if (!entry) continue;
    const value = entry[locale as keyof typeof entry];
    if (value !== undefined) out[key] = value;
  }
  return out;
}

/**
 * Returns the JS source to embed inline.
 * `base` is the BASE_URL (used to locate the per-locale JSON files).
 */
export function buildI18nScript(base: string): string {
  const defaultTable = flatLocale(DEFAULT_LOCALE);
  const defaultJSON = JSON.stringify(defaultTable);
  const localesJSON = JSON.stringify(SUPPORTED_LOCALES);
  const defaultLocale = DEFAULT_LOCALE;
  const baseUrl = (base || "/").replace(/\/$/, "") + "/";

  return `
(function () {
  var STORAGE_KEY = 'brisa-locale';
  var SUPPORTED = ${localesJSON};
  var DEFAULT = '${defaultLocale}';
  var BASE = ${JSON.stringify(baseUrl)};
  // Only the default locale is embedded; others are fetched on demand.
  var LOADED = { ${defaultLocale}: ${defaultJSON} };

  function detectLocale() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var lang = (navigator.language || '').toLowerCase();
    if (lang.indexOf('de') === 0) return 'de';
    if (lang.indexOf('en') === 0) return 'en';
    return DEFAULT;
  }

  function fetchLocale(locale) {
    return fetch(BASE + 'i18n/' + locale + '.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .catch(function () {
        // Fallback: keep the default locale if the request fails.
        return LOADED[DEFAULT];
      });
  }

  function ensureLocale(locale) {
    if (LOADED[locale]) return Promise.resolve(LOADED[locale]);
    return fetchLocale(locale).then(function (table) {
      LOADED[locale] = table;
      return table;
    });
  }

  function translatePage(table, locale) {
    // 1. Text content
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (table[key] !== undefined) el.textContent = table[key];
    });

    // 2. Inner HTML — for rich text, with a lightweight sanitizer
    function sanitizeHTML(html) {
      try {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html || '', 'text/html');
        var allowed = ['a','b','strong','i','em','br','p','ul','ol','li','span','div','sup','sub','small','mark','code'];
        doc.body.querySelectorAll('*').forEach(function (node) {
          var name = node.nodeName.toLowerCase();
          if (allowed.indexOf(name) === -1) {
            while (node.firstChild) node.parentNode.insertBefore(node.firstChild, node);
            node.parentNode.removeChild(node);
            return;
          }
          Array.from(node.attributes).forEach(function (attr) {
            var n = attr.name.toLowerCase();
            var v = attr.value || '';
            if (n.indexOf('on') === 0) {
              node.removeAttribute(attr.name);
              return;
            }
            if (n === 'href') {
              var lv = v.trim().toLowerCase();
              if (lv.indexOf('javascript:') === 0) node.removeAttribute(attr.name);
            } else if (['class','id','title','alt','rel','target','aria-label'].indexOf(n) === -1) {
              node.removeAttribute(attr.name);
            }
          });
        });
        return doc.body.innerHTML;
      } catch (e) {
        return '';
      }
    }

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (table[key] !== undefined) el.innerHTML = sanitizeHTML(table[key]);
    });

    // 3. Placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (table[key] !== undefined) el.setAttribute('placeholder', table[key]);
    });

    // 4. aria-label attributes
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (table[key] !== undefined) el.setAttribute('aria-label', table[key]);
    });
  }

  function applyLocale(locale) {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute('data-locale', locale);

    ensureLocale(locale).then(function (table) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
          translatePage(table, locale);
        }, { once: true });
      } else {
        translatePage(table, locale);
      }
      window.dispatchEvent(new CustomEvent('brisa:locale-change', { detail: { locale: locale } }));
    });
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
  applyLocale(detectLocale());
})();
`.trim();
}
