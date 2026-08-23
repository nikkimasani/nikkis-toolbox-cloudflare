import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const out = join(root, 'cloudflare-dist');
const excluded = new Set([
  '.git', '.github', '.gitignore', '.vercel', '.vercelignore',
  'api', 'functions', 'scripts', 'cloudflare-dist',
  '_worker.js', 'wrangler.jsonc', 'vercel.json', 'package-lock.json', 'node_modules',
]);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (excluded.has(entry.name) || entry.name.startsWith('.env')) continue;
  await cp(join(root, entry.name), join(out, entry.name), { recursive: true });
}

const indexPath = join(out, 'index.html');
let html = await readFile(indexPath, 'utf8');
const cloudflareScript = '<script src="/cloudflare-apps.js"></script>';
if (!html.includes(cloudflareScript)) {
  html = html.replace('</body>', `${cloudflareScript}\n</body>`);
  await writeFile(indexPath, html, 'utf8');
}

console.log('Cloudflare Toolbox bundle created in cloudflare-dist with Cloudflare app URL registry');
