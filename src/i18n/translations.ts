/**
 * translations.ts — All i18n strings for ES, EN, DE.
 * Used by the client-side i18n script to swap content without a page reload.
 * Keys must match the data-i18n attributes in Astro components.
 */

export type Locale = "es" | "en" | "de";

export const SUPPORTED_LOCALES: Locale[] = ["es", "en", "de"];
export const DEFAULT_LOCALE: Locale = "es";

/** Detect locale from navigator.language, falling back to DEFAULT_LOCALE */
export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const lang = navigator.language?.toLowerCase() ?? "";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("en")) return "en";
  return "es";
}

// ─── Translation map ──────────────────────────────────────────────────────────
// Each key maps to { es, en, de }.
// Keys use dot notation: section.field
// HTML content uses the "html" suffix by convention.

export const t: Record<string, Record<Locale, string>> = {
  // ── Document lang attribute ───────────────────────────────────────────────
  lang: { es: "es", en: "en", de: "de" },

  // ── Skip link ─────────────────────────────────────────────────────────────
  "skip-link": {
    es: "Saltar al contenido",
    en: "Skip to content",
    de: "Zum Inhalt springen",
  },

  // ── Nav ───────────────────────────────────────────────────────────────────
  "nav.link.apartamento": {
    es: "El apartamento",
    en: "The apartment",
    de: "Die Wohnung",
  },
  "nav.link.galeria": { es: "Galería", en: "Gallery", de: "Galerie" },
  "nav.link.ubicacion": { es: "Ubicación", en: "Location", de: "Lage" },
  "nav.link.contacto": { es: "Contacto", en: "Contact", de: "Kontakt" },
  "nav.cta": {
    es: "Reservar fechas",
    en: "Book your dates",
    de: "Daten buchen",
  },
  "nav.toggle-dark": {
    es: "Activar modo oscuro",
    en: "Enable dark mode",
    de: "Dunkelmodus aktivieren",
  },
  "nav.toggle-light": {
    es: "Activar modo claro",
    en: "Enable light mode",
    de: "Hellmodus aktivieren",
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  "hero.tagline": {
    es: "Vente a conocer la brisa de Conil",
    en: "Your corner on the Costa de la Luz",
    de: "Dein Rückzugsort an der Costa de la Luz",
  },
  "hero.headline-1": {
    es: "Apartamento en el centro de Conil de la Frontera.",
    en: "Apartment in the centre of Conil de la Frontera.",
    de: "Wohnung im Zentrum von Conil de la Frontera.",
  },
  "hero.headline-2": {
    es: "A pasos del mercado, a minutos del mar.",
    en: "Steps from the market, minutes from the sea.",
    de: "Gleich neben dem Markt, Minuten vom Meer.",
  },
  "hero.cta": {
    es: "Consulta disponibilidad",
    en: "Check availability",
    de: "Verfügbarkeit prüfen",
  },
  "hero.scroll": {
    es: "Descubre más",
    en: "Discover more",
    de: "Mehr entdecken",
  },

  // ── Gallery ───────────────────────────────────────────────────────────────
  "gallery.label": {
    es: "Galería de fotos",
    en: "Photo gallery",
    de: "Fotogalerie",
  },
  "gallery.title": {
    es: "El apartamento",
    en: "The apartment",
    de: "Die Wohnung",
  },
  "gallery.lead": {
    es: "Todas las estancias, con la luz real del apartamento.",
    en: "Every room, in the apartment's real light.",
    de: "Alle Räume, im echten Licht der Wohnung.",
  },

  // ── Apartment ─────────────────────────────────────────────────────────────
  "apt.label": { es: "El apartamento", en: "The apartment", de: "Die Wohnung" },
  "apt.title": {
    es: "Todo lo que necesitas, sin nada que sobre",
    en: "Everything you need, nothing you don't",
    de: "Alles was du brauchst, nichts was du nicht brauchst",
  },
  "apt.lead": {
    es: "Cómodo, bien equipado y en el mejor sitio de Conil.",
    en: "A space designed for real rest. Comfortable, well-equipped and in the best spot in Conil.",
    de: "Ein Raum zum echten Entspannen. Komfortabel, gut ausgestattet und an der besten Lage in Conil.",
  },
  "apt.spec.capacity.label": {
    es: "Capacidad",
    en: "Capacity",
    de: "Kapazität",
  },
  "apt.spec.capacity.value": {
    es: "3 personas (1 persona tiene que dormir en el sofá cama chaiselongue)",
    en: "3 guests",
    de: "3 Personen",
  },
  "apt.spec.bed.label": { es: "Dormitorio", en: "Bedroom", de: "Schlafzimmer" },
  "apt.spec.bed.value": {
    es: "Cama de matrimonio de 135",
    en: "1 bedroom + sofa bed",
    de: "1 Schlafzimmer + Schlafsofa",
  },
  "apt.spec.bath.label": { es: "Baño", en: "Bathroom", de: "Badezimmer" },
  "apt.spec.bath.value": {
    es: "",
    en: "Walk-in shower",
    de: "Dusche",
  },
  "apt.spec.layout.label": {
    es: "Distribución",
    en: "Layout",
    de: "Aufteilung",
  },
  "apt.spec.layout.value": {
    es: "Salón-cocina integrado",
    en: "Open-plan living & kitchen",
    de: "Offene Wohnküche",
  },
  "apt.spec.access.label": { es: "Acceso", en: "Access", de: "Zugang" },
  "apt.spec.access.value": {
    es: "Primera planta, acceso por escalera",
    en: "Ground floor, no stairs",
    de: "Erdgeschoss, keine Treppen",
  },
  "apt.spec.store.label": {
    es: "Servicios cercanos",
    en: "Nearby services",
    de: "In der Nähe",
  },
  "apt.spec.store.value": {
    es: "Supermercado, farmacia y bancos cerca",
    en: "Supermarket, pharmacy and banks nearby",
    de: "Supermarkt, Apotheke und Banken in der Nähe",
  },
  "apt.access-note": {
    es: "El apartamento se encuentra en una primera planta con acceso por escalera desde la calle.",
    en: "The apartment is on the ground floor with direct street access. Arrive, drop the bags and you're already on holiday.",
    de: "Die Wohnung liegt im Erdgeschoss mit direktem Straßenzugang. Ankommen, Koffer abstellen und Urlaub genießen.",
  },

  // ── Amenities ─────────────────────────────────────────────────────────────
  "amenities.label": { es: "Equipamiento", en: "Amenities", de: "Ausstattung" },
  "amenities.title": {
    es: "Todo lo que necesitas",
    en: "Everything you need",
    de: "Alles was du brauchst",
  },
  "amenities.lead": {
    es: "",
    en: "Appliances, climate control and connectivity — so the only thing on your mind is enjoying yourself.",
    de: "Haushaltsgeräte, Klimatisierung und Konnektivität — damit du nur ans Genießen denkst.",
  },
  "amenities.item.ac": {
    es: "Aire acondicionado",
    en: "Air conditioning",
    de: "Klimaanlage",
  },
  "amenities.item.ac.detail": {
    es: "",
    en: "In the bedroom",
    de: "Im Schlafzimmer",
  },
  "amenities.item.fan": {
    es: "Ventilador de techo",
    en: "Ceiling fan",
    de: "Deckenventilator",
  },
  "amenities.item.fan.detail": {
    es: "En el dormitorio",
    en: "In the bedroom",
    de: "Im Schlafzimmer",
  },
  "amenities.item.wifi": {
    es: "Fibra óptica",
    en: "Fibre broadband",
    de: "Glasfaser-Internet",
  },
  "amenities.item.wifi.detail": {
    es: "En todo el apartamento",
    en: "Throughout the apartment",
    de: "In der gesamten Wohnung",
  },
  "amenities.item.tv": { es: "Televisión", en: "Television", de: "Fernseher" },
  "amenities.item.tv.detail": {
    es: "60 pulgadas",
    en: "60 inches",
    de: "60 Zoll",
  },
  "amenities.item.fridge": {
    es: "Frigorífico",
    en: "Fridge",
    de: "Kühlschrank",
  },
  "amenities.item.fridge.detail": {
    es: "",
    en: "Full-size",
    de: "Vollständig",
  },
  "amenities.item.washer": {
    es: "Lavadora",
    en: "Washing machine",
    de: "Waschmaschine",
  },
  "amenities.item.washer.detail": { es: "", en: "", de: "" },
  "amenities.item.dishwasher": {
    es: "Lavavajillas",
    en: "Dishwasher",
    de: "Geschirrspüler",
  },
  "amenities.item.dishwasher.detail": { es: "", en: "", de: "" },
  "amenities.item.microwave": {
    es: "Microondas",
    en: "Microwave",
    de: "Mikrowelle",
  },
  "amenities.item.microwave.detail": { es: "", en: "", de: "" },
  "amenities.item.toaster": {
    es: "Tostador",
    en: "Toaster",
    de: "Toaster",
  },
  "amenities.item.toaster.detail": { es: "", en: "", de: "" },
  "amenities.item.oven": {
    es: "Horno",
    en: "Oven",
    de: "Backofen",
  },
  "amenities.item.oven.detail": { es: "", en: "", de: "" },

  // ── Welcome ───────────────────────────────────────────────────────────────
  "welcome.label": {
    es: "Desde el primer día",
    en: "From day one",
    de: "Von Anfang an",
  },
  "welcome.title": {
    es: "Queremos que te sientas como en casa",
    en: "Home from the moment you arrive",
    de: "Wie zuhause von Anfang an",
  },
  "welcome.lead": {
    es: "",
    en: "No need to stop at the supermarket when you land. The essentials are already waiting for you.",
    de: "Kein Stopp im Supermarkt nötig. Das Wichtigste wartet schon auf dich.",
  },
  "welcome.item.towels": {
    es: "Toallas y sábanas",
    en: "Towels & bed linen",
    de: "Handtücher & Bettwäsche",
  },
  "welcome.item.towels.detail": {
    es: "Incluidas y limpias",
    en: "Included and freshly laundered",
    de: "Inklusive und frisch gewaschen",
  },
  "welcome.item.detergent": {
    es: "Detergente y suavizante",
    en: "Detergent & softener",
    de: "Waschmittel & Weichspüler",
  },
  "welcome.item.detergent.detail": {
    es: "Para tu primera lavada",
    en: "For your first wash",
    de: "Für die erste Wäsche",
  },
  "welcome.item.hairdryer": {
    es: "Secador de pelo",
    en: "Hair dryer",
    de: "Haartrockner",
  },
  "welcome.item.hairdryer.detail": { es: "", en: "", de: "" },
  "welcome.item.kitchen": {
    es: "Básicos de cocina",
    en: "Kitchen basics",
    de: "Küchengrundausstattung",
  },
  "welcome.item.kitchen.detail": {
    es: "Aceite, vinagre y servilletas",
    en: "Oil, vinegar and napkins",
    de: "Öl, Essig und Servietten",
  },
  "welcome.closing": {
    es: "",
    en: "Just bring the desire to rest.",
    de: "Bring nur die Lust auf Erholung mit.",
  },

  // ── Location ──────────────────────────────────────────────────────────────
  "location.label": {
    es: "Dónde estamos",
    en: "Where we are",
    de: "Wo wir sind",
  },
  "location.title": {
    es: "En el corazón de Conil",
    en: "In the heart of Conil",
    de: "Im Herzen von Conil",
  },
  "location.lead": {
    es: "Calle Rosa de los Vientos, frente al Mercado de Abastos. Todo a pie.",
    en: "Calle Rosa de los Vientos, opposite the Market Hall. Everything within walking distance.",
    de: "Calle Rosa de los Vientos, gegenüber der Markthalle. Alles zu Fuß erreichbar.",
  },
  "location.parking.title": { es: "Aparcamiento", en: "Parking", de: "Parken" },
  "location.parking.mercado.name": {
    es: "Mercado de Abastos",
    en: "Mercado de Abastos",
    de: "Mercado de Abastos",
  },
  "location.parking.mercado.detail": {
    es: "Zona municipal justo frente al apartamento. La opción más cómoda.",
    en: "Municipal car park right opposite the apartment. The most convenient option.",
    de: "Städtischer Parkplatz direkt gegenüber. Die praktischste Option.",
  },
  "location.parking.ora.name": {
    es: "Zona Azul (ORA)",
    en: "Blue Zone (ORA)",
    de: "Blaue Zone (ORA)",
  },
  "location.parking.ora.detail": {
    es: "En temporada alta puede estar regulada. Consulta los horarios en la señalética.",
    en: "May be regulated in high season. Check signs for hours.",
    de: "In der Hochsaison kostenpflichtig. Schilder beachten.",
  },
  "location.parking.ferial.name": {
    es: "Recinto Ferial",
    en: "Recinto Ferial",
    de: "Recinto Ferial",
  },
  "location.parking.ferial.detail": {
    es: "Gran bolsa gratuita a poca distancia. Recomendada en julio y agosto cuando el centro se llena.",
    en: "Large free car park a short walk away. Recommended in July and August.",
    de: "Großer kostenloser Parkplatz in der Nähe. Empfohlen im Juli und August.",
  },
  "location.parking.free-badge": {
    es: "Gratuito",
    en: "Free",
    de: "Kostenlos",
  },
  "location.parking.paid-badge": {
    es: "De pago",
    en: "Paid",
    de: "Kostenpflichtig",
  },
  "location.parking.season-note": {
    es: "En temporada alta (julio-agosto) el aparcamiento en el centro es más difícil. Te recomendamos el Recinto Ferial como alternativa gratuita y amplia.",
    en: "In high season (July–August) parking in the centre can be tricky. We recommend the Recinto Ferial as a free and spacious alternative.",
    de: "In der Hochsaison (Juli–August) ist das Parken im Zentrum schwieriger. Wir empfehlen das Recinto Ferial als kostenlose und geräumige Alternative.",
  },

  // ── Conil ─────────────────────────────────────────────────────────────────
  "conil.label": {
    es: "Qué hacer",
    en: "Things to do",
    de: "Freizeitangebote",
  },
  "conil.title": {
    es: "Conil te espera",
    en: "Conil is waiting",
    de: "Conil wartet auf dich",
  },
  "conil.lead": {
    es: "Playas, casco antiguo, atún de almadraba y bares de toda la vida. Hay mucho por descubrir.",
    en: "Beaches, old town, tuna season and traditional tapas bars. There is plenty to discover.",
    de: "Strände, Altstadt, Thunfisch-Saison und traditionelle Tapas-Bars. Es gibt viel zu entdecken.",
  },
  "conil.beaches.title": { es: "Playas", en: "Beaches", de: "Strände" },
  "conil.oldtown.title": {
    es: "Casco histórico",
    en: "Old town",
    de: "Altstadt",
  },
  "conil.food.title": {
    es: "Gastronomía",
    en: "Gastronomy",
    de: "Gastronomie",
  },
  "conil.disclaimer": {
    es: "⚠ Verifica horarios y disponibilidad antes de tu visita, especialmente en temporada alta.",
    en: "⚠ Check opening times and availability before your visit, especially in high season.",
    de: "⚠ Öffnungszeiten und Verfügbarkeit vor dem Besuch prüfen, besonders in der Hochsaison.",
  },

  // ── Rules ─────────────────────────────────────────────────────────────────
  "rules.label": {
    es: "Normas de la casa",
    en: "House rules",
    de: "Hausregeln",
  },
  "rules.title": {
    es: "Unas normas sencillas para un final tranquilo",
    en: "Simple rules for a smooth checkout",
    de: "Einfache Regeln für einen ruhigen Auszug",
  },
  "rules.lead": {
    es: "Nada complicado. Solo lo necesario para que todo quede bien para el siguiente huésped.",
    en: "Nothing complicated. Just what is needed to leave things in good order for the next guest.",
    de: "Nichts Kompliziertes. Nur das Nötigste, damit alles für den nächsten Gast stimmt.",
  },
  "rules.deposit.label": {
    es: "Fianza",
    en: "Security deposit",
    de: "Kaution",
  },
  "rules.deposit.return": {
    es: "Se devuelve entre 24 y 48 horas tras la salida, una vez comprobado que todo está en orden.",
    en: "Returned within 24–48 hours of checkout, once we have confirmed everything is in order.",
    de: "Wird 24–48 Stunden nach dem Auszug zurückgezahlt, sobald alles geprüft wurde.",
  },
  "rules.rule.trash": {
    es: "Saca la basura antes de irte.",
    en: "Take the bins out before you leave.",
    de: "Müll vor dem Abreisen rausbringen.",
  },
  "rules.rule.checkin": {
    es: "Check-in y check-out: [PENDIENTE — el propietario confirmará los horarios].",
    en: "Check-in and check-out times: [PENDING — owner to confirm].",
    de: "Check-in und Check-out Zeiten: [AUSSTEHEND — Eigentümer bestätigt].",
  },
  "rules.rule.pets": {
    es: "Política de mascotas: [PENDIENTE — el propietario confirmará].",
    en: "Pet policy: [PENDING — owner to confirm].",
    de: "Haustierrichtlinie: [AUSSTEHEND — Eigentümer bestätigt].",
  },
  "rules.rule.smoking": {
    es: "Política de fumadores: [PENDIENTE — el propietario confirmará].",
    en: "Smoking policy: [PENDING — owner to confirm].",
    de: "Rauchrichtlinie: [AUSSTEHEND — Eigentümer bestätigt].",
  },
  "rules.rule.noise": {
    es: "Ruidos: respeta el descanso de los vecinos, especialmente en horario nocturno.",
    en: "Please respect neighbours' rest, especially at night.",
    de: "Bitte Nachtruhe der Nachbarn respektieren.",
  },
  "rules.placeholder-note": {
    es: "Los campos marcados [PENDIENTE] se actualizarán antes de la publicación.",
    en: "Fields marked [PENDING] will be updated before publication.",
    de: "Felder mit [AUSSTEHEND] werden vor der Veröffentlichung aktualisiert.",
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  "contact.label": { es: "Contacto", en: "Contact", de: "Kontakt" },
  "contact.title": {
    es: "¿Cuándo te vienes?",
    en: "When are you coming?",
    de: "Wann kommst du?",
  },
  "contact.lead": {
    es: "Cuéntanos tus fechas y te respondemos a la mayor brevedad posible.",
    en: "Tell us your dates and we will get back to you as soon as possible.",
    de: "Nenn uns deine Daten und wir melden uns so schnell wie möglich.",
  },
  "contact.reassurance.1": {
    es: "Respuesta rápida — normalmente en el mismo día",
    en: "Quick reply — usually the same day",
    de: "Schnelle Antwort — normalerweise am selben Tag",
  },
  "contact.reassurance.2": {
    es: "Sin compromiso — solo una consulta",
    en: "No commitment — just an enquiry",
    de: "Keine Verpflichtung — nur eine Anfrage",
  },
  "contact.reassurance.3": {
    es: "Atención directa del propietario",
    en: "Direct attention from the owner",
    de: "Direkter Kontakt mit dem Eigentümer",
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  "faq.label": { es: "Preguntas frecuentes", en: "FAQ", de: "Häufige Fragen" },
  "faq.title": {
    es: "Lo que nos suelen preguntar",
    en: "Questions we get asked",
    de: "Was uns oft gefragt wird",
  },

  // ── Testimonials ──────────────────────────────────────────────────────────
  "testimonials.label": { es: "Opiniones", en: "Reviews", de: "Bewertungen" },
  "testimonials.title": {
    es: "Lo que dicen nuestros huéspedes",
    en: "What our guests say",
    de: "Was unsere Gäste sagen",
  },
  "testimonials.note": {
    es: "Testimonios placeholder — sustituir por reseñas reales antes de publicar.",
    en: "Placeholder reviews — replace with real ones before publishing.",
    de: "Platzhalter-Bewertungen — vor der Veröffentlichung durch echte ersetzen.",
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  "footer.tagline": {
    es: "Tu apartamento en la Costa de la Luz.",
    en: "Your apartment on the Costa de la Luz.",
    de: "Deine Wohnung an der Costa de la Luz.",
  },
  "footer.sections": { es: "Secciones", en: "Sections", de: "Sektionen" },
  "footer.legal": {
    es: "© 2025 Brisa de Conil. Todos los derechos reservados.",
    en: "© 2025 Brisa de Conil. All rights reserved.",
    de: "© 2025 Brisa de Conil. Alle Rechte vorbehalten.",
  },
  "footer.legal-link": {
    es: "Aviso legal",
    en: "Legal notice",
    de: "Impressum",
  },
  "footer.link.apartamento": {
    es: "El apartamento",
    en: "The apartment",
    de: "Die Wohnung",
  },
  "footer.link.galeria": { es: "Galería", en: "Gallery", de: "Galerie" },
  "footer.link.ubicacion": { es: "Ubicación", en: "Location", de: "Lage" },
  "footer.link.contacto": { es: "Contacto", en: "Contact", de: "Kontakt" },
  "footer.link.faq": { es: "FAQ", en: "FAQ", de: "FAQ" },
  "footer.response-note": {
    es: "Respondemos normalmente en el mismo día.",
    en: "We usually reply the same day.",
    de: "Wir antworten normalerweise am selben Tag.",
  },
};
