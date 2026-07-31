/**
 * Content — English (EN)
 * Translate all string values. Keep keys identical to es.ts.
 * TODO: Complete translation before enabling EN locale.
 */

export const meta = {
  title: 'Brisa de Conil — Holiday apartment in Conil de la Frontera',
  description:
    'Rent a cosy apartment in the heart of Conil de la Frontera (Cádiz). Steps from the Market, sleeps 3. Book your dates.',
  ogImage: '/og-image.jpg',
  locale: 'en_GB',
};

export const nav = {
  brand: 'Brisa de Conil',
  links: [
    { label: 'The apartment', href: '#apartamento' },
    { label: 'Amenities',     href: '#equipamiento' },
    { label: 'Photos',        href: '#galeria' },
    { label: 'Contact',       href: '#contacto' },
  ],
  cta: 'Book your dates',
  toggleDark:  'Enable dark mode',
  toggleLight: 'Enable light mode',
};

export const hero = {
  tagline: 'Your corner on the Costa de la Luz',
  headline: 'Apartment in the centre of Conil de la Frontera.\nSteps from the market, minutes from the sea.',
  subline: '',
  cta: 'Check availability',
  ctaHref: '#contacto',
  scrollLabel: 'Discover more',
};

export const apartment = {
  sectionLabel: 'The apartment',
  headline: 'Everything you need,\nnothing you don't',
  lead: 'A space designed for real rest. Comfortable, well-equipped and in the best spot in Conil.',
  specs: [
    { icon: 'users',    label: 'Capacity',       value: '3 guests' },
    { icon: 'bed',      label: 'Bedroom',        value: '1 bedroom + sofa bed' },
    { icon: 'bath',     label: 'Bathroom',       value: 'Walk-in shower' },
    { icon: 'layout',   label: 'Layout',         value: 'Open-plan living & kitchen' },
    { icon: 'door',     label: 'Access',         value: 'Ground floor, no stairs' },
    { icon: 'sun',      label: 'Communal rooftop', value: 'For evening breeze or drying clothes' },
  ],
  accessNote:
    'The apartment is on the ground floor with direct street access. Arrive, drop the bags and you're already on holiday.',
};

export const amenities = {
  sectionLabel: 'Amenities',
  headline: 'Everything you need',
  lead: 'Appliances, climate control and connectivity — so the only thing on your mind is enjoying yourself.',
  items: [
    { icon: 'thermometer', label: 'Air conditioning',  detail: 'In the bedroom' },
    { icon: 'wind',        label: 'Ceiling fan',       detail: 'In the bedroom' },
    { icon: 'wifi',        label: 'Fibre broadband',   detail: 'Throughout the apartment' },
    { icon: 'tv',          label: 'Television',        detail: '60 inches' },
    { icon: 'refrigerator',label: 'Fridge',            detail: 'Full-size' },
    { icon: 'washer',      label: 'Washing machine',   detail: '' },
    { icon: 'dishwasher',  label: 'Dishwasher',        detail: '' },
    { icon: 'microwave',   label: 'Microwave',         detail: '' },
  ],
};

export const welcome = {
  sectionLabel: 'From day one',
  headline: 'Home from the\nmoment you arrive',
  lead: 'No need to stop at the supermarket when you land. The essentials are already waiting for you.',
  items: [
    { icon: 'towel',    label: 'Towels & bed linen',    detail: 'Included and freshly laundered' },
    { icon: 'droplets', label: 'Detergent & softener',  detail: 'For your first wash' },
    { icon: 'wind',     label: 'Hair dryer',            detail: '' },
    { icon: 'flask',    label: 'Kitchen basics',        detail: 'Oil, vinegar and napkins' },
  ],
  closing: 'Just bring the desire to rest.',
};

export const location = {
  sectionLabel: 'Where we are',
  headline: 'In the heart of Conil',
  lead: 'Calle Rosa de los Vientos, opposite the Market Hall. Everything within walking distance.',
  address: 'C/ Rosa de los Vientos, Conil de la Frontera (Cádiz)',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.0!2d-6.0897!3d36.2778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0c4e0b0b0b0b0b%3A0x0!2sMercado+de+Abastos+Conil!5e0!3m2!1sen!2ses!4v1690000000000',
  parking: {
    headline: 'Parking',
    options: [
      {
        name: 'Mercado de Abastos',
        detail: 'Municipal car park right opposite the apartment. The most convenient option.',
        type: 'paid',
      },
      {
        name: 'Blue Zone (ORA)',
        detail: 'May be regulated in high season. Check signs for hours.',
        type: 'paid',
      },
      {
        name: 'Recinto Ferial',
        detail: 'Large free car park a short walk away. Recommended in July and August.',
        type: 'free',
      },
    ],
    seasonNote:
      'In high season (July–August) parking in the centre can be tricky. We recommend the Recinto Ferial as a free and spacious alternative.',
  },
};

