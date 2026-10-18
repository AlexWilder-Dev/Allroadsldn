# All Roads: research notes

Researched 18 October 2026. Everything on the demo site traces back to a source listed here.

## Sources

| Source | How | What it gave |
| --- | --- | --- |
| allroadsldn.com (Square Online) | Rendered in headless Chromium. Text and screenshots are in `rendered/` | Hours, phone, bottomless offer, DJ nights, groups policy, vouchers link, menu images, venue photos, logo, colours and fonts |
| Square store API behind the site | `square-api/products_v28.json` | All 15 products: 6 merch items (all out of stock online) and 9 old supper club and party ticket pages, with dates, venues, DJs, menus and terms |
| `/shop/` category pages | Rendered | Every category is empty ("Items aren't available for sale yet") |
| Instagram @allroads_ldn | Rendered while logged out. The latest 12 captions are in `instagram/captions.txt` and the images in `images/instagram/` | Their voice, recent specials, the bottomless and DJ posts, the group bookings push |
| SevenRooms | Rendered. See `listings/sevenrooms*.txt` and the screenshot | The link loads ("Reservation at All Roads"). Parties of 1–20. Deposit and £40pp minimum spend for 7+. Seating options are Low Bar, Main Dining and Outdoor. Bottomless rules |
| Google Maps listing | Rendered, `listings/google-maps*.txt` | 4.7 from 101 reviews. Same hours and phone as their site |
| The Nudge, 28 May 2026 (Immy Smith) | Page and photos | Score 8.1. Descriptions of the room. Food praise and one criticism |
| Time Out, June 2026 (Elaine Zhao) | Page and photos | 4/5. "an extension of their living room". The house pot is "an ever-changing communal stew" |
| The Infatuation, 10 July 2026 (Sinéad Cranna) | Page | 7.7. "the fried chicken wings are some of London's best" |
| Restaurant Online, 15 April 2026 | Page and photos | The founders' quote, confirmed and attributed jointly to Green and Brown. Founders photo credited "©All Roads" |
| Hot Dinners, 15 April 2026 | Page | Opened 6 May 2026. Founders' previous kitchens |
| Brixton Village trader page | Page and photo | Their description ("a modern comfort kitchen…"). Wed/Thu listed to 21:30, which is last orders |
| London On The Inside, Harden's, H&C News, Fact, Dine Out, SquareMeal | Pages | Repeat the launch facts. SquareMeal's hours conflict with everything else, so I ignored them |

**Could not reach:** Instagram posts older than the latest 12, and story highlights (logged-out view). Picuki and imginn returned 403. The TikTok @allroadsldn video list came back empty, though its reposts loaded. The Hoxton "Soulful Sundays" page returned 404. web.archive.org reset the connection. No TripAdvisor or OpenTable listing exists.

## Hours (confirmed)

Their own contact page and Google agree: Mon and Tue closed. Wed and Thu 17:00–22:00. Fri 12:00–15:00 and 17:00–23:00. Sat 12:00–23:00. Sun 12:00–18:00. Their site adds: "Last orders are taken 30 minutes before closing". That explains the "Wed–Thu 5–9:30pm" in the listings: 9:30 is last orders, not closing. SquareMeal's hours (Wed–Fri 17:00–23:30, Sun to 17:00) disagree with every other source and I didn't use them.

The phone number **07913 172857** is on their contact page and on Google. The earlier brief said none existed.

## The room

- Inside Brixton Village where the market opens onto Atlantic Road, near Fish Wings & Tings and beside the Market Row entrance (The Nudge, SevenRooms). Time Out calls it a former corner shop.
- The shopfront has a dark green fascia with red "ALL ROADS" lettering. "MODERN COMFORT DINING" is arched across the window, and the hoarding art says "SEE WHAT'S COOKING" (photos).
- Inside, from their photos and The Nudge: walls painted a muted, dusty terracotta-pink. A bar with green subway tiles and a concrete top, with wooden stools. Old white tiles with a decorative frieze. Exposed brick at the back and behind the bar. A terrazzo floor. Tall windows onto the market arcade. Industrial pendants.
- The curtain. The Nudge: "a plush, burgundy curtain, which is drawn if the space needs to be made smaller. When it's opened up, the room is big enough for 35 covers so it feels roomy but without losing any of its intimacy." It hangs at the back, in front of the brick room.
- 35 covers plus a terrace. SevenRooms offers Low Bar Seating, Main Dining and Outdoor.
- Music: The Nudge heard the Brothers Johnson. Time Out heard "soft R&B tunes". A Google review: "felt like I was in Harlem". DJs Fri and Sat 7–11pm.

