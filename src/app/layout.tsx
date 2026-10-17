import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './v3.css';

import { site } from '@/data/site';
import { JsonLd } from '@/components/seo/JsonLd';

/* Geist (variable), self-hosted. */
const sans = localFont({
  src: './fonts/GeistVariable.woff2',
  variable: '--font-sans',
  weight: '100 900',
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
  colorScheme: 'light',
  themeColor: '#f2f0f1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="v3">{children}</div>
        <JsonLd />
      </body>
    </html>
  );
}
