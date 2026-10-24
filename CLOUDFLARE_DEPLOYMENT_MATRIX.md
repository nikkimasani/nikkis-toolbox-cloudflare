# Nikki's Toolbox — Parallel Cloudflare Deployment Matrix

This matrix defines the separate Cloudflare ecosystem. Existing Vercel repos, production branches, projects, and URLs remain intact.

## Target architecture

- Original GitHub repo + production branch -> existing Vercel project (unchanged)
- Cloudflare copy repo `*-cloudflare` -> Cloudflare Pages or Workers
- New Cloudflare Toolbox -> Cloudflare app URLs only
- Open Design stays local-network only
- World Monitor stays external

| Card | Source repo / recovery source | Cloudflare copy repo | Cloudflare project | Runtime | Target URL / state |
|---|---|---|---|---|---|
| Nikki's Toolbox | `nikkimasani/nikkis-toolbox` | `nikkis-toolbox-cloudflare` | `nikkis-toolbox-cloudflare` | Pages | `https://nikkis-toolbox-cloudflare.pages.dev` |
| Nikki's TradeLab | `nikkimasani/nikkis-tradehub` | `nikkis-tradehub-cloudflare` | `tradelab-cloudflare` | Pages | `https://tradelab-cloudflare.pages.dev` |
| The Book Nook | `nikkimasani/reader-hub` | `reader-hub-cloudflare` | `reader-hub-cloudflare` | Pages + Functions + R2 | `https://reader-hub-cloudflare.pages.dev` |
| PMP Boot Camp | `nikkimasani/pmp-dashboard` | `pmp-dashboard-cloudflare` | `pmp-boot-camp-cloudflare` | Pages | `https://pmp-boot-camp-cloudflare.pages.dev` |
| SlateRun | `nikkimasani/betiq-sports-hub` | `betiq-sports-hub-cloudflare` | `slaterun-cloudflare` | Pages | `https://slaterun-cloudflare.pages.dev` |
| Dabble | `nikkimasani/dabble` | `dabble-cloudflare` | `dabble-cloudflare` | Pages | `https://dabble-cloudflare.pages.dev` |
| PM Copilot | `nikkimasani/pm-copilot` | `pm-copilot-cloudflare` | `pm-copilot-cloudflare` | Pages | `https://pm-copilot-cloudflare.pages.dev` |
| Life OS | `nikkimasani/life-transition-command-center` | `life-transition-command-center-cloudflare` | `life-os-cloudflare` | Pages | `https://life-os-cloudflare.pages.dev` |
| Career Arsenal | `nikkimasani/career-arsenal` | `career-arsenal-cloudflare` | `career-arsenal-cloudflare` | Workers + OpenNext | final `workers.dev` URL assigned at deploy |
| Draw Your Font | `nikkimasani/draw-your-font` | `draw-your-font-cloudflare` | `draw-your-font-cloudflare` | Pages | `https://draw-your-font-cloudflare.pages.dev` |
| StatVault | `nikkimasani/sports-analytics-hub` | `sports-analytics-hub-cloudflare` | `statvault-cloudflare` | Pages + Functions | `https://statvault-cloudflare.pages.dev` |
| Body Compass | `nikkimasani/body-compass` | `body-compass-cloudflare` | `body-compass-cloudflare` | Workers + OpenNext | final `workers.dev` URL assigned at deploy |
| Make It Pretty | `nikkimasani/make-it-pretty` | `make-it-pretty-cloudflare` | `make-it-pretty-cloudflare` | Pages + Python Worker | `https://make-it-pretty-cloudflare.pages.dev` |
| Nikki Project Manager | recovered source: `recovered/nikki-project-manager-cloudflare/` in this staging branch | `nikki-project-manager-cloudflare` | `nikki-project-manager-cloudflare` | Pages | `https://nikki-project-manager-cloudflare.pages.dev` |
| OCode | `nikkimasani/OCode-web` | `OCode-web-cloudflare` | `ocode-cloudflare` | Workers + OpenNext | final `workers.dev` URL assigned at deploy |
| Pi Command Center | `nikkimasani/pi-command-center` | `pi-command-center-cloudflare` | `pi-command-center-cloudflare` | Pages | `https://pi-command-center-cloudflare.pages.dev` |
| Hobonichi Planner | `nikkimasani/hobonichi-planner` | `hobonichi-planner-cloudflare` | `hobonichi-planner-cloudflare` | Pages | `https://hobonichi-planner-cloudflare.pages.dev` |
| WTM | `nikkimasani/wtm-whats-the-move` | `wtm-whats-the-move-cloudflare` | `wtm-whats-the-move-cloudflare` | Pages + Functions | `https://wtm-whats-the-move-cloudflare.pages.dev` |
| AgVisualizer | `nikkimasani/agvisualizer` | none yet | none yet (UI on Vercel; `agvisualizer-relay` Worker is separate) | static site | card links to `https://agvisualizer.vercel.app` until a Pages copy exists |
| Open Design | local network app | none | none | local only | keep current LAN URL |
| World Monitor | external site | none | none | external | keep `worldmonitor.app` |

