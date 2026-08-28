# FAQ — Tasks

## Content (es.ts)
- [ ] Merge "¿Hay aparcamiento cerca?" + "¿Hay parking cerca?" into one item with combined answer
- [ ] Merge "¿Se puede fumar en el apartamento?" + "¿Se puede fumar en la terraza?" into one item
- [ ] Add: "¿Hay aire acondicionado y WiFi?"
- [ ] Add: "¿Cómo funciona el check-in autónomo?"
- [ ] Add: "¿Hay calefacción para invierno?"
- [ ] Add: "¿Hay cuna disponible?"
- [ ] Add: "¿El apartamento es accesible para personas con movilidad reducida?"
- [ ] Add: "¿Hay que pagar impuesto turístico?"
- [ ] Add: "¿Se puede pagar con tarjeta?"
- [ ] Add: "¿Tiene lavadora y secadora?"

## Content (en.ts)
- [ ] Apply same merges + additions, English translation
- [ ] Ensure EN matches ES question set exactly (EN already had AC/WiFi + long-stays; consolidate)

## Content (de.ts)
- [ ] Apply same merges + additions, German translation
- [ ] Review DE for natural phrasing

## Verify
- [ ] `npm run lint` — clean (0 warnings)
- [ ] `npm run build` — succeeds
- [ ] `npm run preview` — FAQ renders, no duplicates, accordion works
- [ ] Confirm JSON-LD `FAQPage` still valid (no pending items leaked)
