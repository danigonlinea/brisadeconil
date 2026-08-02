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
  "nav.link.equipamiento": {
    es: "Equipamiento",
    en: "Amenities",
    de: "Ausstattung",
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
    es: "Tu experiencia en Conil empieza aquí",
    en: "Your experience in Conil starts here",
    de: "Dein Erlebnis in Conil beginnt hier",
  },
  "hero.headline-1": {
    es: "Apartamento en el centro de",
    en: "Apartment in the centre of",
    de: "Wohnung im Zentrum von",
  },
  "hero.headline-2": {
    es: " Conil de la Frontera",
    en: " Conil de la Frontera",
    de: " Conil de la Frontera",
  },
  "hero.subline": {
    es: "En la Calle Rosa de los Vientos: A pasos del mercado, a minutos del mar.",
    en: "On Calle Rosa de los Vientos: Steps from the market, minutes from the sea.",
    de: "In der Calle Rosa de los Vientos: Schritte vom Markt, Minuten vom Meer.",
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
  "apt.spec.rooftop.label": {
    es: "Azotea comunitaria",
    en: "Communal rooftop",
    de: "Gemeinschaftsdachterrasse",
  },
  "apt.spec.rooftop.value": {
    es: "Para estar al fresco o tender la ropa",
    en: "For evening breeze or drying clothes",
    de: "Zum Frischluft genießen oder Wäsche aufhängen",
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
  "amenities.item.hot-water": {
    es: "Agua caliente",
    en: "Hot water",
    de: "Warmwasser",
  },
  "amenities.item.hot-water.detail": { es: "", en: "", de: "" },
  "amenities.item.store": {
    es: "Productos de limpieza",
    en: "Cleaning products",
    de: "Reinigungsprodukte",
  },
  "amenities.item.store.detail": { es: "", en: "", de: "" },
  "amenities.item.door": {
    es: "2 armarios",
    en: "2 wardrobes",
    de: "2 Schränke",
  },
  "amenities.item.door.detail": {
    es: "Para guardar la ropa y demás",
    en: "For storing clothes and more",
    de: "Zum Verstauen von Kleidung und mehr",
  },
  "amenities.item.bed": {
    es: "Sinfonier",
    en: "Chest of drawers",
    de: "Kommode",
  },
  "amenities.item.bed.detail": {
    es: "En el dormitorio",
    en: "In the bedroom",
    de: "Im Schlafzimmer",
  },
  "amenities.item.coffee": {
    es: "Cafetera italiana",
    en: "Moka pot",
    de: "Mokkakanne",
  },
  "amenities.item.coffee.detail": { es: "", en: "", de: "" },
  "amenities.item.kettle": {
    es: "Hervidor",
    en: "Kettle",
    de: "Wasserkocher",
  },
  "amenities.item.kettle.detail": { es: "", en: "", de: "" },
  "amenities.item.freezer": {
    es: "Congelador",
    en: "Freezer",
    de: "Gefrierschrank",
  },
  "amenities.item.freezer.detail": { es: "", en: "", de: "" },

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
    es: "Solo lo necesario para que todo quede bien para el siguiente huésped.",
    en: "Just what is needed to leave things in good order for the next guest.",
    de: "Nur das Nötigste, damit alles für den nächsten Gast stimmt.",
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
  "rules.deposit.payment": {
    es: "Se puede pagar por Bizum o en efectivo.",
    en: "You can pay by Bizum or cash.",
    de: "Sie können per Bizum oder bar zahlen.",
  },
  "rules.rule.trash": {
    es: "Saca la basura antes de irte.",
    en: "Take the bins out before you leave.",
    de: "Müll vor dem Abreisen rausbringen.",
  },
  "rules.rule.checkin": {
    es: "Check-in a partir de las 16:00 y salida entre las 11:30 y las 12:00.",
    en: "Check-in is from 16:00 and check-out is between 11:30 and 12:00.",
    de: "Check-in ist ab 16:00 Uhr und Check-out zwischen 11:30 und 12:00 Uhr.",
  },
  "rules.rule.pets": {
    es: "No se admiten mascotas en el apartamento.",
    en: "Pets are not allowed in the apartment.",
    de: "Haustiere sind in der Wohnung nicht erlaubt.",
  },
  "rules.rule.smoking": {
    es: "No se permite fumar en el apartamento.",
    en: "Smoking is not allowed in the apartment.",
    de: "Rauchen ist in der Wohnung nicht erlaubt.",
  },
  "rules.rule.noise": {
    es: "Ruidos: respeta el descanso de los vecinos, especialmente en horario nocturno.",
    en: "Please respect neighbours' rest, especially at night.",
    de: "Bitte Nachtruhe der Nachbarn respektieren.",
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
  "contact.formAriaLabel": {
    es: "Formulario de contacto para reservas",
    en: "Contact form for bookings",
    de: "Kontaktformular für Buchungsanfragen",
  },
  "contact.fields.name.label": {
    es: "Tu nombre",
    en: "Your name",
    de: "Dein Name",
  },
  "contact.fields.name.placeholder": {
    es: "Ana García",
    en: "Anna Smith",
    de: "Anna Müller",
  },
  "contact.fields.email.label": {
    es: "Email de contacto",
    en: "Contact email",
    de: "Kontakt-E-Mail",
  },
  "contact.fields.email.placeholder": {
    es: "ana@ejemplo.com",
    en: "anna@example.com",
    de: "anna@beispiel.de",
  },
  "contact.fields.checkin.label": {
    es: "Fecha de entrada",
    en: "Check-in date",
    de: "Anreisedatum",
  },
  "contact.fields.checkin.placeholder": {
    es: "",
    en: "",
    de: "",
  },
  "contact.fields.checkout.label": {
    es: "Fecha de salida",
    en: "Check-out date",
    de: "Abreisedatum",
  },
  "contact.fields.checkout.placeholder": {
    es: "",
    en: "",
    de: "",
  },
  "contact.fields.message.label": {
    es: "Mensaje (opcional)",
    en: "Message (optional)",
    de: "Nachricht (optional)",
  },
  "contact.fields.message.placeholder": {
    es: "¿Tienes alguna pregunta o petición especial?",
    en: "Any questions or special requests?",
    de: "Hast du Fragen oder besondere Wünsche?",
  },
  "contact.submit": {
    es: "Enviar consulta",
    en: "Send enquiry",
    de: "Anfrage senden",
  },
  "contact.sending": {
    es: "Enviando…",
    en: "Sending…",
    de: "Wird gesendet…",
  },
  "contact.successHeadline": {
    es: "¡Mensaje enviado!",
    en: "Message sent!",
    de: "Nachricht gesendet!",
  },
  "contact.successButton": {
    es: "Enviar otra consulta",
    en: "Send another enquiry",
    de: "Neue Anfrage senden",
  },
  "contact.successMessage": {
    es: "Gracias por contactarnos. Te respondemos a la mayor brevedad posible.",
    en: "Thank you for getting in touch. We will reply as soon as possible.",
    de: "Danke für deine Anfrage. Wir melden uns so schnell wie möglich.",
  },
  "contact.errorMessage": {
    es: "Ha ocurrido un error al enviar. Por favor, inténtalo de nuevo o escríbenos directamente.",
    en: "Something went wrong. Please try again or contact us directly.",
    de: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  },
  "contact.privacy": {
    es: "Tus datos solo se usarán para responder a tu consulta.",
    en: "Your details will only be used to respond to your enquiry.",
    de: "Deine Daten werden nur zur Beantwortung deiner Anfrage verwendet.",
  },
  "contact.errors.nameRequired": {
    es: "El nombre es obligatorio.",
    en: "Your name is required.",
    de: "Dein Name ist erforderlich.",
  },
  "contact.errors.emailRequired": {
    es: "El email es obligatorio.",
    en: "Contact email is required.",
    de: "Kontakt-E-Mail ist erforderlich.",
  },
  "contact.errors.emailInvalid": {
    es: "Introduce un email válido.",
    en: "Please enter a valid email address.",
    de: "Bitte gib eine gültige E-Mail-Adresse ein.",
  },
  "contact.errors.checkoutAfterCheckin": {
    es: "La fecha de salida debe ser posterior a la de entrada.",
    en: "Check-out must be after check-in.",
    de: "Das Abreisedatum muss nach dem Anreisedatum liegen.",
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
  "faq.item.0.q": {
    es: "¿Cuáles son los horarios de check-in y check-out?",
    en: "What are the check-in and check-out times?",
    de: "Wie sind die Check-in und Check-out Zeiten?",
  },
  "faq.item.0.a": {
    es: "El check-in es a partir de las 16:00 y la salida se realiza entre las 11:30 y las 12:00.",
    en: "Check-in is from 16:00 and check-out is between 11:30 and 12:00.",
    de: "Check-in ist ab 16:00 Uhr und Check-out zwischen 11:30 und 12:00 Uhr.",
  },
  "faq.item.1.q": {
    es: "¿Se admiten mascotas?",
    en: "Are pets allowed?",
    de: "Sind Haustiere erlaubt?",
  },
  "faq.item.1.a": {
    es: "No se admiten mascotas en el apartamento.",
    en: "Pets are not allowed in the apartment.",
    de: "Haustiere sind in der Wohnung nicht erlaubt.",
  },
  "faq.item.2.q": {
    es: "¿Se puede fumar en el apartamento?",
    en: "Is smoking allowed?",
    de: "Ist Rauchen erlaubt?",
  },
  "faq.item.2.a": {
    es: "No se permite fumar en el apartamento.",
    en: "Smoking is not allowed in the apartment.",
    de: "Rauchen ist in der Wohnung nicht erlaubt.",
  },
  "faq.item.3.q": {
    es: "¿Cuál es la política de cancelación?",
    en: "What is the cancellation policy?",
    de: "Wie sind die Stornierungsbedingungen?",
  },
  "faq.item.3.a": {
    es: "Puedes cancelar sin coste hasta 7 días antes de la fecha de llegada. A partir de entonces, el importe no es reembolsable.",
    en: "You can cancel free of charge until 7 days before arrival. After that, the amount is non-refundable.",
    de: "Du kannst bis 7 Tage vor Anreise kostenlos stornieren. Danach ist der Betrag nicht erstattbar.",
  },
  "faq.item.4.q": {
    es: "¿Qué pasa si llego más tarde de lo previsto?",
    en: "What if I arrive late?",
    de: "Was wenn ich später ankomme?",
  },
  "faq.item.4.a": {
    es: "Si llegas más tarde, intentaremos coordinarnos para vernos y darte las llaves, así puedes entrar sin líos.",
    en: "If you arrive late, we will coordinate access details in your booking confirmation.",
    de: "Wenn du später ankommst, stimmen wir die Zugangsdaten in deiner Buchungsbestätigung ab.",
  },
  "faq.item.5.q": {
    es: "¿Cuánta gente puede alojarse?",
    en: "How many guests can stay?",
    de: "Wie viele Personen können übernachten?",
  },
  "faq.item.5.a": {
    es: "El apartamento tiene capacidad para 3 personas: 2 en la cama de matrimonio del dormitorio y 1 en el sofá cama chaise-longue del salón.",
    en: "The apartment sleeps 3: 2 in the double bed and 1 on the chaise-longue sofa bed in the living room.",
    de: "Die Wohnung schläft 3: 2 im Doppelbett und 1 auf dem Schlafsofa im Wohnzimmer.",
  },
  "faq.item.6.q": {
    es: "¿Hay aparcamiento cerca?",
    en: "Is there parking nearby?",
    de: "Gibt es Parkmöglichkeiten in der Nähe?",
  },
  "faq.item.6.a": {
    es: "Sí. El Mercado de Abastos, justo frente al apartamento, tiene zona de aparcamiento municipal. En temporada alta también recomendamos el Recinto Ferial, gratuito y con mucha capacidad.",
    en: "Yes. The Mercado de Abastos, right opposite, has municipal parking. In high season we also recommend the Recinto Ferial, which is free and has plenty of space.",
    de: "Ja. Der Mercado de Abastos direkt gegenüber hat städtisches Parken. In der Hochsaison empfehlen wir das Recinto Ferial, das kostenlos ist und viel Platz bietet.",
  },
  "faq.item.7.q": {
    es: "¿Cómo se paga la fianza?",
    en: "How is the deposit handled?",
    de: "Wie wird die Kaution gehandhabt?",
  },
  "faq.item.7.a": {
    es: "La fianza es de 150 € y se devuelve entre 24 y 48 horas después de tu salida, una vez verificado que todo está en orden.",
    en: "The deposit is €150, returned within 24–48 hours of checkout once everything has been checked.",
    de: "Die Kaution beträgt 150 € und wird 24–48 Stunden nach dem Auszug zurückgezahlt, sobald alles geprüft wurde.",
  },
  "faq.item.8.q": {
    es: "¿Hay que llevar toallas y sábanas?",
    en: "Do I need to bring towels and bed linen?",
    de: "Muss ich Handtücher und Bettwäsche mitbringen?",
  },
  "faq.item.8.a": {
    es: "No. Toallas y sábanas están incluidas y limpias. También encontrarás detergente, suavizante, secador de pelo y básicos de cocina (aceite, vinagre y servilletas).",
    en: "No. Towels and bed linen are included. You will also find detergent, softener, a hair dryer and basic kitchen supplies.",
    de: "Nein. Handtücher und Bettwäsche sind inklusive. Du findest auch Waschmittel, Weichspüler, einen Föhn und Küchenbasics.",
  },
  "faq.pending-badge": {
    es: "Pendiente",
    en: "Pending",
    de: "Ausstehend",
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
    es: "© 2026 Brisa de Conil. Todos los derechos reservados.",
    en: "© 2026 Brisa de Conil. All rights reserved.",
    de: "© 2026 Brisa de Conil. Alle Rechte vorbehalten.",
  },
  "footer.legal-link": {
    es: "Aviso legal",
    en: "Legal notice",
    de: "Impressum",
  },
  "footer.privacy-link": {
    es: "Política de privacidad",
    en: "Privacy policy",
    de: "Datenschutz",
  },
  "footer.cookies-link": {
    es: "Política de cookies",
    en: "Cookies policy",
    de: "Cookie-Richtlinie",
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
