# Brisa de Conil — Landing Page

Landing page para el alquiler vacacional del apartamento **Brisa de Conil**, en Conil de la Frontera (Cádiz).

**Stack:** Astro v7 · React v19 · CSS Custom Properties · PhotoSwipe v5 · Web3Forms

---

## Desarrollo local

```bash
# 1. Instala dependencias
npm install

# 2. Copia el fichero de variables de entorno
cp .env.example .env
# Edita .env y añade tu Web3Forms key (ver sección "Formulario de contacto")

# 3. Arranca el servidor de desarrollo
npm run dev
# → http://localhost:4321/brisadeconil/

# 4. Build de producción
npm run build

# 5. Preview del build
npm run preview
```

---

## Estructura del proyecto

```
src/
├── components/          # Componentes Astro y React (islas)
│   ├── Header.astro
│   ├── Hero.astro
│   ├── GallerySection.astro
│   ├── GalleryIsland.tsx     ← React + PhotoSwipe
│   ├── ApartmentSection.astro
│   ├── AmenitiesSection.astro
│   ├── WelcomeSection.astro
│   ├── LocationSection.astro
│   ├── ConilSection.astro
│   ├── RulesSection.astro
│   ├── ContactSection.astro
│   ├── ContactForm.tsx        ← React + Web3Forms
│   ├── FAQSection.astro
│   ├── FAQAccordion.tsx       ← React (acordeón accesible)
│   ├── TestimonialsSection.astro
│   └── Footer.astro
├── content/             # Todo el copy — EDITALO AQUÍ, no toques componentes
│   ├── es.ts            ← Español (activo)
│   ├── en.ts            ← Inglés (listo para activar)
│   ├── de.ts            ← Alemán (listo para activar)
│   └── index.ts         ← Importa el locale activo
├── layouts/
│   └── BaseLayout.astro  # Meta, dark theme, SEO, schema.org
├── pages/
│   └── index.astro       # Página principal — ensambla secciones
└── styles/
    ├── global.css         # Design system completo (tokens, componentes)
    └── gallery.css        # Estilos de galería PhotoSwipe
public/
├── favicon.svg
├── robots.txt
└── CNAME               # Ver sección "Dominio propio"
```

---

## Actualizaciones recientes

Estas son las mejoras más recientes aplicadas a la web:

- Añadidas páginas legales: `Aviso legal`, `Política de privacidad` y `Política de cookies`.
- Añadido enlace de `Política de cookies` en el footer.
- Corregidos los enlaces de footer y el favicon para despliegues en subcarpeta (`/brisadeconil`).
- Añadida lógica de sincronización de fechas en el formulario de contacto:
  - si `Fecha de salida` no está seteada, se copia automáticamente la `Fecha de entrada`.
  - si se selecciona una `Fecha de entrada` posterior a la `Fecha de salida`, `Fecha de salida` se actualiza también.
- Ocultada temporalmente la sección de testimonios hasta tener reseñas reales.

---

## Editar contenido sin tocar código

Todo el texto, datos y copy está centralizado en `src/content/es.ts`.

Para actualizar textos, fotos, amenities, FAQ, etc.:

1. Abre `src/content/es.ts`
2. Edita los valores de los objetos (no cambies las claves)
3. Guarda — el servidor de dev se recarga automáticamente

---

## Formulario de contacto (Web3Forms)

El formulario usa **Web3Forms** — gratuito, sin límite de envíos, sin backend propio.

### Configuración (5 minutos):

