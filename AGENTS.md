# AGENTS.md

Guía canónica para cualquier agente de IA (Codex, Cursor, Claude Code, etc.) que trabaje en este repositorio. `CLAUDE.md` referencia este archivo.

> Idioma del proyecto: **Español**. El copy visible para el usuario, el README y las issues van en español. Los nombres de código (variables, funciones, ficheros) y los comentarios pueden ir en inglés o español; respeta el estilo del fichero que toques.

---

## 1. Qué es este proyecto

Web estática del apartamento vacacional **Brisa de Conil** (Conil de la Frontera, Cádiz): página principal + versiones EN/DE bajo `/en` y `/de`, blog multi-idioma con content collections, landings SEO (`alojamiento-cerca-playa-conil`, `apartamento-vacacional-conil`), páginas legales y un endpoint de API (`src/pages/api/contact.ts`). Se publica en GitHub Pages desde la rama `main`.

### Stack

| Pieza             | Versión | Uso                                                        |
| ----------------- | ------- | ---------------------------------------------------------- |
| Astro             | v7      | Framework SSG principal; output estático; sitemap integrado |
| React             | v19     | Islas interactivas (galería, formulario, FAQ, idioma)       |
| PhotoSwipe        | v5      | Lightbox de la galería                                      |
| Web3Forms         | —       | Backend del formulario de contacto (sin servidor propio)    |
| sharp             | ^0.35   | Generación de variantes de imagen (script propio)           |
| CSS Custom Props  | —       | Design system (sin Tailwind, sin framework CSS)             |
| TypeScript        | strict  | `tsconfig.json` extiende `astro/tsconfigs/strict`           |
| Google Analytics  | —       | Event tracking (cargado tras consentimiento de cookies)     |

- **Package manager:** `npm` (existe `package-lock.json`; en CI se usa `npm ci`).
- **Node:** `>=22.12.0` (campo `engines`). Los workflows de CI usan Node `24.18.1`.
- **Linter:** ESLint (flat config) con `npm run lint`; también corre en CI. Para type-check usa `npx astro check`; el TSX de React se type-checkea aparte con `npm run typecheck:react`. Sin framework de tests.
- **Script de validación local:** `scripts/validate.sh` (completo) o `scripts/validate.sh --fast` (type-check + anti-secretos).

---

## 2. Comandos

```bash
npm install                      # instalar dependencias
npm run dev                      # servidor de desarrollo → http://localhost:4321/
npm run build                    # build de producción → dist/
npm run preview                  # previsualizar el build
npm run lint                     # ESLint (flat config)
npm run typecheck:react          # type-check del TSX de React (tsconfig.react.json)
npx astro check                  # type-check del proyecto
npm run optimize:gallery         # regenerar imágenes optimizadas + manifest (ver §6)
./scripts/validate.sh            # type-check + build + anti-secretos
```

> Nota: el README histórico menciona `http://localhost:4321/brisadeconil/`, pero la config actual usa `base: "/"`, así que el dev server sirve en `http://localhost:4321/`.

---

## 3. Estructura del proyecto

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
│   └── gallery-manifest.ts  # AUTO-GENERADO — no editar a mano (ver §6)
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

**Multi-idioma:** los tres locales (es/en/de) están **activos**. `src/i18n/locales.ts` define que `es` se sirve en `/` (canónico) y `en`/`de` bajo sus prefijos. Cada locale tiene su propio copy (`src/content/{locale}.ts`) y sus propios posts de blog con slugs propios (una colección por idioma en `content.config.ts`).

---

## 4. Convenciones e invariantes (lee antes de tocar código)

Estas reglas son **obligatorias**; romperlas rompe el build o el flujo de contenido.

### Contenido vs. layout
- **Todo el copy visible vive en `src/content/{locale}.ts`.** Los componentes `.astro`/`.tsx` deben estar **libres de contenido**: consumen el objeto de contenido vía props desde las plantillas de `src/templates/`, no incrustan texto a mano.
- Para cambiar textos, fotos, amenities, FAQ, etc.: edita `src/content/es.ts` (o el locale que corresponda) — **cambia valores, nunca las claves** (la forma de `es.ts` es el tipo `SiteContent` que tipa todos los locales).
- Para añadir un idioma: duplica `es.ts`, traduce valores, regístralo en `src/content/index.ts` y en `src/i18n/locales.ts`.

