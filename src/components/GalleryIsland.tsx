/**
 * GalleryIsland — React component with PhotoSwipe lightbox.
 * Uses actual public/gallery photographs and presents them in a responsive grid.
 */
import { useCallback } from "react";
import "photoswipe/style.css";

interface GalleryItem {
  id: string;
  label: string;
  alt: string;
  src: string;
  srcSet: string;
  sizes: string;
  fullSrc: string;
  width: number;
  height: number;
  highlight?: boolean;
}

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
    label: "Entrada luminosa",
    alt: "Entrada del apartamento con luz natural",
    ...createResponsiveImage("entrada", 4080),
    width: 4080,
    height: 3072,
    highlight: true,
  },
  {
    id: "salon-cara-1",
    label: "Salón espacioso",
    alt: "Salón amplio con decoración fresca",
    ...createResponsiveImage("salon-cara-1", 4080),
    width: 4080,
    height: 3072,
  },
  {
    id: "salon-cara-2",
    label: "Salón y zona de estar",
    alt: "Salón desde la otra perspectiva",
    ...createResponsiveImage("salon-cara-2", 4080),
    width: 4080,
    height: 3072,
    highlight: true,
  },
  {
    id: "salon-cocina",
    label: "Salón y cocina abierta",
    alt: "Espacio abierto entre salón y cocina",
    ...createResponsiveImage("salon-cocina", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "cocina-cara-1",
    label: "Cocina equipada",
    alt: "Cocina moderna con todos los electrodomésticos",
    ...createResponsiveImage("cocina-cara-1", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "cocina-cara-2",
    label: "Cocina con encimera",
    alt: "Detalle de la cocina y encimera amplia",
    ...createResponsiveImage("cocina-cara-2", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "cocina-cara-3",
    label: "Cocina vista lateral",
    alt: "Cocina desde un ángulo lateral",
    ...createResponsiveImage("cocina-cara-3", 4080),
    width: 4080,
    height: 3072,
    highlight: true,
  },
  {
    id: "dormitorio-cara-a",
    label: "Dormitorio principal",
    alt: "Dormitorio con cama doble y luz natural",
    ...createResponsiveImage("dormitorio-cara-a", 3072),
    width: 3072,
    height: 4080,
    highlight: true,
  },
  {
    id: "dormitorio-cara-b",
    label: "Dormitorio secundario",
    alt: "Otro ángulo del dormitorio",
    ...createResponsiveImage("dormitorio-cara-b", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "recibidor",
    label: "Recibidor acogedor",
    alt: "Recibidor y acceso al resto del apartamento",
    ...createResponsiveImage("recibidor", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "aseo-cara-1",
    label: "Aseo elegante",
    alt: "Aseo moderno y funcional",
    ...createResponsiveImage("aseo-cara-1", 4080),
    width: 4080,
    height: 3072,
  },
  {
    id: "aseo-cara-2",
    label: "Aseo con detalle",
    alt: "Detalle del aseo del apartamento",
    ...createResponsiveImage("aseo-cara-2", 3072),
    width: 3072,
    height: 4080,
  },
  {
    id: "aseo-cara-3",
    label: "Aseo completo",
    alt: "Aseo limpio y espacioso",
    ...createResponsiveImage("aseo-cara-3", 4080),
    width: 4080,
    height: 3072,
  },
];

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <button
      className={`gallery-thumb ${item.highlight ? "gallery-thumb--highlight" : ""}`}
      onClick={onClick}
      aria-label={`Ver foto: ${item.label}`}
      type="button"
    >
      <img
        className="gallery-img"
        src={item.src}
        srcSet={item.srcSet}
        sizes={item.sizes}
        alt={item.alt}
        loading="lazy"
        decoding="async"
      />
      <div className="gallery-caption">
        <span>{item.label}</span>
        <small>{item.alt}</small>
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
  const openLightbox = useCallback(async (index: number) => {
    const PhotoSwipe = (await import("photoswipe")).default;
    const dataSource = GALLERY_ITEMS.map((item) => ({
      src: item.fullSrc,
      width: item.width,
      height: item.height,
      alt: item.alt,
    }));

    const pswp = new PhotoSwipe({
      dataSource,
      index,
      bgOpacity: 0.92,
      showHideAnimationType: "fade",
      loop: true,
    });

    pswp.init();
  }, []);

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
          <GalleryCard item={item} onClick={() => openLightbox(index)} />
        </div>
      ))}
    </div>
  );
}
