# Cartel WiFi — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a printable 14×23 cm vertical poster for the Brisa de Conil apartment, showing WiFi info, house rules, and a welcome message.

**Architecture:** A standalone Astro page (`src/pages/wifi-poster.astro`) with inline CSS inheriting the project's design system tokens (colors, typography). No BaseLayout — minimal HTML/CSS for print optimization. Logo referenced from `public/logos/`.

**Tech Stack:** Astro v7 (SSG), CSS Custom Properties, Google Fonts (Lora + Source Sans 3), @media print

## Global Constraints

- **Dimensiones:** 14 cm × 23 cm vertical, 3 mm bleed
- **Design system heredado:** navy-900 `#0c1f2e`, chalk-50 `#f7f5f0`, teal-500 `#2aa598`, Lora + Source Sans 3
- **Sin Tailwind ni framework CSS** — solo CSS custom properties
- **Sin BaseLayout** — la página es standalone (no cookie banner, no GA, no scroll-reveal)
- **Idioma:** solo español
- **QR:** placeholder de 4×4 cm, el usuario añade el PNG manualmente
- **Contraseña WiFi:** `Daniel3487`
- **Validación:** `npm run build` + `npx astro check` + visual + print preview

---

## Task 1: Page scaffold + logo asset

**Files:**
- Create: `src/pages/wifi-poster.astro`
- Create: `public/logos/brisadeconil-logo.png` (copy from src/logos/)

**Interfaces:**
- Produces: `wifi-poster.astro` with HTML head, Google Fonts, CSS variables, and empty `<main class="poster">` container

- [ ] **Step 1: Copy logo to public/**

```bash
cp src/logos/brisadeconil-logo-512.png public/logos/brisadeconil-logo.png
```

- [ ] **Step 2: Create the Astro page scaffold**

Create `src/pages/wifi-poster.astro`:

```astro
---
/**
 * wifi-poster.astro — Standalone printable poster (14×23 cm vertical).
 * NOT wrapped in BaseLayout: minimal HTML/CSS, optimized for print.
 */
