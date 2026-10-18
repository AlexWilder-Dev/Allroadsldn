// One-off: builds the link-preview image (public/og.jpg, 1200x630) and the
// favicons from their own photo and logo. Run after prepare-images.mjs.
import sharp from 'sharp';
import { statSync } from 'node:fs';

const LOGO = 'public/img/logo-brick.png';
const BURGUNDY = { r: 87, g: 43, b: 50 };

// The little house from their menu, as in src/components/HouseMark.tsx.
const house = (stroke, width) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 96" width="${width}" height="${Math.round((width * 96) / 124)}"
  fill="none" stroke="${stroke}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M17 44V20h7v15"/>
  <path d="M20.5 17c-5-6 3-11 8-7 4 3 1 9-3 7-3-2 0-7 6-8 8-1 13 6 22 3"/>
  <path d="M8 50 32 28l24 22M8 50v38h48V50M32 28h62l20 22H56M114 50v38H56"/>
  <path d="M20 88V62c0-3 3-6 6-6s6 3 6 6v26"/>
  <g stroke-width="1.4"><rect x="64" y="58" width="21" height="21"/><path d="M71 58v21M78 58v21M64 65h21M64 72h21"/></g>
  <g fill="${stroke}" stroke="none"><rect x="64" y="58" width="7" height="7"/><rect x="78" y="58" width="7" height="7"/>
  <rect x="71" y="65" width="7" height="7"/><rect x="64" y="72" width="7" height="7"/><rect x="78" y="72" width="7" height="7"/></g>
  <circle cx="100" cy="70" r="9.5"/><circle cx="100" cy="70" r="1.6" fill="${stroke}"/><path d="M110 56v6l-6 5"/>
</svg>`);

// ---------------------------------------------------------------- og.jpg

const W = 1200;
const H = 630;

// Their table-spread shot from the July 2026 shoot, cropped to the plates.
const photo = await sharp('research/images/site/ALL_ROADS_JULY_2026_lateef.photography-60_2_1787599068.JPG')
  .rotate()
  .extract({ left: 0, top: 600, width: 2400, height: 1800 })
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .modulate({ brightness: 0.92, saturation: 1.05 })
  .toBuffer();

// The logo sits on a green sign in the middle, like the shopfront fascia, so it
// survives the square crops some apps make of preview images.
const SIGN_W = 640;
const SIGN_H = 250;
const logo = await sharp(LOGO).resize({ width: 540 }).toBuffer();
const logoMeta = await sharp(logo).metadata();
const sign = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${SIGN_W}" height="${SIGN_H}">
  <rect width="${SIGN_W}" height="${SIGN_H}" rx="10" fill="#24503a"/>
  <rect x="9" y="9" width="${SIGN_W - 18}" height="${SIGN_H - 18}" rx="5" fill="#132a1f"/>
  ${Array.from({ length: 13 }, (_, i) => `<rect x="${9 + i * 48 + 46}" y="9" width="2" height="${SIGN_H - 18}" fill="#000" fill-opacity="0.14"/>`).join('')}
</svg>`);
const signLeft = (W - SIGN_W) / 2;
const signTop = (H - SIGN_H) / 2;

await sharp(photo)
  .composite([
    { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#000" fill-opacity="0.12"/></svg>`), left: 0, top: 0 },
    { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIGN_W + 60}" height="${SIGN_H + 60}"><rect x="30" y="40" width="${SIGN_W}" height="${SIGN_H}" rx="12" fill="#000" fill-opacity="0.45"/></svg>`), left: signLeft - 30, top: signTop - 30, blend: 'multiply' },
    { input: sign, left: signLeft, top: signTop },
    { input: logo, left: Math.round((W - logoMeta.width) / 2), top: Math.round((H - logoMeta.height) / 2) },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og.jpg');

const og = await sharp('public/og.jpg').metadata();
console.log('og.jpg', og.width, 'x', og.height, Math.round(statSync('public/og.jpg').size / 1024) + 'KB');

// ---------------------------------------------------------------- favicons

// Their app icon is the wordmark on burgundy. At favicon sizes the long word
// needs stacking, so split the logo into ALL / ROADS.
const full = sharp(LOGO);
const { width: lw, height: lh } = await full.metadata();
const SPLIT = 584;
const all = await sharp(LOGO).extract({ left: 0, top: 0, width: SPLIT, height: lh }).trim().toBuffer();
const roads = await sharp(LOGO).extract({ left: SPLIT, top: 0, width: lw - SPLIT, height: lh }).trim().toBuffer();

async function icon(size, file) {
  const pad = Math.round(size * 0.1);
  const inner = size - pad * 2;
  const r = await sharp(roads).resize({ width: inner }).toBuffer();
  const rm = await sharp(r).metadata();
  const a = await sharp(all).resize({ height: rm.height }).toBuffer();
  const am = await sharp(a).metadata();
  const gap = Math.round(size * 0.02);
  const top = Math.round((size - (am.height + gap + rm.height)) / 2);
  await sharp({ create: { width: size, height: size, channels: 4, background: { ...BURGUNDY, alpha: 1 } } })
    .composite([
      { input: a, left: Math.round((size - am.width) / 2), top },
      { input: r, left: pad, top: top + am.height + gap },
    ])
    .png()
    .toFile(file);
  console.log(file);
}

await icon(32, 'public/favicon-32.png');
await icon(192, 'public/favicon-192.png');
await icon(180, 'public/apple-touch-icon.png');
