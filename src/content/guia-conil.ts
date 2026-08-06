/**
 * Guía Local de Conil — contenido estático (ES)
 *
 * Distancias a pie estimadas desde C/ Rosa de los Vientos (Mercado de Abastos).
 * Fuente: OpenStreetMap / Google Maps, rutas peatonales.
 */

export const guiaMeta = {
  title: 'Guía de Conil de la Frontera 2025 — Playas, restaurantes y qué ver',
  description:
    'Descubre lo mejor de Conil de la Frontera: playas para familias, restaurantes con pescaíto frito, la Feria de San Juan y cómo llegar desde Sevilla, Jerez o Cádiz. Tu guía local completa.',
  ogImage: '/og-image.jpg',
  canonicalPath: '/guia-conil',
};

// ── Hero ────────────────────────────────────────────────────────────────────

export const guiaHero = {
  sectionLabel: 'Guía local',
  headline: 'Todo lo que necesitas\nsaber sobre Conil',
  lead: 'Playas de bandera azul, atún de almadraba, fiestas populares y un casco antiguo de cal y azul. Esta es la guía que preparamos para nuestros huéspedes.',
};

// ── Playas ──────────────────────────────────────────────────────────────────

export const guiaPlayas = {
  sectionLabel: 'Playas',
  headline: 'Las mejores playas de Conil',
  intro:
    'Conil tiene más de 14 km de costa con playas vírgenes, calas escondidas y paseos marítimos. Aquí tienes las más cercanas al apartamento y las más especiales para cada momento.',
  items: [
    {
      name: 'Playa de los Bateles',
      distance: '8 min a pie',
      distanceM: '600 m',
      tags: ['Bandera Azul', 'Animada', 'Paseo marítimo'],
      description:
        'La más céntrica y concurrida, justo bajo el casco antiguo. Tiene paseo marítimo, duchas, socorristas en temporada alta y varios chiringuitos. Perfecta para el primer día cuando aún no quieres alejarte.',
      bestFor: 'Ambiente, chiringuitos, comodidad',
      image: '[IMAGEN PLACEHOLDER — Playa de los Bateles, Conil]',
      mapHref:
        'https://maps.google.com/?q=Playa+de+los+Bateles+Conil+de+la+Frontera',
    },
    {
      name: 'Playa de la Fontanilla',
      distance: '12 min a pie',
      distanceM: '900 m',
      tags: ['Familiar', 'Aguas calmadas', 'Servicios completos'],
      description:
        'Amplia y de arena fina, con menos oleaje que los Bateles. Muy frecuentada por familias con niños pequeños gracias a sus aguas tranquilas en la zona interior de la ensenada. Cuenta con duchas, chiringuitos y aparcamiento cercano.',
      bestFor: 'Familias con niños, playas largas, atardeceres',
      image: '[IMAGEN PLACEHOLDER — Playa de la Fontanilla, Conil]',
      mapHref:
        'https://maps.google.com/?q=Playa+de+la+Fontanilla+Conil+de+la+Frontera',
    },
    {
      name: 'Playa del Roqueo',
      distance: '25 min a pie',
      distanceM: '1,9 km',
      tags: ['Semisalvaje', 'Acceso fácil', 'Menos masificada'],
      description:
        'Extensa playa al norte del pueblo con bandas de arena blanquísima y menor afluencia que las del centro. Muy apreciada por los conileños para escapar de la masificación veraniega.',
      bestFor: 'Tranquilidad, espacio, escapar del centro',
      image: '[IMAGEN PLACEHOLDER — Playa del Roqueo, Conil]',
      mapHref: 'https://maps.google.com/?q=Playa+del+Roqueo+Conil',
    },
    {
      name: 'Cala del Aceite',
      distance: '35 min a pie / 8 min en coche',
      distanceM: '2,6 km',
      tags: ['Cala pequeña', 'Agua cristalina', 'Salvaje'],
      description:
        'Una de las joyas de Conil: pequeña cala de arena dorada rodeada de roca caliza. Acceso por camino de tierra desde la carretera de El Palmar. Merece el desplazamiento por la calidad de su agua.',
      bestFor: 'Snorkel, fotos, escapadas románticas',
      image: '[IMAGEN PLACEHOLDER — Cala del Aceite, Conil]',
      mapHref: 'https://maps.google.com/?q=Cala+del+Aceite+Conil',
    },
    {
      name: 'Playa de El Palmar',
      distance: '15 min en coche (10 km)',
      distanceM: '10 km',
      tags: ['Surf', 'Desierta fuera de temporada', 'Parque Natural'],
      description:
        'Playa de grandes olas dentro del Parque Natural de la Breña y Marismas del Barbate. Muy popular entre surfistas. En temporada baja queda casi desierta y el paisaje es espectacular.',
      bestFor: 'Surf, naturaleza, fotografía de paisaje',
      image: '[IMAGEN PLACEHOLDER — Playa de El Palmar]',
      mapHref: 'https://maps.google.com/?q=Playa+de+El+Palmar+Vejer',
    },
  ],
  tip: '¿Buscas la mejor playa de Conil para niños? La Fontanilla es la elección más segura: aguas calmas, arena amplia y todos los servicios.',
};

