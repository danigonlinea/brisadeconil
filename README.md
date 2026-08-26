# Brisa de Conil

Landing page para el alquiler vacacional del apartamento **Brisa de Conil**, en Conil de la Frontera (Cádiz).

**Stack:** Astro v7 · React v19 · CSS Custom Properties · PhotoSwipe v5 · Web3Forms

---

## Desarrollo local

```bash
npm install          # instalar dependencias
npm run dev          # servidor de desarrollo → http://localhost:4321/
npm run build        # build de producción → dist/
npm run preview      # previsualizar el build
npm run lint         # ESLint (flat config)
npx astro check      # type-check del proyecto
```

---

## Estructura del proyecto

```
src/
├── components/          # Componentes Astro (secciones) + islas React
│   ├── *.astro          # Header, Hero, GallerySection, ApartmentSection, ...
│   └── *.tsx            # GalleryIsland, ContactForm, FAQAccordion, LanguageSwitcher
├── content/
│   ├── es.ts / en.ts / de.ts   # copy del sitio por locale (ES es la referencia tipada)
│   ├── index.ts         # registro CONTENT: Record<Locale, SiteContent>
│   ├── blog/            # posts ES (markdown) → /blog/{slug}/
│   ├── blog-en/         # posts EN → /en/blog/{slug}/ (slugs propios por idioma)
│   └── blog-de/         # posts DE → /de/blog/{slug}/
├── content.config.ts    # content layer: colecciones blog/blogEn/blogDe (glob loader + Zod)
├── i18n/
│   ├── locales.ts       # registro de locales, prefijos de URL, helpers de rutas
│   └── blog.ts          # strings i18n del blog
├── data/
│   └── gallery-manifest.ts  # AUTO-GENERADO — no editar a mano
├── lib/
│   └── analytics.ts     # helpers de Google Analytics (trackEvent)
├── layouts/
│   └── BaseLayout.astro # meta/SEO, schema.org, dark theme, estilos globales
├── pages/
│   ├── index.astro              # home ES (/)
│   ├── [lang]/                  # home + blog para EN/DE (/en/, /de/)
│   ├── blog/                    # índice + [slug] del blog ES
│   ├── alojamiento-cerca-playa-conil/   # landing SEO
│   ├── apartamento-vacacional-conil/    # landing SEO
│   ├── aviso-legal.astro
│   ├── politica-cookies.astro
│   ├── politica-privacidad.astro
│   └── api/contact.ts           # endpoint POST del formulario → Web3Forms
├── templates/           # plantillas compartidas de páginas
│   ├── HomePage.astro
│   ├── BlogIndexPage.astro
│   ├── BlogPostPage.astro
│   └── SeoLandingPage.astro
└── styles/
    ├── global.css        # design system completo (tokens, light/dark, componentes)
    └── gallery.css       # estilos de PhotoSwipe
scripts/
├── optimize-gallery.mjs  # genera variantes AVIF/WebP/JPEG + manifest (sharp)
└── validate.sh           # validación local (type-check, build, anti-secretos)
public/
├── gallery/*.jpg         # originales a resolución completa (no editar a mano)
├── gallery/optimized/    # AUTO-GENERADO (640/1600/2000px · avif/webp/jpg)
└── logos/                # logos del sitio (también espejados en src/logos/)
docs/
└── research-conil.md     # investigación de mercado versionada
```

---

## Decisiones técnicas

| Decisión    | Elección                         | Motivo                                                      |
| ----------- | -------------------------------- | ----------------------------------------------------------- |
| Framework   | Astro v7 (SSG)                   | Estático para GitHub Pages, islas React para interactividad |
| Estilos     | CSS Custom Properties            | Sin dependencias, design system propio, dark mode nativo    |
| Galería     | PhotoSwipe v5                    | Responsive, accesible, swipe en móvil                       |
| Formulario  | Web3Forms                        | Gratuito, sin límites, sin backend                          |
| Mapa        | Google Maps embed                | Sin API key, universalmente reconocido                      |
| Tipografía  | Lora + Source Sans 3             | Cálida, boutique, sin ser cliché                            |
| Animaciones | CSS + Intersection Observer      | Sin dependencias, bundle ligero                             |
| i18n        | Ficheros de contenido (ES/EN/DE) | Sin librería extra, fácil de mantener                       |