### Blog (content collections)
- Los posts son markdown en `src/content/blog{,-en,-de}/`. El frontmatter lo valida un schema Zod en `content.config.ts`: `title`, `description` y `pubDate` obligatorios; si declaras `image`, `imageAlt` es **obligatorio** (falla el build si falta).
- Cada idioma lleva slugs propios; no asumas que un slug existe en los tres idiomas.
- No edites las rutas ni el schema a la ligera: las plantillas `BlogPostPage.astro` / `BlogIndexPage.astro` y las páginas en `pages/blog/` y `pages/[lang]/blog/` dependen de ellos.

### Galería e imágenes (ficheros auto-generados)
- **Nunca edites a mano** `src/data/gallery-manifest.ts` ni nada bajo `public/gallery/optimized/`. Se generan con `npm run optimize:gallery` (ver §6).
- **Nunca edites a mano** los originales `public/gallery/*.jpg` (son la fuente a resolución completa). Para añadir/quitar fotos, lee §6.
- La cuadrícula solo sirve hasta 1600px; el lightbox hasta 2000px. No sirvas los multi-MB originales al navegador.

### Seguridad
- **Nunca pongas secretos en código cliente.** El formulario intenta primero `POST /api/contact` (server-side, usa `process.env.WEB3FORMS_ACCESS_KEY`) y, si falla, cae a un `POST` directo a `api.web3forms.com` con la key pública `PUBLIC_WEB3FORMS_KEY` — ese fallback es el camino que funciona en GitHub Pages (hosting estático). `PUBLIC_WEB3FORMS_KEY` es la única key que puede ir al cliente.
- **Nunca commitees `.env`** ni claves reales. `.env` está en `.gitignore`. Existe además un grep anti-secretos en `scripts/validate.sh` y en el pre-commit.
- Cuidado con `set:html`: su uso queda reservado a markup legítimo generado por el build (JSON-LD en `FAQSection`/`BaseLayout` e `i18n-script`). Los iconos SVG se renderizan vía el componente compartido `src/components/SvgIcon.astro` (tipado, sin inyección). Si tocas iconos, usa `SvgIcon` y añade el `name` correspondiente a su set.
- `/api/contact` tiene sliding-window rate-limit (5 req/10 min por IP), honeypot y validación de campos.

### Estilos
- **Sin Tailwind, sin framework CSS.** Se usan CSS Custom Properties definidos en `src/styles/global.css` (paleta navy/chalk/teal, tipografías Lora + Source Sans 3, dark mode nativo).
- Reutiliza los tokens semánticos (`--bg-surface`, `--text-base`, `--accent`, etc.) en lugar de colores crudos. No introduzcas nuevos sistemas de estilos.

### TypeScript
- `strict` activado. No uses `any` salvo causa justificada, y entonces deja un comentario explicando por qué.
- Los componentes React usan `jsx: react-jsx` con `jsxImportSource: react` (config aparte en `tsconfig.react.json`).

### Commits y ramas
- Rama por defecto y de despliegue: `main`. Existe `feat/new-variant-website` como rama de variantes.
- Mensajes de commit en inglés, prefijados por tipo cuando aplique (`feat:`, `fix:`, `chore:`, `perf:`, `docs:`). Ejemplos reales del repo: `perf(gallery): optimize image loading...`, `fix: update Astro base and site...`.

---

## 5. Cómo añadir / cambiar contenido

1. Abre `src/content/es.ts` (o `en.ts`/`de.ts`).
2. Edita los valores del objeto correspondiente (`hero`, `apartment`, `amenities`, `faq`, `footer`, ...). **No cambies las claves.**
3. Guarda — el dev server recarga solo.

Para **posts de blog**: crea el `.md` en la carpeta del idioma correspondiente con el frontmatter válido (ver §4) y escribe en el tono de los existentes (primera persona, voz del anfitrión, español natural). Si el post declara imagen, añade también `imageAlt`.

> Marcadores pendientes: busca `[PENDIENTE`, `[PLACEHOLDER` e `[IMAGEN PLACEHOLDER` en `src/content/*.ts` para ver qué falta completar (quedan marcadores `[PLACEHOLDER` de testimonios pendientes de reseñas reales).

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

