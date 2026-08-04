# CLAUDE.md

> **Fuente canónica de instrucciones: [`AGENTS.md`](./AGENTS.md).** Lee ese archivo antes de trabajar. Lo siguiente es un resumen de las reglas más críticas; en caso de duda, prevalece `AGENTS.md`.

## Qué es

Landing page estática (Astro v7 SSG + islas React v19 + PhotoSwipe v5 + Web3Forms) del apartamento vacacional **Brisa de Conil**. Deploy en GitHub Pages desde `main`. Idioma del proyecto: español.

## Comandos esenciales

```bash
npm run dev                # http://localhost:4321/
npm run build              # → dist/
npm run optimize:gallery   # regenera imágenes + src/data/gallery-manifest.ts
npx astro check            # type-check (no hay tests ni linter configurados)
```

Node `>=22.12.0`. Package manager: `npm`.

## Reglas críticas (no las rompas)

1. **Contenido en `src/content/{locale}.ts`.** Los componentes `.astro`/`.tsx` van **libres de copy**. Cambia valores, **nunca las claves**. Locale activo: `es` (cambiar en `src/content/index.ts`).
2. **Ficheros auto-generados — no editar a mano:** `src/data/gallery-manifest.ts` y todo `public/gallery/optimized/`. Se generan con `npm run optimize:gallery`. Tampoco edites los originales `public/gallery/*.jpg`.
3. **Secretos fuera del cliente.** El formulario postea a `/api/contact`, que usa `process.env.WEB3FORMS_ACCESS_KEY` (server-only). `PUBLIC_WEB3FORMS_KEY` es la única key permitida en cliente. Nunca commitees `.env`.
4. **Sin Tailwind ni framework CSS.** Usa los CSS Custom Properties de `src/styles/global.css` (tokens semánticos como `--bg-surface`, `--text-base`, `--accent`).
5. **TypeScript strict** activado. Evita `any`.
6. **Commits** en inglés con prefijo de tipo (`feat:`, `fix:`, `chore:`, `perf:`, `docs:`). Rama de deploy: `main`.

## Antes de entregar

- `npm run build` sin errores.
- `npx astro check` limpio.
- Si tocaste galería: `npm run optimize:gallery` corre limpio.
- `git status` solo con ficheros esperados (`dist/`, `.astro/`, `node_modules/` están gitignored).

## Pendiente (no asumir resuelto)

CSP, rate-limiting en `/api/contact`, auditoría XSS de `translations.ts`, `npm audit` + Dependabot, reemplazar `set:html` de SVGs, CI con `tsc --noEmit`/ESLint/`npm audit`, logging de `/api/contact`, testimonios reales y `public/og-image.jpg`. Ver §10 de `AGENTS.md`.
