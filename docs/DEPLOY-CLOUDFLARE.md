# Deploying to Cloudflare

This is a static Vite + React SPA. It deploys to Cloudflare as a **Workers
static-assets** site, configured by [`wrangler.jsonc`](../wrangler.jsonc):

- `assets.directory: "./dist"` serves the built site.
- `not_found_handling: "single-page-application"` returns `index.html` for
  unknown paths, so client-side routing (the 404 page, deep links) works.
- Security + cache headers come from [`public/_headers`](../public/_headers).

> We do **not** ship a `_redirects` file — Cloudflare's asset validator rejects
> the SPA `/* /index.html 200` rule as a loop, and `not_found_handling` already
> covers the fallback.

The waitlist + demo forms already work on deploy — the Google Sheet endpoint is
baked into [`src/lib/config.ts`](../src/lib/config.ts), so no env vars are required.

---

## Option 1 — Connect your Git repo (recommended)

1. Push this project to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Workers → Import a repo**.
3. Pick the repo. Cloudflare detects the Vite framework and sets:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy` (uses `wrangler.jsonc`)
4. (Optional) **Settings → Variables** — only to override defaults:
   - `VITE_WAITLIST_ENDPOINT` — a different Google Sheet / backend URL
   - `VITE_GA_ID`, `VITE_CLARITY_ID`, `VITE_POSTHOG_KEY` — analytics
5. **Save and Deploy.** Every push auto-builds and deploys to
   `https://poweredai.<your-subdomain>.workers.dev`.

---

## Option 2 — Direct upload with Wrangler (no Git)

```bash
npm run build                  # produces dist/
npx wrangler deploy            # reads wrangler.jsonc, uploads dist/
```

---

## Custom domain

Cloudflare dashboard → your Worker → **Settings → Domains & Routes → Add custom
domain** → e.g. `studnexus.com`. Cloudflare handles DNS + SSL automatically.

> After setting the final domain, update the canonical/OG URLs in
> [`index.html`](../index.html), [`public/sitemap.xml`](../public/sitemap.xml)
> and `VITE_SITE_URL` if it differs from `https://studnexus.com`.
