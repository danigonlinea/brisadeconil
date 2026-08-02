/**
 * Content — German (DE)
 * Übersetze alle String-Werte. Behalte die Schlüssel identisch zu es.ts.
 * TODO: Vollständige Übersetzung vor Aktivierung der DE-Sprache.
 */

export const meta = {
  title: "Brisa de Conil — Ferienwohnung in Conil de la Frontera",
  description:
    "Miete eine gemütliche Wohnung im Herzen von Conil de la Frontera (Cádiz). Gleich neben dem Markt, für 3 Personen. Buche deine Daten.",
  ogImage: "/og-image.jpg",
  locale: "de_DE",
};

export const nav = {
  brand: "Brisa de Conil",
  links: [
    { label: "Die Wohnung", href: "#apartamento" },
    { label: "Ausstattung", href: "#equipamiento" },
    { label: "Fotos", href: "#galeria" },
    { label: "Kontakt", href: "#contacto" },
  ],
  cta: "Daten buchen",
  toggleDark: "Dunkelmodus aktivieren",
  toggleLight: "Hellmodus aktivieren",
};

export const hero = {
  tagline: "Dein Erlebnis in Conil beginnt hier",
  headline:
    "Wohnung im Zentrum von\n Conil de la Frontera.\nGleich neben dem Markt, Minuten vom Meer.",
  subline:
    "In der Calle Rosa de los Vientos: Gleich neben dem Markt, Minuten vom Meer.",
  cta: "Verfügbarkeit prüfen",
  ctaHref: "#contacto",
  scrollLabel: "Mehr entdecken",
};

export const apartment = {
  sectionLabel: "Die Wohnung",
  headline: "Alles was du brauchst,\nnichts was du nicht brauchst",
  lead: "Ein Raum zum echten Entspannen. Komfortabel, gut ausgestattet und an der besten Lage in Conil.",
  specs: [
    { icon: "users", label: "Kapazität", value: "3 Personen" },
    {
      icon: "bed",
      label: "Schlafzimmer",
      value: "1 Schlafzimmer + Schlafsofa",
    },
    { icon: "bath", label: "Badezimmer", value: "Dusche" },
    { icon: "layout", label: "Aufteilung", value: "Offene Wohnküche" },
    { icon: "door", label: "Zugang", value: "Erdgeschoss, keine Treppen" },
    {
      icon: "sun",
      label: "Gemeinschaftsdachterrasse",
      value: "Zum Frischluft genießen oder Wäsche aufhängen",
    },
  ],
  accessNote:
    "Die Wohnung liegt im Erdgeschoss mit direktem Straßenzugang. Ankommen, Koffer abstellen und Urlaub genießen.",
};

export const amenities = {
  sectionLabel: "Ausstattung",
  headline: "Alles was du brauchst",
  lead: "Haushaltsgeräte, Klimatisierung und Konnektivität — damit du nur ans Genießen denkst.",
  items: [
    { icon: "thermometer", label: "Klimaanlage", detail: "Im Schlafzimmer" },
    { icon: "wind", label: "Deckenventilator", detail: "Im Schlafzimmer" },
    {
      icon: "wifi",
      label: "Glasfaser-Internet",
      detail: "In der gesamten Wohnung",
    },
    { icon: "tv", label: "Fernseher", detail: "60 Zoll" },
    { icon: "thermometer", label: "Warmwasser", detail: "" },
    { icon: "store", label: "Reinigungsprodukte", detail: "" },
    {
      icon: "door",
      label: "2 Schränke",
      detail: "Zum Verstauen von Kleidung und mehr",
    },
    { icon: "bed", label: "Kommode", detail: "Im Schlafzimmer" },
    { icon: "coffee", label: "Mokkakanne", detail: "" },
    { icon: "kettle", label: "Wasserkocher", detail: "" },
    { icon: "refrigerator", label: "Kühlschrank", detail: "Vollständig" },
    { icon: "refrigerator", label: "Gefrierschrank", detail: "" },
    { icon: "washer", label: "Waschmaschine", detail: "" },
    { icon: "dishwasher", label: "Geschirrspüler", detail: "" },
    { icon: "microwave", label: "Mikrowelle", detail: "" },
    { icon: "toaster", label: "Toaster", detail: "" },
    { icon: "oven", label: "Backofen", detail: "" },
  ],
};

