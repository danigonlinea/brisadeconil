# AGENTS.md

Guía canónica para cualquier agente de IA (Codex, Cursor, Claude Code, etc.) que trabaje en este repositorio. `CLAUDE.md` referencia este archivo.

> Idioma del proyecto: **Español**. El copy visible para el usuario, el README y las issues van en español. Los nombres de código (variables, funciones, ficheros) y los comentarios pueden ir en inglés o español; respeta el estilo del fichero que toques.

---

## 1. Qué es este proyecto

Landing page estática del apartamento vacacional **Brisa de Conil** (Conil de la Frontera, Cádiz). Una sola página principal (`src/pages/index.astro`) + páginas legales (`aviso-legal`, `politica-cookies`, `politica-privacidad`) + un endpoint de API (`src/pages/api/contact.ts`). Se publica en GitHub Pages desde la rama `main`.

### Stack

| Pieza             | Versión | Uso                                                       |
| ----------------- | ------- | --------------------------------------------------------- |
| Astro             | v7      | Framework SSG principal; output estático                  |
| React             | v19     | Islas interactivas (galería, formulario, FAQ, idioma)      |
| PhotoSwipe        | v5      | Lightbox de la galería                                    |
| Web3Forms         | —       | Backend del formulario de contacto (sin servidor propio)  |
| sharp             | ^0.35   | Generación de variantes de imagen (script propio)          |
| CSS Custom Props  | —       | Design system (sin Tailwind, sin framework CSS)           |
| TypeScript        | strict  | `tsconfig.json` extiende `astro/tsconfigs/strict`          |
| Google Analytics  | —       | Event tracking (cargado tras consentimiento de cookies)    |

- **Package manager:** `npm` (existe `package-lock.json`; en CI se usa `npm ci`).
- **Node:** `>=22.12.0` (campo `engines`). El workflow de CI usa Node `24.18.1`.
- **Linter:** ESLint (flat config) con `npm run lint`; también corre en CI. Para type-checkear usa `npx astro check` (local y CI). Sin framework de tests actualmente.

---

## 2. Comandos

```bash
npm install                      # instalar dependencias
npm run dev                      # servidor de desarrollo → http://localhost:4321/
npm run build                    # build de producción → dist/
npm run preview                  # previsualizar el build
npm run optimize:gallery        # regenerar imágenes optimizadas + manifest (ver §6)
npx astro check                  # type-check del proyecto
```

> Nota: el README histórico menciona `http://localhost:4321/brisadeconil/`, pero la config actual usa `base: "/"`, así que el dev server sirve en `http://localhost:4321/`.

---

## 3. Estructura del proyecto

```
src/
├── components/          # Componentes Astro (secciones) + islas React
│   ├── *.astro          # Header, Hero, GallerySection, ApartmentSection, ...
│   └── *.tsx            # GalleryIsland, ContactForm, FAQAccordion, LanguageSwitcher
├── content/             # TODO el copy del sitio
│   ├── es.ts            # Español (locale activo)
│   ├── en.ts            # Inglés (listo para activar)
│   ├── de.ts            # Alemán (listo para activar)
│   └── index.ts         # re-exporta el locale activo
├── i18n/
│   ├── translations.ts  # strings ES/EN/DE para el i18n client-side (data-i18n)
│   └── i18n-script.ts   # script que intercambia textos sin recarga
├── data/
│   └── gallery-manifest.ts  # AUTO-GENERADO — no editar a mano (ver §6)
├── lib/
│   └── analytics.ts     # helpers de Google Analytics (trackEvent)
├── layouts/
│   └── BaseLayout.astro # meta/SEO, schema.org, dark theme, estilos globales, i18n script
├── pages/
│   ├── index.astro      # página principal (ensambla las secciones)
│   ├── aviso-legal.astro
│   ├── politica-cookies.astro
│   ├── politica-privacidad.astro
│   └── api/contact.ts   # endpoint POST del formulario → Web3Forms
└── styles/
    ├── global.css        # design system completo (tokens, light/dark, componentes)
    └── gallery.css       # estilos de PhotoSwipe
scripts/
└── optimize-gallery.mjs  # genera variantes AVIF/WebP/JPEG + manifest (sharp)
public/
├── gallery/*.jpg         # originales a resolución completa (no editar a mano)
└── gallery/optimized/    # AUTO-GENERADO (640/1600/2000px · avif/webp/jpg)
```

---

## 4. Convenciones e invariantes (lee antes de tocar código)

Estas reglas son **obligatorias**; romperlas rompe el build o el flujo de contenido.

