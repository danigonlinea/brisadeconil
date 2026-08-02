/**
 * Content — Spanish (ES)
 * All user-visible copy lives here. Keep layout components content-free.
 */

export const meta = {
  title: "Brisa de Conil — Apartamento vacacional en Conil de la Frontera",
  description:
    "Alquila un acogedor apartamento en el corazón de Conil de la Frontera (Cádiz). A pasos del Mercado de Abastos, para 3 personas. Reserva tus fechas.",
  ogImage: "/og-image.jpg",
  locale: "es_ES",
};

export const nav = {
  brand: "Brisa de Conil",
  links: [
    { label: "El apartamento", href: "#apartamento" },
    { label: "Equipamiento", href: "#equipamiento" },
    { label: "Fotos", href: "#galeria" },
    { label: "Contacto", href: "#contacto" },
  ],
  cta: "Reservar fechas",
  toggleDark: "Activar modo oscuro",
  toggleLight: "Activar modo claro",
};

export const hero = {
  tagline: "Vente a conocer la brisa de Conil",
  headline: "Apartamento en el centro de\n Conil de la Frontera",
  subline:
    "En la Calle Rosa de los Vientos: A pasos del mercado, a minutos del mar.",
  cta: "Consulta disponibilidad",
  ctaHref: "#contacto",
  scrollLabel: "Descubre más",
};

export const apartment = {
  sectionLabel: "El apartamento",
  headline: "Todo lo que necesitas,\nsin nada que sobre",
  lead: "Cómodo, bien equipado y en el mejor sitio de Conil.",
  specs: [
    {
      icon: "users",
      label: "Capacidad",
      value:
        "3 personas (1 persona tiene que dormir en el sofá cama chaiselongue)",
    },
    { icon: "bed", label: "Dormitorio", value: "Cama de matrimonio de 135" },
    { icon: "bath", label: "Baño", value: "Placa ducha y bidé" },
    { icon: "layout", label: "Distribución", value: "Salón-cocina integrado" },
    {
      icon: "door",
      label: "Acceso",
      value: "Primera planta, acceso por escalera",
    },
    {
      icon: "sun",
      label: "Azotea comunitaria",
      value: "Para estar al fresco o tender la ropa",
    },
  ],
  accessNote:
    "El apartamento está en planta baja con acceso directo desde la calle. Llega, suelta el equipaje y ya estás de vacaciones.",
};

export const amenities = {
  sectionLabel: "Equipamiento",
  headline: "Todo lo que necesitas",
  lead: "Electrodomésticos, climatización y conectividad.",
  items: [
    {
      icon: "thermometer",
      label: "Aire acondicionado",
      detail: "En el dormitorio",
    },
    { icon: "wind", label: "Ventilador de techo", detail: "En el dormitorio" },
    { icon: "wifi", label: "Fibra óptica", detail: "En todo el apartamento" },
    { icon: "tv", label: "Televisión", detail: "60 pulgadas" },
    { icon: "thermometer", label: "Agua caliente", detail: "" },
    { icon: "store", label: "Productos de limpieza", detail: "" },
    {
      icon: "door",
      label: "2 armarios",
      detail: "Para guardar la ropa y demás",
    },
    { icon: "bed", label: "Sinfonier", detail: "En el dormitorio" },
    { icon: "coffee", label: "Cafetera italiana", detail: "" },
    { icon: "kettle", label: "Hervidor", detail: "" },
    { icon: "refrigerator", label: "Frigorífico", detail: "Completo" },
    { icon: "refrigerator", label: "Congelador", detail: "" },
    { icon: "washer", label: "Lavadora", detail: "" },
    { icon: "dishwasher", label: "Lavavajillas", detail: "" },
    { icon: "microwave", label: "Microondas", detail: "" },
    { icon: "toaster", label: "Tostador", detail: "" },
    { icon: "oven", label: "Horno", detail: "" },
  ],
};

export const welcome = {
  sectionLabel: "Desde el primer día",
  headline: "Queremos que te sientas\ncomo en casa",
  lead: "No necesitas parar en el supermercado cuando llegas. Lo esencial ya te está esperando.",
  items: [
    {
      icon: "towel",
      label: "Toallas y sábanas",
      detail: "Incluidas y limpias",
    },
    {
      icon: "droplets",
      label: "Detergente y suavizante",
      detail: "Para tu primera lavada",
    },
    { icon: "wind", label: "Secador de pelo", detail: "" },
    {
      icon: "flask",
      label: "Básicos de cocina",
      detail: "Aceite, vinagre y servilletas",
    },
  ],
  closing: "Solo trae las ganas de descansar.",
};

