// Checks the built page carries every link-preview tag, with absolute URLs,
// and that og.jpg is a 1200x630 JPEG under 300KB.
import sharp from 'sharp';
import { readFileSync, statSync } from 'node:fs';

const SITE = (process.env.SITE_URL || 'https://alexwilder-dev.github.io/all-roads/').replace(/\/?$/, '/');
const html = readFileSync('dist/index.html', 'utf8');
const head = html.slice(0, html.indexOf('</head>'));
let failed = false;
const fail = (msg) => {
  failed = true;
  console.log('✗', msg);
};
const ok = (msg) => console.log('✓', msg);

const meta = (attr, key) => {
  const re = new RegExp(`<meta[^>]*${attr}="${key}"[^>]*content="([^"]*)"`, 'i');
  return head.match(re)?.[1];
};

if (/<title>[^<]+<\/title>/.test(head)) ok('title');
else fail('title');

const required = [
  ['name', 'description'],
  ['property', 'og:type', 'website'],
  ['property', 'og:site_name'],
  ['property', 'og:title'],
  ['property', 'og:description'],
  ['property', 'og:url', SITE, true],
  ['property', 'og:image', `${SITE}og.jpg`, true],
  ['property', 'og:image:width', '1200'],
  ['property', 'og:image:height', '630'],
  ['property', 'og:image:alt'],
  ['name', 'twitter:card', 'summary_large_image'],
  ['name', 'twitter:title'],
  ['name', 'twitter:description'],
  ['name', 'twitter:image', `${SITE}og.jpg`, true],
];
for (const [attr, key, expected] of required) {
  const value = meta(attr, key);
  if (!value) fail(`${key} missing`);
  else if (expected && value !== expected) fail(`${key} is "${value}", expected "${expected}"`);
  else ok(`${key} = ${value}`);
}

for (const rel of ['icon', 'apple-touch-icon']) {
  const hrefs = [...head.matchAll(new RegExp(`<link[^>]*rel="${rel}"[^>]*href="([^"]*)"`, 'gi'))].map((m) => m[1]);
  if (!hrefs.length) fail(`${rel} missing`);
  for (const h of hrefs) (h.startsWith(SITE) ? ok : fail)(`${rel} ${h}`);
}

if (/%BASE_URL%/.test(head)) fail('%BASE_URL% left in head');
for (const m of head.matchAll(/<meta[^>]*content="([^"]*\.(?:jpg|png))"/gi)) {
  if (!m[1].startsWith('https://')) fail(`relative image URL ${m[1]}`);
}

const og = await sharp('dist/og.jpg').metadata();
const kb = statSync('dist/og.jpg').size / 1024;
if (og.format === 'jpeg' && og.width === 1200 && og.height === 630 && kb < 300) {
  ok(`og.jpg ${og.width}x${og.height} ${og.format} ${kb.toFixed(0)}KB`);
} else fail(`og.jpg ${og.width}x${og.height} ${og.format} ${kb.toFixed(0)}KB`);

if (/ntfy\.sh/.test(html.slice(html.indexOf('</head>')))) ok('demo ping before </body>');
else fail('demo ping missing');

process.exit(failed ? 1 : 0);
