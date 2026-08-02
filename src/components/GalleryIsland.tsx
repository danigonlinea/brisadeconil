/**
 * GalleryIsland — React component with PhotoSwipe lightbox.
 * Uses actual public/gallery photographs and presents them in a responsive grid.
 */
import { useCallback, useEffect, useState } from "react";
import "photoswipe/style.css";
import type { Locale } from "../i18n/translations";

interface GalleryItem {
  id: string;
  texts: Record<Locale, { label: string; alt: string }>;
  src: string;
  srcSet: string;
  sizes: string;
  fullSrc: string;
  width: number;
  height: number;
  highlight?: boolean;
}

const DEFAULT_LOCALE: Locale = "es";
const publicBase = import.meta.env.BASE_URL || "/";
const asset = (path: string) =>
  `${publicBase.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

const createResponsiveImage = (id: string, maxWidth: number) => {
  const base = asset(`gallery/${id}.jpg`);
  const small = asset(`gallery/optimized/${id}-640.jpg`);
  const large = asset(`gallery/optimized/${id}-1600.jpg`);

  return {
    src: small,
    srcSet: `${small} 640w, ${large} 1600w, ${base} ${maxWidth}w`,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    fullSrc: base,
  };
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "entrada",
    texts: {
      es: {
        label: "Entrada luminosa",
        alt: "Entrada del apartamento con luz natural",
      },
      en: {
        label: "Bright entrance",
        alt: "Entrance of the apartment with natural light",
      },
      de: {
        label: "Heller Eingang",
        alt: "Eingang der Wohnung mit natürlichem Licht",
      },
    },
    ...createResponsiveImage("entrada", 4080),
    width: 4080,
    height: 3072,
    highlight: true,
  },
  {
    id: "salon-cara-1",
    texts: {
      es: {
        label: "Salón espacioso",
        alt: "Salón amplio con decoración fresca",
      },
      en: {
        label: "Spacious living room",
        alt: "Spacious living room with fresh decor",
      },
      de: {
        label: "Geräumiges Wohnzimmer",
        alt: "Geräumiges Wohnzimmer mit frischer Einrichtung",
      },
    },
    ...createResponsiveImage("salon-cara-1", 4080),
    width: 4080,
    height: 3072,
  },
  {
    id: "salon-cara-2",
    texts: {
      es: {
        label: "Salón y zona de estar",
        alt: "Salón desde la otra perspectiva",
      },
      en: {
        label: "Living room and seating area",
        alt: "Living room from another perspective",
      },
      de: {
        label: "Wohnzimmer und Sitzbereich",
        alt: "Wohnzimmer aus einer anderen Perspektive",
      },
    },
    ...createResponsiveImage("salon-cara-2", 4080),
    width: 4080,
    height: 3072,
    highlight: true,
  },
  {
    id: "salon-cocina",
    texts: {
      es: {
        label: "Salón y cocina abierta",
        alt: "Espacio abierto entre salón y cocina",
      },
      en: {
        label: "Living room and open kitchen",
        alt: "Open space between living room and kitchen",
      },
      de: {
        label: "Wohnzimmer und offene Küche",
        alt: "Offener Raum zwischen Wohnzimmer und Küche",
      },
    },
    ...createResponsiveImage("salon-cocina", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "cocina-cara-1",
    texts: {
      es: {
        label: "Cocina equipada",
        alt: "Cocina moderna con todos los electrodomésticos",
      },
      en: {
        label: "Equipped kitchen",
        alt: "Modern kitchen with all appliances",
      },
      de: {
        label: "Voll ausgestattete Küche",
        alt: "Moderne Küche mit allen Geräten",
      },
    },
    ...createResponsiveImage("cocina-cara-1", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "cocina-cara-2",
    texts: {
      es: {
        label: "Cocina con encimera",
        alt: "Detalle de la cocina y encimera amplia",
      },
      en: {
        label: "Kitchen with countertop",
        alt: "Detail of the kitchen and large countertop",
      },
      de: {
        label: "Küche mit Arbeitsplatte",
        alt: "Detail der Küche und großer Arbeitsfläche",
      },
    },
    ...createResponsiveImage("cocina-cara-2", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "cocina-cara-3",
    texts: {
      es: {
        label: "Cocina vista lateral",
        alt: "Cocina desde un ángulo lateral",
      },
      en: {
        label: "Kitchen side view",
        alt: "Kitchen from a side angle",
      },
      de: {
        label: "Küche von der Seite",
        alt: "Küche aus seitlicher Perspektive",
      },
    },
    ...createResponsiveImage("cocina-cara-3", 4080),
    width: 4080,
    height: 3072,
    highlight: true,
  },
  {
    id: "dormitorio-cara-a",
    texts: {
      es: {
        label: "Dormitorio principal",
        alt: "Dormitorio con cama doble y luz natural",
      },
      en: {
        label: "Master bedroom",
        alt: "Bedroom with double bed and natural light",
      },
      de: {
        label: "Hauptschlafzimmer",
        alt: "Schlafzimmer mit Doppelbett und Tageslicht",
      },
    },
    ...createResponsiveImage("dormitorio-cara-a", 3072),
    width: 3072,
    height: 4080,
    highlight: true,
  },
  {
    id: "dormitorio-cara-b",
    texts: {
      es: {
        label: "Dormitorio secundario",
        alt: "Otro ángulo del dormitorio",
      },
      en: {
        label: "Secondary bedroom",
        alt: "Another angle of the bedroom",
      },
      de: {
        label: "Zweites Schlafzimmer",
        alt: "Ein weiterer Blick auf das Schlafzimmer",
      },
    },
    ...createResponsiveImage("dormitorio-cara-b", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "recibidor",
    texts: {
      es: {
        label: "Recibidor acogedor",
        alt: "Recibidor y acceso al resto del apartamento",
      },
      en: {
        label: "Cozy foyer",
        alt: "Hallway and access to the rest of the apartment",
      },
      de: {
        label: "Gemütliche Diele",
        alt: "Flur und Zugang zum Rest der Wohnung",
      },
    },
    ...createResponsiveImage("recibidor", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "aseo-cara-1",
    texts: {
      es: {
        label: "Aseo elegante",
        alt: "Aseo moderno y funcional",
      },
      en: {
        label: "Elegant bathroom",
        alt: "Modern and functional bathroom",
      },
      de: {
        label: "Elegantes Bad",
        alt: "Modernes und funktionales Badezimmer",
      },
    },
    ...createResponsiveImage("aseo-cara-1", 4080),
    width: 4080,
    height: 3072,
  },
];

function GalleryCard({
  item,
  currentLocale,
  onClick,
}: {
  item: GalleryItem;
  currentLocale: Locale;
  onClick: () => void;
}) {
  const current = item.texts[currentLocale];

  return (
    <button
      className={`gallery-thumb ${item.highlight ? "gallery-thumb--highlight" : ""}`}
      onClick={onClick}
      aria-label={current.label}
      type="button"
    >
      <img
        className="gallery-img"
        src={item.src}
        srcSet={item.srcSet}
        sizes={item.sizes}
        alt={current.alt}
        loading="lazy"
        decoding="async"
      />
      <div className="gallery-caption">
        <span>{current.label}</span>
        <small>{current.alt}</small>
      </div>
      <div className="gallery-thumb-overlay" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
    </button>
  );
}

export default function GalleryIsland() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const currentLocale = window.__brisaGetLocale?.() ?? DEFAULT_LOCALE;
    setLocale(currentLocale);

    const handleLocaleChange = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail?.locale) {
        setLocale(detail.locale);
      }
    };

    window.addEventListener("brisa:locale-change", handleLocaleChange);
    return () =>
      window.removeEventListener("brisa:locale-change", handleLocaleChange);
  }, []);

  const openLightbox = useCallback(
    async (index: number) => {
      const PhotoSwipe = (await import("photoswipe")).default;
      const dataSource = GALLERY_ITEMS.map((item) => ({
        src: item.fullSrc,
        width: item.width,
        height: item.height,
        alt: item.texts[locale]?.alt ?? item.texts[DEFAULT_LOCALE].alt,
      }));

      const pswp = new PhotoSwipe({
        dataSource,
        index,
        bgOpacity: 0.92,
        showHideAnimationType: "fade",
        loop: true,
      });

      pswp.init();
    },
    [locale],
  );

  return (
    <div
      className="gallery-grid"
      role="list"
      aria-label="Galería de fotos del apartamento"
    >
      {GALLERY_ITEMS.map((item, index) => (
        <div
          key={item.id}
          className={
            item.highlight
              ? "gallery-item gallery-item--highlight"
              : "gallery-item"
          }
          role="listitem"
        >
          <GalleryCard
            item={item}
            currentLocale={locale}
            onClick={() => openLightbox(index)}
          />
        </div>
      ))}
    </div>
  );
}
