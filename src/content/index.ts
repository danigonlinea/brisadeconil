/**
 * Content index — registry of every locale's copy.
 *
 * Components never import a locale module directly: HomePage (or any other
 * routed template) picks the module for its route and passes slices down as
 * props. To add a language: duplicate es.ts, translate values, register it
 * here and in src/i18n/locales.ts.
 */
import type { Locale } from "../i18n/locales";
import * as es from "./es";
import * as en from "./en";
import * as de from "./de";

/** Shape shared by every locale's content module (ES is the reference). */
export type SiteContent = typeof es;

export const CONTENT: Record<Locale, SiteContent> = { es, en, de };
