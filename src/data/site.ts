/**
 * Identity, contact and navigation. All personal data lives in profile.json;
 * this module only types it and adds what is derived.
 */
import profile from './profile.json';
import { withBase } from '@/lib/basePath';

export type StoryLine = { text: string; tone?: 'muted' | 'question' };

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || profile.url;

export const site = {
  ...profile,
  /** Set NEXT_PUBLIC_SITE_URL in production. Used for canonical, OG, sitemap, robots and JSON-LD. */
  url: rawUrl.replace(/\/$/, ''),
  bio: { ...profile.bio, story: profile.bio.story as StoryLine[] },
  portrait: { ...profile.portrait, src: withBase(profile.portrait.src) },
  resume: withBase(profile.resume),
};

export const knowsAbout = profile.seo.knowsAbout;

export type NavItem = { id: string; num: string; label: string };

export const nav: NavItem[] = [
  { id: 'work', num: '01', label: 'Work' },
  { id: 'what-i-do', num: '02', label: 'What I Do' },
  { id: 'thinking', num: '03', label: 'Thinking' },
  { id: 'about', num: '04', label: 'About' },
  { id: 'now', num: '05', label: 'Now' },
  { id: 'contact', num: '', label: 'Contact' },
];