export const welcome = {
  sectionLabel: "Von Anfang an",
  headline: "Wie zuhause\nvon Anfang an",
  items: [
    {
      icon: "towel",
      label: "Handtücher & Bettwäsche",
      detail: "Inklusive und frisch gewaschen",
    },
    {
      icon: "droplets",
      label: "Waschmittel & Weichspüler",
      detail: "Für die erste Wäsche",
    },
    { icon: "wind", label: "Haartrockner", detail: "" },
    {
      icon: "flask",
      label: "Küchengrundausstattung",
      detail: "Öl, Essig und Servietten",
    },
  ],
};

export const location = {
  sectionLabel: "Wo wir sind",
  headline: "Im Herzen von Conil",
  lead: "Calle Rosa de los Vientos, gegenüber der Markthalle. Alles zu Fuß erreichbar.",
  address: "C/ Rosa de los Vientos, Conil de la Frontera (Cádiz)",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.0!2d-6.0897!3d36.2778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0c4e0b0b0b0b0b%3A0x0!2sMercado+de+Abastos+Conil!5e0!3m2!1sde!2ses!4v1690000000000",
  parking: {
    headline: "Parken",
    options: [
      {
        name: "Mercado de Abastos",
        detail:
          "Städtischer Parkplatz direkt gegenüber. Die praktischste Option.",
        type: "paid",
      },
      {
        name: "Blaue Zone (ORA)",
        detail: "In der Hochsaison kostenpflichtig. Schilder beachten.",
        type: "paid",
      },
      {
        name: "Recinto Ferial",
        detail:
          "Großer kostenloser Parkplatz in der Nähe. Empfohlen im Juli und August.",
        type: "free",
      },
    ],
    seasonNote:
      "In der Hochsaison (Juli–August) ist das Parken im Zentrum schwieriger. Wir empfehlen das Recinto Ferial als kostenlose und geräumige Alternative.",
  },
};

export const conil = {
  sectionLabel: "Freizeitangebote",
  headline: "Conil wartet auf dich",
  lead: "Strände, Altstadt, Thunfisch-Saison und traditionelle Tapas-Bars. Es gibt viel zu entdecken.",
  categories: [
    {
      icon: "waves",
      title: "Strände",
      items: [
        "Playa de los Bateles — Strandpromenade und Blaue Flagge, belebtester Strand im Zentrum.",
        "Playa de la Fontanilla — ruhiger, ideal für Familien.",
        "Cala del Aceite — weiter entfernt, lohnt sich für kristallklares Wasser.",
      ],
    },
    {
      icon: "landmark",
      title: "Altstadt",
      items: [
        "Spaziergang durch die weiß getünchten Gassen der Altstadt.",
        "Torre de Guzmán — 360°-Aussichtspunkt über Stadt und Meer.",
        "Plaza de Santa Catalina und Kirche Santa Catalina (heute Kulturzentrum).",
      ],
    },
    {
      icon: "utensils",
      title: "Gastronomie",
      items: [
        "Roter Thun aus der Almadraba — in der Saison (Mai–Juni) das Highlight.",
        "Frittierter Fisch und Garnelenküchlein in den Bars im Zentrum.",
        "Mercado de Abastos — der beste Ort für frische Produkte jeden Morgen.",
      ],
    },
  ],
};

export const rules = {
  sectionLabel: "Hausregeln",
  headline: "Einfache Regeln für\neinen ruhigen Auszug",
  lead: "Nichts Kompliziertes. Nur das Nötigste, damit alles für den nächsten Gast stimmt.",
  deposit: {
    label: "Kaution",
    amount: "150 €",
    return:
      "Wird 24–48 Stunden nach dem Auszug zurückgezahlt, sobald alles geprüft wurde.",
    payment: "Kann per Banküberweisung oder Bar bezahlt werden.",
  },
  rules: [
    { icon: "trash", text: "Müll vor dem Abreisen rausbringen." },
    {
      icon: "clock",
      text: "Check-in ist ab 16:00 Uhr und Check-out zwischen 11:30 und 12:00 Uhr.",
    },
    {
      icon: "paw",
      text: "Haustiere sind in der Wohnung nicht erlaubt.",
    },
    {
      icon: "cigarette-off",
      text: "Rauchen ist in der Wohnung nicht erlaubt.",
    },
    { icon: "volume-x", text: "Bitte respektiere die Nachtruhe der Nachbarn." },
  ],
};