export const location = {
  sectionLabel: "Dónde estamos",
  headline: "En el corazón de Conil",
  lead: "Calle Rosa de los Vientos, frente al Mercado de Abastos. Todo a pie.",
  address: "C/ Rosa de los Vientos, Conil de la Frontera (Cádiz)",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.0!2d-6.0897!3d36.2778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0c4e0b0b0b0b0b%3A0x0!2sMercado+de+Abastos+Conil!5e0!3m2!1ses!2ses!4v1690000000000",
  parking: {
    headline: "Aparcamiento",
    options: [
      {
        name: "Mercado de Abastos",
        detail:
          "Zona municipal justo frente al apartamento. La opción más cómoda.",
        type: "paid",
      },
      {
        name: "Zona Azul (ORA)",
        detail:
          "En temporada alta puede estar regulada. Consulta los horarios en la señalética.",
        type: "paid",
      },
      {
        name: "Recinto Ferial",
        detail:
          "Gran bolsa gratuita a poca distancia. Recomendada en julio y agosto cuando el centro se llena.",
        type: "free",
      },
    ],
    seasonNote:
      "En temporada alta (julio-agosto) el aparcamiento en el centro es más difícil. Te recomendamos el Recinto Ferial como alternativa gratuita y amplia.",
  },
};

export const conil = {
  sectionLabel: "Qué hacer",
  headline: "Conil te espera",
  lead: "Playas, casco antiguo, atún de almadraba y bares de toda la vida. Hay mucho por descubrir.",
  categories: [
    {
      icon: "waves",
      title: "Playas",
      items: [
        "Playa de los Bateles — paseo marítimo y bandera azul, la más animada del centro.",
        "Playa de la Fontanilla — más tranquila, ideal para familias.",
        "Cala del Aceite — más alejada, merece el paseo por su agua cristalina.",
      ],
    },
    {
      icon: "landmark",
      title: "Casco histórico",
      items: [
        "Callejeo por las calles encaladas del casco antiguo.",
        "Torre de Guzmán — mirador con vistas 360º sobre el pueblo y el mar.",
        "Plaza de Santa Catalina e Iglesia de Santa Catalina (hoy centro cultural).",
      ],
    },
    {
      icon: "utensils",
      title: "Gastronomía",
      items: [
        "Atún rojo de almadraba — en temporada (mayo-junio) es el producto estrella.",
        "Pescaíto frito y tortillitas de camarones en los bares del centro.",
        "Mercado de Abastos — el mejor sitio para comprar fresco cada mañana.",
      ],
    },
  ],
};

export const rules = {
  sectionLabel: "Normas de la casa",
  headline: "Unas normas sencillas\npara un final tranquilo",
  lead: "Solo lo necesario para que todo quede bien para el siguiente huésped.",
  deposit: {
    label: "Fianza",
    amount: "150 €",
    return:
      "Se devuelve entre 24 y 48 horas tras la salida, una vez comprobado que todo está en orden.",
    payment: "Se puede pagar por Bizum o en efectivo.",
  },
  rules: [
    { icon: "trash", text: "Saca la basura antes de irte." },
    {
      icon: "clock",
      text: "Check-in a partir de las 16:00 y salida entre las 11:30 y las 12:00.",
    },
    {
      icon: "paw",
      text: "No se admiten mascotas en el apartamento.",
    },
    {
      icon: "cigarette-off",
      text: "No se permite fumar en el apartamento.",
    },
    {
      icon: "volume-x",
      text: "Ruidos: respeta el descanso de los vecinos, especialmente en horario nocturno.",
    },
  ],
};