// ── Restaurantes ────────────────────────────────────────────────────────────

export const guiaRestaurantes = {
  sectionLabel: 'Dónde comer',
  headline: 'Restaurantes y bares a pie',
  intro:
    'Conil vive de la pesca. El atún rojo de almadraba (temporada mayo-junio) y el pescaíto frito son las referencias. Aquí van los sitios que no puedes perderte, todos a menos de 10 minutos del apartamento.',
  items: [
    {
      name: 'Bar Restaurante El Pasaje',
      distance: '4 min a pie',
      distanceM: '300 m',
      tipo: 'Bar de tapas · pescaíto',
      specialty: 'Tortillitas de camarones, boquerones fritos',
      priceRange: '€',
      description:
        'Un clásico del centro de Conil. Barra animada, raciones generosas y precio honesto. El sitio perfecto para un aperitivo antes de ir a la playa.',
      mustTry: 'Tortillitas de camarones',
      image: '[IMAGEN PLACEHOLDER — Bar El Pasaje, Conil]',
      mapHref: 'https://maps.google.com/?q=Bar+El+Pasaje+Conil+de+la+Frontera',
    },
    {
      name: 'Restaurante El Roqueo',
      distance: '20 min a pie',
      distanceM: '1,5 km',
      tipo: 'Restaurante de pescado',
      specialty: 'Atún de almadraba, urta a la roteña',
      priceRange: '€€',
      description:
        'Referencia en Conil para el atún rojo de almadraba. Con vistas al mar y una carta que cambia con la temporada. Reservar con antelación en verano.',
      mustTry: 'Morrillo de atún a la plancha (temporada mayo-junio)',
      image: '[IMAGEN PLACEHOLDER — Restaurante El Roqueo, Conil]',
      mapHref: 'https://maps.google.com/?q=Restaurante+El+Roqueo+Conil',
    },
    {
      name: 'Taberna El Arco',
      distance: '5 min a pie',
      distanceM: '350 m',
      tipo: 'Taberna · tapas',
      specialty: 'Tapas de temporada, vinos de la tierra',
      priceRange: '€',
      description:
        'Escondida en una callejuela del casco antiguo, con ambiente local y tapas que cambian según el mercado. Un lugar auténtico sin trampa para el turista.',
      mustTry: 'Tapa del día con vino de Chiclana',
      image: '[IMAGEN PLACEHOLDER — Taberna El Arco, Conil]',
      mapHref: 'https://maps.google.com/?q=Taberna+El+Arco+Conil',
    },
    {
      name: 'Restaurante Francisco Fontanilla',
      distance: '12 min a pie',
      distanceM: '900 m',
      tipo: 'Restaurante de playa',
      specialty: 'Parrillada de pescado, gambas al ajillo',
      priceRange: '€€',
      description:
        'Junto a la Playa de la Fontanilla. Muy frecuentado por familias, con carta extensa de pescados y mariscos frescos. Las parrilladas de la casa son un fijo en la zona.',
      mustTry: 'Parrillada de pescados frescos del día',
      image: '[IMAGEN PLACEHOLDER — Restaurante Fontanilla, Conil]',
      mapHref: 'https://maps.google.com/?q=Restaurante+Francisco+Fontanilla+Conil',
    },
    {
      name: 'Heladería Conil Centro',
      distance: '4 min a pie',
      distanceM: '250 m',
      tipo: 'Heladería · cafetería',
      specialty: 'Helados artesanos',
      priceRange: '€',
      description:
        'Helados artesanos con sabores locales (naranja amarga, chirimoya, higo chumbo). El punto de encuentro del pueblo en las tardes de verano.',
      mustTry: 'Helado de naranja amarga o piñonate',
      image: '[IMAGEN PLACEHOLDER — Heladería centro Conil]',
      mapHref: 'https://maps.google.com/?q=Heladería+Conil+centro',
    },
  ],
  tip: 'El Mercado de Abastos (justo frente al apartamento) abre cada mañana de lunes a sábado. La mejor opción para comprar pescado, fruta y verdura frescos.',
};