export const contact = {
  sectionLabel: "Kontakt",
  headline: "Wann kommst du?",
  lead: "Nenn uns deine Daten und wir melden uns so schnell wie möglich.",
  fields: {
    name: { label: "Dein Name", placeholder: "Anna Müller" },
    email: { label: "Kontakt-E-Mail", placeholder: "anna@beispiel.de" },
    checkin: { label: "Anreisedatum", placeholder: "" },
    checkout: { label: "Abreisedatum", placeholder: "" },
    message: {
      label: "Nachricht (optional)",
      placeholder: "Hast du Fragen oder besondere Wünsche?",
    },
  },
  submit: "Anfrage senden",
  sending: "Wird gesendet…",
  successHeadline: "Nachricht gesendet!",
  successButton: "Neue Anfrage senden",
  successMessage:
    "Danke für deine Anfrage. Wir melden uns so schnell wie möglich.",
  errorMessage: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  privacy: "Deine Daten werden nur zur Beantwortung deiner Anfrage verwendet.",
  formAriaLabel: "Kontaktformular für Buchungsanfragen",
  errors: {
    nameRequired: "Dein Name ist erforderlich.",
    emailRequired: "Kontakt-E-Mail ist erforderlich.",
    emailInvalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
    checkoutAfterCheckin: "Das Abreisedatum muss nach dem Anreisedatum liegen.",
  },
};

export const faq = {
  sectionLabel: "Häufige Fragen",
  headline: "Was uns oft gefragt wird",
  items: [
    {
      q: "Wie sind die Check-in und Check-out Zeiten?",
      a: "Check-in ist ab 16:00 Uhr und Check-out zwischen 11:30 und 12:00 Uhr.",
      pending: false,
    },
    {
      q: "Sind Haustiere erlaubt?",
      a: "Haustiere sind in der Wohnung nicht erlaubt.",
      pending: false,
    },
    {
      q: "Ist Rauchen erlaubt?",
      a: "Rauchen ist in der Wohnung nicht erlaubt.",
      pending: false,
    },
    {
      q: "Wie sind die Stornierungsbedingungen?",
      a: "Du kannst bis 7 Tage vor Anreise kostenlos stornieren. Danach ist der Betrag nicht erstattbar.",
      pending: false,
    },
    {
      q: "Was wenn ich später ankomme?",
      a: "Wenn du später ankommst, stimmen wir die Zugangsdaten in deiner Buchungsbestätigung ab.",
      pending: false,
    },
    {
      q: "Wie viele Personen können übernachten?",
      a: "Die Wohnung schläft 3: 2 im Doppelbett und 1 auf dem Schlafsofa im Wohnzimmer.",
      pending: false,
    },
    {
      q: "Gibt es Parkmöglichkeiten in der Nähe?",
      a: "Ja. Der Mercado de Abastos direkt gegenüber hat städtisches Parken. In der Hochsaison empfehlen wir das Recinto Ferial (kostenlos).",
      pending: false,
    },
    {
      q: "Wie wird die Kaution gehandhabt?",
      a: "Die Kaution beträgt 150 € und wird 24–48 Stunden nach dem Auszug zurückgezahlt.",
      pending: false,
    },
    {
      q: "Muss ich Handtücher mitbringen?",
      a: "Nein. Handtücher und Bettwäsche sind inklusive. Du findest auch Waschmittel, Weichspüler, Haartrockner und Küchengrundausstattung.",
      pending: false,
    },
  ],
};

export const testimonials = {
  sectionLabel: "Bewertungen",
  headline: "Was unsere Gäste sagen",
  placeholder: true,
  items: [
    {
      name: "María G.",
      origin: "Madrid",
      rating: 5,
      text: "[PLATZHALTER — echte Bewertung ausstehend]",
    },
    {
      name: "Thomas K.",
      origin: "Deutschland",
      rating: 5,
      text: "[PLATZHALTER — echte Bewertung ausstehend]",
    },
    {
      name: "Sophie L.",
      origin: "Frankreich",
      rating: 5,
      text: "[PLATZHALTER — echte Bewertung ausstehend]",
    },
  ],
};

export const footer = {
  brand: "Brisa de Conil",
  tagline: "Deine Wohnung an der Costa de la Luz.",
  address: "C/ Rosa de los Vientos\nConil de la Frontera, Cádiz",
  legalNote: "© 2026 Brisa de Conil. Alle Rechte vorbehalten.",
  legalLabel: "Impressum",
  privacyLabel: "Datenschutz",
  cookiesLabel: "Cookie-Richtlinie",
  links: [
    { label: "Die Wohnung", href: "#apartamento" },
    { label: "Galerie", href: "#galeria" },
    { label: "Lage", href: "#ubicacion" },
    { label: "Kontakt", href: "#contacto" },
    { label: "FAQ", href: "#faq" },
  ],
};
