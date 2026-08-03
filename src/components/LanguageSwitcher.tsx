/**
 * LanguageSwitcher — compact dropdown to switch between ES, EN and DE.
 *
 * Mounts into #language-switcher-mount via client:only="react".
 * Uses the window.__brisaSetLocale / __brisaGetLocale API injected by the
 * inline i18n script in BaseLayout.
 *
 * Listens to the 'brisa:locale-change' event to stay in sync when locale
 * changes from another source.
 */

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';

type Locale = 'es' | 'en' | 'de';

interface LocaleOption {
  code: Locale;
  /** Short visible label */
  label: string;
  /** Full name for aria-label */
  name: string;
  /** Flag emoji */
  flag: string;
}

const LOCALES: LocaleOption[] = [
  { code: 'es', label: 'ES', name: 'Español',  flag: '🇪🇸' },
  { code: 'en', label: 'EN', name: 'English',  flag: '🇬🇧' },
  { code: 'de', label: 'DE', name: 'Deutsch',  flag: '🇩🇪' },
];

declare global {
  interface Window {
    __brisaSetLocale?: (locale: Locale) => void;
    __brisaGetLocale?: () => Locale;
  }
}

export default function LanguageSwitcher() {
  const [current, setCurrent] = useState<Locale>('es');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Read initial locale from the i18n runtime
  useEffect(() => {
    const locale = (window.__brisaGetLocale?.() ?? 'es') as Locale;
    setCurrent(locale);

    // Stay in sync when locale is changed by another component
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ locale: Locale }>).detail;
      setCurrent(detail.locale);
    };
    window.addEventListener('brisa:locale-change', handler);
    return () => window.removeEventListener('brisa:locale-change', handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const select = (locale: Locale) => {
    trackEvent('language_switch', { language: locale });
    window.__brisaSetLocale?.(locale);
    setCurrent(locale);
    setOpen(false);
  };

  const currentOption = LOCALES.find((l) => l.code === current) ?? LOCALES[0];

  return (
    <div
      ref={containerRef}
      className="lang-switcher"
      style={{ position: 'relative' }}
    >
      {/* Trigger */}
      <button
        type="button"
        className="lang-switcher__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Idioma: ${currentOption.name}. Cambiar idioma`}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{currentOption.flag}</span>
        <span className="lang-switcher__label">{currentOption.label}</span>
        <svg
          className={`lang-switcher__chevron${open ? ' lang-switcher__chevron--open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          aria-label="Seleccionar idioma"
          className="lang-switcher__dropdown"
        >
          {LOCALES.map((locale) => (
            <li
              key={locale.code}
              role="option"
              aria-selected={locale.code === current}
              className={`lang-switcher__option${locale.code === current ? ' lang-switcher__option--active' : ''}`}
              onClick={() => select(locale.code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  select(locale.code);
                }
              }}
              tabIndex={0}
            >
              <span aria-hidden="true">{locale.flag}</span>
              <span>{locale.name}</span>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .lang-switcher__trigger {
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          padding: 6px 8px;
          border-radius: 6px;
          transition: background-color 150ms ease, color 150ms ease;
          white-space: nowrap;
        }
        .lang-switcher__trigger:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }
        /* When header is scrolled (solid bg), text goes dark */
        .scrolled .lang-switcher__trigger {
          color: var(--text-secondary, #555);
        }
        .scrolled .lang-switcher__trigger:hover {
          background-color: var(--bg-surface-alt, #f5f5f5);
          color: var(--text-base, #111);
        }
        .lang-switcher__label {
          font-family: var(--font-sans, system-ui);
          letter-spacing: 0.04em;
        }
        .lang-switcher__chevron {
          opacity: 0.7;
          transition: transform 200ms ease;
        }
        .lang-switcher__chevron--open {
          transform: rotate(180deg);
        }
        .lang-switcher__dropdown {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          background-color: var(--bg-surface, white);
          border: 1px solid var(--border-default, #e5e7eb);
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          list-style: none;
          margin: 0;
          padding: 4px;
          min-width: 130px;
          z-index: 200;
        }
        .lang-switcher__option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-family: var(--font-sans, system-ui);
          color: var(--text-base, #111);
          cursor: pointer;
          transition: background-color 120ms ease;
          outline: none;
        }
        .lang-switcher__option:hover,
        .lang-switcher__option:focus-visible {
          background-color: var(--bg-surface-alt, #f5f5f5);
        }
        .lang-switcher__option--active {
          font-weight: 600;
          color: var(--accent, #0d9488);
        }
      `}</style>
    </div>
  );
}
