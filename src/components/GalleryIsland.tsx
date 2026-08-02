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
  width: number;
  height: number;
  highlight?: boolean;
}

const publicBase = import.meta.env.BASE_URL || "/";
const asset = (path: string) =>
  `${publicBase.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "entrada",
    label: "Entrada luminosa",
    alt: "Entrada del apartamento con luz natural",
    src: asset("gallery/entrada.jpg"),
    width: 4080,
    height: 3072,
    highlight: true,
  },
  {
    id: "salon-cara-1",
    label: "Salón espacioso",
    alt: "Salón amplio con decoración fresca",
    src: asset("gallery/salon-cara-1.jpg"),
    width: 4080,
    height: 3072,
  },
  {
    id: "salon-cara-2",
    label: "Salón y zona de estar",
    alt: "Salón desde la otra perspectiva",
    src: asset("gallery/salon-cara-2.jpg"),
    width: 4080,
    height: 3072,
    highlight: true,
  },
  {
    id: "salon-cocina",
    label: "Salón y cocina abierta",
    alt: "Espacio abierto entre salón y cocina",
    src: asset("gallery/salon-cocina.jpg"),
    width: 3072,
    height: 4080,
  },
  {
    id: "cocina-cara-1",
    label: "Cocina equipada",
    alt: "Cocina moderna con todos los electrodomésticos",
    src: asset("gallery/cocina-cara-1.jpg"),
    width: 3072,
    height: 4080,
  },
  {
    id: "cocina-cara-2",
    label: "Cocina con encimera",
    alt: "Detalle de la cocina y encimera amplia",
    src: asset("gallery/cocina-cara-2.jpg"),
    width: 3072,
    height: 4080,
  },
  {
    id: "cocina-cara-3",
    label: "Cocina vista lateral",
    alt: "Cocina desde un ángulo lateral",
    src: asset("gallery/cocina-cara-3.jpg"),
    width: 4080,
    height: 3072,
    highlight: true,
  },
  {
    id: "dormitorio-cara-a",
    label: "Dormitorio principal",
    alt: "Dormitorio con cama doble y luz natural",
    src: asset("gallery/dormitorio-cara-a.jpg"),
    width: 3072,
    height: 4080,
    highlight: true,
  },
  {
    id: "dormitorio-cara-b",
    label: "Dormitorio secundario",
    alt: "Otro ángulo del dormitorio",
    src: asset("gallery/dormitorio-cara-b.jpg"),
    width: 3072,
    height: 4080,
  },
  {
    id: "recibidor",
    label: "Recibidor acogedor",
    alt: "Recibidor y acceso al resto del apartamento",
    src: asset("gallery/recibidor.jpg"),
    width: 3072,
    height: 4080,
  },
  {
    id: "aseo-cara-1",
    label: "Aseo elegante",
    alt: "Aseo moderno y funcional",
    src: asset("gallery/aseo-cara-1.jpg"),
    width: 4080,
    height: 3072,
  },
  {
    id: "aseo-cara-2",
    label: "Aseo con detalle",
    alt: "Detalle del aseo del apartamento",
    src: asset("gallery/aseo-cara-2.jpg"),
    width: 3072,
    height: 4080,
  },
  {
    id: "aseo-cara-3",
    label: "Aseo completo",
    alt: "Aseo limpio y espacioso",
    src: asset("gallery/aseo-cara-3.jpg"),
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
        alt={item.alt}
        loading="lazy"
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
      src: item.src,
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
