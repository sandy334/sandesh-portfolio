import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

/**
 * Everything is public and crawlable, including for AI crawlers.
 * A human- and machine-readable summary also lives at /llms.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