export const contact = {
  sectionLabel: "Contacto",
  headline: "¿Cuándo te vienes?",
  lead: "Cuéntanos tus fechas y te respondemos a la mayor brevedad posible.",
  fields: {
    name: { label: "Tu nombre", placeholder: "Ana García" },
    email: { label: "Email de contacto", placeholder: "ana@ejemplo.com" },
    checkin: { label: "Fecha de entrada", placeholder: "" },
    checkout: { label: "Fecha de salida", placeholder: "" },
    message: {
      label: "Mensaje (opcional)",
      placeholder: "¿Tienes alguna pregunta o petición especial?",
    },
  },
  submit: "Enviar consulta",
  sending: "Enviando…",
  successHeadline: "¡Mensaje enviado!",
  successButton: "Enviar otra consulta",
  successMessage:
    "Gracias por contactarnos. Te respondemos a la mayor brevedad posible.",
  errorMessage:
    "Ha ocurrido un error al enviar. Por favor, inténtalo de nuevo o escríbenos directamente.",
  privacy: "Tus datos solo se usarán para responder a tu consulta.",
  formAriaLabel: "Formulario de contacto para reservas",
  errors: {
    nameRequired: "El nombre es obligatorio.",
    emailRequired: "El email es obligatorio.",
    emailInvalid: "Introduce un email válido.",
    checkoutAfterCheckin:
      "La fecha de salida debe ser posterior a la de entrada.",
  },
};

export const faq = {
  sectionLabel: "Preguntas frecuentes",
  headline: "Lo que nos suelen preguntar",
  items: [
    {
      q: "¿Cuáles son los horarios de check-in y check-out?",
      a: "El check-in es a partir de las 16:00 y la salida se realiza entre las 11:30 y las 12:00.",
      pending: false,
    },
    {
      q: "¿Se admiten mascotas?",
      a: "No se admiten mascotas en el apartamento.",
      pending: false,
    },
    {
      q: "¿Se puede fumar en el apartamento?",
      a: "No se permite fumar en el apartamento.",
      pending: false,
    },
    {
      q: "¿Cuál es la política de cancelación?",
      a: "Puedes cancelar sin coste hasta 7 días antes de la fecha de llegada. A partir de entonces, el importe no es reembolsable.",
      pending: false,
    },
    {
      q: "¿Qué pasa si llego más tarde de lo previsto?",
      a: "Si llegas más tarde, intentaremos coordinarnos para vernos y darte las llaves, así puedes entrar sin líos.",
      pending: false,
    },
    {
      q: "¿Cuánta gente puede alojarse?",
      a: "El apartamento tiene capacidad para 3 personas: 2 en la cama de matrimonio del dormitorio y 1 en el sofá cama chaise-longue del salón.",
      pending: false,
    },
    {
      q: "¿Hay aparcamiento cerca?",
      a: "Sí. El Mercado de Abastos, justo frente al apartamento, tiene zona de aparcamiento municipal. En temporada alta también recomendamos el Recinto Ferial, gratuito y con mucha capacidad.",
      pending: false,
    },
    {
      q: "¿Cómo se paga la fianza?",
      a: "La fianza es de 150 € y se devuelve entre 24 y 48 horas después de tu salida, una vez verificado que todo está en orden.",
      pending: false,
    },
    {
      q: "¿Hay que llevar toallas y sábanas?",
      a: "No. Toallas y sábanas están incluidas y limpias. También encontrarás detergente, suavizante, secador de pelo y básicos de cocina (aceite, vinagre y servilletas).",
      pending: false,
    },
  ],
};

export const testimonials = {
  sectionLabel: "Opiniones",
  headline: "Lo que dicen nuestros huéspedes",
  placeholder: true,
  items: [
    {
      name: "María G.",
      origin: "Madrid",
      rating: 5,
      text: "[PLACEHOLDER — testimonio real pendiente de añadir]",
    },
    {
      name: "Thomas K.",
      origin: "Alemania",
      rating: 5,
      text: "[PLACEHOLDER — testimonio real pendiente de añadir]",
    },
    {
      name: "Sophie L.",
      origin: "Francia",
      rating: 5,
      text: "[PLACEHOLDER — testimonio real pendiente de añadir]",
    },
  ],
};

export const footer = {
  brand: "Brisa de Conil",
  tagline: "Tu apartamento en la Costa de la Luz.",
  address: "C/ Rosa de los Vientos\nConil de la Frontera, Cádiz",
  legalNote: "© 2026 Brisa de Conil. Todos los derechos reservados.",
  legalLabel: "Aviso legal",
  privacyLabel: "Política de privacidad",
  cookiesLabel: "Política de cookies",
  links: [
    { label: "El apartamento", href: "#apartamento" },
    { label: "Galería", href: "#galeria" },
    { label: "Ubicación", href: "#ubicacion" },
    { label: "Contacto", href: "#contacto" },
    { label: "FAQ", href: "#faq" },
  ],
};
