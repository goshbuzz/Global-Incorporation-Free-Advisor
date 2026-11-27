/**
 * Renders the brand SVGs in `brand/` into every favicon / logo / social-card
 * size the site ships in `public/`.
 *
 *   node scripts/build-brand-assets.mjs
 *
 * The generated files are committed, so this only needs to run when a brand SVG
 * changes. `@resvg/resvg-js` is a devDependency — the production build never
 * touches it. `favicon.ico` additionally needs ImageMagick (`convert`); the
 * script skips that one file with a warning when it is not installed.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brandDir = path.join(root, 'brand');
const outDir = path.join(root, 'public');

function render(svgFile, targetWidth) {
  const svg = fs.readFileSync(path.join(brandDir, svgFile), 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: targetWidth },
    font: { loadSystemFonts: true, defaultFontFamily: 'DejaVu Sans' },
  });
  return Buffer.from(resvg.render().asPng());
}

function writeFile(name, data) {
  const file = path.join(outDir, name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
  const kb = (data.length / 1024).toFixed(1).padStart(6);
  console.log(`  wrote public/${name.padEnd(26)} ${kb} kB`);
}

console.log('\nBrand assets\n');

// Favicon chain — served at 16–32 CSS px in tabs, bookmarks and search results,
// so it uses the optical (bolder, larger) variant. `favicon.svg` is what modern
// browsers and crawlers read first.
writeFile('favicon.svg', Buffer.from(fs.readFileSync(path.join(brandDir, 'icon-bold.svg'))));
for (const size of [16, 32, 48]) {
  writeFile(`favicon-${size}x${size}.png`, render('icon-bold.svg', size));
}

// Full-detail logo, used wherever the mark is large enough for the hairlines.
writeFile('logo.svg', Buffer.from(fs.readFileSync(path.join(brandDir, 'icon.svg'))));

// Home-screen / PWA icons. `any` keeps the rounded tile, `maskable` is a
// full-bleed tile so Android can crop it without clipping the mark.
writeFile('apple-touch-icon.png', render('icon-maskable.svg', 180));
writeFile('icon-192.png', render('icon.svg', 192));
writeFile('icon-512.png', render('icon.svg', 512));
writeFile('maskable-icon-512.png', render('icon-maskable.svg', 512));

// Logos for structured data (Google wants a square mark; a wide lockup is the
// optional second entry) and for social / LLM link cards.
writeFile('logo.png', render('icon.svg', 600));
writeFile('logo-wide.png', render('logo-lockup.svg', 1200));
writeFile('og-image.png', render('og-image.svg', 1200));

// Legacy .ico for crawlers and browsers that ignore <link rel="icon">.
try {
  const tmp = fs.mkdtempSync(path.join(root, '.brand-'));
  const sheets = [16, 24, 32, 48, 64, 128, 256].map((size) => {
    const file = path.join(tmp, `${size}.png`);
    fs.writeFileSync(file, render(size >= 192 ? 'icon.svg' : 'icon-bold.svg', size));
    return file;
  });
  const ico = execFileSync(
    'convert',
    ['-define', 'icon:auto-resize=16,24,32,48,64,128,256', ...sheets, 'ico:-'],
    { maxBuffer: 1 << 26 },
  );
  writeFile('favicon.ico', Buffer.from(ico));
  fs.rmSync(tmp, { recursive: true, force: true });
} catch (error) {
  console.warn(`  skipped public/favicon.ico — needs ImageMagick (${error.message?.slice(0, 60)})`);
}

console.log('\nDone. Files in public/ are the served copies.\n');