export const conil = {
  sectionLabel: 'Things to do',
  headline: 'Conil is waiting',
  lead: 'Beaches, old town, tuna season and traditional tapas bars. There is plenty to discover.',
  categories: [
    {
      icon: 'waves',
      title: 'Beaches',
      items: [
        'Playa de los Bateles — seafront promenade and Blue Flag, the liveliest in the centre.',
        'Playa de la Fontanilla — quieter, great for families.',
        'Cala del Aceite — further out, worth the walk for its crystal-clear water.',
      ],
    },
    {
      icon: 'landmark',
      title: 'Old town',
      items: [
        'Strolling through the whitewashed lanes of the historic centre.',
        'Torre de Guzmán — 360° viewpoint over the town and the sea.',
        'Plaza de Santa Catalina and the Church of Santa Catalina (now a cultural centre).',
      ],
    },
    {
      icon: 'utensils',
      title: 'Gastronomy',
      items: [
        'Red tuna from the almadraba — in season (May–June) it is the star ingredient.',
        'Fried fish and prawn fritters at the bars in the town centre.',
        'Mercado de Abastos — the best place to buy fresh produce every morning.',
      ],
    },
  ],
  disclaimer:
    '⚠ Check opening times and availability before your visit, especially in high season.',
};

export const rules = {
  sectionLabel: 'House rules',
  headline: 'Simple rules for\na smooth checkout',
  lead: 'Nothing complicated. Just what is needed to leave things in good order for the next guest.',
  deposit: {
    label: 'Security deposit',
    amount: '€150',
    return: 'Returned within 24–48 hours of checkout, once we have confirmed everything is in order.',
  },
  rules: [
    { icon: 'trash',         text: 'Take the bins out before you leave.' },
    { icon: 'clock',         text: 'Check-in is from 16:00 and check-out is between 11:30 and 12:00.' },
    { icon: 'paw',           text: 'Pets are not allowed in the apartment.' },
    { icon: 'cigarette-off', text: 'Smoking is not allowed in the apartment.' },
    { icon: 'volume-x',      text: 'Please respect neighbours' rest, especially at night.' },
  ],
};

export const contact = {
  sectionLabel: 'Contact',
  headline: 'When are you coming?',
  lead: 'Tell us your dates and we will get back to you as soon as possible.',
  fields: {
    name:    { label: 'Your name',         placeholder: 'Anna Smith' },
    email:   { label: 'Contact email',     placeholder: 'anna@example.com' },
    checkin: { label: 'Check-in date',     placeholder: '' },
    checkout:{ label: 'Check-out date',    placeholder: '' },
    guests:  { label: 'Number of guests',  placeholder: '1–3' },
    message: { label: 'Message (optional)',placeholder: 'Any questions or special requests?' },
  },
  submit: 'Send enquiry',
  sending: 'Sending…',
  successHeadline: 'Message sent!',
  successMessage: 'Thank you for getting in touch. We will reply as soon as possible.',
  errorMessage: 'Something went wrong. Please try again or contact us directly.',
  privacy: 'Your details will only be used to respond to your enquiry.',
};

export const faq = {
  sectionLabel: 'FAQ',
  headline: 'Questions we get asked',
  items: [
    { q: 'What are the check-in and check-out times?', a: 'Check-in is from 16:00 and check-out is between 11:30 and 12:00.', pending: false },
    { q: 'Are pets allowed?',                          a: 'Pets are not allowed in the apartment.', pending: false },
    { q: 'Is smoking allowed?',                        a: 'Smoking is not allowed in the apartment.', pending: false },
    { q: 'What is the cancellation policy?',           a: 'You can cancel free of charge until 7 days before arrival. After that, the amount is non-refundable.', pending: false },
    { q: 'What if I arrive late?',                     a: 'If you arrive late, we will coordinate access details in your booking confirmation.', pending: false },
    { q: 'How many guests can stay?', a: 'The apartment sleeps 3: 2 in the double bed and 1 on the chaise-longue sofa bed in the living room.', pending: false },
    { q: 'Is there parking nearby?',  a: 'Yes. The Mercado de Abastos, right opposite, has municipal parking. In high season we also recommend the Recinto Ferial, which is free and has plenty of space.', pending: false },
    { q: 'How is the deposit handled?', a: 'The deposit is €150, returned within 24–48 hours of checkout once everything has been checked.', pending: false },
    { q: 'Do I need to bring towels and bed linen?', a: 'No. Towels and bed linen are included. You will also find detergent, softener, a hair dryer and basic kitchen supplies.', pending: false },
  ],
};

export const testimonials = {
  sectionLabel: 'Reviews',
  headline: 'What our guests say',
  placeholder: true,
  items: [
    { name: 'María G.', origin: 'Madrid',  rating: 5, text: '[PLACEHOLDER — real review pending]' },
    { name: 'Thomas K.',origin: 'Germany', rating: 5, text: '[PLACEHOLDER — real review pending]' },
    { name: 'Sophie L.',origin: 'France',  rating: 5, text: '[PLACEHOLDER — real review pending]' },
  ],
};

export const footer = {
  brand: 'Brisa de Conil',
  tagline: 'Your apartment on the Costa de la Luz.',
  address: 'C/ Rosa de los Vientos\nConil de la Frontera, Cádiz',
  legalNote: '© 2025 Brisa de Conil. All rights reserved.',
  privacyLabel: 'Legal notice',
  links: [
    { label: 'The apartment', href: '#apartamento' },
    { label: 'Gallery',       href: '#galeria' },
    { label: 'Location',      href: '#ubicacion' },
    { label: 'Contact',       href: '#contacto' },
    { label: 'FAQ',           href: '#faq' },
  ],
};
