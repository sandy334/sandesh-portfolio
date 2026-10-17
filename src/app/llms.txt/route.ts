import { site } from '@/data/site';
import { capabilities } from '@/data/content';
import { featuredProjects, indexProjects } from '@/data/projects';

/** A human- and machine-readable summary for AI crawlers, generated from the same JSON as the site. */
export const dynamic = 'force-static';

export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    '## Identity',
    '',
    `- Name: ${site.name} (also known as ${site.shortName})`,
    `- Role: ${site.role}`,
    `- Employer: ${site.employer.name} (${site.employer.url})`,
    `- Location: ${site.location.city}, ${site.location.region}, ${site.location.country}`,
    `- Experience: ${site.experience.map((e) => `${e.role}, ${e.company} (${e.period})`).join('; ')}`,
    `- Education: ${site.education.degree}, ${site.education.school}, ${site.education.years}`,
    `- Email: ${site.email}`,
    `- GitHub: ${site.social.github.url}`,
    `- LinkedIn: ${site.social.linkedin.url}`,
    '',
    `## What ${site.shortName} does`,
    '',
    ...capabilities.map((c) => `- ${c.title}${c.kicker ? ` (${c.kicker})` : ''}: ${c.focus.join(', ')}.`),
    `- Tools: ${[...site.tools.build, ...site.tools.ship].join(', ')}.`,
    '',
    '## Selected work',
    '',
    ...featuredProjects.map(
      (p) => `- ${p.title}${p.url ? ` (${p.url})` : ''}: ${p.role}.${p.outcome ? ` ${p.outcome}` : ''}`,
    ),
    `- Also: ${indexProjects.map((p) => p.title).join(', ')}.`,
    '',
    '## Pages',
    '',
    '- Home: / (single-page site with sections: About, Experience, Services, Work, Process, Contact)',
    '- Sitemap: /sitemap.xml',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
