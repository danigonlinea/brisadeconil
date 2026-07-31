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