// ── Casco histórico y visitas ────────────────────────────────────────────────

export const guiaVisitas = {
  sectionLabel: 'Qué ver',
  headline: 'Conil más allá de la playa',
  intro:
    'El casco antiguo de Conil es uno de los más auténticos de la Costa de la Luz. Sin grandes monumentos pero con mucho carácter: casas encaladas, puertas de madera, callecitas estrechas y un ritmo de vida que contagia.',
  items: [
    {
      name: 'Torre de Guzmán',
      tipo: 'Monumento · mirador',
      distance: '6 min a pie',
      description:
        'Torre almohade del siglo XIV, símbolo de Conil. Desde arriba tienes una vista de 360° sobre el pueblo, las playas y el Atlántico. Abre en horario reducido — consulta en el Ayuntamiento o en la web de turismo de Conil.',
      image: '[IMAGEN PLACEHOLDER — Torre de Guzmán, Conil]',
      mapHref: 'https://maps.google.com/?q=Torre+de+Guzmán+Conil+de+la+Frontera',
    },
    {
      name: 'Casco antiguo (callejeo)',
      tipo: 'Barrio histórico',
      distance: '3 min a pie',
      description:
        'Empieza en la Puerta de la Villa y piérdete sin rumbo. Las casas encaladas de azul y blanco, los geranios en los balcones y las plazuelas con sombra son el plan en sí. La calle Cádiz y la plaza de Santa Catalina son los puntos de referencia.',
      image: '[IMAGEN PLACEHOLDER — Casco antiguo Conil]',
      mapHref: 'https://maps.google.com/?q=Casco+Antiguo+Conil+de+la+Frontera',
    },
    {
      name: 'Arco de la Villa (Puerta de la Villa)',
      tipo: 'Monumento',
      distance: '5 min a pie',
      description:
        'Entrada histórica al recinto amurallado del siglo XV. Punto de partida ideal para el paseo por el casco antiguo y buena foto obligada.',
      image: '[IMAGEN PLACEHOLDER — Arco de la Villa, Conil]',
      mapHref: 'https://maps.google.com/?q=Arco+de+la+Villa+Conil',
    },
    {
      name: 'Museo del Atún (Chanca)',
      tipo: 'Museo · cultura local',
      distance: '10 min a pie',
      description:
        'En el antiguo edificio de la Chanca (donde se procesaba el atún). Explica la historia de la almadraba en Conil desde época fenicia. Una hora bien invertida para entender el alma del pueblo.',
      image: '[IMAGEN PLACEHOLDER — Museo del Atún, Conil]',
      mapHref: 'https://maps.google.com/?q=Museo+del+Atún+Conil',
    },
    {
      name: 'Parque Natural de la Breña',
      tipo: 'Naturaleza · senderismo',
      distance: '15 min en coche',
      description:
        'Acantilados de hasta 30 m sobre el Atlántico, bosque de pinos piñoneros y la playa de El Palmar. La ruta de los acantilados (4,5 km ida y vuelta) es uno de los mejores paseos de la Costa de la Luz.',
      image: '[IMAGEN PLACEHOLDER — Parque Natural de la Breña]',
      mapHref: 'https://maps.google.com/?q=Parque+Natural+Breña+Barbate',
    },
  ],
};

// ── Eventos ──────────────────────────────────────────────────────────────────

