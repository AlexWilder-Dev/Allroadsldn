# All Roads: demo site

A speculative website for **All Roads**, 44 Atlantic Road, Brixton Village, London SW9 8JN: modern comfort dining from chefs Malika Green and Paschelle Brown, and the first permanent home of the All Roads supper club.

Demo only. The menus, hours and events are static data, and the forms show a confirmation without sending anything. Booking links go to the restaurant's existing SevenRooms page, and vouchers link to their existing Square eGift page.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve dist/ at http://localhost:4173/all-roads/
npm run check:meta # verify link-preview tags and og.jpg in dist/
```

Built with Vite, React, TypeScript and Framer Motion. It uses HashRouter so it works on GitHub Pages under `/all-roads/`. Pushing to `main` deploys through `.github/workflows/deploy.yml`.

## Where things live

- `src/data/allRoads.ts`: everything the site says about the restaurant. Contact details, hours, last orders, weekly happenings (DJs, bottomless), the full menu as printed, wines, merch, supper club history, press and group-booking terms. Change it here and the whole site follows, including the open-now status and the week view.
- `src/lib/hours.ts`: open-now logic, always in London time.
- `src/components/Tonight.tsx`: the week view, driven by the hours data.
- `src/components/Curtain.tsx`: the burgundy velvet curtain used on the menu, the groups teaser and the groups page.
- `src/pages/`: Home, Menu, Groups.
- `scripts/prepare-images.mjs`: one-off. Resizes the photos in `research/images/` into `public/img/` and knocks the logo out of its white background.
- `scripts/make-og.mjs`: one-off. Builds `public/og.jpg` (1200×630) and the favicons from their photo and logo.
- `research/`: everything gathered before design. See `research/notes.md` for sources, the room, their voice, the photo list, the design reasoning and what's still unknown. See `research/menu-transcription.md` for the menu word for word.

## Photo credits

Food, drink, room, shopfront, merch and supper club posters belong to All Roads. They come from allroadsldn.com and its Square store, including the July 2026 shoot by lateef.photography. The founders' portrait is credited "©All Roads" via Restaurant Online. The room-in-service photo on the groups page is from The Nudge and is credited on the page.

Site by AlexWilder-Dev.
