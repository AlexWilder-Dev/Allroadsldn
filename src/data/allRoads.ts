// Everything the site says about All Roads lives here: contact, hours, what's on,
// menus, merch and the supper club history. Sources are noted in research/notes.md.

export const venue = {
  name: 'All Roads',
  tagline: 'Modern comfort dining',
  description:
    'A modern comfort dining concept that captures the feel good essence of family gatherings.',
  founders: ['Malika Green', 'Paschelle Brown'],
  opened: 'May 2026',
  openedOn: '6 May 2026',
  covers: 35,
  address: {
    line1: '44 Atlantic Road',
    line2: 'Brixton Village',
    city: 'London',
    postcode: 'SW9 8JN',
  },
  phone: '07913 172857',
  phoneHref: 'tel:+447913172857',
  email: 'info@allroadsldn.com',
  instagram: { handle: '@allroads_ldn', url: 'https://www.instagram.com/allroads_ldn' },
  tiktok: { handle: '@allroadsldn', url: 'https://www.tiktok.com/@allroadsldn' },
  bookingUrl:
    'https://www.sevenrooms.com/explore/allroads/reservations/create/search/?venues=allroads',
  vouchersUrl: 'https://squareup.com/gift/MLDHA6WME8Z8P/order',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=All+Roads+44+Atlantic+Road+London+SW9+8JN',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=All+Roads+44+Atlantic+Road+London+SW9+8JN',
};

export const houseRules = [
  'Last orders 30 minutes before closing.',
  'Card payments only.',
  'A 12.5% discretionary service charge is added to the bill.',
  '£2 for unlimited still or sparkling filtered water, poured as you need.',
  'Tell your server about any allergies before ordering.',
];

// ---------------------------------------------------------------- hours

export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type Session = { label: string; open: string; close: string };

export type Happening = {
  id: 'djs' | 'bottomless';
  title: string;
  days: Weekday[];
  start: string;
  end: string;
  detail: string;
  price?: string;
  options?: string[];
};

