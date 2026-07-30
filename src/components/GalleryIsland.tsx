/**
 * GalleryIsland — React component with PhotoSwipe lightbox.
 * Uses PhotoSwipe v5 imperative API.
 * All images are SVG placeholders — replace src with real photos.
 */
import { useEffect, useRef, useCallback } from 'react';
import 'photoswipe/style.css';

interface GalleryItem {
  id: string;
  label: string;
  placeholder: string; // room type for placeholder styling
  width: number;
  height: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'salon',       label: 'Salón',               placeholder: 'salon',      width: 1200, height: 800  },
  { id: 'dormitorio',  label: 'Dormitorio',          placeholder: 'dormitorio', width: 1200, height: 800  },
  { id: 'salon-2',     label: 'Salón desde la cocina',placeholder: 'salon',     width: 900,  height: 1200 },
  { id: 'bano',        label: 'Baño',                placeholder: 'bano',       width: 900,  height: 1200 },
  { id: 'cocina',      label: 'Cocina',              placeholder: 'cocina',     width: 1200, height: 900  },
  { id: 'exterior',    label: 'Entrada / Calle',     placeholder: 'exterior',   width: 1200, height: 800  },
];

// Placeholder colors per room type
const PLACEHOLDER_COLORS: Record<string, { bg: string; text: string }> = {
  salon:      { bg: '#c8dde8', text: '#1a3d54' },
  dormitorio: { bg: '#d6c0a0', text: '#4a2e0a' },
  bano:       { bg: '#c4d8c4', text: '#1a3a1a' },
  cocina:     { bg: '#e8d9c4', text: '#3a2a0a' },
  exterior:   { bg: '#b8d4e8', text: '#0a2a3a' },
};

function PlaceholderImage({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const colors = PLACEHOLDER_COLORS[item.placeholder] ?? PLACEHOLDER_COLORS.salon;
  const isPortrait = item.height > item.width;

  return (
    <button
      className={`gallery-thumb ${isPortrait ? 'gallery-thumb--portrait' : ''}`}
      onClick={onClick}
      aria-label={`Ver foto: ${item.label} (placeholder — imagen real pendiente)`}
      type="button"
    >
      <div
        className="gallery-placeholder"
        style={{ backgroundColor: colors.bg }}
        role="img"
        aria-label={`${item.label} — [IMAGEN PLACEHOLDER — sustituir con fotografía real]`}
      >
        <svg
          viewBox="0 0 120 80"
          width="60"
          height="40"
          fill="none"
          aria-hidden="true"
        >
          <rect x="10" y="15" width="100" height="50" rx="4" fill={colors.text} opacity="0.12"/>
          <circle cx="35" cy="35" r="8" fill={colors.text} opacity="0.2"/>
          <path d="M10 60 L30 38 L50 52 L70 30 L110 60Z" fill={colors.text} opacity="0.15"/>
        </svg>
        <span className="gallery-placeholder-label" style={{ color: colors.text }}>
          {item.label}
        </span>
        <span
          className="gallery-placeholder-badge"
          aria-hidden="true"
        >
          📷 Placeholder
        </span>
      </div>
      <div className="gallery-thumb-overlay" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>
    </button>
  );
}

export default function GalleryIsland() {
  const galleryRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback(async (index: number) => {
    const PhotoSwipe = (await import('photoswipe')).default;

    // Build datasource with placeholder SVG data URIs
    const dataSource = GALLERY_ITEMS.map((item) => {
      const colors = PLACEHOLDER_COLORS[item.placeholder] ?? PLACEHOLDER_COLORS.salon;
      // Create a minimal SVG placeholder as data URI
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${item.width}" height="${item.height}" viewBox="0 0 ${item.width} ${item.height}"><rect width="${item.width}" height="${item.height}" fill="${colors.bg}"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="48" fill="${colors.text}" opacity="0.5">${item.label}</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="${colors.text}" opacity="0.35">[Fotografía real pendiente]</text></svg>`;
      const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      return {
        src: dataUri,
        width: item.width,
        height: item.height,
        alt: `${item.label} — imagen placeholder, fotografía real pendiente`,
      };
    });

    const pswp = new PhotoSwipe({
      dataSource,
      index,
      bgOpacity: 0.92,
      showHideAnimationType: 'fade',
      loop: true,
    });

    pswp.init();
  }, []);

  return (
    <div ref={galleryRef} className="gallery-grid" role="list" aria-label="Galería de fotos del apartamento">
      {GALLERY_ITEMS.map((item, index) => (
        <div key={item.id} role="listitem">
          <PlaceholderImage item={item} onClick={() => openLightbox(index)} />
        </div>
      ))}
    </div>
  );
}
