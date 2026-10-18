import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Curtain, useCurtain } from '../components/Curtain';
import { HouseMark } from '../components/HouseMark';
import { ArrowUpRight, Instagram } from '../components/Icons';
import { Img } from '../components/Img';
import {
  fromThePass,
  happenings,
  houseRules,
  menus,
  venue,
  wines,
  type Dish,
  type MenuSheet,
} from '../data/allRoads';
import { formatRange } from '../lib/hours';

const SEEN_KEY = 'ar-curtain-seen';

// The curtain draws back once per visit; after that the menu is just there.
function useOpeningCurtain() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(SEEN_KEY) && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  });
  const curtain = useCurtain(1);
  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* storage can be unavailable; the curtain just plays again */
    }
    const t = window.setTimeout(() => {
      curtain.to(0, 1.5).then(() => setShow(false));
    }, 450);
    return () => window.clearTimeout(t);
  }, [show, curtain]);
  return { show, progress: curtain.progress };
}

const sheetLinks = [
  { id: 'food', label: 'Food' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'wine', label: 'Wine' },
  { id: 'bottomless', label: 'Bottomless' },
];

export function Menu() {
  const { show, progress } = useOpeningCurtain();
  const active = useActiveSheet(sheetLinks.map((l) => l.id));
  const food = menus.find((m) => m.id === 'food')!;
  const desserts = menus.find((m) => m.id === 'desserts')!;
  const drinks = menus.find((m) => m.id === 'drinks')!;
  const bottomless = happenings.find((h) => h.id === 'bottomless')!;

  return (
    <div className="menu-page">
      {show && (
        <div className="menu-curtain">
          <Curtain progress={progress} />
          <motion.p
            className="display menu-curtain__label"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            The menu
          </motion.p>
        </div>
      )}

      <header className="wrap menu-head">
        <p className="kicker">The menu</p>
        <h1 className="display menu-head__title">Everything’s for sharing</h1>
        <p className="lede">
          Snacks and smalls to start, then the grill and the plates, with sides for the middle of the
          table. VE is vegan, (n) contains nuts. Tell your server about any allergies before ordering.
        </p>
      </header>

      <nav className="menu-nav" aria-label="Menu sections">
        <div className="menu-nav__inner">
          {sheetLinks.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`menu-nav__link ${active === l.id ? 'is-active' : ''}`}
              onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {l.label}
              {active === l.id && <motion.span layoutId="menu-nav-dot" className="menu-nav__dot" />}
            </button>
          ))}
        </div>
      </nav>

      <div className="wrap sheets">
        <FoodSheet sheet={food} />
        <DessertSheet sheet={desserts} />
        <DrinksSheet sheet={drinks} />
        <WineSheet />

        <section className="sheet sheet--bottomless" id="bottomless" aria-labelledby="bottomless-title">
          <p className="kicker">Saturday &amp; Sunday · {formatRange(bottomless.start, bottomless.end)}</p>
          <h2 id="bottomless-title" className="display sheet__word-inline">
            Bottomless
          </h2>
          <p className="bottomless__price">
            <span className="display">{bottomless.price?.replace('pp', '')}</span>a head
          </p>
          <p>60 minutes of bottomless cocktails or prosecco, alongside a proper meal.</p>
          <ul className="bottomless__list">
            {bottomless.options?.map((o) => <li key={o} className="display">{o}</li>)}
          </ul>
          <p className="sheet__small">Drink options subject to change. Reservations highly recommended.</p>
          <a className="btn btn--cream" href={venue.bookingUrl} target="_blank" rel="noopener">
            Book a weekend table <ArrowUpRight />
          </a>
        </section>

        <aside className="pass" aria-labelledby="pass-title">
          <figure className="photo pass__photo">
            <Img name="ig-cobbler" alt="Peach cobbler on a blue and white plate, captioned “peach cobbler just joined the chat”" sizes="160px" />
          </figure>
          <p className="kicker">Lately on the pass</p>
          <h2 id="pass-title" className="display pass__title">Specials change</h2>
          <p className="pass__intro">
            From the All Roads Instagram, {fromThePass.date}. Ask what’s on tonight.
          </p>
          <ul>
            {fromThePass.items.map((i) => (
              <li key={i.name}>
                <span className="pass__name">{i.name}</span> {i.desc}
              </li>
            ))}
          </ul>
          <a className="textlink" href={fromThePass.url} target="_blank" rel="noopener">
            <Instagram className="pass__icon" /> See the post
          </a>
        </aside>

        <ul className="menu-rules">
          {houseRules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function useActiveSheet(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

// ------------------------------------------------------------------ sheets

function DishRow({ d }: { d: Dish }) {
  return (
    <li className="row">
      <p className="row__text">
        <span className="row__name">{d.name}</span>
        {d.tags?.map((t) => (
          <span key={t} className="row__tag">
            ({t})
          </span>
        ))}
        {d.desc && <span className="row__desc"> – {d.desc}</span>}
        {d.note && <span className="row__note"> ({d.note})</span>}
      </p>
      <span className="row__price">{d.price ?? ''}</span>
    </li>
  );
}

// The burgundy food sheet. Smalls and Plates sit in filled labels and the extras in
// a solid block, the way their printed menu does it.
function FoodSheet({ sheet }: { sheet: MenuSheet }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 80%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="sheet sheet--burgundy" id="food" ref={ref} aria-labelledby="food-title">
      <h2 id="food-title" className="display sheet__word">
        {sheet.title}
      </h2>
      <svg className="road" viewBox="0 0 60 1000" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M30 0 C 52 80, 8 140, 30 220 S 54 330, 24 400 C 6 440, 20 480, 40 470 C 58 460, 50 420, 30 430 C 8 445, 14 520, 34 600 S 50 760, 26 830 C 14 870, 30 900, 30 1000"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: draw }}
        />
      </svg>
      <div className="sheet__body">
        {sheet.sections.map((sec) =>
          sec.id === 'extras' ? (
            <div key={sec.id} className="extras">
              <h3 className="display sheet__heading">{sec.title}</h3>
              <div className="extras__box">
                <ul>
                  {sec.dishes.map((d) => (
                    <li key={d.name}>
                      <span className="display">
                        {d.name}
                        {d.tags?.map((t) => ` (${t})`)}
                      </span>
                      <span className="extras__price">{d.price}</span>
                    </li>
                  ))}
                </ul>
                <HouseMark className="extras__house" />
              </div>
            </div>
          ) : (
            <div key={sec.id} className="sheet__section">
              <h3
                className={`display sheet__heading ${['smalls', 'plates'].includes(sec.id) ? 'sheet__heading--pill' : ''}`}
              >
                {sec.title}
              </h3>
              <ul className="rows">
                {sec.dishes.map((d) => (
                  <DishRow key={d.name} d={d} />
                ))}
              </ul>
            </div>
          ),
        )}
        {sheet.footer && <p className="sheet__small">{sheet.footer}</p>}
      </div>
    </section>
  );
}

function DessertSheet({ sheet }: { sheet: MenuSheet }) {
  const ice = sheet.sections[0];
  return (
    <section className="sheet sheet--green" id="desserts" aria-labelledby="desserts-title">
      <h2 id="desserts-title" className="display sheet__word sheet__word--left">
        {sheet.title}
      </h2>
      <div className="sheet__body">
        <div className="ice__head">
          <h3 className="ice__title">{ice.title}</h3>
          <span className="display ice__price">{ice.note}</span>
        </div>
        <ul className="ice">
          {ice.dishes.map((d) => (
            <li key={d.name}>
              <span className="ice__name">
                {d.name}
                {d.tags?.map((t) => ` (${t})`)}
              </span>
              {d.desc && <span className="ice__desc">{d.desc}</span>}
            </li>
          ))}
        </ul>
        <p className="sheet__small">
          Seasonal cobblers and pies come and go, so ask what’s on.
        </p>
      </div>
    </section>
  );
}

function DrinksSheet({ sheet }: { sheet: MenuSheet }) {
  const cocktails = sheet.sections.find((s) => s.id === 'cocktails')!;
  const beer = sheet.sections.find((s) => s.id === 'beer')!;
  return (
    <section className="sheet sheet--black" id="drinks" aria-labelledby="drinks-title">
      <h2 id="drinks-title" className="display sheet__word-inline">
        {sheet.title}
      </h2>
      <div className="sheet__body">
        <h3 className="display sheet__heading sheet__heading--bar">Cocktails</h3>
        <ul className="rows rows--drinks">
          {cocktails.dishes.map((d) => (
            <DishRow key={d.name} d={d} />
          ))}
        </ul>
        <div className="beer">
          <h3 className="display sheet__heading">
            Beer <small className="sheet__unit">{beer.note}</small>
          </h3>
          <ul>
            {beer.dishes.map((d) => (
              <li key={d.name}>
                <span className="beer__name">
                  {d.name}, <small>{d.desc}</small>
                </span>
                <span className="beer__dots" aria-hidden="true" />
                <span className="beer__price">{d.price}</span>
              </li>
            ))}
          </ul>
        </div>
        {sheet.footer && <p className="sheet__small">{sheet.footer}</p>}
      </div>
    </section>
  );
}

function WineSheet() {
  return (
    <section className="sheet sheet--black" id="wine" aria-labelledby="wine-title">
      <h2 id="wine-title" className="display sheet__word-inline">
        Wine
      </h2>
      <div className="sheet__body">
        <table className="wine">
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">Wine</span>
              </th>
              <th scope="col">
                <GlassIcon />
                125ml
              </th>
              <th scope="col">
                <CarafeIcon />
                500ml
              </th>
              <th scope="col">
                <BottleIcon />
                750ml
              </th>
            </tr>
          </thead>
          {wines.map((g) => (
            <tbody key={g.colour}>
              <tr className="wine__group">
                <th scope="colgroup" colSpan={4}>
                  {g.colour}
                </th>
              </tr>
              {g.wines.map((w) => (
                <tr key={w.name}>
                  <th scope="row">
                    {w.name}, <small>{w.abv} ABV</small>
                  </th>
                  <td>{w.glass ?? '–'}</td>
                  <td>{w.carafe ?? '–'}</td>
                  <td>{w.bottle}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
}

const iconProps = {
  viewBox: '0 0 24 32',
  className: 'wine__icon',
  'aria-hidden': true,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinejoin: 'round' as const,
};

const GlassIcon = () => (
  <svg {...iconProps}>
    <path d="M6 4h12c0 8-2 12-6 12S6 12 6 4ZM12 16v10M7 27h10" />
    <path d="M7 9h10c-.5 4-2 6-5 6s-4.5-2-5-6Z" fill="currentColor" />
  </svg>
);

const CarafeIcon = () => (
  <svg {...iconProps}>
    <path d="M9 3h6v5c4 2 5 6 5 10v9H4v-9c0-4 1-8 5-10V3Z" />
    <path d="M4.5 18h15v9h-15z" fill="currentColor" />
  </svg>
);

const BottleIcon = () => (
  <svg {...iconProps}>
    <path d="M10 2h4v7c3 1.5 4 4 4 7v13H6V16c0-3 1-5.5 4-7V2Z" fill="currentColor" />
  </svg>
);