export const guiaEventos = {
  sectionLabel: 'Fiestas y eventos',
  headline: 'El calendario de Conil',
  intro:
    'Conil tiene un verano cargado de fiestas populares, conciertos en la playa y festivales gastronómicos. Si puedes, organiza tu visita en torno a alguno de estos eventos.',
  items: [
    {
      name: 'Ronqueo del Atún (Feria del Atún)',
      months: 'Mayo – Junio',
      tipo: 'Gastronomía · cultura',
      description:
        'El ronqueo es el despiece tradicional del atún rojo de almadraba. En temporada (mayo-junio) varios restaurantes y el propio Ayuntamiento organizan demostraciones públicas, degustaciones y una feria gastronómica. Es el momento del año para probar el mejor atún del mundo.',
      highlight: true,
      image: '[IMAGEN PLACEHOLDER — Ronqueo del Atún, Conil]',
    },
    {
      name: 'Feria de San Juan',
      months: 'Junio (en torno al 24 de junio)',
      tipo: 'Feria popular',
      description:
        'La feria de verano de Conil: casetas, música, caballitos y ambiente hasta el amanecer. Se celebra en el Recinto Ferial, a unos 20 minutos a pie del apartamento. La noche de San Juan (23-24 de junio) es especialmente festiva, con hogueras en la playa.',
      highlight: true,
      image: '[IMAGEN PLACEHOLDER — Feria de San Juan, Conil]',
    },
    {
      name: 'Semana Santa',
      months: 'Marzo – Abril (variable)',
      tipo: 'Procesiones · tradición',
      description:
        'La Semana Santa de Conil es recogida y emotiva, con procesiones por el casco antiguo. El Jueves y Viernes Santo son los días de mayor participación local.',
      highlight: false,
      image: '[IMAGEN PLACEHOLDER — Semana Santa, Conil]',
    },
    {
      name: 'Velada de la Fontanilla',
      months: 'Julio – Agosto',
      tipo: 'Música · playa',
      description:
        'Conciertos nocturnos en el paseo de la Fontanilla durante los meses de verano. Entrada gratuita y ambiente para todas las edades. Consulta la programación en el Ayuntamiento de Conil.',
      highlight: false,
      image: '[IMAGEN PLACEHOLDER — Velada Fontanilla, Conil]',
    },
    {
      name: 'Noche en Blanco',
      months: 'Agosto',
      tipo: 'Arte · cultura urbana',
      description:
        'Una noche de arte, música y actividades en el casco antiguo. Galerías abiertas, performances callejeras e instalaciones de luz. Uno de los eventos culturales más esperados del verano.',
      highlight: false,
      image: '[IMAGEN PLACEHOLDER — Noche en Blanco, Conil]',
    },
    {
      name: 'Festival de Jazz Conil',
      months: 'Agosto',
      tipo: 'Música',
      description:
        'Ciclo de conciertos de jazz en el castillo y en el casco antiguo. Programación variada con artistas nacionales e internacionales. Suele ser gratuito o con entrada simbólica.',
      highlight: false,
      image: '[IMAGEN PLACEHOLDER — Festival Jazz, Conil]',
    },
  ],
};

// ── Cómo llegar ──────────────────────────────────────────────────────────────

