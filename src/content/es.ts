/**
 * Content — Spanish (ES)
 * All user-visible copy lives here. Keep layout components content-free.
 */

export const meta = {
  title: 'Brisa de Conil — Apartamento vacacional en Conil de la Frontera',
  description:
    'Alquila un acogedor apartamento en el corazón de Conil de la Frontera (Cádiz). A pasos del Mercado de Abastos, para 3 personas. Reserva tus fechas.',
  ogImage: '/og-image.jpg',
  locale: 'es_ES',
};

export const nav = {
  brand: 'Brisa de Conil',
  links: [
    { label: 'El apartamento', href: '#apartamento' },
    { label: 'Galería',        href: '#galeria' },
    { label: 'Ubicación',      href: '#ubicacion' },
    { label: 'Contacto',       href: '#contacto' },
  ],
  cta: 'Reservar fechas',
  toggleDark:  'Activar modo oscuro',
  toggleLight: 'Activar modo claro',
};

export const hero = {
  tagline: 'Tu rincón en la Costa de la Luz',
  headline: 'Despierta con\nbrisa de Atlántico',
  subline:
    'Apartamento en el centro de Conil de la Frontera. A pasos del mercado, a minutos del mar.',
  cta: 'Consulta disponibilidad',
  ctaHref: '#contacto',
  scrollLabel: 'Descubre más',
};

export const apartment = {
  sectionLabel: 'El apartamento',
  headline: 'Todo lo que necesitas,\nsin nada que sobre',
  lead: 'Un espacio pensado para descansar de verdad. Cómodo, bien equipado y en el mejor sitio de Conil.',
  specs: [
    { icon: 'users',    label: 'Capacidad',       value: '3 personas' },
    { icon: 'bed',      label: 'Dormitorio',       value: '1 habitación + sofá cama' },
    { icon: 'bath',     label: 'Baño',             value: 'Ducha independiente' },
    { icon: 'layout',   label: 'Distribución',     value: 'Salón-cocina integrado' },
    { icon: 'door',     label: 'Acceso',           value: 'Planta baja, sin escaleras' },
  ],
  accessNote:
    'El apartamento está en planta baja con acceso directo desde la calle. Llegas, apartas la maleta y ya estás de vacaciones.',
};

export const amenities = {
  sectionLabel: 'Equipamiento',
  headline: 'Todo lo que necesitas',
  lead: 'Electrodomésticos, climatización y conexión para que solo tengas que pensar en disfrutar.',
  items: [
    { icon: 'thermometer', label: 'Aire acondicionado',   detail: 'En el dormitorio' },
    { icon: 'wind',        label: 'Ventilador de techo',  detail: 'En el dormitorio' },
    { icon: 'wifi',        label: 'Fibra óptica',         detail: 'En todo el apartamento' },
    { icon: 'tv',          label: 'Televisión',           detail: '60 pulgadas' },
    { icon: 'refrigerator',label: 'Frigorífico',          detail: 'Completo' },
    { icon: 'washer',      label: 'Lavadora',             detail: '' },
    { icon: 'dishwasher',  label: 'Lavavajillas',         detail: '' },
    { icon: 'microwave',   label: 'Microondas',           detail: '' },
  ],
};

export const welcome = {
  sectionLabel: 'Desde el primer día',
  headline: 'Como en casa\ndesde que llegas',
  lead: 'No hace falta parar en el súper al llegar. Todo lo básico ya está esperándote.',
  items: [
    { icon: 'towel',    label: 'Toallas y sábanas',     detail: 'Incluidas y limpias' },
    { icon: 'droplets', label: 'Detergente y suavizante', detail: 'Para tu primera lavada' },
    { icon: 'wind',     label: 'Secador de pelo',        detail: '' },
    { icon: 'flask',    label: 'Básicos de cocina',      detail: 'Aceite, vinagre y servilletas' },
  ],
  closing: 'Solo trae las ganas de descansar.',
};

