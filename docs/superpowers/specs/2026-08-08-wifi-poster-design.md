# Spec: Cartel WiFi — Brisa de Conil

**Fecha:** 2026-08-08  
**Estado:** Aprobado por el usuario  
**Enfoque:** A — Familiar (secciones claramente delimitadas)

---

## 1. Objetivo

Crear un cartel imprimible de **14 cm × 23 cm (vertical)** para colocar dentro del apartamento Brisa de Conil. El cartel informa a los huéspedes sobre la conexión WiFi, las normas de la casa y les da la bienvenida.

## 2. Especificaciones técnicas

| Propiedad | Valor |
|-----------|-------|
| Dimensiones | 14 cm ancho × 23 cm alto |
| Orientación | Vertical (retrato) |
| Sangre (bleed) | 3 mm por lado (total 146 × 236 mm) |
| Margen de seguridad | 5 mm interior |
| Área útil | 13 cm × 22 cm |
| Resolución | 300 DPI (para impresión) |
| Formato de salida | HTML para previsualizar + PDF para imprimir |

## 3. Design System (heredado del proyecto)

### Colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-navy-900` | `#0c1f2e` | Texto principal, títulos |
| `--color-navy-700` | `#1a3d54` | Texto secundario |
| `--color-navy-600` | `#235070` | Texto atenuado (placeholders) |
| `--color-chalk-50` | `#f7f5f0` | Fondo base del cartel |
| `--color-chalk-100` | `#ede9e0` | Fondo alternativo de secciones |
| `--color-chalk-200` | `#d8d1c4` | Bordes sutiles |
| `--color-teal-500` | `#2aa598` | Acento (líneas, destacados) |
| `--color-teal-600` | `#1d8a7e` | Acento hover (no aplica en print) |

### Tipografía

| Token | Fuente | Uso |
|-------|--------|-----|
| `--font-serif` | Lora | Títulos (header, secciones) |
| `--font-sans` | Source Sans 3 | Texto cuerpo, normas, contraseña |

### Escala tipográfica

| Elemento | Fuente | Peso | Tamaño |
|----------|--------|------|--------|
| Nombre apartamento | Lora | semibold (600) | 22 pt |
| Subtítulo | Source Sans 3 | regular (400) | 11 pt |
| Títulos sección | Lora | semibold (600) | 16 pt |
| Contraseña WiFi | Source Sans 3 | medium (500) | 20 pt |
| Cuerpo normas | Source Sans 3 | regular (400) | 10 pt |
| Instrucción WiFi | Source Sans 3 | regular (400) | 9 pt |
| Mensaje bienvenida | Lora italic | regular (400) | 12 pt |

### Google Fonts (import)

```css
@import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600&display=swap");
```

## 4. Estructura del cartel

### Layout vertical (de arriba a abajo)

```
┌──────────────────────────────┐  ← 0 mm
│       SANGRE (3 mm)          │
│  ┌────────────────────────┐  │
│  │ HEADER (≈ 40 mm)       │  │
│  │ [logo] Brisa de Conil  │  │
│  │      Apartamento       │  │
│  │      vacacional        │  │
│  │ ▬▬▬▬▬▬▬▬ (teal line)    │  │
│  ├────────────────────────┤  │
│  │ WIFI (≈ 65 mm)         │  │
│  │ WiFi                   │  │
│  │ ┌────┐  Contraseña:    │  │
│  │ │ QR │  Daniel3487     │  │
│  │ │    │  Escanea el...  │  │
│  │ └────┘                 │  │
│  ├────────────────────────┤  │
│  │ NORMAS (≈ 80 mm)       │  │
│  │ Normas de la casa      │  │
│  │ • Saca la basura...    │  │
│  │ • Check-in 16:00...    │  │
│  │ • No mascotas          │  │
│  │ • No fumar             │  │
│  │ • Respeta el descanso  │  │
│  ├────────────────────────┤  │
│  │ BIENVENIDA (≈ 35 mm)   │  │
│  │ ▬▬▬▬▬▬▬▬ (teal line)    │  │
│  │ "Que disfrutéis de la  │  │
│  │  luz, el mar y los     │  │
│  │  atardeceres..."       │  │
│  └────────────────────────┘  │
│       SANGRE (3 mm)          │
└──────────────────────────────┘  ← 230 mm
```

---

## 5. Secciones detalladas

