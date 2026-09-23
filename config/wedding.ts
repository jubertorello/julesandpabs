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
    initials: 'J & P',
    /** Nombre corto, usado en títulos y metadatos. */
    shortNames: 'Jules & Pabs',
    /** Nombre corto en formato "X y Z" (sobre, footer, alts de fotos). */
    joinedNames: 'Jules y Pabs',

    partnerA: {
      firstName: 'Jules',
      lastName: 'Apellido Apellido',
      /** Teléfono con prefijo internacional y sin signos (para wa.me). */
      phone: '34600000000',
      whatsappLabel: 'WhatsApp Jules',
      whatsappMessage: '¡Hola Jules! Tengo una duda sobre la boda...',
    },
    partnerB: {
      firstName: 'Pabs',
      lastName: 'Apellido Apellido',
      phone: '34600000001',
      whatsappLabel: 'WhatsApp Pabs',
      whatsappMessage: '¡Hola Pabs! Tengo una duda sobre la boda...',
    },
  },

  // ---------------------------------------------------------------------------
  // FECHA Y LUGAR
  // ---------------------------------------------------------------------------
  date: {
    /** Fecha y hora exactas con zona horaria. Alimenta la cuenta atrás. */
    iso: '2027-06-12T17:00:00+02:00',
    /** Partes sueltas que se muestran en el bloque grande de la portada. */
    day: '12',
    monthName: 'Junio',
    year: '2027',
    weekdayAndTime: 'Sábado • 17:00 H',
    /** Formatos de texto usados en metadatos y footer. */
    short: '12.06.2027',
    long: '12 de Junio de 2027',
    city: 'Sevilla',
  },

  // ---------------------------------------------------------------------------
  // METADATOS / COMPARTIR (Open Graph)
  // ---------------------------------------------------------------------------
  seo: {
    title: 'Jules & Pabs · 12.06.2027',
    description:
      '¡Nos casamos! El 12 de junio de 2027 celebramos el día más importante de nuestra vida y nos encantaría que nos acompañes.',
    ogImage:
      'https://res.cloudinary.com/scihumn2/image/upload/f_jpg,w_1200,h_630,c_fill,q_auto/Disen%CC%83o_sin_ti%CC%81tulo_6_wnd34x.png',
    ogImageAlt: 'Jules & Pabs · Boda 12 de Junio 2027',
    locale: 'es_ES',
  },

  // ---------------------------------------------------------------------------
  // INTRO DEL SOBRE (pantalla de apertura)
  // ---------------------------------------------------------------------------
  envelope: {
    preTitle: 'Tienes una carta',
    preSubtitle: 'de Jules & Pabs',
    preButton: 'Abrir invitación',
    cardIntro: 'Estás invitado/a a la boda de',
    cardNames: 'Jules y Pabs',
    cardButton: 'Ver Invitación',
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
      name: 'Nombre de la Parroquia',
      address: 'Dirección de la ceremonia, Ciudad',
      time: '17:00 H',
      image:
        'https://res.cloudinary.com/scihumn2/image/upload/acuarela-v1_corpus_transpa_whkfz1.png',
      mapsUrl: 'https://maps.google.com/?q=Nombre+de+la+Parroquia',
      ctaLabel: 'Ver ubicación',
    },
    reception: {
      eyebrow: 'La Celebración',
      name: 'Nombre de la Finca',
      address: 'Dirección de la celebración, Ciudad',
      time: 'A partir de las 19:00 H',
      image: 'https://res.cloudinary.com/scihumn2/image/upload/hacienda-v1_transpa_axivb6.png',
      mapsUrl: 'https://maps.google.com/?q=Nombre+de+la+Finca',
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
   * Collage de la portada. Se necesitan 6 fotos, en este orden:
   * [0] polaroid sup. izq · [1] foto central grande · [2] polaroid sup. dcha
   * [3] polaroid inf. izq · [4] polaroid inf. centro · [5] polaroid inf. dcha
   */
  photos: [
    'https://res.cloudinary.com/scihumn2/image/upload/PHOTO-2026-05-17-16-41-18_yxwhdd.jpg',
    'https://res.cloudinary.com/scihumn2/image/upload/PHOTO-2026-05-17-16-47-47_gvmlkc.jpg',
    'https://res.cloudinary.com/scihumn2/image/upload/PHOTO-2026-05-17-16-41-17_w4a3qm.jpg',
    'https://res.cloudinary.com/scihumn2/image/upload/PHOTO-2026-05-17-16-41-17_2_zhvxcp.jpg',
    'https://res.cloudinary.com/scihumn2/image/upload/74ea0529-8ba3-4380-b687-f34ced26c06d_vw7cs1.jpg',
    'https://res.cloudinary.com/scihumn2/image/upload/c62f8ae5-e96b-46bb-b6ce-27a6dfa36272_ztmret.jpg',
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
        time: '17:00 H',
        title: 'La Ceremonia',
        image:
          'https://res.cloudinary.com/scihumn2/image/upload/WhatsApp_Image_2026-05-29_at_16.37.21-removebg-preview_rpf1kt.png',
      },
      {
        time: '19:00 H',
        title: 'El Cóctel',
        image:
          'https://res.cloudinary.com/scihumn2/image/upload/ChatGPT_Image_31_may_2026_12_58_38_rcugl3.png',
      },
      {
        time: '21:30 H',
        title: 'La Cena',
        image:
          'https://res.cloudinary.com/scihumn2/image/upload/WhatsApp_Image_2026-05-26_at_23.44.58-removebg-preview_auvopz.png',
      },
      {
        time: '23:00 H',
        title: 'El Baile & Fiesta',
        image:
          'https://res.cloudinary.com/scihumn2/image/upload/WhatsApp_Image_2026-05-28_at_00.18.22-removebg-preview_mpdsw2.png',
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
    image:
      'https://res.cloudinary.com/scihumn2/image/upload/ChatGPT_Image_31_may_2026_13_17_09_xdrx3s.png',
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
      'Emprendemos juntos el viaje más importante de nuestras vidas, que continuará con una luna de miel soñada por destinos aún por descubrir.',
    invitation:
      'Si deseáis acompañarnos de una forma especial en esta experiencia inolvidable, podéis hacerlo rellenando vuestro granito de arena aquí:',
    image:
      'https://res.cloudinary.com/scihumn2/image/upload/WhatsApp_Image_2026-05-29_at_16.26.02-removebg-preview_xyaohc.png',
    imageAlt: 'Nuestra luna de miel',
    ctaHint: '¿Quieres hacernos un regalo? Haz click aquí:',
    ctaLabel: 'Ver datos regalo',
    modal: {
      title: 'Luna de Miel · Regalo',
      description:
        'Tu presencia es nuestro mayor regalo. Sin embargo, si deseas acompañarnos de una forma diferente y ayudarnos a construir momentos mágicos en nuestra luna de miel, ponemos a tu disposición nuestra cuenta bancaria:',
      iban: 'ES00 0000 0000 0000 0000 0000',
      swift: 'XXXXESMM',
      holders: 'Jules A. A. y Pabs A. A.',
      thanks: '¡Muchísimas gracias por formar parte de este sueño! ❤️',
    },
  },

  // ---------------------------------------------------------------------------
  // CONFIRMACIÓN DE ASISTENCIA (RSVP)
  // ---------------------------------------------------------------------------
  rsvp: {
    title: 'Confirma tu asistencia',
    /** Fecha límite mostrada en el formulario y en la introducción. */
    deadline: '15 de agosto',
    bus: {
      /** Pon `false` si no hay servicio de autobuses (oculta los campos). */
      enabled: true,
      idaHint: 'Salida: Nombre de la Parroquia (18:15h) → Nombre de la Finca',
      vueltaHint: 'Salida: Nombre de la Finca → Ciudad (varios horarios)',
    },
  },

  // ---------------------------------------------------------------------------
  // DATOS DE INTERÉS
  // ---------------------------------------------------------------------------
  info: {
    eyebrow: 'Información',
    title: 'Datos de Interés',
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
          '• Ida: Nombre de la Parroquia (18:15h) → Nombre de la Finca',
          '• Vuelta: Nombre de la Finca → Ciudad (varios horarios)',
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
  /** Textura de papel global (detrás de todo el documento). */
  paper:
    'https://res.cloudinary.com/scihumn2/image/upload/texturapapel-limoncello-scaled_cgfzov.jpg',

  intro: {
    mobile:
      'https://res.cloudinary.com/scihumn2/image/upload/Disen%CC%83o_sin_ti%CC%81tulo_1_gwhl0u.png',
    desktop: 'https://res.cloudinary.com/scihumn2/image/upload/Disen%CC%83o_sin_ti%CC%81tulo_r7rwrs.png',
  },
  hero: {
    mobileTop:
      'https://res.cloudinary.com/scihumn2/image/upload/An%CC%83adir_un_ti%CC%81tulo_2_zuvzwr.png',
    mobileBottom:
      'https://res.cloudinary.com/scihumn2/image/upload/An%CC%83adir_un_ti%CC%81tulo_3_zgfwis.png',
    desktop: 'https://res.cloudinary.com/scihumn2/image/upload/Disen%CC%83o_sin_ti%CC%81tulo_jv7dnc.png',
  },
  locations: {
    mobileTop:
      'https://res.cloudinary.com/scihumn2/image/upload/An%CC%83adir_un_ti%CC%81tulo_1_cjdhdl.png',
    mobileBottom:
      'https://res.cloudinary.com/scihumn2/image/upload/An%CC%83adir_un_ti%CC%81tulo_5_xgark7.png',
    desktop:
      'https://res.cloudinary.com/scihumn2/image/upload/Disen%CC%83o_sin_ti%CC%81tulo_1_opovqp.png',
  },
  photos: {
    mobile:
      'https://res.cloudinary.com/scihumn2/image/upload/An%CC%83adir_un_ti%CC%81tulo_5_umjcus.png',
    desktop:
      'https://res.cloudinary.com/scihumn2/image/upload/Disen%CC%83o_sin_ti%CC%81tulo_2_xwwpnf.png',
  },
  music: {
    mobile: 'https://res.cloudinary.com/scihumn2/image/upload/FONDO_2_MOBILE_rwtluf.png',
    desktop:
      'https://res.cloudinary.com/scihumn2/image/upload/Disen%CC%83o_sin_ti%CC%81tulo_3_jjgev3.png',
  },
  info: {
    mobile: 'https://res.cloudinary.com/scihumn2/image/upload/FONDO_1_MOBILE_hcidom.png',
    desktop:
      'https://res.cloudinary.com/scihumn2/image/upload/Disen%CC%83o_sin_ti%CC%81tulo_5_vlhguk.png',
  },
  footer:
    'https://res.cloudinary.com/scihumn2/image/upload/Disen%CC%83o_sin_ti%CC%81tulo_3_t9bj44.png',

  /** Imágenes de la animación del sobre. */
  envelope: {
    front: 'https://res.cloudinary.com/scihumn2/image/upload/envelope_pg6sel.jpg',
    backClosed: 'https://res.cloudinary.com/scihumn2/image/upload/envelope_4_eilius.png',
    base: 'https://res.cloudinary.com/scihumn2/image/upload/2212.portrait.back_qvmv8o.webp',
    flapClosed: 'https://res.cloudinary.com/scihumn2/image/upload/envelope_1_bd8ltr.webp',
    flapOpen:
      'https://res.cloudinary.com/scihumn2/image/upload/parte_arriba_abierta_d4ed3f.webp',
    cardBg:
      'https://res.cloudinary.com/scihumn2/image/upload/texturapapel-limoncello-scaled_cgfzov.jpg',
  },
};

/* =============================================================================
 *  HELPERS
 * ---------------------------------------------------------------------------*/

/** Construye el enlace de WhatsApp de uno de los novios. */
export function whatsappUrl(partner: { phone: string; whatsappMessage: string }) {
  return `https://wa.me/${partner.phone}?text=${encodeURIComponent(partner.whatsappMessage)}`;
}

export default wedding;