### Contenido vs. layout
- **Todo el copy visible vive en `src/content/{locale}.ts`.** Los componentes `.astro`/`.tsx` deben estar **libres de contenido**: consumen el objeto de contenido, no incrustan texto a mano.
- Para cambiar textos, fotos, amenities, FAQ, etc.: edita `src/content/es.ts` (o el locale que corresponda) — **cambia valores, nunca las claves** (las claves las consumen los componentes y `translations.ts`).
- Para activar otro idioma: cambia el `export * from './es'` en `src/content/index.ts` por `./en` o `./de`.

### Galería e imágenes (ficheros auto-generados)
- **Nunca edites a mano** `src/data/gallery-manifest.ts` ni nada bajo `public/gallery/optimized/`. Se generan con `npm run optimize:gallery` (ver §6).
- **Nunca edites a mano** los originales `public/gallery/*.jpg` (son la fuente a resolución completa). Para añadir/quitar fotos, lee §6.
- La cuadrícula solo sirve hasta 1600px; el lightbox hasta 2000px. No sirvas los multi-MB originales al navegador.

### Seguridad
- **Nunca pongas secretos en código cliente.** El formulario intenta primero `POST /api/contact` (server-side, usa `process.env.WEB3FORMS_ACCESS_KEY`) y, si falla, cae a un `POST` directo a `api.web3forms.com` con la key pública `PUBLIC_WEB3FORMS_KEY` — ese fallback es el camino que funciona en GitHub Pages (hosting estático). `PUBLIC_WEB3FORMS_KEY` es la única key que puede ir al cliente.
- **Nunca commitees `.env`** ni claves reales. `.env` está en `.gitignore`.
- Cuidado con `set:html`: su uso queda reservado a markup legítimo generado por el build (JSON-LD en `FAQSection`/`BaseLayout` y el `i18n-script`). Los iconos SVG ya NO se inyectan con `set:html`: se renderizan vía el componente compartido `src/components/SvgIcon.astro` (tipado, sin inyección). Si tocas iconos, usa `SvgIcon` y añade el `name` correspondiente a su set.

### Estilos
- **Sin Tailwind, sin framework CSS.** Se usan CSS Custom Properties definidos en `src/styles/global.css` (paleta navy/chalk/teal, tipografías Lora + Source Sans 3, dark mode nativo).
- Reutiliza los tokens semánticos (`--bg-surface`, `--text-base`, `--accent`, etc.) en lugar de colores crudos. No introduzcas nuevos sistemas de estilos.

### TypeScript
- `strict` activado. No uses `any` salvo causa justificada, y entonces deja un comentario explicando por qué.
- Los componentes React usan `jsx: react-jsx` con `jsxImportSource: react`.

### Commits y ramas
- Rama por defecto y de despliegue: `main`. Existe `feat/new-variant-website` como rama de variantes.
- Mensajes de commit en inglés, prefijados por tipo cuando aplique (`feat:`, `fix:`, `chore:`, `perf:`, `docs:`). Ejemplos reales del repo: `perf(gallery): optimize image loading...`, `fix: update Astro base and site...`.

---

## 5. Cómo añadir / cambiar contenido

1. Abre `src/content/es.ts` (o `en.ts`/`de.ts`).
2. Edita los valores del objeto correspondiente (`hero`, `apartment`, `amenities`, `faq`, `footer`, ...). **No cambies las claves.**
3. Guarda — el dev server recarga solo.
4. Si el texto debe reflejarse en el i18n client-side, actualiza también la clave equivalente en `src/i18n/translations.ts` (las claves siguen la notación `seccion.campo` y deben coincidir con los atributos `data-i18n` de los componentes).

> Marcadores pendientes: busca `[PENDIENTE`, `[PLACEHOLDER` e `[IMAGEN PLACEHOLDER` en `src/content/*.ts` para ver qué falta completar (a día de hoy solo quedan los marcadores `[PLACEHOLDER` de testimonios pendientes de reseñas reales, en `es.ts` y `en.ts`).

---

## 6. Galería: añadir o quitar fotos

El flujo de imágenes está automatizado con `sharp`:

1. Coloca el original a resolución completa como `public/gallery/{id}.jpg` (usa un `id` descriptivo, p. ej. `salon-cara-3`).
2. Registra el `id` y sus textos (es/en/de) en el array `GALLERY_ITEMS` de `src/components/GalleryIsland.tsx`.
3. Ejecuta `npm run optimize:gallery`. Esto genera:
   - `public/gallery/optimized/{id}-640.{avif,webp,jpg}`
   - `public/gallery/optimized/{id}-1600.{avif,webp,jpg}`
   - `public/gallery/optimized/{id}-2000.{avif,webp,jpg}`
   - y reescribe `src/data/gallery-manifest.ts` con el LQIP (data URI difuminada), `aspectRatio` y dimensiones del lightbox.
4. El script es **idempotente**: salta ficheros ya generados y más nuevos que el original. Para forzar regeneración, borra `public/gallery/optimized/`.