export const location = {
  sectionLabel: 'Dónde estamos',
  headline: 'En el corazón de Conil',
  lead: 'Calle Rosa de los Vientos, frente al Mercado de Abastos. Todo a pie.',
  address: 'C/ Rosa de los Vientos, Conil de la Frontera (Cádiz)',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.0!2d-6.0897!3d36.2778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0c4e0b0b0b0b0b%3A0x0!2sMercado+de+Abastos+Conil!5e0!3m2!1ses!2ses!4v1690000000000',
  parking: {
    headline: 'Aparcamiento',
    options: [
      {
        name: 'Mercado de Abastos',
        detail: 'Zona municipal justo frente al apartamento. La opción más cómoda.',
        type: 'paid',
      },
      {
        name: 'Zona Azul (ORA)',
        detail: 'En temporada alta puede estar regulada. Consulta los horarios en la señalética.',
        type: 'paid',
      },
      {
        name: 'Recinto Ferial',
        detail:
          'Gran bolsa gratuita a poca distancia. Recomendada en julio y agosto cuando el centro se llena.',
        type: 'free',
      },
    ],
    seasonNote:
      'En temporada alta (julio-agosto) el aparcamiento en el centro es más difícil. Te recomendamos el Recinto Ferial como alternativa gratuita y amplia.',
  },
};

export const conil = {
  sectionLabel: 'Qué hacer',
  headline: 'Conil te espera',
  lead: 'Playas, casco antiguo, atún de almadraba y bares de toda la vida. Hay mucho por descubrir.',
  categories: [
    {
      icon: 'waves',
      title: 'Playas',
      items: [
        'Playa de los Bateles — paseo marítimo y bandera azul, la más animada del centro.',
        'Playa de la Fontanilla — más tranquila, ideal para familias.',
        'Cala del Aceite — más alejada, merece el paseo por su agua cristalina.',
      ],
    },
    {
      icon: 'landmark',
      title: 'Casco histórico',
      items: [
        'Callejeo por las calles encaladas del casco antiguo.',
        'Torre de Guzmán — mirador con vistas 360º sobre el pueblo y el mar.',
        'Plaza de Santa Catalina e Iglesia de Santa Catalina (hoy centro cultural).',
      ],
    },
    {
      icon: 'utensils',
      title: 'Gastronomía',
      items: [
        'Atún rojo de almadraba — en temporada (mayo-junio) es el producto estrella.',
        'Pescaíto frito y tortillitas de camarones en los bares del centro.',
        'Mercado de Abastos — el mejor sitio para comprar fresco cada mañana.',
      ],
    },
  ],
  disclaimer:
    '⚠ Verifica horarios y disponibilidad antes de tu visita, especialmente en temporada alta.',
};

export const rules = {
  sectionLabel: 'Normas de la casa',
  headline: 'Unas normas sencillas\npara un final tranquilo',
  lead: 'Nada complicado. Solo lo necesario para que todo quede bien para el siguiente huésped.',
  deposit: {
    label: 'Fianza',
    amount: '150 €',
    return: 'Se devuelve entre 24 y 48 horas tras la salida, una vez comprobado que todo está en orden.',
  },
  rules: [
    { icon: 'trash',   text: 'Saca la basura antes de irte.' },
    { icon: 'clock',   text: 'Check-in y check-out: [PENDIENTE — el propietario confirmará los horarios].' },
    { icon: 'paw',     text: 'Política de mascotas: [PENDIENTE — el propietario confirmará].' },
    { icon: 'cigarette-off', text: 'Política de fumadores: [PENDIENTE — el propietario confirmará].' },
    { icon: 'volume-x', text: 'Ruidos: respeta el descanso de los vecinos, especialmente en horario nocturno.' },
  ],
  placeholderNote:
    'Los campos marcados [PENDIENTE] se actualizarán antes de la publicación.',
};