## How they talk about themselves

- **The website (sentence case, plain):** "Modern Comfort". "A modern comfort dining concept that captures the feel good essence of family gatherings." "Reservations highly recommended".
- **The supper club ticket pages (warm, practical):** "All mains and sides are served 'Family Style,' so get to know the people next to you." "Good energy, vibes, and smiles all around; it's the only way." The supper club's strapline was "Modern Soul Kitchen", which is also on the merch ("est 2021").
- **Instagram (all lowercase, short broken lines, sign off with "x"):** "doors open at 5", "come stay a while", "came for dinner / accidentally made a night out of it", "good food & good company", "no place like this x", "see you soon x", "modern comfort favourites, close and local", "moco distro" (modern comfort district), "it's full glasses only over here don't be shy". Bio: "there's no place like this".
- **Founders, to the press:** "Food for us growing up was always about people. It was how we connected, celebrated, gifted, marked moments - whatever the reason." They want to welcome "longstanding supper club guests, new faces and the wider community."
- **Their print:** condensed all-caps headings (Bebas-style). A Minion-like serif for dish descriptions. Helvetica bold for prices. Two filled burgundy labels (SMALLS, PLATES) and a solid burgundy box for EXTRAS. A huge vertical "FOOD" or "DESSERTS". A single thin line that runs from a little house's chimney through the whole menu and loops. The house has a turntable and a checked window, and it is also their favicon.

## Who comes when

- **Wed–Thu, dinner only, 5–10.** The quiet end of the week. Instagram keeps pushing it: "doors open at 5", "back open Wednesday at 5!", "came for dinner / accidentally made a night out of it", "week's done, now come get comfy". Time Out says "ideal for dates". The Infatuation: "come in a hoodie, eat a pile of wings solo if you want". Midweek is for dates, locals and casual dinners.
- **Fri.** Lunch 12–3, then dinner, with DJs 7–11.
- **Sat.** Open 12–11. Bottomless cocktails or prosecco from 12 to 4 at £28pp for 60 minutes, with a "substantial meal". DJs 7–11. This is groups and birthdays (SquareMeal: "Birthdays, Dates"; ambience "Cool, Fun, Lively").
- **Sun.** 12–6, with bottomless 12–4. In 2025 they ran a "Soulful Sundays" roast residency at Albie (The Hoxton, Southwark), but that comes from a TikTok repost and a search snippet only, so the site doesn't use it.
- **Groups.** Their site says to email for 7+ and private hire. SevenRooms takes up to 20, with a deposit and a £40pp minimum. On 5 Oct their Instagram announced group and party bookings: "silly season is approaching… looking to host a dinner, brunch, birthday, work do? we've got you!"
- **Supper club regulars.** Supper clubs ran from 2023 and sold out at £55–£70. The founders named these guests as the first people they wanted back.

## What reviewers praise, and what they don't

