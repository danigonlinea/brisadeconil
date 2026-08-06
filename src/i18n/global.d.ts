/**
 * Global type augmentation for the client-side locale shim injected
 * inline in BaseLayout.astro (`window.__brisaGetLocale` / `__brisaSetLocale`).
 * The React islands (ContactForm, GalleryIsland, FAQAccordion) read the
 * server-rendered locale through these helpers.
 */

type BrisaLocale = 'es' | 'en' | 'de';

interface Window {
  __brisaGetLocale?: () => BrisaLocale;
  __brisaSetLocale?: (locale: BrisaLocale) => void;
}
