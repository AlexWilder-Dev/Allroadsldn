import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// The address index.html is written for. The deploy workflow sets SITE_URL to
// wherever GitHub Pages actually serves the repo, and the build follows it.
const CANONICAL = 'https://alexwilder-dev.github.io/all-roads/';
const SITE = (process.env.SITE_URL || CANONICAL).replace(/\/?$/, '/');

const siteUrl = (): Plugin => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.split(CANONICAL).join(SITE),
});

export default defineConfig({
  base: new URL(SITE).pathname,
  plugins: [react(), siteUrl()],
});