Praised:
- The vibe, which "isn't in anyway staged" (Nudge) and feels like "an extension of their living room" (Time Out).
- The fried wings ("some of London's best", Infatuation).
- The Denver steak ("excellent… ridiculously tender", Nudge).
- The lamb ribs.
- The cauliflower.
- The soursop, peach and mango sorbet ("genuinely fantastic").
- The spicy margarita, which is Mad Marge.
- The mackerel toast (London On The Inside's standout).
- Cocktails generally: Google's top review topic, and Time Out credits Malika Green's drinks background at Daddy Bao and Cafe Kowloon.

Criticised:
- The pork chop ("wasn't quite wowed", Nudge).
- The cornbread ("fall-apart dry", Infatuation).
- The mac on Google ("lacked flavour").
- "A little pricey for the portion size" (Google).

## What's weak in the current site

1. **The home page has no words.** It's a dark green page with a three-photo carousel and footer links. Nothing says what All Roads is, where it is, whether it's open, or how to book. There's no book button on the first screen.
2. **The menu is four JPEGs.** You can't search or zoom it on a phone, screen readers can't read it, and search engines can't index it. The /shop/ menu categories in the sitemap are empty.
3. **Bottomless, DJs and groups** are buried in three dark boxes on /reservations, a page whose only booking control is a small "RESERVATIONS" button.
4. **Hours and phone** live only on /contact-us.
5. **The best assets are unused.** The supper club story, the founders, the press (Nudge 8.1, Time Out 4/5, Infatuation 7.7) and the illustrated supper club posters appear nowhere. Neither do the July 2026 shoot (lateef.photography) and the vocabulary of the menu's own design.
6. **Merch and dead supper club tickets** still sit in the sitemap. Every merch item shows "Out of stock".
7. **Fonts are Square defaults** (Playfair Display and Libre Franklin) and have nothing to do with their print or logo.
8. **Previews are thin.** og:image is a 160px logo PNG and there is no meta description.

## Photos and where they went

Their own photos are the main source. Press photos are used only where nothing of their own covers the subject.

| File (research/images/…) | Shows | Used for |
| --- | --- | --- |
| site/…lateef.photography-55 | Table spread from the side: wings, clams, ribs, cauliflower, cocktails, the paper menu | Home first screen ("shop window" arch) |
| site/…lateef.photography-60 2 | Overhead spread: cauliflower, clams, wings, baked mac, cornbread on blue-and-white china, candle | og.jpg, Sunday panel |
| site/…lateef.photography-36 | Chilli parm clams in a grey bowl | Dish strip |
| site/…lateef.photography-22 | Baked cauliflower, chimichurri, butterbean whip | Dish strip |
| site/…lateef.photography-31 | Lamb ribs, pomegranate | Dish strip |
| site/…lateef.photography-64 2 | Red cocktail being poured | Saturday panel |
| site/…lateef.photography-81 | Red cocktail with a grapefruit twist on a concrete ledge | Bar section |
| site/Drinks Trio (2) | Sour, coffee cocktail and red cocktail on a table | Bar section |
| site/2026-08-24_20-12-45 | The same spread, evening | Spare |
| site/2026-08-24_21-41-36 | DJ in headphones with a can, white tiles (their "Live DJ's" image) | Friday panel |
| site/ALL ROADS_29 | Green tiled bar, curtain, brick back room | Room collage |
| site/ALL ROADS_24 | Tables along the windows onto the arcade | Room collage, midweek panel |
| site/ALL ROADS_27 | Counter against green tiles, menus set | Room collage |
| site/Exterior (8) | Shopfront: green fascia, "Modern Comfort Dining" window | Closed-day panel, Visit |
| site/ALL ROADS X TAKENBYTAY 2 | Shopfront with a cyclist blurring past | Room collage |
| site/2026-06-02_19-* | The four menu sheets | Menu transcription, design reference |
| site/ALLROADSLOGO | Hand-drawn 3D wordmark, brick red on white | Logo (knocked out with cream faces), og.jpg, favicons |
| supperclub/event109, 110, 159-NJR, 160-EMK, 124-7MM | Illustrated posters: Last of the Summertimes, Friendsgiving, 2nd Birthday, Sounds afterparty, Friendsgiving Finale | Poster wall |
| supperclub/event124-2VID, 124-7SU, 160-*, 161-* | Finale menu and drinks card. Party photos: toasts, decks, crowd. Venue shots | Reference only |
| merch/* | Their lifestyle shots of the tees, tote, cap, mug and keyring | Merch showcase |
| instagram/05 | Peach cobbler ("just joined the chat") | Menu "Lately on the pass" (small, since the file is 640px) |
| press/restaurantonline-01 | Malika Green and Paschelle Brown outside the shopfront, credited "©All Roads" | Founders and quote. Credited "Photo: All Roads" |
| press/nudge-01 | The room in service, curtain drawn behind diners | Groups page. Credited "Photo: The Nudge" |
| press/nudge-02 to 05, timeout-*, restaurantonline-02 and 03, brixtonvillage-* | Bar close-up, steak, ice cream, dish spreads, founders at a table (uncaptioned), the map | Not used: their own photos cover these |

## Design reasoning

- **Palette.**
  - Deep green `#132a1f` comes from the fascia, their current site, and the dessert sheet ink `#1b3834`.
  - Tile green `#24503a` is the bar.
  - Burgundy `#572b32` is their theme colour, and the food sheet ink is `#4c2b34`.
  - Oxblood and velvet `#5a1019` and `#7a1a26` are the curtain and the logo's shadow `#740e0e`.
  - Brick `#b44e37` is the hand-drawn logo. Terracotta `#c4836f` and plaster `#ead6ca` are the walls.
  - Orange `#dd7d1c` is the logo on their header, mugs and Instagram type. Cream `#fff7db` is the logo face and menu paper.
  - Each section takes one surface from the room: fascia, tiles, terracotta wall, velvet, menu paper.
- **Type.** Bebas Neue for headings, because their menu headers are set in it or something very close. Crimson Pro for dish descriptions, because it is the closest open match to the Minion-style serif on their sheets. Archivo for prices and labels, standing in for their Helvetica-bold price column. The logo itself is the only display lettering. No Square defaults.
- **Layout.**
  - The first screen is the shopfront sign: the arched "Modern comfort dining" from the window, the logo, then status and booking.
  - The menu page reproduces their three printed sheets: burgundy food, green desserts, black drinks. It keeps their filled SMALLS and PLATES labels, the EXTRAS box and the vertical sheet titles. The single winding line from the menu draws itself down the food sheet as you scroll.
  - The house-and-turntable icon, redrawn as SVG, marks the footer, the voucher and the "now" end of the poster wall.
- **Signature interaction 1: the week.** One panel driven by the hours data, opening on today in London time. It changes surface with the kind of day: tiled green for Wed and Thu dinner, velvet with a spinning record for Fri and Sat DJs, terracotta plaster for Sunday, a shutter for Mon and Tue. It shows sessions, last orders, bottomless and DJs, and a booking button worded for that day.
- **Signature interaction 2: the curtain.** The real curtain makes the room smaller. On the site:
  - It draws back to open the menu, once per visit.
  - It closes in as you scroll to the groups teaser.
  - It frames the groups page, then closes fully over the confirmation ("Curtain's drawn").
- **Groups form.** It shows the room's 35 covers as dots, so you can see how much of the room your party takes. It only offers sessions the chosen day actually has.

## Not used, or unknown (left off the site)

- **DJ names for the current Fri/Sat nights.** None are published. Past names (DJ Pavlos, DJ Mister, Mark Ashley, DJ Sambo, Donnie Sunshine, Selecta Suave, Malika Green) appear only on the dated supper club posters.
- **Prices or menus for soft drinks and spirits.** Not published.
- **The House Pot price.** The sheet says "Ask your server".
- **A dedicated Sunday lunch or roast menu.** None found. The Albie residency is unverified.
- **Terrace size, opening months and photos.** None found, so the terrace is mentioned only, with no picture.
- **Private-hire capacity and minimum spend for the whole room.**
- **Upcoming events beyond the weekly DJs and bottomless.** None announced.
- **Which founder is which in photos.** Not stated, so nobody is named individually in a caption.
- **Spelling.** I corrected three typos from the menu sheets: "pomegrante" and "pomergrante" to pomegranate, "turkery" to turkey, "Pllars" to Pillars. Everything else is word for word.
- **Founding year.** The merch says "est 2021", while the press and the "2nd Birthday" in May 2025 point to the supper club starting in 2023. The site says supper clubs from 2023.

## What the owners most want this site to do

1. Turn the first screen into a booking: say what All Roads is, whether it's open right now, and put SevenRooms one tap away on every page.
2. Make Wednesday and Thursday worth booking: a "tonight" view that sells midweek dinner as the full menu, sharing plates and last orders at 9:30, the same push as their "doors open at 5" posts.
3. Sell the weekend and the big tables: DJs, bottomless, terrace, groups of 7+ and private hire, vouchers and merch. Keep supper club regulars close with the story, the posters and the mailing list.
