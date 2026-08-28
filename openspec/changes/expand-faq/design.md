# FAQ — Design

## Approach

Pure content change. No new components, no new routes, no schema changes. The `FAQAccordion` React island already renders arbitrary `items`, and `FAQSection.astro` already generates `FAQPage` JSON-LD from the content slice. We only edit the `faq` object in the three locale content files.

## Files touched

| File | Change |
|------|--------|
| `src/content/es.ts` | Dedupe parking + smoking; add 8 new Q&A |
| `src/content/en.ts` | Same, aligned with ES set |
| `src/content/de.ts` | Same, accurate DE translation |

## Structure (unchanged)

```ts
export const faq = {
  sectionLabel: string;
  headline: string;
  pendingBadge: string;
  items: { q: string; a: string; pending?: boolean }[];
};
```

## Rules

- Do NOT change keys — only `items` array contents.
- Keep `pending: false` on all (no placeholder answers remain).
- Order: keep existing order, append new questions at the end of the array.
- ES is the reference. EN/DE translate the same questions (same count, same order).
- DE must be reviewed for natural phrasing (not literal machine translation).
- Cap ~20 items per locale to avoid an overly long list.

## Verification

- `npm run build` passes (proves content is valid + JSON-LD serializes).
- `npm run lint` clean.
- Visual check: `npm run preview` → FAQ section renders, accordion works, no duplicate questions.
