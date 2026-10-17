# Sandesh HR — Portfolio (v1)

Personal site of **Sandesh HR** — Full-Stack Developer · SEO · AEO · GEO.

> I don't just build websites. I build them to be found.

This branch is **v1**, the editorial version: Next.js 14 (App Router), TypeScript and Tailwind CSS, light and dark themes, a single scroll observer and no animation library. The current version (v3) lives on `main`.

Live: https://sandy334.github.io/sandesh-portfolio/v1/

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

Requires Node 18.18+.

## Where the content lives

All personal data is JSON. Components only read it.

| What | File |
| --- | --- |
| Identity, contact, socials, bio, experience, education, certifications, tools, SEO keywords | `src/data/profile.json` |
| Projects (featured plates + index) | `src/data/projects.json` |
| Capabilities, beliefs, "Currently", FAQ, process | `src/data/content.json` |

The `.ts` files next to them only add types. `/llms.txt` (the AI-readable summary) is generated from the same JSON.

## Deploy to GitHub Pages

The site builds to static HTML when `GITHUB_PAGES=true`:

```bash
GITHUB_PAGES=true \
NEXT_PUBLIC_BASE_PATH=/sandesh-portfolio/v1 \
NEXT_PUBLIC_SITE_URL=https://sandy334.github.io/sandesh-portfolio/v1 \
NEXT_PUBLIC_NOINDEX=1 \
npm run build      # output in out/
```

`NEXT_PUBLIC_NOINDEX=1` keeps this archived version out of search results so it doesn't compete with v3.
