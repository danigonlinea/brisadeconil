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

import {
  t,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  type Locale,
} from "./translations";

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

    function translatePage() {
      // 2. Translate all [data-i18n] elements (text content)
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (T[key] && T[key][locale] !== undefined) {
          el.textContent = T[key][locale];
        }
      });

      // 3. Translate all [data-i18n-html] elements (inner HTML — for rich text)
      //
      // sanitizeHTML — defence-in-depth XSS sanitizer for data-i18n-html values.
      //
      // Current threat model:
      //   • The translations object (T) is a static literal baked in at build
      //     time from src/i18n/translations.ts. As of today that file contains NO
      //     HTML markup and NO "-html" keyed entries. The data-i18n-html selector
      //     matches zero elements in production.
      //   • This function therefore runs only if a future maintainer adds rich-text
      //     translations. It is defence-in-depth, not a live attack surface.
      //
      // Design decisions:
      //   • id / class kept in the allowlist: they are needed for anchoring CSS
      //     styles and JS hooks in future rich-text content. DOM-clobbering via
      //     id is mitigated by the fact that T is build-time-controlled and
      //     never arrives from user input at runtime. If T ever comes from an
      //     external source, id should be removed from SAFE_ATTRS.
      //   • Protocol allowlist (SAFE_PROTOCOLS) instead of blocklist: harder to
      //     bypass than maintaining a list of bad prefixes. Relative URLs (/…,
      //     ./…, ../…) and bare fragments (#…) are also allowed.
      //   • target=_blank on <a> always gets rel=noopener noreferrer added,
      //     preventing reverse tabnapping.
      //   • Depth-first traversal is capped at MAX_NODES total elements to
      //     prevent DoS with pathologically deep/wide HTML trees.
      //
      // Expected behaviour (by case):
      //   sanitizeHTML('<b>Hi</b>')                          → '<b>Hi</b>'
      //   sanitizeHTML('<script>alert(1)</script>')          → '' (text only)
      //   sanitizeHTML('<a href="javascript:x">L</a>')       → '<a>L</a>'
      //   sanitizeHTML('<a href="data:text/html,x">L</a>')   → '<a>L</a>'
      //   sanitizeHTML('<a href="https://ok.com">L</a>')     → '<a href="https://ok.com">L</a>'
      //   sanitizeHTML('<a href="/local">L</a>')             → '<a href="/local">L</a>'
      //   sanitizeHTML('<a target="_blank">L</a>')           → '<a target="_blank" rel="noopener noreferrer">L</a>'
      //   sanitizeHTML('<img src="x" onerror="y">')          → '' (img not in allowlist → unwrapped to text)
      //   sanitizeHTML('<div onclick="x">T</div>')           → '<div>T</div>'
      function sanitizeHTML(html) {
        // Hard limit: bail out early on extremely long strings before even
        // touching the DOM parser (10 000 chars is generous for any legit
        // rich-text snippet we'd ever store in translations).
        if (!html || typeof html !== 'string') return '';
        if (html.length > 10000) return '';

        try {
          var MAX_NODES = 200; // max elements visited; excess nodes are dropped
          var MAX_DEPTH = 5;   // max nesting depth allowed

          var parser = new DOMParser();
          var doc = parser.parseFromString(html, 'text/html');

          // Allowlisted element names (lowercase).
          var ALLOWED_TAGS = [
            'a','b','strong','i','em','br','p',
            'ul','ol','li','span','div',
            'sup','sub','small','mark','code'
          ];

          // Allowlisted attribute names (lowercase).
          // id / class rationale: build-time-controlled content only (see above).
          var SAFE_ATTRS = [
            'class','id','title','alt','rel','target','aria-label'
          ];

          // URL attributes that receive protocol validation.
          var URL_ATTRS = ['href', 'src'];

          // Safe URL protocols (case-insensitive, stripped of whitespace).
          // Relative URLs are handled separately (see isRelativeUrl below).
          var SAFE_PROTOCOLS = ['https:', 'http:', 'mailto:', 'tel:'];

          function isRelativeUrl(url) {
            // Passes: /path, ./path, ../path, #fragment
            return /^(\/|\.\/|\.\.\/|#)/.test(url);
          }

          function isSafeUrl(raw) {
            var url = raw.trim().replace(/[\t\n\r]/g, '');
            if (isRelativeUrl(url)) return true;
            // Decode percent-encoding once to catch %6A%61%76%61%73%63%72%69%70%74:
            try { url = decodeURIComponent(url); } catch (_) { /* keep original */ }
            var lc = url.toLowerCase().replace(/[\t\n\r\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '');
            // Extract scheme: anything up to the first ':'
            var colon = lc.indexOf(':');
            if (colon === -1) return true; // no scheme → treat as relative path
            var scheme = lc.slice(0, colon + 1); // includes trailing ':'
            return SAFE_PROTOCOLS.indexOf(scheme) !== -1;
          }

          var nodeCount = 0;

          // Walk the tree bottom-up so we can remove/unwrap nodes safely.
          // querySelectorAll returns a static NodeList in document order (top-down),
          // so we reverse it to process leaves before their ancestors.
          var allNodes = Array.from(doc.body.querySelectorAll('*')).reverse();

          for (var i = 0; i < allNodes.length; i++) {
            var node = allNodes[i];

            // Depth guard: count ancestors up to <body>.
            var depth = 0;
            var cursor = node.parentNode;
            while (cursor && cursor !== doc.body) { depth++; cursor = cursor.parentNode; }
            if (depth > MAX_DEPTH) {
              // Too deep — remove entirely (don't just unwrap, to bound tree size).
              if (node.parentNode) node.parentNode.removeChild(node);
              continue;
            }

            // Node count guard.
            nodeCount++;
            if (nodeCount > MAX_NODES) {
              if (node.parentNode) node.parentNode.removeChild(node);
              continue;
            }

            var tagName = node.nodeName.toLowerCase();
            if (ALLOWED_TAGS.indexOf(tagName) === -1) {
              // Unwrap: move children up, then remove the element itself.
              if (node.parentNode) {
                while (node.firstChild) {
                  node.parentNode.insertBefore(node.firstChild, node);
                }
                node.parentNode.removeChild(node);
              }
              continue;
            }

            // Sanitize attributes on allowed elements.
            var attrList = Array.from(node.attributes);
            for (var j = 0; j < attrList.length; j++) {
              var attr = attrList[j];
              var attrName = attr.name.toLowerCase();
              var attrVal  = attr.value || '';

              // Block all event handlers (on*).
              if (attrName.indexOf('on') === 0) {
                node.removeAttribute(attr.name);
                continue;
              }

              // Validate URL attributes against protocol allowlist.
              if (URL_ATTRS.indexOf(attrName) !== -1) {
                if (!isSafeUrl(attrVal)) {
                  node.removeAttribute(attr.name);
                } else {
                  // Normalise: keep the cleaned value (strip surrounding whitespace).
                  node.setAttribute(attr.name, attrVal.trim());
                }
                continue;
              }

              // Remove anything not in the safe-attribute list.
              if (SAFE_ATTRS.indexOf(attrName) === -1) {
                node.removeAttribute(attr.name);
                continue;
              }
            }

            // Reverse-tabnapping: <a target="_blank"> must have rel containing
            // noopener and noreferrer.
            if (tagName === 'a' && node.getAttribute('target') === '_blank') {
              var rel = (node.getAttribute('rel') || '').trim();
              var relParts = rel ? rel.split(/\s+/) : [];
              if (relParts.indexOf('noopener') === -1) relParts.push('noopener');
              if (relParts.indexOf('noreferrer') === -1) relParts.push('noreferrer');
              node.setAttribute('rel', relParts.join(' '));
            }
          }

          return doc.body.innerHTML;
        } catch (e) {
          // Any parsing error → return empty string (fail closed).
          return '';
        }
      }

      document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-html');
        if (T[key] && T[key][locale] !== undefined) {
          el.innerHTML = sanitizeHTML(T[key][locale]);
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
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', translatePage, { once: true });
    } else {
      translatePage();
    }

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
