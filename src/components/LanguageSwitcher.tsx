/**
 * LanguageSwitcher — text-only dropdown to switch between ES, EN and DE.
 *
 * Each option is a real link to the localized route (/es/, /en/, /de/), so the
 * server renders the correct language (no in-page text swapping). Clicking also
 * persists the choice in localStorage so the root "/" redirect honors it on
 * future visits.
 *
 * Mounted into the Header via client:only="react".
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
}

const LOCALES: LocaleOption[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
];

const LOCALE_KEY = 'brisa-locale';

interface LanguageSwitcherProps {
  /** Currently active locale (server-rendered route) */
  locale?: Locale;
}

export default function LanguageSwitcher({ locale = 'es' }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const baseNoSlash = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

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

  const hrefFor = (code: Locale) => `${baseNoSlash}/${code}/`;

  const select = (code: Locale) => {
    trackEvent('language_switch', { language: code });
    try {
      localStorage.setItem(LOCALE_KEY, code);
    } catch (e) {
      /* ignore */
    }
    setOpen(false);
  };

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
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Idioma: ${current.name}. Cambiar idioma`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang-switcher__label">{current.label}</span>
        <svg
          className={`lang-switcher__chevron${open ? ' lang-switcher__chevron--open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
            <li key={option.code} role="option" aria-selected={option.code === current.code}>
              <a
                className={`lang-switcher__option${
                  option.code === current.code ? ' lang-switcher__option--active' : ''
                }`}
                href={hrefFor(option.code)}
                onClick={() => select(option.code)}
              >
                <span>{option.name}</span>
                <span className="lang-switcher__option-code">{option.label}</span>
              </a>
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
          font-weight: 600;
          letter-spacing: 0.04em;
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
          min-width: 132px;
          z-index: 200;
        }
        .lang-switcher__option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-family: var(--font-sans, system-ui);
          color: var(--text-base, #111);
          text-decoration: none;
          cursor: pointer;
          transition: background-color 120ms ease;
          outline: none;
        }
        .lang-switcher__option:hover,
        .lang-switcher__option:focus-visible {
          background-color: var(--bg-surface-alt, #f5f5f5);
          color: var(--text-base, #111);
        }
        .lang-switcher__option--active {
          font-weight: 600;
          color: var(--accent, #0d9488);
        }
        .lang-switcher__option-code {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}

