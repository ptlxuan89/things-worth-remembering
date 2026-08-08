# things worth remembering

Personal blog of **xưn** — built with [Astro](https://astro.build).
Warm paper, one loud highlighter, prose readability first.

## Run locally

```bash
npm install
npm run dev        # → http://localhost:4321
```

```bash
npm run build      # static site → dist/
npm run preview    # preview the production build
```

Requires Node 18.17+ (Node 20+ recommended).

## Add a post

Create one file: `src/content/posts/my-post-slug.md`

```markdown
---
title: My post title
date: 2026-08-10
summary: One sentence that appears on cards and in RSS.
category: tech        # tech | life | notes
tags: [astro, css]    # optional, any strings
lang: en              # en | vi (sets the HTML lang attribute)
---

Your content here.
```

That's it — the post appears on home, archive, tag filters, and RSS
automatically. The filename becomes the URL: `/posts/my-post-slug`.

### What works inside posts

- **Code blocks** with syntax highlighting (light + dark themes, automatic)
- **Images**: `![alt text](/my-image.png)` — put files in `public/`
- **Footnotes**: `text[^1]` then `[^1]: the footnote` anywhere below
- **Callouts**:

```markdown
> [!note] Optional title
> Body of the callout.
```

Types: `note` (blue), `tip` (green), `warn` (orange), `idea` (yellow).

## Before you deploy — 3 TODOs

1. `astro.config.mjs` — change `site: 'https://example.com'` to your domain
   (used by RSS and OG tags).
2. `src/components/Footer.astro` and `src/pages/about.astro` — replace the
   `#` placeholder links with your real GitHub/email.
3. Optionally add an OG image: put `og.png` in `public/` and add
   `<meta property="og:image" ...>` in `src/layouts/Base.astro`.

## Deploy free

### Vercel (easiest)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Vercel auto-detects Astro. Click **Deploy**. Done.

### Netlify

1. Push to GitHub.
2. [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**.
3. Build command: `npm run build` · Publish directory: `dist`. Deploy.

### GitHub Pages

1. Set `site` in `astro.config.mjs` to `https://<username>.github.io` and, if
   the repo isn't named `<username>.github.io`, also add
   `base: '/<repo-name>'`.
2. Add the official Astro deploy workflow:
   create `.github/workflows/deploy.yml` with the contents from
   https://docs.astro.build/en/guides/deploy/github/ (uses
   `withastro/action`).
3. Repo **Settings → Pages → Source: GitHub Actions**. Push to `main`.

## Project structure

```
├── astro.config.mjs          # site URL, markdown + Shiki config
├── remark-callouts.mjs       # tiny plugin: > [!note] → styled callout
├── public/
│   └── favicon.svg
└── src/
    ├── content.config.ts     # post schema (title, date, tags, ...)
    ├── content/posts/        # ← your writing lives here, one .md per post
    ├── styles/global.css     # the entire visual identity
    ├── layouts/Base.astro    # <head>, meta/OG, fonts, theme script
    ├── components/           # Header, Footer, PostCard
    └── pages/
        ├── index.astro       # home: intro + recent posts
        ├── about.astro
        ├── 404.astro
        ├── rss.xml.js
        └── posts/
            ├── index.astro   # archive + category/tag filter
            └── [...slug].astro
```
