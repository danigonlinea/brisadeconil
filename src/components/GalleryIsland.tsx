/**
 * GalleryIsland — React component with PhotoSwipe lightbox.
 *
 * Image loading strategy (optimised for slow connections):
 *  - <picture> with AVIF → WebP → JPEG sources; the browser downloads one file.
 *  - srcSet only ever offers 640w / 1600w for the grid (never the multi-MB
 *    originals). The 2000w variants are reserved for the lightbox.
 *  - Each card renders an inline LQIP (20px JPEG data URI) as a blurred
 *    background so *something* shows instantly while the real image streams in.
 *  - A per-card IntersectionObserver defers setting <img src>/<source srcSet>
 *    until the card is near the viewport (rootMargin 300px). Until then, no
 *    network request is made for that image at all.
 *  - On load the real image fades in over the LQIP (blur-up).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "../i18n/translations";
import galleryManifest from "../data/gallery-manifest";
import { trackEvent } from "../lib/analytics";

interface GalleryItem {
  id: string;
  texts: Record<Locale, { label: string; alt: string }>;
  highlight?: boolean;
}

interface ResponsiveImage {
  lqip: string;
  aspectRatio: number;
  sizes: string;
  avifSrcSet: string;
  webpSrcSet: string;
  jpg640: string;
  jpgSrcSet: string;
  fullSrc: string;
  fullWidth: number;
  fullHeight: number;
}

const DEFAULT_LOCALE: Locale = "es";
const publicBase = import.meta.env.BASE_URL || "/";
const asset = (path: string) =>
  `${publicBase.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

const GRID_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
const GRID_WIDTHS = [640, 1600] as const;

const buildSrcSet = (id: string, width: number, ext: string) =>
  `${asset(`gallery/optimized/${id}-${width}.${ext}`)} ${width}w`;

const createResponsiveImage = (id: string): ResponsiveImage => {
  const entry = galleryManifest[id];
  if (!entry) {
    throw new Error(`Gallery manifest is missing an entry for "${id}".`);
  }
  return {
    lqip: entry.lqip,
    aspectRatio: entry.aspectRatio,
    sizes: GRID_SIZES,
    avifSrcSet: GRID_WIDTHS.map((w) => buildSrcSet(id, w, "avif")).join(", "),
    webpSrcSet: GRID_WIDTHS.map((w) => buildSrcSet(id, w, "webp")).join(", "),
    jpg640: asset(`gallery/optimized/${id}-640.jpg`),
    jpgSrcSet: GRID_WIDTHS.map((w) => buildSrcSet(id, w, "jpg")).join(", "),
    fullSrc: asset(`gallery/optimized/${id}-2000.webp`),
    fullWidth: entry.full.width,
    fullHeight: entry.full.height,
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
    highlight: true,
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
  },
  {
    id: "azotea-comunitaria",
    texts: {
      es: {
        label: "Azotea comunitaria",
        alt: "Azotea compartida del edificio con vistas a Conil",
      },
      en: {
        label: "Communal rooftop",
        alt: "Shared rooftop of the building with views over Conil",
      },
      de: {
        label: "Gemeinschaftsdachterrasse",
        alt: "Gemeinsame Dachterrasse des Gebäudes mit Blick auf Conil",
      },
    },
    highlight: false,
  },
];

/** Pre-compute responsive image data once (module scope, not per render). */
const GALLERY_IMAGES = new Map<string, ResponsiveImage>(
  GALLERY_ITEMS.map((item) => [item.id, createResponsiveImage(item.id)]),
);

/**
 * useInView — starts true once the element is within `rootMargin` of the
 * viewport, then disconnects. Falls back to `true` immediately when
 * IntersectionObserver is unavailable (SSR / very old browsers) so images are
 * never permanently blocked.
 */
function useInView<T extends HTMLElement>(rootMargin = "300px 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}

function GalleryCard({
  item,
  currentLocale,
  index,
  onClick,
}: {
  item: GalleryItem;
  currentLocale: Locale;
  index: number;
  onClick: () => void;
}) {
  const current = item.texts[currentLocale] ?? item.texts[DEFAULT_LOCALE];
  const img = GALLERY_IMAGES.get(item.id)!;
  const [ref, inView] = useInView<HTMLButtonElement>();
  const [loaded, setLoaded] = useState(false);
  const isAboveFold = index === 0;

  return (
    <button
      ref={ref}
      className={`gallery-thumb ${item.highlight ? "gallery-thumb--highlight" : ""} ${loaded ? "is-loaded" : ""}`}
      onClick={onClick}
      aria-label={current.label}
      type="button"
      style={{
        backgroundImage: `url("${img.lqip}")`,
        aspectRatio: String(img.aspectRatio),
      }}
    >
      {inView && (
        <picture className="gallery-picture">
          <source type="image/avif" srcSet={img.avifSrcSet} sizes={img.sizes} />
          <source type="image/webp" srcSet={img.webpSrcSet} sizes={img.sizes} />
          <img
            className="gallery-img"
            src={img.jpg640}
            srcSet={img.jpgSrcSet}
            sizes={img.sizes}
            alt={current.alt}
            loading={isAboveFold ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={isAboveFold ? "high" : "low"}
            onLoad={() => setLoaded(true)}
          />
        </picture>
      )}
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
      const item = GALLERY_ITEMS[index];
      trackEvent("gallery_open", { item: item?.id ?? null, index });
      // PhotoSwipe JS is loaded on demand (not in the initial bundle). Its CSS
      // is bundled statically by GallerySection.astro — a dynamic CSS import
      // here produces a chunk reference to a file Astro never emits (404).
      const PhotoSwipe = (await import("photoswipe")).default;
      const dataSource = GALLERY_ITEMS.map((item) => {
        const img = GALLERY_IMAGES.get(item.id)!;
        return {
          src: img.fullSrc,
          width: img.fullWidth,
          height: img.fullHeight,
          alt: item.texts[locale]?.alt ?? item.texts[DEFAULT_LOCALE].alt,
        };
      });

      const pswp = new PhotoSwipe({
        dataSource,
        index,
        bgOpacity: 0.92,
        showHideAnimationType: "fade",
        loop: true,
      });

      let popstateTriggered = false;
      const previousHistoryState = window.history.state;
      const historyState = {
        ...(typeof previousHistoryState === "object" &&
        previousHistoryState !== null
          ? previousHistoryState
          : {}),
        brisaGalleryOpen: true,
      };

      const handlePopState = (event: PopStateEvent) => {
        const state = event.state;

        if (state && state.brisaGalleryOpen) {
          return;
        }

        popstateTriggered = true;
        pswp.close();
      };

      const cleanupPopState = () => {
        window.removeEventListener("popstate", handlePopState);
      };

      pswp.on("destroy", () => {
        cleanupPopState();

        if (!popstateTriggered && window.history.state?.brisaGalleryOpen) {
          window.history.back();
        }
      });

      window.history.pushState(historyState, "", window.location.href);
      window.addEventListener("popstate", handlePopState);

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
            index={index}
            onClick={() => openLightbox(index)}
          />
        </div>
      ))}
    </div>
  );
}
