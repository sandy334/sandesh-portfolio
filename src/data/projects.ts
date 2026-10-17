/**
 * Project data lives in projects.json. Featured projects render as large
 * editorial plates (in file order); the rest render in the index.
 * Only include outcomes that were actually measured.
 */
import data from './projects.json';
import { withBase } from '@/lib/basePath';

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  /** Short editorial category line, e.g. "Hospitality · Web · SEO". */
  category: string;
  /** One-word sector used in the compact index. */
  sector: string;
  year: string;
  description: string;
  role: string;
  services: string[];
  stack: string[];
  image?: ProjectImage;
  url?: string;
  /** A measured, verifiable result. Leave out if nothing was measured. */
  outcome?: string;
  /** Shown in place of a link when the project is not public. */
  note?: string;
  featured: boolean;
};

export const projects: Project[] = (data as Project[]).map((p) =>
  p.image ? { ...p, image: { ...p.image, src: withBase(p.image.src) } } : p,
);

export const featuredProjects = projects.filter((p) => p.featured);
export const indexProjects = projects.filter((p) => !p.featured);

export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
