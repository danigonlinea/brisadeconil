/**
 * LanguageSwitcher — compact dropdown that navigates between the
 * pre-rendered per-locale routes (/, /en/ and /de/).
 *
 * Mounts into .header-controls via client:only="react". The current locale
 * arrives as a build-time prop from Header, so the control renders correctly
 * on every route without reading any runtime state.
 */

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { localeSwitchPath, type Locale } from '../i18n/locales';

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

interface LanguageSwitcherProps {
  locale: Locale;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const select = (target: Locale) => {
    setOpen(false);
    // Same-language selection is a no-op: stay on the page, don't log it.
    if (target === locale) return;
    trackEvent('language_switch', { language: target });
    // Defer navigation briefly so the analytics hit is sent before the
    // page unload cancels the in-flight request.
    window.setTimeout(() => window.location.assign(localeSwitchPath(target)), 250);
  };

  const currentOption = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;

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
          {LOCALES.map((option) => (
            <li
              key={option.code}
              role="option"
              aria-selected={option.code === locale}
              className={`lang-switcher__option${option.code === locale ? ' lang-switcher__option--active' : ''}`}
              onClick={() => select(option.code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  select(option.code);
                }
              }}
              tabIndex={0}
            >
              <span aria-hidden="true">{option.flag}</span>
              <span>{option.name}</span>
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
