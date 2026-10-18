// One-off: turns the research downloads into web-sized images in public/img.
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const R = 'research/images';
const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

// [output name, source file, optional crop as fractions {l,t,w,h}]
const photos = [
  ['table-spread', 'site/ALL_ROADS_JULY_2026_lateef.photography-55_1787599068.JPG'],
  ['table-overhead', 'site/ALL_ROADS_JULY_2026_lateef.photography-60_2_1787599068.JPG'],
  ['table-evening', 'site/2026-08-24_20-12-45_1787598790.jpg'],
  ['cauliflower', 'site/ALL_ROADS_JULY_2026_lateef.photography-22_1787599061.JPG'],
  ['lamb-ribs', 'site/ALL_ROADS_JULY_2026_lateef.photography-31_1787599070.JPG'],
  ['clams', 'site/ALL_ROADS_JULY_2026_lateef.photography-36_1787600117.JPG'],
  ['cocktail-pour', 'site/ALL_ROADS_JULY_2026_lateef.photography-64_2_1787599723.JPG'],
  ['cocktail-red', 'site/ALL_ROADS_JULY_2026_lateef.photography-81_1787599929.JPG'],
  ['drinks-trio', 'site/Drinks_Trio_2__1787598893.jpg'],
  ['room-bar-curtain', 'site/ALL_ROADS_29_1787596489.JPEG'],
  ['room-windows', 'site/ALL_ROADS_24_1787601064.JPEG'],
  ['room-counter', 'site/ALL_ROADS_27_1787597901.JPEG'],
  ['shopfront', 'site/Exterior_8__1787595554.JPEG'],
  ['shopfront-street', 'site/ALL_ROADS_X_TAKENBYTAY_2_1779042938.jpg'],
  ['dj', 'site/2026-08-24_21-41-36_1787604111.jpg'],
  ['sc-summertimes', 'supperclub/event109-EHZGOXSAWXH4Q4A6TZPHVRRL.jpeg'],
  ['sc-friendsgiving', 'supperclub/event110-6SVP4BNP4PS2JVWEOLGQDB7X.jpeg'],
  ['sc-birthday', 'supperclub/event159-NJR2FM4WYLA4EONUML3FLY7Y.png'],
  ['sc-sounds', 'supperclub/event160-EMK2DWEGDJPGSUU2IVUNDS2Q.png'],
  ['sc-finale', 'supperclub/event124-7MMAEIDB3PERUP3HYEZT5NG2.jpeg'],
  ['sc-finale-menu', 'supperclub/event124-2VIDNIJPRAJNG6OAXXFPNKVT.jpeg'],
  ['sc-toast', 'supperclub/event160-LMINKV4K6Y7OS5RVR6XXIZEA.jpeg'],
  ['sc-decks', 'supperclub/event160-MCB2OG7HPBNSS2OEWFMDIB5A.jpeg'],
  ['sc-crowd', 'supperclub/event160-NZZPHZDWZ5JRWPNBFFKVYUIJ.jpeg'],
  ['sc-dancing', 'supperclub/event160-SENDC5S2HNYRCYMIIOZQXM3G.jpeg'],
  ['sc-family', 'supperclub/event161-6SQR3EXK5CNL2YSLU6TVKVSJ.jpeg'],
  ['merch-vinyl-tee', 'merch/115-ar-vinyl-tee-1.jpg'],
  ['merch-vinyl-tote', 'merch/116-ar-vinyl-tote-0.jpg'],
  ['merch-box-tee', 'merch/117-ar-box-logo-tee-0.jpg'],
  ['merch-box-tee-decks', 'merch/117-ar-box-logo-tee-3.jpg'],
  ['merch-cap', 'merch/118-ar-logo-6-panel-cap-0.jpg'],
  ['merch-keyring', 'merch/119-ar-long-logo-keyring-0.jpg'],
  ['merch-mug', 'merch/121-ar-retro-mug-4.jpg'],
  ['menu-food', 'site/2026-06-02_19-37-51_1780425515.jpg'],
  // Press: only where their own photos have nothing equivalent (see research/notes.md)
  ['founders', 'press/restaurantonline-01.jpg'], // credited "©All Roads" by Restaurant Online
  ['room-service', 'press/nudge-01.jpg'], // The Nudge, the curtain with the room in service
  // Their Instagram (only 640px, so used small)
  ['ig-cobbler', 'instagram/05_DdnvdX3iEVQ.jpg'],
];

for (const [name, src] of photos) {
  if (existsSync(join(OUT, `${name}-1440.webp`))) continue;
  const img = sharp(join(R, src)).rotate();
  for (const w of [720, 1440]) {
    await img.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(join(OUT, `${name}-${w}.webp`));
  }
  const meta = await sharp(join(R, src)).metadata();
  console.log(name, meta.width, meta.height);
}

// Logo: the hand-drawn 3D wordmark is brick red on white. Knock out the white
// around it (flood fill from the edges) and turn the letter faces cream, so it
// sits on the dark green or burgundy the way it does on the shopfront.
async function logo(outName, ink, face) {
  const { data, info } = await sharp(join(R, 'site/ALLROADSLOGO_1712790224.jpg'))
    .extract({ left: 60, top: 720, width: 1660, height: 400 })
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const lum = (i) => (data[i] + data[i + 1] + data[i + 2]) / 3;
  const outside = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
  while (stack.length) {
    const p = stack.pop();
    if (outside[p] || lum(p * 4) < 150) continue;
    outside[p] = 1;
    const x = p % W, y = (p / W) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < W - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - W);
    if (y < H - 1) stack.push(p + W);
  }
  for (let p = 0; p < W * H; p++) {
    const i = p * 4;
    const t = Math.min(1, Math.max(0, (lum(i) - 90) / 140)); // 0 = ink, 1 = paper
    if (outside[p]) {
      data[i] = ink[0]; data[i + 1] = ink[1]; data[i + 2] = ink[2];
      data[i + 3] = Math.round(255 * (1 - t));
    } else {
      data[i] = Math.round(ink[0] + (face[0] - ink[0]) * t);
      data[i + 1] = Math.round(ink[1] + (face[1] - ink[1]) * t);
      data[i + 2] = Math.round(ink[2] + (face[2] - ink[2]) * t);
      data[i + 3] = 255;
    }
  }
  const buf = await sharp(data, { raw: { width: W, height: H, channels: 4 } }).trim().png().toBuffer();
  await sharp(buf).toFile(join(OUT, `${outName}.png`));
  await sharp(buf).resize({ width: 900 }).webp({ quality: 90, alphaQuality: 100 }).toFile(join(OUT, `${outName}-900.webp`));
  return buf;
}

await logo('logo-brick', [180, 78, 55], [255, 247, 219]);
console.log('logo done');