## Branch isolation audit

The following owned source repos have a dedicated `cloudflare-pages-prep` branch and must not be merged into their Vercel production branch:

- nikkis-toolbox
- nikkis-tradehub
- reader-hub
- pmp-dashboard
- betiq-sports-hub
- dabble
- pm-copilot
- life-transition-command-center
- career-arsenal
- draw-your-font
- sports-analytics-hub
- body-compass
- make-it-pretty
- OCode-web
- pi-command-center
- hobonichi-planner
- wtm-whats-the-move

Nikki Project Manager had no GitHub repo linked to Vercel. Its Vercel deployment is disabled and reported only three deployment files. A replacement/recovery source bundle is therefore staged under `recovered/nikki-project-manager-cloudflare/`.

## Cloudflare runtime requirements

### Reader Hub

Pages build plus Functions. Required bindings/secrets:

- R2 binding: `CLUB_SHELF_BUCKET`
- `GITHUB_TOKEN`
- `CLUB_GIST_ID`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- optional `GOOGLE_CSE_KEY`
- optional `GOOGLE_CSE_ID`
- `ANTHROPIC_API_KEY`
- optional `ANTHROPIC_MODEL`

After the final host exists, add the Cloudflare callback to Google OAuth:

`https://reader-hub-cloudflare.pages.dev/api/gdrive-auth-callback`

### WTM

Pages + Functions. Copy the same provider secrets currently used by the Vercel project, including where applicable:

- `TICKETMASTER_API_KEY` or `TICKETMASTER_CONSUMER_KEY`
- `BRAVE_SEARCH_API_KEY`
- any Supabase/public sync values already used by the app

Native Cloudflare functions already cover the core feed, health, Ticketmaster/music sweep, sports schedules, NRG/Astros sources, generated posters, image proxy/cache, artwork metadata, event prices, and progressive provider fallback.

### StatVault

Pages + Functions. Required server-side secrets should be copied from the existing Vercel project, including `ODDS_API_KEY` and any AI provider key used by the scout endpoint.

### Make It Pretty

Frontend: Pages project `make-it-pretty-cloudflare`.
Backend: Python Worker `make-it-pretty-api-cloudflare` from `backend/`.

Pages variable after Worker deploy:

`PYTHON_API_ORIGIN=https://<assigned-worker-host>`

The Python Worker uses FastAPI through Cloudflare's Python Worker ASGI adapter. If any existing binary-heavy dependency is not available in Python Workers, use the existing Dockerfile with Cloudflare Containers for that endpoint set instead of removing functionality.

### Full-stack Next.js apps

Career Arsenal, Body Compass, and OCode use Cloudflare Workers with OpenNext, not static Pages. Deploy from their prepared Cloudflare branches/copy repos and then write their verified Worker URLs into `cloudflare-apps.js` in the Cloudflare Toolbox copy.

## Toolbox switching rule

Do not modify the existing Vercel Toolbox links. The Cloudflare copy loads `cloudflare-apps.js` during its build and rewrites only the Cloudflare launcher card targets.

Do not switch a card from pending/fallback to a Cloudflare URL until the target app has passed verification.

## Verification gate for every app

1. Build succeeds from the Cloudflare copy repo.
2. Production Cloudflare URL returns HTTP 200.
3. Mobile layout works.
4. PWA manifest/service worker loads where the app supports PWA.
5. Images/assets load with no broken remote-host rules.
6. Navigation and Toolbox tab behavior work.
7. Any Supabase data/auth/storage still works.
8. API endpoints work without exposing secrets to the browser.
9. Vercel production URL remains unchanged and available if the Vercel account is enabled.
10. Only after steps 1-8 pass, update the Cloudflare Toolbox card URL.

## Account-level actions still required

These cannot be completed by the current ChatGPT connectors:

1. Create the new `*-cloudflare` GitHub repositories.
2. Copy each `cloudflare-pages-prep` branch into the new repo's default branch.
3. Create/connect the Cloudflare Pages/Workers projects because the Cloudflare app integration is not available on this ChatGPT account.
4. Add Cloudflare environment variables/secrets/bindings.
5. Record the account-specific `workers.dev` URLs for OpenNext/Python Worker projects.
6. Run live deployment verification and then finalize Cloudflare Toolbox links.

No Vercel project or production branch should be deleted, renamed, or repointed during this process.