export const weekdays: Weekday[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const hours: Record<Weekday, Session[]> = {
  Monday: [],
  Tuesday: [],
  Wednesday: [{ label: 'Dinner', open: '17:00', close: '22:00' }],
  Thursday: [{ label: 'Dinner', open: '17:00', close: '22:00' }],
  Friday: [
    { label: 'Lunch', open: '12:00', close: '15:00' },
    { label: 'Dinner', open: '17:00', close: '23:00' },
  ],
  Saturday: [{ label: 'All day', open: '12:00', close: '23:00' }],
  Sunday: [{ label: 'All day', open: '12:00', close: '18:00' }],
};

export const lastOrdersMinutes = 30;

export const happenings: Happening[] = [
  {
    id: 'bottomless',
    title: 'Bottomless cocktails',
    days: ['Saturday', 'Sunday'],
    start: '12:00',
    end: '16:00',
    price: '£28pp',
    detail: '60 minutes, with a proper meal. Reservations highly recommended.',
    options: ['Prosecco', 'Spiked Rum Iced Tea', 'Grape Tequila Lemonade'],
  },
  {
    id: 'djs',
    title: 'Live DJs',
    days: ['Friday', 'Saturday'],
    start: '19:00',
    end: '23:00',
    detail: 'Every Friday and Saturday night.',
  },
];

// What each kind of day is for, shown in the "tonight" panel.
export type DayMood = 'closed' | 'midweek' | 'friday' | 'saturday' | 'sunday';

export const dayMood: Record<Weekday, DayMood> = {
  Monday: 'closed',
  Tuesday: 'closed',
  Wednesday: 'midweek',
  Thursday: 'midweek',
  Friday: 'friday',
  Saturday: 'saturday',
  Sunday: 'sunday',
};

// `aside` lines are their own Instagram captions.
export const moodCopy: Record<DayMood, { title: string; line: string; aside?: string }> = {
  closed: {
    title: 'Closed',
    line: 'We’re closed on Mondays and Tuesdays. The kitchen is back on Wednesday at five.',
    aside: 'back open Wednesday at 5!',
  },
  midweek: {
    title: 'Midweek dinner',
    line: 'Dinner from five. The whole menu, plates to share, and last orders at half nine.',
    aside: 'came for dinner / accidentally made a night out of it.',
  },
  friday: {
    title: 'Friday',
    line: 'Lunch from twelve, dinner from five, and DJs from seven till eleven.',
    aside: 'the nights are getting longer, so why shouldn’t we?',
  },
  saturday: {
    title: 'Saturday',
    line: 'Bottomless cocktails from twelve till four, the kitchen open all day, DJs from seven.',
    aside: 'like it earlier? want it longer? show us - we’ll keep the party going.',
  },
  sunday: {
    title: 'Sunday',
    line: 'Bottomless cocktails from twelve till four, and the kitchen open till six.',
    aside: 'you, me & 60 boozy minutes … bottomless?',
  },
};

// ---------------------------------------------------------------- menus

export type Dish = {
  name: string;
  desc?: string;
  price?: string;
  tags?: string[];
  note?: string;
};

export type MenuSection = { id: string; title: string; dishes: Dish[]; note?: string };

export type MenuSheet = {
  id: 'food' | 'desserts' | 'drinks';
  title: string;
  tone: 'burgundy' | 'green' | 'black';
  sections: MenuSection[];
  footer?: string;
};

// Transcribed from the menu sheets on allroadsldn.com/menus (June 2026).
export const menus: MenuSheet[] = [
  {
    id: 'food',
    title: 'Food',
    tone: 'burgundy',
    sections: [
      {
        id: 'snacks',
        title: 'Snacks',
        dishes: [
          {
            name: 'Whip + Chips',
            tags: ['VE'],
            desc: 'butter bean whip, soy pecans, pickled cherry pepper + cassava chips (n)',
            price: '5',
          },
          { name: 'Mackerel Toast', desc: 'milk bread, tomato jam, torched mackerel', price: '7.5' },
        ],
      },
      {
        id: 'smalls',
        title: 'Smalls',
        dishes: [
          { name: 'Fried Wings', desc: 'sweet tea & herb brined fried whole wings', price: '12' },
          { name: 'Chilli Parm Clams', desc: 'in rich soy + tomato with shaved parmesan', price: '18' },
          { name: 'Creole Shrimp', desc: 'charcoal shrimp head on, in creole trinity butter', price: '13' },
        ],
      },
      {
        id: 'grill',
        title: 'Grill',
        dishes: [
          { name: 'Lamb Ribs', desc: 'pomegranate bbq glaze with parsley and pomegranate', price: '15' },
          {
            name: 'Turkey Skewer',
            desc: 'seasoned turkey breast and thigh with chive and white onion gravy',
            price: '8.5',
          },
          { name: 'Denver Steak', desc: 'cognac + duck xo', price: '23' },
        ],
      },
      {
        id: 'plates',
        title: 'Plates',
        dishes: [
          {
            name: 'Baked Cauliflower',
            tags: ['VE'],
            desc: 'butterbean whip, grape chimichurri, crispy chilli',
            price: '16.5',
          },
          { name: 'House Pot', desc: 'Ask your server' },
          {
            name: 'Pork Chop',
            desc: 'pan-crusted pork loin with pimento and mushroom peppercorn, spiced buttered apple',
            price: '19',
          },
        ],
      },
      {
        id: 'extras',
        title: 'Extras',
        dishes: [
          { name: 'Baked Mac', price: '7' },
          { name: 'Greens', tags: ['VE'], price: '5' },
          { name: 'Cornbread', price: '5.50' },
        ],
      },
    ],
    footer:
      'A 12.5% discretionary service charge will be added to your bill, please let your server know about any allergies before ordering. £2 for unlimited still or sparkling filtered water, poured as you need.',
  },
  {
    id: 'desserts',
    title: 'Desserts',
    tone: 'green',
    sections: [
      {
        id: 'ice-creams',
        title: 'Speciality ice creams',
        note: '6',
        dishes: [
          { name: 'Sorrel Cheesecake' },
          { name: 'Breadfruit & Brown Butter' },
          { name: 'Island Fruit Sorbet', tags: ['VE'], desc: 'peach, soursop & mango' },
        ],
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks',
    tone: 'black',
    sections: [
      {
        id: 'cocktails',
        title: 'Cocktails',
        dishes: [
          { name: 'AR Daiquiri', desc: 'white rum, pineapple & scotch bonnet jam', price: '12.00' },
          { name: 'OG Pre Sour', desc: 'cognac, magnum & port blend, lemon, egg', price: '12.00' },
          { name: 'Salted Caramel', desc: 'tequila, coffee, salted caramel', price: '12.00' },
          {
            name: 'Mad Marge',
            desc: 'tequila blend, lime, chilli & coconut',
            note: 'contains nuts',
            price: '12.00',
          },
          {
            name: 'Mama’s Gun',
            desc: 'gin, grapefruit, honey & thyme',
            note: 'non-alc option available',
            price: '11.50',
          },
          {
            name: 'Spiked Bourbon Tea',
            desc: 'bourbon, sweet tea',
            note: 'non-alc option available',
            price: '11.00',
          },
        ],
      },
      {
        id: 'beer',
        title: 'Beer',
        note: '330ml',
        dishes: [
          { name: 'Pillars Lager', desc: '3.5% ABV', price: '5.50' },
          { name: 'Pillars Pilsner', desc: '4% ABV', price: '6.00' },
          { name: 'Pillars Pale Ale', desc: '4.5% ABV', price: '6.50' },
          { name: 'Lucky Saint', desc: '0.5% ABV', price: '5.50' },
        ],
      },
    ],
    footer:
      'A 12.5% discretionary service charge will be added to your bill, please let your server know about any allergies before ordering. £2 for unlimited still or sparkling filtered water, poured as you need. Card payments only.',
  },
];

export type Wine = { name: string; abv: string; glass?: string; carafe?: string; bottle: string };
export type WineGroup = { colour: string; wines: Wine[] };

// Glass is 125ml, carafe 500ml, bottle 750ml.
export const wines: WineGroup[] = [
  {
    colour: 'Red',
    wines: [
      { name: 'La Bacca Nerello Mascalese', abv: '13%', glass: '5.60', carafe: '24', bottle: '32.50' },
      { name: 'Bodega Urqo Los Durmientes', abv: '13.5%', glass: '6.50', carafe: '26', bottle: '39' },
      { name: 'Quinta da Boa Esperanca Palhete (chilled)', abv: '11.5%', bottle: '46' },
      { name: 'Casa La Alto Garnacha', abv: '14%', bottle: '56.50' },
    ],
  },
  {
    colour: 'White',
    wines: [
      {
        name: 'Il Vello Pecorino, Terre d’Abruzzo IGT',
        abv: '13%',
        glass: '5.50',
        carafe: '21',
        bottle: '30',
      },
      { name: 'Onda Grande Vinho Verde', abv: '11%', glass: '6.00', carafe: '23', bottle: '33.50' },
      { name: 'Pisano Cisplatino Albarino', abv: '12.5%', bottle: '45' },
      { name: 'Teliani Valley Winery 97 Tsolikeouri', abv: '12%', bottle: '47.50' },
    ],
  },
  {
    colour: 'Sparkling',
    wines: [{ name: 'Pressure Point (Pet Nat)', abv: '12%', glass: '7.50', bottle: '43.50' }],
  },
  {
    colour: 'Rosé',
    wines: [{ name: 'Maison Cotes Da Thau', abv: '12%', glass: '6.60', carafe: '25.50', bottle: '39' }],
  },
  {
    colour: 'Orange',
    wines: [{ name: 'Dye Bleeding', abv: '13%', glass: '8.50', carafe: '34', bottle: '50' }],
  },
];

// Dishes with their own photograph from the July 2026 shoot.
export const dishPhotos: { dish: string; section: string; price: string; img: string; alt: string }[] = [
  {
    dish: 'Chilli Parm Clams',
    section: 'Smalls',
    price: '18',
    img: 'clams',
    alt: 'Clams in a soy and tomato sauce under shaved parmesan, in a wide grey bowl',
  },
  {
    dish: 'Baked Cauliflower',
    section: 'Plates',
    price: '16.5',
    img: 'cauliflower',
    alt: 'Baked cauliflower crusted with green chimichurri on a swipe of butterbean whip and chilli oil',
  },
  {
    dish: 'Lamb Ribs',
    section: 'Grill',
    price: '15',
    img: 'lamb-ribs',
    alt: 'Glossy lamb ribs scattered with pomegranate seeds and parsley',
  },
];

// ---------------------------------------------------------------- shop

export type MerchItem = { name: string; price: string; detail: string; img: string; alt: string };

// From the Square store behind allroadsldn.com. All marked out of stock online in October 2026.
export const merch: MerchItem[] = [
  {
    name: 'AR Vinyl Tee',
    price: '£8–£22.50',
    detail: 'All Roads arch logo with the vinyl Modern Soul graphic. Hand printed.',
    img: 'merch-vinyl-tee',
    alt: 'Two tees on hangers printed with the All Roads Modern Soul Kitchen record graphic',
  },
  {
    name: 'AR Vinyl Tote',
    price: '£15',
    detail: 'All Roads Modern Soul tote. Hand printed.',
    img: 'merch-vinyl-tote',
    alt: 'Cream tote bag printed with the Modern Soul Kitchen turntable graphic',
  },
  {
    name: 'AR Box Logo Tee',
    price: '£8–£22.50',
    detail: 'All Roads long logo tee, white or black. Hand printed.',
    img: 'merch-box-tee',
    alt: 'White tee with the All Roads 3D wordmark across the chest',
  },
  {
    name: 'AR Logo 6 Panel Cap',
    price: '£25',
    detail: 'All Roads long logo six-panel snapback. Embroidered.',
    img: 'merch-cap',
    alt: 'Pale cap embroidered with the All Roads logo',
  },
  {
    name: 'AR Retro Mug',
    price: '£12.50',
    detail: 'Curved-top off-white ceramic mug, individually boxed. “Perfect mug!”',
    img: 'merch-mug',
    alt: 'Off-white mugs spelling out All Roads in orange 3D letters',
  },
  {
    name: 'AR Long Logo Keyring',
    price: '£6',
    detail: 'The long logo, on your keys.',
    img: 'merch-keyring',
    alt: 'Person in a white tee holding an All Roads keyring',
  },
];

// ---------------------------------------------------------------- supper club

export type SupperClub = {
  id: string;
  date: string;
  title: string;
  where: string;
  detail: string;
  img: string;
  alt: string;
};

// From the event poster images and ticket pages still in the All Roads Square store.
export const supperClubs: SupperClub[] = [
  {
    id: 'summertimes',
    date: 'September 2024',
    title: 'Last of the Summertimes',
    where: 'Klose & Soan, Deptford High Street',
    detail: 'Two seatings, £55 or £70 bottomless. Sounds by DJ Pavlos and DJ Mister.',
    img: 'sc-summertimes',
    alt: 'Illustrated poster: hands clinking glasses over bowls of soup, “Last of the Summertimes”',
  },
  {
    id: 'friendsgiving',
    date: '1 December 2024',
    title: 'Friendsgiving',
    where: 'Juliet’s, 110 Mitcham Road, SW17',
    detail: '£55 regular, £70 bottomless. Sounds by DJ Pavlos.',
    img: 'sc-friendsgiving',
    alt: 'Illustrated Friendsgiving poster with a record deck, a vintage car and a £70pp starburst',
  },
  {
    id: 'birthday',
    date: '5 May 2025',
    title: 'All Roads 2nd Birthday',
    where: 'The Marquee Moon, 48 Stoke Newington Road, N16',
    detail: 'Four courses, sides & dessert with bottomless cocktails, £70pp. Two seatings.',
    img: 'sc-birthday',
    alt: 'Illustrated poster for the All Roads 2nd Birthday supper club',
  },
  {
    id: 'sounds',
    date: '5 May 2025',
    title: 'All Roads Sounds afterparty',
    where: 'The Marquee Moon, Stoke Newington',
    detail:
      'Sounds by Donnie Sunshine, DJ Pavlos, Selecta Suave, Mark Ashley, DJ Sambo and Malika Green. £10 with a drink on arrival.',
    img: 'sc-sounds',
    alt: 'Illustrated poster for the All Roads Sounds afterparty with records and dancers',
  },
  {
    id: 'finale',
    date: '30 November 2025',
    title: 'Friendsgiving Finale',
    where: 'Studio Z, Brixton Station Road',
    detail:
      'Seafood chowder, turkey leg with sage & scallion butter, confit duck, hot honey cornbread, pumpkin pie. Four courses with bottomless cocktails, £70pp.',
    img: 'sc-finale',
    alt: 'Illustrated Friendsgiving Finale poster listing the DJs and Studio Z, Brixton',
  },
];

// Lines from their own supper club booking pages.
export const supperClubWords = {
  familyStyle:
    'Starters and desserts are served individually. All mains and sides are served “Family Style,” so get to know the people next to you.',
  vibes: 'Good energy, vibes, and smiles all around; it’s the only way.',
};

// ---------------------------------------------------------------- groups

export const groups = {
  threshold: 7,
  maxOnline: 20,
  line: 'Large parties 7+ and private hire',
  howTo: 'Send an email to info@allroadsldn.com for more details.',
  // From the SevenRooms booking page
  terms: 'Bookings for 7 guests and above will require a deposit and are subject to a minimum spend of £40pp.',
  // Their own Instagram, 5 October 2026
  invite:
    'looking to host a dinner, brunch, birthday, work do ? we’ve got you! good food, good company, family style serves all the fun under one roof',
  occasions: ['Dinner', 'Brunch', 'Birthday', 'Work do', 'Private hire'],
};

// ---------------------------------------------------------------- founders

export const founders = {
  quote:
    'Food for us growing up was always about people. It was how we connected, celebrated, gifted, marked moments - whatever the reason.',
  quoteSource: { outlet: 'Restaurant Online', date: '15 April 2026', url: 'https://www.restaurantonline.co.uk/Article/2026/04/15/all-roads-to-open-first-permanent-restaurant-in-brixton/' },
  kitchens: ['Patty & Bun', 'Daddy Bao', 'Chotto Matte', 'Burger & Beyond', 'Soho House', 'Lai Rai'],
  kitchensSource: { outlet: 'Hot Dinners', url: 'https://www.hot-dinners.com/2026041514982/Gastroblog/Latest-news/all-roads-restaurant-opening-london-brixton' },
  malika: 'Sometimes I cook / Sometimes I DJ',
};

// ---------------------------------------------------------------- their words

// From @allroads_ldn captions and bio, autumn 2026.
export const theirWords = {
  bio: 'there’s no place like this',
  doors: 'doors open at 5',
  stay: 'come stay a while',
  company: 'good food & good company',
  night: 'came for dinner / accidentally made a night out of it.',
  djs: 'like it earlier? want it longer? show us - we’ll keep the party going.',
  bottomless: 'it’s full glasses only over here don’t be shy',
};

// Specials posted on Instagram. Dated so nobody mistakes them for the fixed menu.
export const fromThePass = {
  date: '23 September 2026',
  url: 'https://www.instagram.com/p/DdnvdX3iEVQ/',
  items: [
    {
      name: 'Peach cobbler',
      desc: 'super soaked, jammy sponge with real peach and nectarine pieces. topped with vanilla gelato, rich peach reduction and mint oil',
    },
    {
      name: 'Grilled sardines',
      desc: 'w/ pimento, calaloo & anchovy butter served w/ fennel & cho cho white pickle',
    },
  ],
};

// ---------------------------------------------------------------- press

export type PressItem = {
  outlet: string;
  score: string;
  quote: string;
  by: string;
  date: string;
  url: string;
};

export const press: PressItem[] = [
  {
    outlet: 'The Nudge',
    score: '8.1',
    quote: 'already, All Roads feels like a restaurant Brixton Market’s been waiting for.',
    by: 'Immy Smith',
    date: '28 May 2026',
    url: 'https://thenudge.com/all-roads/',
  },
  {
    outlet: 'Time Out',
    score: '4/5',
    quote: 'It feels less like a formal opening and more like an extension of their living room',
    by: 'Elaine Zhao',
    date: 'June 2026',
    url: 'https://www.timeout.com/london/restaurants/all-roads',
  },
  {
    outlet: 'The Infatuation',
    score: '7.7',
    quote: 'the fried chicken wings are some of London’s best',
    by: 'Sinéad Cranna',
    date: '10 July 2026',
    url: 'https://www.theinfatuation.com/london/reviews/all-roads',
  },
];

export const roomQuote = {
  quote:
    'a plush, burgundy curtain, which is drawn if the space needs to be made smaller. When it’s opened up, the room is big enough for 35 covers so it feels roomy but without losing any of its intimacy.',
  outlet: 'The Nudge',
  url: 'https://thenudge.com/all-roads/',
};
