# SEO Content from Search Queries — Design

## Approach

Content-only change. No new components, no new templates, no code changes. All work happens in:
- `src/content/blog/` (new markdown posts)
- `src/content/blog-en/` (English translations)
- `src/content/blog-de/` (German translations)
- `src/content/{es,en,de}.ts` (FAQ additions)

Each post follows the existing pattern: markdown file with frontmatter (title, description, pubDate, optional image) + content in the host's natural voice.

## Files touched

| File | Change |
|------|--------|
| `src/content/blog/perros-playas-conil.md` | New — dog-friendly beaches guide (ES) |
| `src/content/blog-en/dog-friendly-beaches-conil.md` | New — dog-friendly beaches guide (EN) |
| `src/content/blog-de/hundefreundliche-straende-conil.md` | New — dog-friendly beaches guide (DE) |
| `src/content/blog/mercado-abastos-conil.md` | Expand — add hours, tips, stronger CTA |
| `src/content/blog-en/conil-food-market-guide.md` | Expand — add hours, tips, stronger CTA |
| `src/content/blog-de/markt-von-conil.md` | Expand — add hours, tips, stronger CTA |
| `src/content/blog/senderismo-acantilados-de-roche.md` | Optimize — add "mirador" to title/content |
| `src/content/blog-en/hiking-roche-cliffs.md` | Optimize — add "viewpoint" to title/content |
| `src/content/blog-de/wanderung-klippen-roche.md` | Optimize — add "Aussichtspunkt" to title/content |
| `src/content/blog/guia-playas-de-conil-por-perfil.md` | Optimize — add "playas en conil de la frontera" phrase |
| `src/content/blog-en/conil-beaches-guide.md` | Optimize — add exact query phrase |
| `src/content/blog-de/straende-von-conil.md` | Optimize — add exact query phrase |
| `src/content/es.ts` | Add FAQ items (dogs, parking, Roche) |
| `src/content/en.ts` | Add FAQ items (dogs, parking, Roche) |
| `src/content/de.ts` | Add FAQ items (dogs, parking, Roche) |

## Rules

- Do NOT change content keys — only add values or edit existing post content
- Keep `pending: false` on all FAQ items (no placeholder answers)
- ES is the reference. EN/DE must translate the same content (same count, same order)
- German must be natural, not machine-translated — flag if unsure
- Each blog post must include at least one internal link to `/contacto` or apartment section
- Use existing gallery photos where possible (no new image assets needed)
- Frontmatter must include `imageAlt` if `image` is declared (build requirement)

## Verification

- `npm run build` passes (proves content is valid + collections generate)
- `npm run lint` clean
- Visual check: `npm run preview` → each new post renders, internal links work
- FAQ section shows new items in all 3 locales
