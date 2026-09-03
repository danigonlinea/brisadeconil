# Expand FAQ — Proposal

## Why

The current FAQ has ~17 questions per locale but has gaps (no AC/WiFi, no autonomous check-in, no heating, no crib, no accessibility info, no tourist tax, no card payment) and duplicates ("aparcamiento" + "parking", "fumar" + "fumar en terraza"). Guests ask these questions via email/WhatsApp — answering them on-page reduces friction and improves SEO (FAQ rich results).

## What changes

- Deduplicate: merge "aparcamiento" + "parking" into one, merge "fumar" + "fumar en terraza" into one
- Add missing questions: AC + WiFi, autonomous check-in, heating, crib, accessibility (stairs only), tourist tax, card payment, washer/dryer
- Harmonize: ensure all 3 locales have the same questions (EN currently has 2 that ES/DE lack)
- Keep JSON-LD `FAQPage` schema working (it auto-generates from content)

## Non-goals

- No new component changes (FAQAccordion already handles arbitrary items)
- No visual redesign of the FAQ section
- No new landing page or route
- No CMS integration (content stays in `src/content/*.ts`)

## Risks

- Adding too many items could make the list feel long → cap at ~20 per locale
- Translations must be accurate (especially DE) — flag if unsure
