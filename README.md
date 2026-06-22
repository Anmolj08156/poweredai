# StudNexus — The Learning Operating System

> **One Platform. Every Learner.** A premium, investor-ready landing site for an
> AI-powered Learning Operating System.
>
> A product of **[DataSmith Research Labs](https://datasmithlabs.com)** · contact
> **anmol@datasmithlabs.com**

Built with **Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion + Lucide**.
Dark, AI-native, glassmorphic design inspired by Linear, Stripe, Vercel & Perplexity.

---

## ✨ What's inside

- **Animated hero** with a custom "learning ecosystem" visual (no screenshots).
- **Full landing flow**: Problem → Solution → Features (bento, incl. AI Workspace,
  Flashcards, Revision Vault, Community, Smart Practice, Analytics) → Learner
  categories → How it works → Social proof → Early-access CTA → FAQ → Footer.
- **Waitlist capture** (email + optional name) with validation, dedup, honeypot,
  rate-limiting and device/source capture. Persists to `localStorage` **and**
  syncs to a Google Sheet (endpoint already wired — see below).
- **No admin surface**: signups go straight to your Google Sheet — there's no
  in-app admin route to secure or expose.
- **SEO**: rich meta, Open Graph, Twitter cards, JSON-LD (Organization, Website,
  SoftwareApplication, FAQ), `sitemap.xml`, `robots.txt`, canonical, manifest.
- **Analytics-ready**: GA4, Microsoft Clarity, PostHog — all via env vars.
- **Deploy-ready**: Cloudflare (Workers static assets via `wrangler.jsonc`) /
  Vercel (`vercel.json`) with SPA fallback + security headers (`_headers`).

---

## 🚀 Getting started

```bash
npm install         # install dependencies
npm run dev         # start dev server → http://localhost:5173
npm run build       # type-check + production build → dist/
npm run preview     # preview the production build locally
```

> Requires Node 18+ (tested on Node 25).

---

## 🔐 Environment variables

Copy `.env.example` → `.env.local` and fill what you need. **Everything is
optional** — the site is fully functional with no config.

| Variable | Purpose |
| --- | --- |
| `VITE_GA_ID` | Google Analytics 4 measurement id |
| `VITE_CLARITY_ID` | Microsoft Clarity project id |
| `VITE_POSTHOG_KEY` / `VITE_POSTHOG_HOST` | PostHog product analytics |
| `VITE_WAITLIST_ENDPOINT` | Overrides the baked-in Google Sheet endpoint |

---

## 🗂 Project structure

```
src/
├─ components/        Section components (Hero, Features, FAQ, …)
│  └─ ui/             Reusable primitives (WaitlistForm, Section, Reveal, …)
├─ pages/             NotFound
├─ lib/               waitlist store, analytics, config, utils
├─ data/              all copy & content (single source of truth)
├─ App.tsx            landing page composition
└─ main.tsx           router + providers
public/               robots.txt, sitemap.xml, manifest, favicon, _redirects
db/schema.sql         Postgres/Supabase schema for early_access_waitlist
```

---

## 📥 Collecting signups without a backend

Want every signup in one place you control, with **no server**? Point the site at
a Google Sheet — full 3-minute walkthrough in
[`docs/COLLECT-WAITLIST.md`](docs/COLLECT-WAITLIST.md). Short version: paste
[`scripts/google-apps-script.gs`](scripts/google-apps-script.gs) into a Sheet's
Apps Script, deploy it as a Web App, and put the `/exec` URL in
`VITE_WAITLIST_ENDPOINT`. That single URL is the only thing you need to provide.

## 🛢 Going live with a real database

The frontend stores signups in `localStorage` so it works with zero backend.
To persist server-side:

1. Create the table from [`db/schema.sql`](db/schema.sql) (Supabase / Postgres).
2. Expose an endpoint (API route / Edge Function) that inserts a row.
3. Set `VITE_WAITLIST_ENDPOINT` to that URL — signups POST there automatically.
4. Read/manage signups from your database (or keep using the Google Sheet).

---

## 🎨 Brand tokens

| Token | Value |
| --- | --- |
| Primary | `#7C3AED` |
| Secondary | `#4F46E5` |
| Accent | `#A855F7` |
| Background | `#09090B` |
| Cards | `#18181B` |

> **Images:** placeholders/abstract visuals are used throughout. Drop your own
> `og-image.png` (1200×630), `logo.png`, `icon-192.png`, `icon-512.png` and
> `apple-touch-icon.png` into `public/` to finish the brand.

---

## 🚢 Deploy

See [`docs/DEPLOY-CLOUDFLARE.md`](docs/DEPLOY-CLOUDFLARE.md) for Cloudflare Pages
(Git or Wrangler). The build command is `npm run build`, output is `dist/`, and
SPA routing/headers are handled by `public/_redirects` + `public/_headers`.

---

© StudNexus by **DataSmith Research Labs** ·
[datasmithlabs.com](https://datasmithlabs.com) · anmol@datasmithlabs.com ·
One Platform. Every Learner.
