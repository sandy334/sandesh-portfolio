import { knowsAbout, site } from '@/data/site';
import { faq } from '@/data/content';
import { projects } from '@/data/projects';

/**
 * One JSON-LD graph describing the entity (Person), the site, this profile
 * page, the FAQ, and selected work. Everything here mirrors visible content.
 */
export function JsonLd() {
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        image: `${new URL(site.url).origin}${site.portrait.src}`,
        jobTitle: site.jobTitle,
        description: site.description,
        email: `mailto:${site.email}`,
        sameAs: [site.social.github.url, site.social.linkedin.url],
        worksFor: {
          '@type': 'Organization',
          name: site.employer.name,
          url: site.employer.url,
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: site.education.schoolShort,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.countryCode,
        },
        knowsAbout: [...knowsAbout],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: 'en',
        author: { '@id': personId },
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}/#profile`,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        dateModified: site.updated,
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}/#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${site.url}/#work`,
        name: `Selected work by ${site.name}`,
        itemListElement: projects
          .filter((p) => p.url)
          .map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'WebSite',
              name: p.title,
              url: p.url,
              description: p.description,
              contributor: { '@id': personId },
            },
          })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  );
}
