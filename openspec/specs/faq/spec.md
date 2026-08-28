# FAQ — Spec (Source of Truth)

The FAQ section lives in `src/content/{es,en,de}.ts` under the `faq` object.
It renders via `FAQSection.astro` (which generates `FAQPage` JSON-LD) and
`FAQAccordion.tsx` (React island).

## Requirements

- The system SHALL show one FAQ entry per distinct question (no duplicates).
- The system SHALL keep EN, ES and DE in sync: same number of questions,
  same order, translated.
- The system SHALL include (at minimum) the following topics:
  - Check-in / check-out times
  - Pets policy
  - Smoking policy (apartment + terrace, single entry)
  - Cancellation policy
  - Late arrival
  - Guest capacity
  - Access to the apartment
  - Parking nearby (municipal + private, single entry)
  - Nearest beach walking distance
  - Supermarkets nearby
  - Last-minute bookings
  - Deposit handling
  - Towels / bed linen
  - Kitchen equipment
  - Air conditioning + WiFi
  - Long stays / single-night bookings
  - Self check-in (key box)
  - Heating for winter
  - Cot availability (on request)
  - Accessibility for reduced mobility (stairs only, no lift)
  - Tourist tax (not charged in Conil)
  - Card payment
  - Washing machine / dryer
- The system SHALL render all FAQ items in the `FAQPage` structured data
  (JSON-LD) with `pending: false` only (no placeholder answers leaked).
- The system SHALL NOT change content keys — only the `items` array values.

## Scenarios

- Given a returning visitor, when the FAQ loads, then no two questions are identical.
- Given the ES FAQ has N questions, when EN/DE render, then they show N questions in the same order.
- Given a user opens the FAQ, when the page is inspected, then the `FAQPage` JSON-LD contains one `Question` per non-pending item.