---
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>WiFi — Brisa de Conil</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
    <style>
      /* ── Design System tokens (from global.css) ── */
      :root {
        --color-navy-900: #0c1f2e;
        --color-navy-700: #1a3d54;
        --color-navy-600: #235070;
        --color-chalk-50: #f7f5f0;
        --color-chalk-100: #ede9e0;
        --color-chalk-200: #d8d1c4;
        --color-teal-500: #2aa598;
        --color-teal-600: #1d8a7e;
        --font-serif: "Lora", Georgia, "Times New Roman", serif;
        --font-sans: "Source Sans 3", system-ui, -apple-system, sans-serif;
      }

      /* ── Reset ── */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        font-size: 16px;
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
      }

      body {
        font-family: var(--font-sans);
        font-weight: 400;
        line-height: 1.5;
        color: var(--color-navy-900);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* ── Screen preview ── */
      @media screen {
        body {
          background-color: #e5e5e5;
          padding: 2rem 0;
        }
      }
    </style>
  </head>
  <body>
    <main class="poster">
      <!-- Content added in Tasks 2-4 -->
    </main>
  </body>
</html>
```

- [ ] **Step 3: Verify build works**

```bash
npm run build
```

Expected: Build succeeds with no errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/wifi-poster.astro public/logos/brisadeconil-logo.png
git commit -m "feat(poster): scaffold wifi-poster page (14×23cm vertical)"
```

---

## Task 2: Header + WiFi sections

**Files:**
- Modify: `src/pages/wifi-poster.astro`

**Interfaces:**
- Consumes: `.poster` container from Task 1
- Produces: `.poster-header` and `.poster-wifi` sections with full styles

- [ ] **Step 1: Add header + WiFi HTML inside `.poster`**

Replace `<!-- Content added in Tasks 2-4 -->` with:

```html
<!-- Header -->
<header class="poster-header">
  <img
    class="poster-logo"
    src="/logos/brisadeconil-logo.png"
    alt="Logo Brisa de Conil"
    width="128"
    height="128"
  />
  <div class="poster-header-text">
    <h1 class="poster-brand">Brisa de Conil</h1>
    <p class="poster-subtitle">Apartamento vacacional</p>
  </div>
</header>

<!-- WiFi -->
<section class="poster-wifi">
  <h2 class="poster-wifi-title">WiFi</h2>
  <div class="poster-wifi-content">
    <div class="poster-qr">
      <span class="poster-qr-placeholder">[QR]</span>
    </div>
    <div class="poster-wifi-info">
      <p class="poster-password-label">Contraseña:</p>
      <p class="poster-password">Daniel3487</p>
      <p class="poster-wifi-hint">Escanea el código para conectarte</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add header + WiFi CSS**

Append inside the existing `<style>` tag (before `</style>`):

```css
/* ── Poster container ── */
.poster {
  width: 14cm;
  height: 23cm;
  margin: 0 auto;
  padding: 0.5cm;
  background-color: var(--color-chalk-50);
  position: relative;
  overflow: hidden;
}

@media screen {
  .poster {
    box-shadow: 0 4px 24px rgba(12, 31, 46, 0.18);
  }
}

/* ── Header ── */
.poster-header {
  display: flex;
  align-items: center;
  gap: 0.5cm;
  padding-bottom: 0.4cm;
  border-bottom: 2px solid var(--color-teal-500);
  margin-bottom: 0.6cm;
}

.poster-logo {
  height: 2.5cm;
  width: auto;
  display: block;
}

.poster-brand {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 22pt;
  color: var(--color-navy-900);
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.poster-subtitle {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 11pt;
  color: var(--color-navy-700);
  margin-top: 2px;
}

/* ── WiFi section ── */
.poster-wifi {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0.5cm;
  margin-bottom: 0.5cm;
}

.poster-wifi-title {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 16pt;
  color: var(--color-navy-900);
  margin-bottom: 0.4cm;
}

.poster-wifi-content {
  display: flex;
  align-items: center;
  gap: 0.5cm;
}

.poster-qr {
  width: 4cm;
  height: 4cm;
  border: 1px solid var(--color-chalk-200);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: #ffffff;
}

.poster-qr-placeholder {
  font-family: var(--font-sans);
  font-size: 10pt;
  color: var(--color-navy-600);
  text-align: center;
}

.poster-password-label {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 10pt;
  color: var(--color-navy-700);
  margin-bottom: 2px;
}

.poster-password {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 20pt;
  color: var(--color-navy-900);
  margin-bottom: 0.3cm;
}

.poster-wifi-hint {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 9pt;
  color: var(--color-navy-700);
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Open `dist/wifi-poster/index.html` or preview via dev server to verify header + WiFi render.

- [ ] **Step 4: Commit**

```bash
git add src/pages/wifi-poster.astro
git commit -m "feat(poster): add header and WiFi sections"
```

---

## Task 3: Rules + Welcome sections

**Files:**
- Modify: `src/pages/wifi-poster.astro`

**Interfaces:**
- Consumes: `.poster` container (Task 1), WiFi section (Task 2)
- Produces: `.poster-rules` and `.poster-welcome` sections with full styles

- [ ] **Step 1: Add rules + welcome HTML**

Append inside `<main class="poster">`, after the WiFi `</section>`:

```html
<!-- Rules -->
<section class="poster-rules">
  <h2 class="poster-rules-title">Normas de la casa</h2>
  <ul class="poster-rules-list">
    <li class="poster-rule">
      <span class="poster-rule-icon">🗑️</span>
      <span>Saca la basura antes de irte.</span>
    </li>
    <li class="poster-rule">
      <span class="poster-rule-icon">🕐</span>
      <span>Check-in a partir de las 16:00 y salida entre las 11:30 y las 12:00.</span>
    </li>
    <li class="poster-rule">
      <span class="poster-rule-icon">🐾</span>
      <span>No se admiten mascotas en el apartamento.</span>
    </li>
    <li class="poster-rule">
      <span class="poster-rule-icon">🚭</span>
      <span>No se permite fumar en el apartamento.</span>
    </li>
    <li class="poster-rule">
      <span class="poster-rule-icon">🔇</span>
      <span>Ruidos: respeta el descanso de los vecinos, especialmente en horario nocturno.</span>
    </li>
  </ul>
</section>

<!-- Welcome / closing -->
<section class="poster-welcome">
  <p class="poster-welcome-text">
    Que disfrutéis de la luz, el mar y los atardeceres de Conil.<br />
    ¡Bienvenidos a vuestra casa!
  </p>
</section>
```

- [ ] **Step 2: Add rules + welcome CSS**

Append inside the existing `<style>` tag (before `</style>`):

```css
/* ── Rules section ── */
.poster-rules {
  background-color: var(--color-chalk-100);
  border-radius: 8px;
  padding: 0.5cm;
  margin-bottom: 0.5cm;
}

.poster-rules-title {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 16pt;
  color: var(--color-navy-900);
  margin-bottom: 0.4cm;
}

.poster-rules-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25cm;
}

.poster-rule {
  display: flex;
  align-items: flex-start;
  gap: 0.3cm;
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 10pt;
  color: var(--color-navy-900);
  line-height: 1.4;
}

.poster-rule-icon {
  flex-shrink: 0;
  font-size: 12pt;
  line-height: 1.4;
}

/* ── Welcome section ── */
.poster-welcome {
  text-align: center;
  padding-top: 0.3cm;
  border-top: 2px solid var(--color-teal-500);
}

.poster-welcome-text {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  font-size: 12pt;
  color: var(--color-navy-900);
  line-height: 1.65;
}
```

- [ ] **Step 3: Verify build + visual**

```bash
npm run build
npm run preview
# → open http://localhost:4321/wifi-poster/
```

Expected: Full poster renders with all 4 sections. No overflow outside 14×23 cm container.

- [ ] **Step 4: Commit**

```bash
git add src/pages/wifi-poster.astro
git commit -m "feat(poster): add rules and welcome sections"
```

---

## Task 4: Print styles + final validation

**Files:**
- Modify: `src/pages/wifi-poster.astro`

**Interfaces:**
- Consumes: All styles from Tasks 1-3
- Produces: `@media print` block for correct PDF export

- [ ] **Step 1: Add print CSS**

Append inside the existing `<style>` tag (before `</style>`):

```css
/* ── Print styles ── */
@media print {
  @page {
    size: 14cm 23cm;
    margin: 0.3cm; /* bleed */
  }

  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background: white !important;
    padding: 0 !important;
  }

  .poster {
    margin: 0 !important;
    box-shadow: none !important;
    width: 14cm;
    height: 23cm;
  }

  .poster-wifi,
  .poster-rules {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
```

- [ ] **Step 2: Run full build**

```bash
npm run build
```

Expected: Build succeeds, `dist/wifi-poster/index.html` generated

- [ ] **Step 3: Run type check**

```bash
npx astro check
```

Expected: No type errors

- [ ] **Step 4: Visual + print preview validation**

```bash
npm run preview
# → open http://localhost:4321/wifi-poster/
# → Cmd+P (print preview) to verify:
#   - Dimensions 14×23 cm
#   - Backgrounds visible
#   - No cut-off content
#   - QR placeholder 4×4 cm
```

Expected: Poster looks correct on screen and in print preview

- [ ] **Step 5: Commit**

```bash
git add src/pages/wifi-poster.astro
git commit -m "feat(poster): add print styles and validate 14×23cm output"
```

---

## Verification checklist (post-implementation)

After all tasks:

- [ ] `npm run build` exits cleanly
- [ ] `npx astro check` reports no type errors
- [ ] `http://localhost:4321/wifi-poster/` renders all 4 sections
- [ ] Print preview shows 14×23 cm dimensions with 3 mm bleed
- [ ] Logo visible and sharp
- [ ] QR placeholder exactly 4×4 cm
- [ ] Password `Daniel3487` readable (20 pt)
- [ ] All 5 rules fit without overflow
- [ ] Welcome message centered with teal divider
- [ ] Backgrounds (chalk-50, chalk-100) visible in print preview
- [ ] `git log --oneline` shows 4 clean commits
