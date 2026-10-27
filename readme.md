# Nikki's Toolbox 🧰

> **Cloudflare edition** of [nikkis-toolbox](https://github.com/nikkimasani/nikkis-toolbox) · Live: https://nikkis-toolbox-cloudflare.pages.dev

A launcher dashboard — one place to open all of my apps, installable as a PWA on phone, tablet, or desktop.

**Live:** https://toolbox-nine-eta.vercel.app

## Apps

| # | App | URL |
|---|-----|-----|
| 1 | Nikki's TradeLab | https://nikkis-tradehub.vercel.app |
| 2 | The Book Nook | https://reader-hub-rust.vercel.app |
| 3 | PMP Boot Camp | https://pmp-dashboard-one.vercel.app |
| 4 | SlateRun Sports Hub | https://sports-hub-topaz.vercel.app |
| 5 | Craft Club | https://dabble-five.vercel.app |
| 6 | PM Copilot | https://pm-copilot-six.vercel.app |
| 7 | Open Design | http://10.0.0.29:7457 |
| 8 | World Monitor | https://www.worldmonitor.app |

Each app opens in its own browser tab, so several can stay open at once; switch between them with your browser tabs while the Toolbox remains available. Press **1–9** on a keyboard to open the corresponding app in a new tab.

## Stack

- Single-file vanilla HTML/CSS/JS (`index.html`) — no build step, no dependencies
- PWA: `manifest.json` + `sw.js` (network-first HTML, cache-first static assets) + SVG icons
- Hosted on Vercel

## Run locally

Open `index.html` in a browser. (Service worker only registers on HTTPS, so PWA features are production-only.)

## Deploy

**Cloudflare Pages** project `nikkis-toolbox-cloudflare`:

- Build command: `node scripts/build-cloudflare.mjs`
- Output directory: `cloudflare-dist` (launcher assets only — no Vercel `/api` source or env files)

```bash
node scripts/build-cloudflare.mjs
npx wrangler pages deploy cloudflare-dist --project-name nikkis-toolbox-cloudflare
```

App cards are switched from their Vercel URLs to Cloudflare URLs one at a time, only after each Cloudflare app is verified — see `CLOUDFLARE_MIGRATION.md` and `CLOUDFLARE_DEPLOYMENT_MATRIX.md`. The Vercel Toolbox stays live as the rollback copy.

## Adding a new app

1. Copy one of the `.card` blocks in `index.html` and update the name, description, link, and `data-key`.
2. Add a per-app accent class (see `.card.tradelab` etc. in the CSS).
3. Redeploy.

## Portfolio and launcher modes

The page opens as a public portfolio (intro, selected work, all projects by category, about). The **Launcher** button in the top bar switches to the private launcher (search, recent apps, in-page app tabs, number-key shortcuts); the choice is remembered on that device. `?launcher=1` and `?portfolio=1` force a mode, and the installed PWA opens straight into the launcher.

When adding an app, also give it an entry in the `PORTFOLIO` map near the top of the script (its category, and `private: true` to keep it out of the public portfolio). `FEATURED` lists the three apps in Selected work. Private apps are only hidden from view, not secret: their links are still in the page source.
