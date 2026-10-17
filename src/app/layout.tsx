import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Instrument_Serif } from 'next/font/google';
import './globals.css';

import { site } from '@/data/site';
import { themeInitScript } from '@/lib/theme';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { RevealObserver } from '@/components/motion/RevealObserver';
import { JsonLd } from '@/components/seo/JsonLd';

/* Geist (variable) for text and UI, Geist Mono for numbers and labels. Self-hosted. */
const sans = localFont({
  src: './fonts/GeistVariable.woff2',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
});
const mono = localFont({
  src: './fonts/GeistMonoVariable.woff2',
  variable: '--font-mono',
  weight: '100 900',
  display: 'swap',
});
/* One restrained serif italic for editorial emphasis. Downloaded at build, self-hosted. */
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-serif',
  display: 'swap',
});

// Set NEXT_PUBLIC_NOINDEX=1 for secondary deployments (e.g. an archived version) so they don't compete in search.
const indexable = process.env.NEXT_PUBLIC_NOINDEX !== '1';

const shareImage = {
  url: `${site.url}/og-image.png`,
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline} ${site.role}, ${site.location.city}, ${site.location.country}.`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: site.seo.keywords,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: 'profile',
    url: `${site.url}/`,
    siteName: site.name,
    title: site.tagline,
    description: site.description,
    images: [shareImage],
    locale: site.seo.locale,
    firstName: site.firstName,
    lastName: site.lastName,
  },
  twitter: {
    card: 'summary_large_image',
    images: [shareImage],
    title: site.tagline,
    description: site.description,
  },
  robots: {
    index: indexable,
    follow: indexable,
    googleBot: {
      index: indexable,
      follow: indexable,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f2ed' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0c0d' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        {/* Applies the theme before paint. Must stay inline and first. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <RevealObserver />
        <JsonLd />
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