1. Ve a [https://web3forms.com](https://web3forms.com)
2. Introduce tu email y obtendrás una **access key** gratuita
3. Copia la key en tu `.env`:
   ```
   PUBLIC_WEB3FORMS_KEY=tu_access_key_aqui
   ```
4. Para el deploy en GitHub Pages, añade la key como **GitHub Secret**:
   - Repositorio → Settings → Secrets and variables → Actions
   - Nombre del secret: `WEB3FORMS_KEY`
   - Valor: tu access key

Los emails llegarán directamente a la dirección que registraste en Web3Forms.

---

## Despliegue en GitHub Pages

El workflow de GitHub Actions (`.github/workflows/deploy.yml`) hace build + deploy automático en cada push a `main`.

### Activar GitHub Pages por primera vez:

1. Push a `main` en GitHub
2. Ve a tu repositorio → **Settings → Pages**
3. En "Source", selecciona **GitHub Actions**
4. El siguiente push desplegará automáticamente

La web quedará en: `https://danigonlinea.github.io/brisadeconil/`

---

## Migrar a dominio propio

Cuando compres el dominio (ej. `brisadeconil.com`):

1. **`astro.config.mjs`** — cambia:

   ```js
   site: 'https://brisadeconil.com',  // tu dominio
   base: '/',                          // sin subpath
   ```

2. **`public/CNAME`** — descomenta y pon tu dominio:

   ```
   brisadeconil.com
   ```

3. **DNS de tu dominio** — añade estos registros A:

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   Y un CNAME `www` → `danigonlinea.github.io`

4. **`public/robots.txt`** — actualiza la URL del sitemap

5. En GitHub: Settings → Pages → activa "Enforce HTTPS"

---

## Activar otro idioma (EN o DE)

En `src/content/index.ts`, cambia la importación:

```ts
// Español (actual)
export * from "./es";

// Inglés
export * from "./en";

// Alemán
export * from "./de";
```

Los ficheros `en.ts` y `de.ts` están listos con traducción completa.

---

## ⚠ Checklist antes de publicar

Busca `[PENDIENTE` en `src/content/es.ts` y completa estos datos:

- [x] Horarios de check-in y check-out
- [x] Política de mascotas (¿se admiten? ¿bajo qué condiciones?)
- [x] Política de fumadores (¿se puede fumar? ¿dónde?)
- [x] Política de cancelación
- [x] Procedimiento para llegadas tardías

Busca `[IMAGEN PLACEHOLDER` en el código — sustituir por fotografías reales:

- [ ] Fotos del salón (x2)
- [ ] Foto del dormitorio
- [ ] Foto del baño
- [ ] Foto de la cocina
- [ ] Foto del exterior / entrada
- [ ] Imagen OG (`public/og-image.jpg`) para compartir en redes

Reseñas:

- [ ] Sustituir los 3 testimonios placeholder en `src/content/es.ts` → `testimonials.items`

Web3Forms:

- [ ] Configurar la access key (`.env` + GitHub Secret `WEB3FORMS_KEY`)
- [ ] Hacer un envío de prueba y verificar que el email llega

SEO:

- [x] Revisar meta title y description en `src/content/es.ts` → `meta`
- [ ] Crear imagen OG real (`public/og-image.jpg`, 1200×630px)

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

## Tareas pendientes (detalladas)

Aquí tienes una descripción práctica de cada tarea pendiente, con prioridad, pasos recomendados y comandos útiles para empezarlas.

- **Añadir CSP y configurar cabeceras en hosting** (Prioridad: Alta)
  - Objetivo: reducir riesgo XSS y control de orígenes de recursos.
  - Pasos: diseñar política CSP, probar en staging con `Content-Security-Policy-Report-Only`, ajustar reglas (fonts, scripts, styles, img, connect).
  - Comandos / recursos:
    ```bash
    # Validar CSP rápida
    curl -I -H "Content-Security-Policy: default-src 'self'" http://localhost:4321
    ```

- **Implementar rate-limiting/anti-bot en `/api/contact`** (Prioridad: Alta)
  - Objetivo: evitar abuso del formulario (spambots, spam, solicitudes masivas).
  - Pasos: añadir un simple contador en memoria o usar paquete ligero (express-rate-limit, but for serverless use a token bucket tied to IP), añadir honeypot field y/o reCAPTCHA v3/v2.
  - Ejemplo rápido: limitar 5 envíos por IP en 1 hora; bloquear por 429.

- **Añadir logging y monitorización de errores para la API** (Prioridad: Media)
  - Objetivo: detectar fallos de envío y problemas de integración con Web3Forms.
  - Pasos: integrar Sentry/Logflare/Locale-friendly logger; capturar errores 5xx y métricas de latencia.

- **Configurar CI: `tsc --noEmit`, ESLint y `npm audit`** (Prioridad: Media)
  - Objetivo: garantizar calidad y detectar regresiones automáticamente.
  - Pasos: añadir job en GitHub Actions que corra `npm ci`, `npx tsc --noEmit`, `npx eslint src`, `npm audit --audit-level=moderate`.

- **Reemplazar `set:html` iconos por componentes SVG** (Prioridad: Baja/Medio)
  - Objetivo: mejorar seguridad y trazabilidad del markup SVG.
  - Pasos: convertir cadenas SVG a componentes/archivos `.svg` y usarlos con `src` o imports React/TSX.

- **Ejecutar `npm audit` y actualizar dependencias críticas** (Prioridad: Media)
  - Objetivo: cerrar CVEs y mantener dependencias seguras.
  - Pasos: ejecutar `npm audit`, aplicar `npm audit fix` y revisar cambios; abrir PRs para actualizaciones mayores.

- **Habilitar Dependabot / Renovate para dependencias** (Prioridad: Media)
  - Objetivo: automatizar actualizaciones y PRs de seguridad.
  - Pasos: añadir `dependabot.yml` o configurar Renovate en repo; revisar PRs en staging antes de merge.

- **Documentar variables de entorno y pasos de despliegue en README** (Prioridad: Baja)
  - Objetivo: dejar claro qué secretos y pasos necesita el deploy (ej. `WEB3FORMS_ACCESS_KEY`, GitHub Secrets).
  - Estado: añadida sección de plan; pendiente detallar valores exactos en `README` y `.env.example`.

- **Revisión manual de traducciones que contienen HTML** (Prioridad: Baja)
  - Objetivo: revisar y sanear cualquier HTML legítimo en `src/i18n/translations.ts`.
  - Pasos: listar claves `*-html` o revisar `t` por contenido que incluya etiquetas; validar que la sanitización aplicada cumple con requerimientos.

Si quieres, puedo empezar con cualquiera de estas tareas ahora: implementar rate-limiting en `/api/contact` (recomendado), añadir CI básico, o preparar PRs para dependencias.

## Plan de auditoría y siguientes pasos

He dejado aquí el plan de trabajo para continuar la auditoría de seguridad y la limpieza de código. Lo puedes continuar mañana siguiendo los pasos numerados.

1. Revisión y endurecimiento del endpoint de contacto
   - Migrado el envío del formulario al endpoint server-side `/api/contact`.
   - Próximo paso: implementar rate-limiting (IP + user-agent), honeypot y/o reCAPTCHA en el endpoint.

2. Auditoría de XSS / sanitización
   - Se añadió una sanitización básica en el script i18n para `data-i18n-html`.
   - Próximo paso: revisar manualmente las traducciones que contienen HTML y evaluar uso de DOMPurify si hace falta mantener HTML rico.

3. Política de seguridad de contenido (CSP)
   - Diseñar una política CSP adecuada para el hosting (GitHub Pages o servidor objetivo).
   - Próximo paso: probar la CSP en un entorno staging antes de forzarla en producción.

4. Dependencias y vulnerabilidades
   - Ejecutar `npm audit` y arreglar vulnerabilidades críticas/alta prioridad.
   - Próximo paso: habilitar Dependabot o Renovate para actualizaciones automáticas.

5. Revisión de `set:html` y SVGs
   - Identificar `set:html` usado para insertar iconos SVG y evaluar reemplazo por componentes SVG o imports inline.

6. Integración continua y checks automáticos
   - Añadir en CI: `tsc --noEmit`, ESLint (con reglas para código muerto) y `npm audit` en la pipeline.

7. Monitorización y observabilidad
   - Añadir logging básico y monitorización para `/api/contact` (Sentry/Logflare/u otro) y alertas por errores/500.

8. Documentación operativa
   - Documentar variables de entorno necesarias: `WEB3FORMS_ACCESS_KEY`, y pasos para despliegue en GitHub Actions.

9. Tareas menores / seguimiento
   - Reemplazar `rel="noreferrer"` por `rel="noopener noreferrer"` en todos los enlaces externos (hecho en la política de cookies).
   - Revisar TODOs en `src/content/en.ts` y `src/content/de.ts`.

Marca los pasos completados en el TODO list del repositorio cuando los vayas completando.
