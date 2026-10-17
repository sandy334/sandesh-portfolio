# Sandesh HR — Portfolio

Personal site of **Sandesh HR** — Full-Stack Developer · SEO · AEO · GEO.

> I don't just build websites. I build them to be found.

**Live:** https://sandy334.github.io/sandesh-portfolio/

This is **v3**, a motion-led version built with Next.js 14 (App Router), TypeScript, GSAP (ScrollTrigger, SplitText, Inertia) and Lenis smooth scrolling. It respects `prefers-reduced-motion` with a plain, readable layout.

The earlier editorial version lives on the [`v1`](../../tree/v1) branch and is served at [/v1/](https://sandy334.github.io/sandesh-portfolio/v1/).

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
| Projects (featured cards + the rest) | `src/data/projects.json` |
| Capabilities, process, FAQ | `src/data/content.json` |

The `.ts` files next to them only add types. `/llms.txt` (the AI-readable summary) is generated from the same JSON.

The data files are shared with the `v1` branch, so a data change can be cherry-picked across.

## Deploy to GitHub Pages

The site builds to static HTML when `GITHUB_PAGES=true`:

```bash
GITHUB_PAGES=true \
NEXT_PUBLIC_BASE_PATH=/sandesh-portfolio \
NEXT_PUBLIC_SITE_URL=https://sandy334.github.io/sandesh-portfolio \
npm run build      # output in out/
```

GitHub Pages serves the `gh-pages` branch: this build at the root, and the `v1` build (same command with `/sandesh-portfolio/v1` and `NEXT_PUBLIC_NOINDEX=1`) in `v1/`.

## Contact form

The form posts to a Cloudflare Worker in [`worker/`](worker/), which emails the submission through [Resend](https://resend.com) to the address in `profile.json`. The Resend key lives only as a Worker secret, never in this repo. The Worker URL is `contactEndpoint` in `profile.json`; if it is empty, the form falls back to opening the visitor's email app.

```bash
cd worker
npm install
npx wrangler login
npx wrangler secret put RESEND_API_KEY   # a send-only key
npx wrangler deploy
```

Allowed origins are set in `worker/wrangler.toml`.
