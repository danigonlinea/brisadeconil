// src/pages/sitemap-index.xml.ts
import type { APIRoute } from 'astro';

/** Rutas públicas del sitio. Cuando el PR i18n cree /es, /en, /de, añadir aquí. */
const ROUTES: ReadonlyArray<string> = [
  '/',
  '/aviso-legal',
  '/politica-privacidad',
  '/politica-cookies',
];

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site?.href ?? 'https://www.brisadeconil.com/';

  const urls = ROUTES.map((route) => {
    const url = new URL(route, baseUrl);
    return `  <url>\n    <loc>${url.href}</loc>\n  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};