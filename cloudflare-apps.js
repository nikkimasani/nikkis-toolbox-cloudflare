// Cloudflare-only app registry for Nikki's Toolbox.
// This file is injected only into the Cloudflare build output. The Vercel
// production branch and its links remain unchanged.
//
// Safety rule: planned Cloudflare URLs do not replace a card until that app has
// passed live Cloudflare verification. After deployment, set verified:true and
// replace url with the exact verified production URL when necessary.
window.NIKKI_CLOUDFLARE_APPS = {
  tradelab: { name: "Nikki's TradeLab", project: "tradelab-cloudflare", type: "pages", plannedUrl: "https://tradelab-cloudflare.pages.dev", url: "https://tradelab-cloudflare.pages.dev", verified: true },
  booknook: { name: "The Book Nook", project: "reader-hub-cloudflare", type: "pages+r2", plannedUrl: "https://reader-hub-cloudflare.pages.dev", url: "https://reader-hub-cloudflare.pages.dev", verified: true },
  pmp: { name: "PMP Boot Camp", project: "pmp-boot-camp-cloudflare", type: "pages", plannedUrl: "https://pmp-boot-camp-cloudflare.pages.dev", url: "https://pmp-boot-camp-cloudflare.pages.dev", verified: true },
  slaterun: { name: "SlateRun Sports Hub", project: "slaterun-cloudflare", type: "pages", plannedUrl: "https://slaterun-cloudflare.pages.dev", url: "https://slaterun-cloudflare.pages.dev", verified: true },
  craftclub: { name: "Dabble", project: "dabble-cloudflare", type: "pages", plannedUrl: "https://dabble-cloudflare.pages.dev", url: "https://dabble-cloudflare.pages.dev", verified: true },
  pmcopilot: { name: "PM Copilot", project: "pm-copilot-cloudflare", type: "pages", plannedUrl: "https://pm-copilot-cloudflare.pages.dev", url: "https://pm-copilot-cloudflare.pages.dev", verified: true },
  lifecommand: { name: "Life OS", project: "life-os-cloudflare", type: "pages", plannedUrl: "https://life-os-cloudflare.pages.dev", url: "https://life-os-cloudflare.pages.dev", verified: true },
  careerarsenal: { name: "Career Arsenal", project: "career-arsenal-cloudflare", type: "workers-opennext", plannedUrl: "https://career-arsenal-cloudflare.nikkimasani.workers.dev", url: "https://career-arsenal-cloudflare.nikkimasani.workers.dev", verified: true },
  drawyourfont: { name: "Draw Your Font", project: "draw-your-font-cloudflare", type: "pages", plannedUrl: "https://draw-your-font-cloudflare.pages.dev", url: "https://draw-your-font-cloudflare.pages.dev", verified: true },
  statvault: { name: "StatVault", project: "statvault-cloudflare", type: "pages-functions", plannedUrl: "https://statvault-cloudflare.pages.dev", url: "https://statvault-cloudflare.pages.dev", verified: true },
  bodycompass: { name: "Body Compass", project: "body-compass-cloudflare", type: "workers-opennext", plannedUrl: "https://body-compass-cloudflare.nikkimasani.workers.dev", url: "https://body-compass-cloudflare.nikkimasani.workers.dev", verified: true },
  makeitpretty: { name: "Make It Pretty", project: "make-it-pretty-cloudflare", type: "pages+python-worker", plannedUrl: "https://make-it-pretty-cloudflare.pages.dev", url: null, verified: false },
  projectmanager: { name: "Nikki Project Manager", project: "nikki-project-manager-cloudflare", type: "pages", plannedUrl: "https://nikki-project-manager-cloudflare.pages.dev", url: "https://nikki-project-manager-cloudflare.pages.dev", verified: true },
  ocode: { name: "OCode", project: "ocode-cloudflare", type: "workers-opennext", plannedUrl: "https://ocode-cloudflare.nikkimasani.workers.dev", url: "https://ocode-cloudflare.nikkimasani.workers.dev", verified: true },
  picommand: { name: "Pi Command Center", project: "pi-command-center-cloudflare", type: "pages", plannedUrl: "https://pi-command-center-cloudflare.pages.dev", url: "https://pi-command-center-cloudflare.pages.dev", verified: true },
  hobonichi: { name: "Hobonichi Planner", project: "hobonichi-planner-cloudflare", type: "pages", plannedUrl: "https://hobonichi-planner-cloudflare.pages.dev", url: "https://hobonichi-planner-cloudflare.pages.dev", verified: true },
  wtm: { name: "WTM | What’s the Move", project: "wtm-whats-the-move-cloudflare", type: "pages-functions", plannedUrl: "https://wtm-whats-the-move-cloudflare.pages.dev", url: "https://wtm-whats-the-move-cloudflare.pages.dev", verified: true }
};

(function applyCloudflareRegistry() {
  document.documentElement.dataset.hosting = 'cloudflare';
  document.title = "Nikki's Toolbox · Cloudflare";
  const masthead = document.querySelector('.masthead .kicker');
  if (masthead) masthead.textContent = 'Personal toolbox · Cloudflare edition';

  for (const [className, app] of Object.entries(window.NIKKI_CLOUDFLARE_APPS)) {
    const card = document.querySelector(`.card.${className}`);
    if (!card) continue;
    const name = card.querySelector('.card-name');
    if (name) name.textContent = app.name;
    card.dataset.cloudflareProject = app.project;
    card.dataset.cloudflareType = app.type;
    card.dataset.hosting = 'cloudflare';
    if (app.verified && app.url) {
      card.href = app.url;
      card.dataset.open = 'newtab';
      card.target = '_blank';
      card.rel = 'noopener';
      card.dataset.cloudflareUrl = app.url;
      delete card.dataset.cloudflarePending;
    } else {
      card.dataset.cloudflarePending = 'true';
      if (app.plannedUrl) card.dataset.cloudflarePlannedUrl = app.plannedUrl;
      card.removeAttribute('href');
      card.setAttribute('aria-disabled', 'true');
      card.setAttribute('aria-label', `${app.name} Cloudflare deployment pending live verification`);
    }
  }
})();