### 5.1 Header (fondo: chalk-50, igual que base)

- Logo PNG a la izquierda (2.5 cm alto, proporción maintained)
- Texto a la derecha del logo:
  - "Brisa de Conil" — Lora semibold, 22 pt, navy-900
  - "Apartamento vacacional" — Source Sans regular, 11 pt, navy-700
- Línea de acento turquesa (1.3 cm × 2 px) debajo del texto
- Separación inferior: 8 mm hasta la siguiente sección

**Logo file:** `src/logos/brisadeconil-logo-128.png` (o 256/512 si se necesita mayor resolución)

### 5.2 WiFi (fondo: chalk-100 / blanco alternado)

- Título: "WiFi" — Lora semibold, 16 pt, navy-900
- QR placeholder: 40 × 40 mm, centrado-izquierda
  - Borde sutil 1px chalk-200
  - Texto placeholder centrado: "[QR]" en navy-600
  - El usuario sustituirá este placeholder por el PNG real
- Contraseña: "Daniel3487" — Source Sans medium, 20 pt, navy-900
- Instrucción: "Escanea el código para conectarte" — Source Sans regular, 9 pt, navy-700
- Texto alineado a la derecha del QR

### 5.3 Normas (fondo: chalk-100, con leve padding)

- Título: "Normas de la casa" — Lora semibold, 16 pt, navy-900
- Lista de 5 normas, cada una:
  - Icono emoji (🗑️ 🕐 🐾 🚭 🔇) a la izquierda
  - Texto en Source Sans regular, 10 pt, navy-900
  - Interlineado 1.4
  - Espaciado entre ítems: 4 mm

**Normas (copiadas de `src/content/es.ts` → `rules.rules`):**
1. 🗑️ Saca la basura antes de irte.
2. 🕐 Check-in a partir de las 16:00 y salida entre las 11:30 y las 12:00.
3. 🐾 No se admiten mascotas en el apartamento.
4. 🚭 No se permite fumar en el apartamento.
5. 🔇 Ruidos: respeta el descanso de los vecinos, especialmente en horario nocturno.

### 5.4 Bienvenida / cierre (fondo: chalk-50)

- Línea turuesca decorativa (1.3 cm × 2 px) encima
- Texto en Lora italic, 12 pt, navy-900, centrado:
  > *"Que disfrutéis de la luz, el mar y los atardeceres de Conil.*  
  > *¡Bienvenidos a vuestra casa!"*

---

## 6. Assets requeridos

| Asset | Ruta | Uso |
|-------|------|-----|
| Logo PNG | `src/logos/brisadeconil-logo-128.png` | Header del cartel |
| QR WiFi | Usuario lo añade manualmente | Placeholder de 4×4 cm |

---

## 7. Implementación

### Estructura de archivos

```
src/components/WifiPoster/
  └── WifiPoster.astro    # Componente del cartel
src/pages/
  └── wifi-poster.astro   # Página standalone para imprimir
```

### Tecnologías

- Componente Astro con CSS scoped
- Google Fonts (Lora + Source Sans 3) — misma import que global.css
- Colores vía CSS custom properties (heredadas de global.css)
- `@media print` para asegurar colores de fondo y dimensiones

### Reglas @media print

```css
@media print {
  @page {
    size: 14cm 23cm;
    margin: 0.3cm; /* bleed */
  }
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

### Estrategia de colores de fondo en impresión

- Los navegadores por defecto no imprimen colores de fondo
- Aplicar `print-color-adjust: exact` en todos los elementos con fondo chalk-100
- Test: verificar en Chrome/Safari que los fondos se renderizan

---

## 8. Validación pre-impresión

1. Abrir `src/pages/wifi-poster.astro` en el navegador (dev server)
2. Cmd/Ctrl+P → "Guardar como PDF" → verificar dimensiones
3. Confirmar:
   - Logo visible y nítido
   - QR placeholder correctamente dimensionado (4×4 cm)
   - Textos legibles (mínimo 9 pt)
   - Sin desbordamiento del área útil
   - Fondos chalk visibles en preview de impresión

---

## 9. Fuera de scope

- Traducciones a otros idiomas (solo español, confirmado)
- Datos de contacto en el cartel (usuario no los pidió)
- Marco decorativo o ilustraciones extra
- Generación automática del QR (usuario lo proporciona como PNG)
