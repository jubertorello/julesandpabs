import type {Metadata} from 'next';
import { Roboto_Serif, Inter } from 'next/font/google';
import './globals.css';
import { wedding, backgrounds } from '@/config/wedding';

const robotoSerif = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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
    <html lang="es" className={`scroll-smooth ${robotoSerif.variable} ${inter.variable} [--font-handwritten:var(--font-serif)]`}>
      <body suppressHydrationWarning className="text-primary">
        {/* Fondo global */}
        <div
          className="fixed inset-0 pointer-events-none z-[-1] bg-cream"
          style={{
            backgroundImage: `url("${backgrounds.paper}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        {children}
      </body>
    </html>
  );
}