export const guiaComoLlegar = {
  sectionLabel: 'Cómo llegar',
  headline: 'Llegar a Conil',
  intro:
    'Conil de la Frontera está bien comunicado aunque no tiene estación de tren. La opción más cómoda para la mayoría es el coche, pero el autobús cubre bien las rutas desde las capitales más cercanas.',
  items: [
    {
      desde: 'Jerez de la Frontera (aeropuerto XRY)',
      via: 'Coche / autobús',
      distancia: '55 km',
      tiempo: '50 min en coche',
      icon: 'plane',
      description:
        'El aeropuerto más cercano a Conil. En coche toma la A-4 dirección Cádiz y luego la CA-3203. En autobús, conecta con Cádiz (Comes/Transportes Generales) y desde allí hay buses directos a Conil.',
      tip: 'Jerez XRY tiene vuelos directos desde Madrid, Barcelona, Bilbao y destinos europeos (Ryanair, Vueling). Si viene con equipaje, el coche de alquiler es la opción más cómoda.',
    },
    {
      desde: 'Sevilla',
      via: 'Coche / autobús',
      distancia: '120 km',
      tiempo: '1 h 30 min en coche',
      icon: 'car',
      description:
        'En coche: A-4 hasta Puerto de Santa María, luego A-48 hacia Vejer y desvío a Conil. En autobús: Comes opera líneas directas Sevilla-Conil. Tiempo aproximado 2 h.',
      tip: 'Los domingos y festivos los horarios de autobús son más limitados. Consulta en la web de Comes antes de viajar.',
    },
    {
      desde: 'Cádiz',
      via: 'Coche / autobús',
      distancia: '45 km',
      tiempo: '40 min en coche',
      icon: 'car',
      description:
        'En coche: A-48 dirección Vejer, salida Conil. En autobús: línea regular Cádiz–Conil con la empresa Comes (varias expediciones al día). Tiempo aproximado 55 min.',
      tip: 'Desde Cádiz hay también catamaran hacia El Puerto de Santa María si quieres combinar visitas.',
    },
    {
      desde: 'Málaga',
      via: 'Coche',
      distancia: '195 km',
      tiempo: '2 h en coche',
      icon: 'car',
      description:
        'Por la A-7 hasta Algeciras y luego la A-381 hacia Jerez con salida a Conil por la A-48. Alternativa más rápida: A-45 / A-92 hasta Sevilla y luego A-4.',
      tip: 'No hay autobús directo Málaga-Conil. Si no dispones de coche, el tren AVE Málaga-Sevilla más autobús Sevilla-Conil es la combinación más práctica.',
    },
    {
      desde: 'Madrid',
      via: 'Avión + coche / tren + autobús',
      distancia: '650 km',
      tiempo: '1 h 15 min en avión a Jerez o Sevilla',
      icon: 'plane',
      description:
        'La opción más rápida es volar a Jerez XRY (vuelos directos con Ryanair/Iberia) y alquilar coche. También puedes volar a Sevilla o coger el AVE Madrid-Sevilla (2 h 45 min) y luego autobús Sevilla-Conil.',
      tip: 'El coche de alquiler en Jerez suele ser lo más barato y flexible para moverse por la Costa de la Luz.',
    },
  ],
  aparcamiento: {
    headline: 'Aparcar en Conil',
    text: 'El centro de Conil en temporada alta es un reto. El Recinto Ferial (20 min a pie del apartamento) es gratuito y tiene mucha capacidad. Justo frente al apartamento hay una zona de estacionamiento municipal en el Mercado de Abastos.',
  },
};

// ── Consejos generales ───────────────────────────────────────────────────────

export const guiaConsejos = {
  sectionLabel: 'Consejos prácticos',
  headline: 'Antes de llegar',
  items: [
    {
      icon: 'calendar',
      title: 'Mejor época para visitar',
      text: 'Junio y septiembre son los meses de oro: calor sin aglomeración, agua del mar ya templada y terrazas con espacio. Julio y agosto son los más animados (y llenos). Mayo es ideal si quieres atún de almadraba.',
    },
    {
      icon: 'thermometer',
      title: 'El viento de Levante',
      text: 'En verano el Levante puede soplar con fuerza varios días seguidos, haciendo difícil estar en la playa. No te preocupes: cuando remite, el ambiente es perfecto. Sigue la previsión en tiempo.es o Windguru para Conil.',
    },
    {
      icon: 'shopping-bag',
      title: 'Mercado de Abastos',
      text: 'Justo frente al apartamento. Abre de lunes a sábado por las mañanas. Pescado fresquísimo del día, fruta y verdura local. La experiencia más auténtica de Conil.',
    },
    {
      icon: 'credit-card',
      title: 'Pago en locales pequeños',
      text: 'Algunos bares y tiendas del casco antiguo funcionan solo en efectivo. Lleva algo de efectivo para no encontrarte sorpresas.',
    },
    {
      icon: 'sun',
      title: 'Protección solar',
      text: 'La costa atlántica tiene una radiación solar muy alta. Factor 50 en la cara y hombros todo el verano, especialmente en las horas centrales del día.',
    },
  ],
};

// ── CTA hacia el apartamento ─────────────────────────────────────────────────

export const guiaCTA = {
  headline: '¿Te quedas en Conil?',
  lead: 'Brisa de Conil está a minutos de todo lo que has leído. Calle Rosa de los Vientos, frente al Mercado de Abastos.',
  cta: 'Ver el apartamento',
  ctaHref: '/',
};