- **CI/CD:** `.github/workflows/deploy.yml` — build + deploy a GitHub Pages en cada push a `main` (y `workflow_dispatch`). Pasos: checkout → setup Node 24.18.1 → `npm ci` → `npm run optimize:gallery` → quality gates (ESLint, type-checks) → `npm run build` (con `PUBLIC_WEB3FORMS_KEY` desde el secret) → upload artifact → deploy.
- **Quality Checks:** `.github/workflows/checks.yml` — `npx astro check` + build + `npm audit --audit-level=moderate` en cada PR y push a `main` (read-only, cancela runs superseded por ref).
- **Dependabot:** `.github/dependabot.yml` — npm y github-actions, mensual.
- **URL de producción:** `https://www.brisadeconil.com` (ver `astro.config.mjs`: `site` + `base: "/"`; `public/CNAME` apunta el dominio).
- Para cambiar de dominio: edita `site`/`base` en `astro.config.mjs`, `public/CNAME` y `public/robots.txt` (URL del sitemap). Detalles en el README, sección "Migrar a dominio propio".
- Output del build: `dist/`. Las pages legales y landings SEO se generan como rutas estáticas; el blog genera una ruta por post e idioma.

---

## 9. Validación antes de entregar

Antes de marcar una tarea como hecha, verifica:

1. `npm run lint` pasa (cero warnings permitidos: `--max-warnings=0`).
2. `npx astro check` no reporta errores de tipos (y `npm run typecheck:react` si tocaste TSX).
3. `npm run build` termina sin errores.
4. Si tocaste la galería o las imágenes: `npm run optimize:gallery` corre limpio y `gallery-manifest.ts` se actualizó.
5. Si tocaste el formulario/API: prueba un envío y confirma que el email llega (vía Web3Forms).
6. No has introducido secretos en código cliente ni commiteado `.env`.
7. `git status` muestra solo los ficheros esperados (recuerda: `dist/`, `.astro/` y `node_modules/` están gitignored).

Atajo local: `./scripts/validate.sh` (o `--fast` para saltar el build). Ojo en macOS: el node del sistema suele ser < 22.12 y `astro check` falla; usa nvm con Node ≥ 22.12 (p. ej. 24.x).

---

## 10. Trabajo pendiente conocido (roadmap del README)

Está pendiente (no lo asumas resuelto):

- **CSP y cabeceras** de seguridad en el hosting.
- **Logging/monitorización** de `/api/contact`.
- Sustituir **testimonios placeholder** por reseñas reales.

Completado (para constancia):

- ~~Rate-limiting / anti-bot en `/api/contact`~~ — sliding-window rate-limit (5 req/10 min por IP) + honeypot + validación (2026-08-24).
- ~~Auditoría XSS de `src/i18n/translations.ts`~~ — sanitizer allowlist verificado; el sanitizador es defensivo (2026-08-24).
- ~~`npm audit` + Dependabot~~ — `.github/dependabot.yml` (npm + github-actions, mensual) y `npm audit` en CI (2026-08-24).
- ~~Iconos SVG vía `set:html`~~ — centralizados en `src/components/SvgIcon.astro` (2026-08-14).
- ~~CI con checks~~ — `astro check`, build, ESLint y `npm audit` en workflows (2026-08-24).
- ~~`public/og-image.jpg` real (1200×630)~~ (2026-08-24).

Cuando completes un punto, márcalo en el TODO del repo y actualiza esta lista si procede.

---

## 11. Agent skills

Las siguientes skills de ingeniería están disponibles para este repo. Para usarlas, el agente debe tener acceso a `hermes-agent` skills.

### Issue tracker

Las issues y specs viven como GitHub Issues en este repo (usa el CLI `gh`). Ver `docs/agents/issue-tracker.md`.

### Triage labels

Labels canónicos de triage: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. Ver `docs/agents/triage-labels.md`.

### Domain docs

Layout single-context: un `CONTEXT.md` en la raíz + ADRs en `docs/adr/`. Los skills de dominio crean estos archivos lazy cuando se necesitan. Ver `docs/agents/domain.md`.

### Flujo de trabajo (SDD + TDD)

1. **Especificar** (`to-spec`) — convierte una conversación/idea en spec, la publica en GitHub Issues.
2. **Partir** (`to-tickets`) — rompe el spec en vertical slices con blocking edges, publica tickets.
3. **Priorizar** (`triage`) — mueve tickets por la state machine, marca `ready-for-agent`.
4. **Implementar** — subagentes independientes por ticket, cada uno aplicando TDD (`test-driven-development`).
5. **Verificar** — antes de commit: `requesting-code-review` (seguridad + quality gates + reviewer independiente).
6. **Diagnosticar** — si hay bugs, `systematic-debugging` (4 fases, root cause antes de fix).
7. **Revisar cambios** — `code-review` (dos ejes: Standards + Spec) antes del merge.

El orquestador (sesión principal) usa `delegate_task` para coordinar subagentes. Cada subagente recibe solo su ticket — no comparte contexto con el implementador.
