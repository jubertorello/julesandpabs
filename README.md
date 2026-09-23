# Invitación de boda · plantilla base

Invitación de boda digital en Next.js: apertura animada de sobre, cuenta atrás,
itinerario, sugerencias de música, confirmación de asistencia (RSVP) y panel de
administración.

Este repositorio es la **base reutilizable**: cada boda se monta clonándolo y
tocando un único archivo de configuración. Los datos de invitados y canciones
viven en Supabase, separados por `client_id`.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # y rellena las claves de Supabase
npm run dev
```

## Qué hay que cambiar en cada boda

### 1. Los datos — `config/wedding.ts`

Todo el contenido está ahí: nombres, fecha, ubicaciones, itinerario, textos,
fotos, teléfonos de contacto y datos bancarios del regalo.

Lo primero y más importante:

```ts
clientId: 'jules-and-pabs',
```

Es la clave que enlaza esta invitación con los registros de Supabase. Debe ser
única por boda y estar dada de alta en la base de datos antes de publicar, o las
confirmaciones se mezclarán con las de otra pareja.

Secciones que se pueden ocultar por completo desde la config:

| Opción | Efecto |
| --- | --- |
| `music.enabled` | Sugerencias de canciones |
| `gift.enabled` | Luna de miel / regalo |
| `rsvp.bus.enabled` | Campos de autobús en el formulario |

Las listas (`hero.intro`, `itinerary.events`, `info.cards`, `nav.links`) admiten
tantos elementos como haga falta: la página se genera a partir de ellas.

### 2. Los colores — `app/globals.css`

Ocho variables en el bloque `@theme` pintan toda la invitación. Cambiarlas
repinta la página entera, porque el resto del código usa las utilidades que
generan (`bg-primary`, `text-muted`, `border-primary/20`…).

| Variable | Dónde se ve |
| --- | --- |
| `--color-primary` | Navegación, botones, titulares |
| `--color-secondary` | Bloques sólidos (cuenta atrás, regalo, footer) |
| `--color-cream` | Fondo claro de las secciones |
| `--color-deep` | Nombres de los novios y la fecha |
| `--color-muted` | Párrafos y textos secundarios |
| `--color-soft` | Enlaces sobre fondo oscuro |
| `--color-sand` | Fondos de inputs y cajas interiores |
| `--color-overlay` | Visor de fotos a pantalla completa |

Las tipografías se cargan en `app/layout.tsx` (`next/font`) y se asignan en el
`:root` de `globals.css`.

### 3. Los detalles sueltos

- `app/icon.svg` — favicon con las iniciales.
- `config/wedding.ts` → `backgrounds` — imágenes de fondo de cada sección.
- `app/globals.css` (bloque final) — la imagen de fondo alternativa en móvil.

## Panel de administración

En `/admin`. El acceso se valida contra la función `verify_client_password` de
Supabase: cada pareja entra con su usuario y ve solo sus confirmaciones; el rol
`master` las ve todas.

## Estructura

```
app/
  page.tsx        Invitación completa (una sola página, por secciones)
  admin/page.tsx  Panel de confirmaciones
  layout.tsx      Metadatos, fuentes y fondo global
  globals.css     Paleta de colores y tipografías
components/
  EnvelopeIntro   Animación del sobre de apertura
  RSVPForm        Formulario de confirmación
config/
  wedding.ts      ⭐ Todo el contenido de la boda
lib/supabase.ts   Cliente de Supabase
```
