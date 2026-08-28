# FAQ — Tasks

## Content (es.ts)
- [x] Merge "¿Hay aparcamiento cerca?" + "¿Hay parking cerca?" into one item with combined answer
- [x] Merge "¿Se puede fumar en el apartamento?" + "¿Se puede fumar en la terraza?" into one item
- [x] Add: "¿Hay aire acondicionado y WiFi?"
- [x] Add: "¿Cómo funciona el check-in autónomo?"
- [x] Add: "¿Hay calefacción para invierno?"
- [x] Add: "¿Hay cuna disponible?"
- [x] Add: "¿El apartamento es accesible para personas con movilidad reducida?"
- [x] Add: "¿Hay que pagar impuesto turístico?"
- [x] Add: "¿Se puede pagar con tarjeta?"
- [x] Add: "¿Tiene lavadora y secadora?"

## Content (en.ts)
- [x] Apply same merges + additions, English translation
- [x] Ensure EN matches ES question set exactly (EN already had AC/WiFi + long-stays; consolidate)

## Content (de.ts)
- [x] Apply same merges + additions, German translation
- [x] Review DE for natural phrasing

## Verify
- [x] `npm run lint` — clean (0 warnings)
- [x] `npm run build` — succeeds
- [x] `npm run preview` — FAQ renders, no duplicates, accordion works
- [x] Confirm JSON-LD `FAQPage` still valid (no pending items leaked)
