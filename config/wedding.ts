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
    /**
     * Corazón dibujado de la papelería. Se pone entre los nombres y en el
     * monograma de la cabecera. Cadena vacía para volver al "&".
     */
    heart: '/invitacion/corazon.webp',
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
      'Dicen que no existen las casualidades. Nosotros preferimos llamarlo destino.',
      'Una argentina que vino a Madrid de intercambio y un español que aquella noche decidió salir. Parecía una noche cualquiera, hasta que dejó de serlo.',
      'Desde entonces, todo ha sido un conjunto de decisiones, las grandes y las pequeñas, que nos han traído hasta aquí. Y ahora, con ganas de formar juntos una familia, queremos anunciar que...',
    ],
    /**
     * Ilustraciones que acompañan a la introducción: aquí, las banderas de
     * Argentina y España. `after` es el párrafo tras el que se dibujan,
     * empezando en 1. Lista vacía para no poner ninguna.
     */
    flags: {
      after: 2,
      images: [
        { src: '/invitacion/bandera-argentina.webp', alt: 'Argentina' },
        { src: '/invitacion/bandera-espana.webp', alt: 'España' },
      ],
    },
    announcement: '¡Nos casamos!',
    subtitle: 'Y nos encantaría disfrutar contigo el día más importante de nuestra vida',
    /**
     * Fórmula que acompaña a los nombres, como en la invitación impresa.
     * Cadena vacía para no ponerla.
     */
    families: 'Junto a sus familias',
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
    /** Texto sobre los números. Cadena vacía para no poner ninguno. */
    lead: 'La cuenta atrás ya ha comenzado',
    /** `true` dibuja el relojito de agujas sobre el marco. */
    clock: true,
    /** Rótulo bajo cada número. */
    labels: {
      days: 'Días',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos',
    },
    /** Qué poner el mismo día de la boda y a partir de entonces. */
    today: '¡Hoy nos casamos!',
    past: 'Nos casamos',
  },

  /** Galería: el carrete de fotos que desfila bajo la cuenta atrás. */
  gallery: {
    title: 'Nuestro carrete',
    /** Ilustración sobre el carrete. Cadena vacía para no poner ninguna. */
    image: '/invitacion/icono-camara.webp',
    /** Segundos que tarda el carrete en dar una vuelta completa. */
    speed: 45,
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
    '/invitacion/foto-4.webp',
    '/invitacion/foto-3.webp',
    '/invitacion/foto-5.webp',
    '/invitacion/foto-6.webp',
    '/invitacion/foto-7.webp',
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
        image: '/invitacion/icono-ceremonia.webp',
      },
      {
        time: '19:00 H',
        title: 'El Cóctel',
        image: '/invitacion/icono-coctel.webp',
      },
      {
        time: '21:30 H',
        title: 'La Cena',
        image: '/invitacion/icono-cena.webp',
      },
      {
        time: '23:00 H',
        title: 'La Fiesta',
        image: '/invitacion/icono-fiesta.webp',
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
      'Comparte qué canciones te gustaría escuchar para darlo todo en la pista.',
    ctaLabel: 'Sugerir Canciones',
    image: '/invitacion/icono-musica.webp',
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
    title: 'Nuestro próximo destino',
    description:
      'Del castillo al Serengeti, y del Serengeti a las Seychelles. Es el viaje que llevamos años imaginando y que por fin tiene fecha.',
    invitation:
      'Que estéis ahí ese día ya es el mejor regalo. Si además os apetece ayudarnos a llenar el viaje de recuerdos, aquí os dejamos cómo:',
    /** Láminas de los destinos. Lista vacía para ir sin ilustraciones. */
    images: [
      { src: '/invitacion/luna-tanzania.webp', alt: 'Tanzania' },
      { src: '/invitacion/luna-seychelles.webp', alt: 'Seychelles' },
    ],
    /** Reclamo sobre el botón. Vacío: el propio botón ya lo dice. */
    ctaHint: '',
    ctaLabel: 'Ver datos regalo',
    modal: {
      title: 'Nuestros datos',
      /**
       * ⚠️ DE EJEMPLO. Es el IBAN que se usa como muestra en la documentación
       * bancaria, no una cuenta real: hay que sustituirlo antes de publicar.
       */
      iban: 'ES91 2100 0418 4502 0005 1332',
      swift: 'CAIXESBBXXX',
      holders: 'Julieta B. S. y Pablo T. M.',
      thanks: '¡Gracias por acompañarnos hasta aquí! ❤️',
    },
  },

  // ---------------------------------------------------------------------------
  // CONFIRMACIÓN DE ASISTENCIA (RSVP)
  // ---------------------------------------------------------------------------
  rsvp: {
    title: 'Confirma tu asistencia',
    /** Ilustración sobre el título. Cadena vacía para no mostrar ninguna. */
    image: '',
    /** Fecha límite mostrada en el formulario y en la introducción. */
    deadline: '26 de septiembre',
    bus: {
      /** Pon `false` si no hay servicio de autobuses (oculta los campos). */
      enabled: true,
      idaHint: 'Desde Madrid hasta el Castillo de Viñuelas',
      vueltaHint: 'Del castillo a Madrid, a las 02:00 o a las 04:45',
    },
  },

  // ---------------------------------------------------------------------------
  // DATOS DE INTERÉS
  // ---------------------------------------------------------------------------
  info: {
    eyebrow: 'Información',
    title: 'Datos de Interés',
    /** Ilustración sobre el título. Cadena vacía para no mostrar ninguna. */
    image: '',
    /**
     * Tarjetas informativas. Añade o quita las que necesites.
     * `image` es opcional: se dibuja en blanco sobre el verde de la tarjeta.
     */
    cards: [
      {
        title: 'Servicio de Autobuses',
        image: '/invitacion/icono-buses.webp',
        body: 'Habrá autobuses de vuelta del castillo a Madrid, con dos salidas:',
        bullets: [
          '• 02:00 y 04:45',
          '• Paradas: Santiago Bernabéu y Plaza Colón',
          '• Uber y Bolt también llegan hasta el castillo',
        ],
      },
      {
        title: 'Celebración de Adultos',
        image: '',
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
    image: '',
    description:
      'Si tenéis alguna duda o preguntas no dudéis en escribirnos',
  },

  // ---------------------------------------------------------------------------
  // PIE DE PÁGINA
  // ---------------------------------------------------------------------------
  footer: {
    headline: '¡Te esperamos!',
    /** Ilustración sobre el titular. Cadena vacía para no ponerla. */
    image: '',
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
   * Filigrana de la papelería impresa: la línea con el lazo que separa los
   * bloques de texto. Cadena vacía para volver al filete de 1px.
   */
  divider: '/invitacion/filigrana-superior.webp',

  /**
   * Esquina del marco de garabato de la papelería. Se pinta cuatro veces,
   * girada, en las esquinas de la cuenta atrás.
   */
  frameCorner: '/invitacion/marco-esquina.webp',

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
