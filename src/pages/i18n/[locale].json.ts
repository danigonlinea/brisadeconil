/**
 * [locale].json.ts — Build-time JSON export of the i18n table per locale.
 *
 * Served as static files (dist/i18n/{es,en,de}.json) so the client-side i18n
 * script only needs to inline the DEFAULT locale and can fetch the others on
 * demand when the visitor switches language. This removes ~2/3 of the i18n
 * bytes from every HTML page (helps the content-to-code ratio).
 */
import type { APIRoute } from "astro";
import { t, SUPPORTED_LOCALES } from "../../i18n/translations";

/** Flatten a locale's strings into a plain { key: string } map. */
function flatLocale(locale: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of Object.keys(t)) {
    const entry = t[key];
    if (!entry) continue;
    const value = entry[locale as keyof typeof entry];
    if (value !== undefined) out[key] = value;
  }
  return out;
}

export function getStaticPaths() {
  return SUPPORTED_LOCALES.map((locale) => ({ params: { locale } }));
}

export const GET: APIRoute = ({ params }) => {
  const locale = params.locale ?? "es";
  const body = JSON.stringify(flatLocale(locale));
  return new Response(body, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
