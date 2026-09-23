/* =============================================================================
 *  CONFIGURACIÓN DE LA BODA
 * =============================================================================
 *  Este es el ÚNICO archivo que hay que tocar para adaptar la invitación a una
 *  boda nueva: nombres, fechas, lugares, textos, imágenes, contactos y datos
 *  bancarios.
 *
 *  Los COLORES se editan en `app/globals.css` (bloque `@theme`).
 *
 *  ⚠️ IMPORTANTE: `clientId` es la clave que enlaza esta invitación con los
 *  registros de Supabase (tablas `rsvps` y `songs`). Debe ser único por boda y
 *  coincidir con el `client_id` dado de alta en la base de datos.
 * ---------------------------------------------------------------------------*/

export const wedding = {
  /** Identificador de la pareja en Supabase (client_id). Único por boda. */
  clientId: 'jules-and-pabs',

  // ---------------------------------------------------------------------------
  // LA PAREJA
  // ---------------------------------------------------------------------------
  couple: {
    /** Iniciales del logo en la barra de navegación. */
    initials: 'J&P',
    /** Nombre corto, usado en títulos y metadatos. */
    shortNames: 'Julieta & Pablo',
    /** Nombre corto en formato "X y Z" (sobre, footer, alts de fotos). */
    joinedNames: 'Julieta y Pablo',

    partnerA: {
      firstName: 'Julieta',
      lastName: 'Bertorello Sartori',
      /** Teléfono con prefijo internacional y sin signos (para wa.me). */
      phone: '34660104026',
      whatsappLabel: 'WhatsApp Julieta',
      whatsappMessage: '¡Hola Julieta! Tengo una duda sobre la boda...',
    },
    partnerB: {
      firstName: 'Pablo',
      lastName: 'Tejero Mancho',
      phone: '34660104026',
      whatsappLabel: 'WhatsApp Pablo',
      whatsappMessage: '¡Hola Pablo! Tengo una duda sobre la boda...',
    },
  },

  // ---------------------------------------------------------------------------
  // FECHA Y LUGAR
  // ---------------------------------------------------------------------------
  date: {
    /** Fecha y hora exactas con zona horaria. Alimenta la cuenta atrás. */
    iso: '2026-10-24T16:45:00+02:00',
    /** Partes sueltas que se muestran en el bloque grande de la portada. */
    day: '24',
    monthName: 'Octubre',
    year: '2026',
    weekdayAndTime: 'Sábado • 16:45 H',
    /** Formatos de texto usados en metadatos y footer. */
    short: '24.10.2026',
    long: '24 de Octubre de 2026',
    city: 'Madrid',
  },

  // ---------------------------------------------------------------------------
  // METADATOS / COMPARTIR (Open Graph)
  // ---------------------------------------------------------------------------
  seo: {
    title: 'Julieta & Pablo · 24.10.2026',
    description:
      '¡Nos casamos! El 24 de octubre celebramos el día más importante de nuestra vida y nos encantaría que nos acompañes.',
    ogImage: '/invitacion/tarjeta-invitacion.webp',
    ogImageAlt: 'Julieta & Pablo · Boda 24 de Octubre de 2026',
    locale: 'es_ES',
  },

  // ---------------------------------------------------------------------------
  // INTRO DEL SOBRE (pantalla de apertura)
  // ---------------------------------------------------------------------------
  envelope: {
    preTitle: 'Tienes una carta',
    preSubtitle: 'de Julieta y Pablo',
    preButton: 'Abrir',
    cardIntro: 'Estás invitado/a a la boda de',
    cardNames: 'Julieta y Pablo',
    cardButton: 'Ver Invitación',

    /** Ajustes de la animación de apertura. */
    animation: {
      /**
       * Multiplica todas las duraciones: 1 = normal, 0.5 = el doble de rápido.
       * Quien tenga activado "reducir movimiento" ve el estado final al
       * instante, sin animación, independientemente de este valor.
       */
      timeScale: 1,
      /**
       * Paso final de escritorio: el sobre se aparta a la izquierda y la
       * tarjeta se centra. Desactivado por defecto porque en esta invitación
       * la tarjeta lleva el botón y queda mejor centrada sobre el sobre.
       */
      finalComposition: false,
      /** Mensajes que se anuncian por lector de pantalla en cada paso. */
      announcements: {
        flipping: 'El sobre gira para mostrar el dorso',
        flapOpening: 'Se abre la solapa del sobre',
        cardOut: 'Sale la tarjeta de la invitación',
        done: 'Invitación abierta',
      },
    },
  },

  // ---------------------------------------------------------------------------
  // PORTADA
  // ---------------------------------------------------------------------------
  hero: {
    /** Párrafos introductorios, en orden. Añade o quita los que quieras. */
    intro: [
      'Hay encuentros que cambian una vida entera…',
      'El nuestro nos ha llevado a compartir sueños, afrontar nuevos retos, descubrir lugares inesperados y construir un proyecto común lleno de alegría e ilusión.',
      'Ahora, con la certeza de querer recorrer juntos todo lo que está por venir, queremos anunciar que...',
    ],
    announcement: '¡Nos casamos!',
    subtitle: 'Y nos encantaría disfrutar contigo el día más importante de nuestra vida',
    /** Texto bajo los nombres, antes de la fecha. */
    closing:
      'queremos celebrar este "Sí" rodeados de quienes habéis formado parte de nuestra historia desde el principio',
  },

  // ---------------------------------------------------------------------------
  // UBICACIONES
  // ---------------------------------------------------------------------------
  locations: {
    eyebrow: 'Ubicaciones',
    title: 'Dónde y Cuándo',
    ceremony: {
      eyebrow: 'La Ceremonia',
      name: 'Basílica de San Francisco el Grande',
      address: 'Calle San Buenaventura 1, 28005 Madrid',
      time: '16:45 H',
      /** Acuarela de la basílica. Cadena vacía para ir sin ilustración. */
      image: '/invitacion/acuarela-ceremonia.webp',
      mapsUrl: 'https://maps.google.com/?q=Basilica+de+San+Francisco+el+Grande+Madrid',
      ctaLabel: 'Ver ubicación',
    },
    reception: {
      eyebrow: 'La Celebración',
      name: 'Castillo de Viñuelas',
      address: 'Monte de Viñuelas, 28760 Tres Cantos, Madrid',
      time: 'A partir de las 19:00 H',
      /** Acuarela del castillo. Cadena vacía para ir sin ilustración. */
      image: '/invitacion/acuarela-celebracion.webp',
      mapsUrl: 'https://maps.google.com/?q=Castillo+de+Vinuelas+Madrid',
      ctaLabel: 'Ver ubicación',
    },
  },

  // ---------------------------------------------------------------------------
  // CUENTA ATRÁS Y FOTOS
  // ---------------------------------------------------------------------------
  countdown: {
    title: '¡Empieza la cuenta atrás!',
    labels: {
      days: 'Días',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos',
    },
  },

  /**
   * Collage de la portada. Admite hasta 6 fotos, en este orden:
   * [0] polaroid sup. izq · [1] foto central grande · [2] polaroid sup. dcha
   * [3] polaroid inf. izq · [4] polaroid inf. centro · [5] polaroid inf. dcha
   * Con menos de 6, los huecos sobrantes sencillamente no se dibujan.
   */
  photos: [
    '/invitacion/foto-1.webp',
    '/invitacion/foto-2.webp',
    '/invitacion/foto-3.webp',
    '/invitacion/foto-4.webp',
    '/invitacion/foto-5.webp',
  ],

  // ---------------------------------------------------------------------------
  // ITINERARIO
  // ---------------------------------------------------------------------------
  itinerary: {
    eyebrow: 'Plan del Día',
    title: 'Itinerario',
    subtitle: 'Hemos preparado todo para un día inolvidable',
    /** Se alternan izquierda/derecha automáticamente según el orden. */
    events: [
      {
        time: '16:45 H',
        title: 'La Ceremonia',
        image: '',
      },
      {
        time: '19:00 H',
        title: 'El Cóctel',
        image: '',
      },
      {
        time: '21:30 H',
        title: 'La Cena',
        image: '',
      },
      {
        time: '23:00 H',
        title: 'El Baile & Fiesta',
        image: '',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÚSICA
  // ---------------------------------------------------------------------------
  music: {
    /** Pon `false` para ocultar toda la sección de sugerencias musicales. */
    enabled: true,
    title: 'Ayúdanos con la música',
    description:
      '¿Qué canciones te gustaría que sonaran en la fiesta? Compártelas con nosotros y las añadiremos a la playlist para darlo todo en la pista 💃',
    ctaLabel: 'Sugerir Canciones',
    image: '',
    /**
     * `true` arranca la canción de fondo en cuanto el invitado toca la pantalla.
     * `false` (por defecto) la deja en silencio hasta que pulse el altavoz.
     */
    autoplay: false,
    /** Canción de fondo de la invitación. */
    backgroundAudio:
      'https://res.cloudinary.com/scihumn2/video/upload/Can_t_Take_My_Eyes_off_You_hnormu.mp3',
    modal: {
      title: 'Sugerir Canción',
      subtitle: 'Queremos que la pista de baile no pare de sonar',
      songPlaceholder: 'Ej. La Camisa Negra',
      artistPlaceholder: 'Ej. Juanes',
      submitLabel: 'Añadir a la lista',
    },
  },

  // ---------------------------------------------------------------------------
  // LUNA DE MIEL / REGALO
  // ---------------------------------------------------------------------------
  gift: {
    /** Pon `false` para ocultar la sección del regalo. */
    enabled: true,
    eyebrow: 'Luna de Miel · Regalo',
    title: 'Nuestra próxima aventura',
    description:
      'Emprendemos juntos el viaje más importante de nuestras vidas, que continuará con una luna de miel soñada entre Tanzania y las Seychelles.',
    invitation:
      'Si deseáis acompañarnos de una forma especial en esta experiencia inolvidable, podéis hacerlo rellenando vuestro granito de arena aquí:',
    image: '',
    imageAlt: 'Tanzania y Seychelles',
    ctaHint: '¿Quieres hacernos un regalo? Haz click aquí:',
    ctaLabel: 'Ver datos regalo',
    modal: {
      title: 'Luna de Miel · Regalo',
      description:
        'Tu presencia es nuestro mayor regalo. Sin embargo, si deseas acompañarnos de una forma diferente y ayudarnos a construir momentos mágicos en Tanzania y las Seychelles, ponemos a tu disposición nuestra cuenta bancaria:',
      /**
       * ⚠️ DE EJEMPLO. Es el IBAN que se usa como muestra en la documentación
       * bancaria, no una cuenta real: hay que sustituirlo antes de publicar.
       */
      iban: 'ES91 2100 0418 4502 0005 1332',
      swift: 'CAIXESBBXXX',
      holders: 'Julieta B. S. y Pablo T. M.',
      thanks: '¡Muchísimas gracias por formar parte de este sueño! ❤️',
    },
  },

  // ---------------------------------------------------------------------------
  // CONFIRMACIÓN DE ASISTENCIA (RSVP)
  // ---------------------------------------------------------------------------
  rsvp: {
    title: 'Confirma tu asistencia',
    /** Ilustración sobre el título. Cadena vacía para no mostrar ninguna. */
    image: '/invitacion/flor-ceremonia.webp',
    /** Fecha límite mostrada en el formulario y en la introducción. */
    deadline: '26 de septiembre',
    bus: {
      /** Pon `false` si no hay servicio de autobuses (oculta los campos). */
      enabled: true,
      idaHint: 'Salida: Basílica de San Francisco el Grande (18:15h) → Castillo de Viñuelas',
      vueltaHint: 'Salida: Castillo de Viñuelas → Madrid (varios horarios)',
    },
  },

  // ---------------------------------------------------------------------------
  // DATOS DE INTERÉS
  // ---------------------------------------------------------------------------
  info: {
    eyebrow: 'Información',
    title: 'Datos de Interés',
    /** Ilustración sobre el título. Cadena vacía para no mostrar ninguna. */
    image: '/invitacion/flor-celebracion.webp',
    /** Tarjetas informativas. Añade o quita las que necesites. */
    cards: [
      {
        title: 'Recomendación de Hoteles',
        body: 'Respecto a los hoteles, os recomendamos reservar por la zona de la ceremonia, ya que los autobuses de vuelta tendrán ahí una de las paradas principales de regreso.',
        bullets: [] as string[],
      },
      {
        title: 'Servicio de Autobuses',
        body: 'Dispondremos de autobuses para los traslados del evento:',
        bullets: [
          '• Ida: Basílica de San Francisco el Grande (18:15h) → Castillo de Viñuelas',
          '• Vuelta: Castillo de Viñuelas → Madrid (varios horarios)',
        ],
      },
      {
        title: 'Celebración de Adultos',
        body: 'Aunque adoramos y apreciamos con todo el alma a los más pequeños, por temas organizativos del espacio y dinámica, esta será una celebración reservada solo para mayores de 18 años.',
        bullets: [] as string[],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // DUDAS / CONTACTO
  // ---------------------------------------------------------------------------
  contact: {
    title: '¿Dudas?',
    /** Ilustración sobre el título. Cadena vacía para no mostrar ninguna. */
    image: '/invitacion/flor-musica.webp',
    description:
      'Si tenéis alguna duda, pregunta o necesitáis consultarnos algo, no dudéis en llamarnos o escribirnos por WhatsApp:',
  },

  // ---------------------------------------------------------------------------
  // PIE DE PÁGINA
  // ---------------------------------------------------------------------------
  footer: {
    headline: '¡Te esperamos!',
    /** Segunda línea: por defecto los nombres de la pareja. */
    credit: {
      label: 'Jules',
      url: 'https://wa.me/34660104026',
    },
  },

  // ---------------------------------------------------------------------------
  // NAVEGACIÓN
  // ---------------------------------------------------------------------------
  nav: {
    ctaLabel: 'Confirma tu asistencia',
    /** `mobileOnly: true` → el enlace solo aparece en el menú desplegable. */
    links: [
      { id: 'lugar', label: 'Lugar' },
      { id: 'itinerario', label: 'Itinerario' },
      { id: 'musica', label: 'Música', mobileOnly: true },
      { id: 'viaje', label: 'Viaje · Regalo' },
      { id: 'informacion', label: 'Información' },
    ] as { id: string; label: string; mobileOnly?: boolean }[],
  },
};

/* =============================================================================
 *  IMÁGENES DE FONDO
 * =============================================================================
 *  Separadas del contenido porque cambian con el diseño, no con la boda.
 * ---------------------------------------------------------------------------*/
export const backgrounds = {
  /**
   * Hoja de papel del fondo. Se pinta una sola vez, fija detrás de todo el
   * documento y a resolución completa: las secciones no llevan fondo propio.
   */
  paper: '/invitacion/textura-papel-clara.webp',

  /**
   * Cenefas florales de la invitación impresa, en PNG con transparencia.
   * Se repiten verticalmente a ambos lados de la página (ocultas en móvil).
   */
  flowers: {
    left: '/invitacion/flores-izquierda.webp',
    right: '/invitacion/flores-derecha.webp',
    /** Ancho de cada cenefa y opacidad, para ajustarlas sin tocar el código. */
    width: '16vw',
    maxWidth: '230px',
    opacity: 0.85,
  },

  /**
   * Imágenes de la animación del sobre. Las proporciones importan: cada capa
   * se dimensiona a partir de ellas, así que si cambias una imagen ajusta
   * también su ratio en `envelopeLayers`.
   */
  envelope: {
    /** Frente del sobre, con la estampilla. */
    front: '/invitacion/sobre-frontal-limpio.webp',
    /** Dorso cerrado: el bolsillo con la solapa encima, como se ve de verdad. */
    back: '/invitacion/sobre-dorso-cerrado.png',
    /** Bolsillo con el escote en V: va por delante de la tarjeta. */
    pocket: '/invitacion/sobre-abierto.png',
    /**
     * Solapa cerrada, cara exterior, con el lacre en la punta. Es más larga que
     * el escote del bolsillo: la punta cae sobre el cuerpo del sobre.
     * Gira de 0° a 90° y se oculta.
     */
    flapClosed: '/invitacion/sobre-solapa-limpia.webp',
    /**
     * Solapa abierta: la cara INTERIOR, con el forro y el lacre asomando por
     * la punta. Viene ya volteada, porque al abrirse la solapa da la vuelta
     * sobre su bisagra y la punta queda arriba. Aparece a 89° y baja a 0°.
     * Sin voltear está en solapa-interior.webp.
     */
    flapOpen: '/invitacion/solapa-abierta.png',
    /** Sombra que proyecta la solapa al abrirse. */
    flapShadow: '/invitacion/sombra-solapa.png',
    /** Textura del papel de la tarjeta que sale del sobre. */
    cardBg: '/invitacion/textura-papel-clara.webp',
  },

  /** Relación alto/ancho de cada capa, medida sobre las imágenes. */
  envelopeLayers: {
    envelope: 840 / 600,
    flapClosed: 549 / 840,
    flapOpen: 549 / 840,
  },
} as const;

/* =============================================================================
 *  HELPERS
 * ---------------------------------------------------------------------------*/

/** Construye el enlace de WhatsApp de uno de los novios. */
export function whatsappUrl(partner: { phone: string; whatsappMessage: string }) {
  return `https://wa.me/${partner.phone}?text=${encodeURIComponent(partner.whatsappMessage)}`;
}

export default wedding;
