import type {Metadata} from 'next';
import { Tangerine, Inter, Italiana, Cormorant_Garamond, Playwrite_CU } from 'next/font/google';
import './globals.css';
import { wedding, backgrounds } from '@/config/wedding';

/**
 * Familia de los textos largos (todo lo que lleva `font-serif`).
 * Tangerine es caligráfica y no tiene cursiva propia, así que el navegador se
 * la inventa inclinándola; tenlo en cuenta si algo se ve raro.
 */
const tangerine = Tangerine({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

/** Cuerpo de texto: la serif del diseño, que hasta ahora se declaraba sin cargarse. */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-body',
});

/** Titulares y CTAs. */
const italiana = Italiana({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
});

/**
 * Caligrafía: los nombres de los novios. Esta familia no declara subsets.
 * Ojo con la variante `Playwrite_CU_Guides`: dibuja las pautas de caligrafía
 * dentro de las letras, que se ven como rayas cruzando el texto.
 */
const playwrite = Playwrite_CU({
  weight: '400',
  variable: '--font-handwritten',
});

const { seo } = wedding;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: 'website',
    locale: seo.locale,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="es"
      className={`scroll-smooth ${tangerine.variable} ${inter.variable} ${cormorant.variable} ${italiana.variable} ${playwrite.variable}`}
    >
      <body suppressHydrationWarning className="text-ink">
        {/* Fondo global */}
        <div
          className="fixed inset-0 pointer-events-none z-[-1] bg-cream"
          style={{
            backgroundImage: `url("${backgrounds.paper}")`,
            backgroundSize: '360px 360px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        {children}
        {/* Cenefas florales de la invitación impresa (decorativas) */}
        <div
          aria-hidden
          className="fixed inset-y-0 left-0 hidden md:block pointer-events-none z-30"
          style={{
            width: backgrounds.flowers.width,
            maxWidth: backgrounds.flowers.maxWidth,
            opacity: backgrounds.flowers.opacity,
            backgroundImage: `url("${backgrounds.flowers.left}")`,
            backgroundSize: '100% auto',
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'left top',
          }}
        />
        <div
          aria-hidden
          className="fixed inset-y-0 right-0 hidden md:block pointer-events-none z-30"
          style={{
            width: backgrounds.flowers.width,
            maxWidth: backgrounds.flowers.maxWidth,
            opacity: backgrounds.flowers.opacity,
            backgroundImage: `url("${backgrounds.flowers.right}")`,
            backgroundSize: '100% auto',
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'right top',
          }}
        />
      </body>
    </html>
  );
}