Para **quitar** una foto: elimina el original, quita la entrada de `GALLERY_ITEMS` y vuelve a ejecutar `npm run optimize:gallery`.

---

## 7. Variables de entorno y secretos

| Variable                | Ámbito  | Dónde se usa                        | Notas                                                          |
| ----------------------- | ------- | ----------------------------------- | -------------------------------------------------------------- |
| `PUBLIC_WEB3FORMS_KEY`  | cliente | `src/components/ContactForm.tsx`    | Key pública; fallback del formulario con POST directo a Web3Forms. Es el camino principal en la práctica (GitHub Pages es estático; el endpoint server no corre allí). Pública-segura |
| `WEB3FORMS_ACCESS_KEY`  | server  | `src/pages/api/contact.ts`          | Server-only. **NUNCA** en código cliente. Se mantiene para futuro hosting con servidor; hoy no es funcional en GitHub Pages |
| `WEB3FORMS_KEY`         | CI      | `.github/workflows/deploy.yml`      | GitHub Secret inyectado en el build como `PUBLIC_WEB3FORMS_KEY` (cliente) y `WEB3FORMS_ACCESS_KEY` (server, para `/api/contact`) |

Para desarrollo local: copia `.env.example` → `.env` y rellena la key. Para CI/despliegue, define el GitHub Secret `WEB3FORMS_KEY` (Settings → Secrets and variables → Actions).

---

## 8. Despliegue

- **CI/CD:** `.github/workflows/deploy.yml` — build + deploy a GitHub Pages en cada push a `main` (y `workflow_dispatch`).
- Pasos del workflow: checkout → setup Node 24.18.1 → `npm ci` → `npm run optimize:gallery` → `npm run build` (con `PUBLIC_WEB3FORMS_KEY` desde el secret) → upload artifact → deploy.
- **URL de producción:** `https://www.brisadeconil.com` (ver `astro.config.mjs`: `site` + `base: "/"`; `public/CNAME` apunta el dominio).
- Para cambiar de dominio: edita `site`/`base` en `astro.config.mjs`, `public/CNAME` y `public/robots.txt` (URL del sitemap). Detalles en el README, sección "Migrar a dominio propio".
- Output del build: `dist/`. Las pages legales se generan como rutas estáticas.

---

## 9. Validación antes de entregar

Antes de marcar una tarea como hecha, verifica:

1. `npm run build` termina sin errores.
2. `npx astro check` no reporta errores de tipos.
3. Si tocaste la galería o las imágenes: `npm run optimize:gallery` corre limpio y `gallery-manifest.ts` se actualizó.
4. Si tocaste el formulario/API: prueba un envío y confirma que el email llega (vía Web3Forms).
5. No has introducido secretos en código cliente ni commiteado `.env`.
6. `git status` muestra solo los ficheros esperados (recuerda: `dist/`, `.astro/` y `node_modules/` están gitignored).

---

## 10. Trabajo pendiente conocido (roadmap del README)

Está pendiente (no lo asumas resuelto):

- **CSP y cabeceras** de seguridad en el hosting.
- ~~**Rate-limiting / anti-bot** en `/api/contact` (honeypot, reCAPTCHA o contador por IP).~~ — **Hecho**: sliding-window rate-limit (5 req/10 min por IP) + honeypot + validación (2026-08-24).
- ~~**Auditoría de XSS / sanitización** del HTML legítimo en `src/i18n/translations.ts`.~~ — **Hecho**: sanitizer allowlist verificado (tags permitidos, sin `on*`, esquemas href validados); todo el HTML de traducciones es estático y seguro, DOMPurify no necesario (2026-08-24).
- ~~**`npm audit`** + Dependabot/Renovate.~~ — **Hecho**: `.github/dependabot.yml` configurado (npm + github-actions, mensual) (2026-08-24).
- ~~**Reemplazar `set:html`** de iconos SVG por componentes/imports SVG.~~ — **Hecho**: los iconos están centralizados en `src/components/SvgIcon.astro` (2026-08-14).
- ~~**CI con checks** `tsc --noEmit`, ESLint y `npm audit`.~~ — **Hecho**: `astro check`, build y `npm audit --audit-level=moderate` en `.github/workflows/checks.yml`; ESLint y type-check de React en el job quality de `.github/workflows/deploy.yml` (2026-08-24).
- **Logging/monitorización** de `/api/contact`.
- Sustituir **testimonios placeholder** por reseñas reales.
- ~~Crear **`public/og-image.jpg`** real (1200×630).~~ — **Hecho**: existe `public/og-image.jpg` real 1200×630 (2026-08-24).

Cuando completes un punto, márcalo en el TODO del repo y actualiza esta lista si procede.
