# AGENTS.md

Rules for coding agents. The testing policy in "Testing and Verification" is the owner's premise.

## Testing and Verification

Use only the following verification methods by default: **typecheck, lint
and static analysis, build/compile, smoke tests, and acceptance criteria**.
Do not create or introduce other types of tests (including unit,
integration, snapshot, property-based, or mutation tests) unless I
explicitly request them. Focus on verifying real application behavior and
ensuring all acceptance criteria are satisfied.

Gates for this repo:

```bash
npx astro check
npm run typecheck:react
npm run lint
npm run build
python3 scripts/audit-build-seo.py dist
bash scripts/validate.sh
```

Manual verification surface: the web app only. Start `npm run dev`, open
http://localhost:4321/, and inspect each changed page in a browser.

This repo has no test suites. Do not create unit, integration, snapshot,
property-based, or mutation tests, and do not restore the deleted ones.
Do not add a `test` script to package.json.

## Repository Rules

1. Write commit messages as `type(scope): summary`, in English. Allowed
   types: `feat`, `fix`, `chore`, `perf`, `docs`, `ci`. Allowed scopes:
   `blog`, `contact`, `i18n`, `seo`, `styles`, `ci`, `deps`, `deps-dev`.
2. Use npm only. Install with `npm ci` (package-lock.json is tracked).
   Never run `npm install` to change the lockfile.
3. Never edit `src/data/gallery-manifest.ts` or `public/gallery/optimized/`.
   Run `npm run optimize:gallery` after any change to `public/gallery/*.jpg`.
4. Put all visible copy in `src/content/{es,en,de}.ts`. Change values,
   never keys. Template components must stay content-free.
5. Write every blog post in all three locales: `src/content/blog*/` share
   slugs per locale and each post lists its `translations` reciprocally
   (deploy.yml fails when they diverge).
6. Keep the client key `PUBLIC_WEB3FORMS_KEY` out of code. `scripts/validate.sh`
   greps for `WEB3FORMS_ACCESS_KEY` in client code and blocks the commit.
7. The server endpoint `src/pages/api/contact.ts` is dormant. GitHub Pages
   ignores it; do not route the contact form through it.
8. Use `node` 24.18.1 (`.nvmrc`). System node fails `astro check`; run
   `source ~/.nvm/nvm.sh && nvm use` first.
9. Treat `openspec/` as the authority for user-visible decisions. Ignore
   `docs/analisis-repositorio-y-siguientes-pasos.md` for greps — it is stale.
10. Narrow your change. Do not refactor or reformat files outside your task.
    When delegating to a subagent, give it only the commands of one gate.