export const contact = {
  sectionLabel: 'Contacto',
  headline: '¿Cuándo te vienes?',
  lead: 'Cuéntanos tus fechas y te respondemos a la mayor brevedad posible.',
  fields: {
    name:        { label: 'Tu nombre',           placeholder: 'Ana García' },
    email:       { label: 'Email de contacto',   placeholder: 'ana@ejemplo.com' },
    checkin:     { label: 'Fecha de entrada',     placeholder: '' },
    checkout:    { label: 'Fecha de salida',      placeholder: '' },
    guests:      { label: 'Número de personas',   placeholder: '1–3' },
    message:     { label: 'Mensaje (opcional)',   placeholder: '¿Tienes alguna pregunta o petición especial?' },
  },
  submit: 'Enviar consulta',
  sending: 'Enviando…',
  successHeadline: '¡Mensaje enviado!',
  successMessage:
    'Gracias por contactarnos. Te respondemos a la mayor brevedad posible.',
  errorMessage:
    'Ha ocurrido un error al enviar. Por favor, inténtalo de nuevo o escríbenos directamente.',
  privacy:
    'Tus datos solo se usarán para responder a tu consulta.',
};

export const faq = {
  sectionLabel: 'Preguntas frecuentes',
  headline: 'Lo que nos suelen preguntar',
  items: [
    {
      q: '¿Cuáles son los horarios de check-in y check-out?',
      a: '[PENDIENTE — el propietario confirmará los horarios exactos. Te lo comunicaremos al confirmar la reserva.]',
      pending: true,
    },
    {
      q: '¿Se admiten mascotas?',
      a: '[PENDIENTE — el propietario confirmará la política de mascotas.]',
      pending: true,
    },
    {
      q: '¿Se puede fumar en el apartamento?',
      a: '[PENDIENTE — el propietario confirmará la política de fumadores.]',
      pending: true,
    },
    {
      q: '¿Cuál es la política de cancelación?',
      a: '[PENDIENTE — el propietario confirmará las condiciones de cancelación.]',
      pending: true,
    },
    {
      q: '¿Qué pasa si llego más tarde de lo previsto?',
      a: '[PENDIENTE — te indicaremos el procedimiento de entrada en tu confirmación de reserva.]',
      pending: true,
    },
    {
      q: '¿Cuánta gente puede alojarse?',
      a: 'El apartamento tiene capacidad para 3 personas: 2 en la cama de matrimonio del dormitorio y 1 en el sofá cama chaise-longue del salón.',
      pending: false,
    },
    {
      q: '¿Hay aparcamiento cerca?',
      a: 'Sí. El Mercado de Abastos, justo frente al apartamento, tiene zona de aparcamiento municipal. En temporada alta también recomendamos el Recinto Ferial, gratuito y con mucha capacidad.',
      pending: false,
    },
    {
      q: '¿Cómo se paga la fianza?',
      a: 'La fianza es de 150 € y se devuelve entre 24 y 48 horas después de tu salida, una vez verificado que todo está en orden.',
      pending: false,
    },
    {
      q: '¿Hay que llevar toallas y sábanas?',
      a: 'No. Toallas y sábanas están incluidas y limpias. También encontrarás detergente, suavizante, secador de pelo y básicos de cocina (aceite, vinagre y servilletas).',
      pending: false,
    },
  ],
};

export const testimonials = {
  sectionLabel: 'Opiniones',
  headline: 'Lo que dicen nuestros huéspedes',
  placeholder: true,
  items: [
    {
      name: 'María G.',
      origin: 'Madrid',
      rating: 5,
      text: '[PLACEHOLDER — testimonio real pendiente de añadir]',
    },
    {
      name: 'Thomas K.',
      origin: 'Alemania',
      rating: 5,
      text: '[PLACEHOLDER — testimonio real pendiente de añadir]',
    },
    {
      name: 'Sophie L.',
      origin: 'Francia',
      rating: 5,
      text: '[PLACEHOLDER — testimonio real pendiente de añadir]',
    },
  ],
};

export const footer = {
  brand: 'Brisa de Conil',
  tagline: 'Tu apartamento en la Costa de la Luz.',
  address: 'C/ Rosa de los Vientos\nConil de la Frontera, Cádiz',
  legalNote: '© 2025 Brisa de Conil. Todos los derechos reservados.',
  privacyLabel: 'Aviso legal',
  links: [
    { label: 'El apartamento', href: '#apartamento' },
    { label: 'Galería',        href: '#galeria' },
    { label: 'Ubicación',      href: '#ubicacion' },
    { label: 'Contacto',       href: '#contacto' },
    { label: 'FAQ',            href: '#faq' },
  ],
};
