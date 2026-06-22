# Deploying to Cloudflare Pages

This is a static Vite + React SPA, so it deploys to Cloudflare Pages with no
server. SPA routing (deep links, 404 fallback) and caching are already handled by
[`public/_redirects`](../public/_redirects) and [`public/_headers`](../public/_headers).

The waitlist already works on deploy — the Google Sheet endpoint is baked into
[`src/lib/config.ts`](../src/lib/config.ts), so no env vars are required.

---

## Option 1 — Connect your Git repo (recommended)

1. Push this project to GitHub / GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo, then set the build config:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. (Optional) **Settings → Environment variables** — only if you want to override
   defaults:
   - `VITE_WAITLIST_ENDPOINT` — a different Google Sheet / backend URL
   - `VITE_GA_ID`, `VITE_CLARITY_ID`, `VITE_POSTHOG_KEY` — analytics
   - `NODE_VERSION` = `20` (also pinned via `.node-version`)
5. **Save and Deploy.** Every push auto-builds and deploys.

---

## Option 2 — Direct upload with Wrangler (no Git)

```bash
npm install -g wrangler        # once
npm run build                  # produces dist/
wrangler pages deploy dist --project-name studnexus
```

Wrangler will create the project on first run and print your live URL
(`https://studnexus.pages.dev`).

---

## Custom domain

Cloudflare dashboard → your Pages project → **Custom domains → Set up a domain**
→ add e.g. `studnexus.com`. Cloudflare handles DNS + SSL automatically.

> After setting the final domain, update the canonical/OG URLs in
> [`index.html`](../index.html), [`public/sitemap.xml`](../public/sitemap.xml)
> and `VITE_SITE_URL` if it differs from `https://studnexus.com`.
