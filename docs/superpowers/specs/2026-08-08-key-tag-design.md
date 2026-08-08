# Spec: Etiqueta de Llaves — Brisa de Conil

**Fecha:** 2026-08-08
**Estado:** Aprobado por el usuario
**Enfoque:** A — Logo + nombre en línea apaisada

---

## 1. Objetivo

Crear un inserto imprimible de **3,5 cm × 1,5 cm (apaisado)** para colocar dentro de una funda de plástico transparente (fob) que se anilla a las llaves del apartamento. La etiqueta identifica visualmente las llaves como pertenecientes a Brisa de Conil.

## 2. Especificaciones técnicas

| Propiedad | Valor |
|-----------|-------|
| Dimensiones | 3,5 cm ancho × 1,5 cm alto |
| Orientación | Horizontal (apaisado) |
| Ratio | 7:3 |
| Márgenes de seguridad | 3 mm por todos los lados (impresora doméstica) |
| Área útil | 29 mm × 9 mm |
| Resolución | 300 DPI (413 × 177 px) |
| Formato de salida | HTML standalone para imprimir desde el navegador |
| Impresión | Una sola cara |
| Soporte | Papel (no adhesivo), va dentro de funda transparente |

## 3. Design System (heredado del proyecto)

### Colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-navy-900` | `#0c1f2e` | Texto principal ("Brisa de Conil") |
| `--color-navy-700` | `#1a3d54` | Texto secundario ("Llaves") |

### Tipografía

| Token | Fuente | Uso |
|-------|--------|-----|
| `--font-sans` | Source Sans 3 | Toda la etiqueta |

### Escala tipográfica

| Elemento | Fuente | Peso | Tamaño | Color |
|----------|--------|------|--------|-------|
| "Brisa de Conil" | Source Sans 3 | semibold (600) | ~9 pt (≈ 3,2 mm capa) | navy-900 `#0c1f2e` |
| "Llaves" | Source Sans 3 | regular (400) | ~7 pt (≈ 2,5 mm capa) | navy-700 `#1a3d54` |

### Google Fonts (import)

```css
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600&display=swap");
```

> Solo Source Sans 3 (no Lora) — a este tamaño reducido, una serif se pierde.

## 4. Estructura de la etiqueta

### Layout horizontal (de izquierda a derecha)

```
┌─────────────────────────────────────────┐  ← 0 mm
│  MARGEN SUP (3 mm)                      │
│  ┌───────────────────────────────────┐  │
│  │ ■   Brisa de Conil                │  │
│  │ ■   Llaves                        │  │  15 mm
│  │ ■                                 │  │
│  └───────────────────────────────────┘  │
│  MARGEN INF (3 mm)                      │
└─────────────────────────────────────────┘  ← 35 mm

MARGEN   LOGO   SEP   BLOQUE TEXTO
IZDO 3mm 7mm    4mm   (~12mm ancho)   resto → aire
```

### Distribución horizontal

| Zona | Ancho | Contenido |
|------|-------|-----------|
| Margen izquierdo | 3 mm | — |
| Logo | 7 mm alto × proporcional | Logo Brisa de Conil |
| Separación logo-texto | 3 mm | — |
| Bloque texto | ~12 mm ancho | "Brisa de Conil" + "Llaves" apilados |
| Aire derecho | resto (~7 mm) | — (equilibrio visual dentro de la funda) |

### Distribución vertical

| Zona | Alto | Contenido |
|------|------|-----------|
| Margen superior | 3 mm | — |
| Logo | 7 mm | Ocupa toda la altura útil |
| Texto (2 líneas) | ~6 mm | "Brisa de Conil" (3,5 mm) + gap (1 mm) + "Llaves" (2,5 mm) |
| Margen inferior | 3 mm | — |

---

## 5. Elementos detallados

### 5.1 Logo

- **Archivo fuente:** `src/logos/brisadeconil-logo-128.png`
- **Tamaño renderizado:** 7 mm de alto, ancho proporción preservada
- **Alineación:** izquierda, centrado verticalmente en el bloque útil
- **Estilo:** sin borde, sin fondo, sin modificaciones

### 5.2 Texto

- **"Brisa de Conil"**
  - Source Sans 3, weight 600 (SemiBold)
  - ~9 pt (3,2 mm de altura de capa)
  - navy-900 `#0c1f2e`
  - letter-spacing: +0,02 mm

- **"Llaves"**
  - Source Sans 3, weight 400 (Regular)
  - ~7 pt (2,5 mm de altura de capa)
  - navy-700 `#1a3d54`
  - interlineado: 1,3 respecto a la línea superior

### 5.3 Fondo

- Blanco (`#ffffff`) — la funda transparente aporta el "marco"

---

## 6. Assets requeridos

| Asset | Ruta | Uso |
|-------|------|-----|
| Logo PNG | `src/logos/brisadeconil-logo-128.png` | Lado izquierdo de la etiqueta |

---

## 7. Implementación

### Estructura de archivos

```
src/pages/
  └── key-tag.astro   # Página standalone para imprimir
```

### Tecnologías

- Página Astro standalone (NO envuelta en BaseLayout)
- Source Sans 3 vía Google Fonts (igual que el wifi-poster)
- Dimensiones fijas en CSS (cm)
- `@media print` para asegurar tamaño exacto al imprimir

### Reglas @media print

```css
@media print {
  @page {
    size: 3.5cm 1.5cm;
    margin: 0;
  }
  body {
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

### Estrategia de impresión

1. Abrir la página en el navegador
2. Cmd/Ctrl+P → "Guardar como PDF" o imprimir directa
3. Recortar por el borde del diseño (sin margen extra más allá de los 3 mm de seguridad)
4. Insertar en la funda transparente

---

## 8. Validación pre-impresión

1. Abrir `src/pages/key-tag.astro` en el navegador
2. Verificar:
   - Logo nítido a 7 mm de alto (no pixelado)
   - "Brisa de Conil" legible
   - "Llaves" legible y con jerarquía visual clara (más claro y fino que el nombre)
   - Dimensiones correctas (3,5 × 1,5 cm — verificar con regla en pantalla a 100% zoom)
3. Cmd/Ctrl+P → preview de impresión → verificar que no hay márgenes del navegador que desplacen el diseño
4. Imprimir una prueba en papel normal → probar que entra en la funda transparente

---

## 9. Fuera de scope

- Traducciones a otros idiomas (solo español, confirmado)
- Impresión a doble cara (una cara)
- Decoración extra (líneas, iconos) — espacio demasiado reducido
- Adhesivo (va dentro de funda, no pegado)
- Generación de PDF automática (se imprime desde el navegador)
