import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArcText } from '../components/ArcText';
import { Curtain } from '../components/Curtain';
import { HouseMark } from '../components/HouseMark';
import { ArrowRight, ArrowUpRight, Gift, Instagram, Mail, Phone, Pin, TikTok } from '../components/Icons';
import { Img } from '../components/Img';
import { Logo } from '../components/Logo';
import { SignupForm } from '../components/SignupForm';
import { StatusPill, useLondonNow, WeekPlanner } from '../components/Tonight';
import {
  dishPhotos,
  founders,
  happenings,
  hours,
  houseRules,
  menus,
  merch,
  press,
  roomQuote,
  supperClubs,
  supperClubWords,
  theirWords,
  groups,
  venue,
  weekdays,
} from '../data/allRoads';
import { formatRange, formatTime, lastOrders } from '../lib/hours';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12% 0px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
} as const;

export function Home() {
  return (
    <>
      <Fascia />
      <ThisWeek />
      <OnTheTable />
      <AtTheBar />
      <TheRoom />
      <SupperClub />
      <GroupsTeaser />
      <TakeHome />
      <Visit />
    </>
  );
}

// ------------------------------------------------------------------ first screen

function Fascia() {
  const now = useLondonNow();
  return (
    <section className="fascia" aria-labelledby="fascia-title">
      <div className="wrap fascia__grid">
        <div className="fascia__copy">
          <h1 id="fascia-title" className="fascia__title">
            <ArcText text="Modern comfort dining" className="fascia__arc" />
            <Logo className="fascia__logo" eager />
          </h1>
          <p className="fascia__lede">
            Caribbean comfort food made for sharing, from the supper club that kept selling out. Now
            with a home of its own on Atlantic Road, in Brixton Village.
          </p>
          <StatusPill now={now} />
          <div className="fascia__actions">
            <a className="btn" href={venue.bookingUrl} target="_blank" rel="noopener">
              Book a table <ArrowUpRight />
            </a>
            <Link className="btn btn--ghost" to="/menu">
              See the menu <ArrowRight />
            </Link>
          </div>
          <p className="fascia__address">
            <Pin className="fascia__pin" />
            {venue.address.line1} · {venue.address.line2} · {venue.address.postcode}
          </p>
        </div>
        <motion.figure
          className="fascia__window"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Img
            name="table-spread"
            eager
            sizes="(min-width: 900px) 42vw, 100vw"
            alt="A table at All Roads: fried wings, clams, lamb ribs with pomegranate, baked cauliflower and cocktails"
          />
        </motion.figure>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ the week

function ThisWeek() {
  return (
    <section className="section section--week" id="week" aria-labelledby="week-title">
      <div className="wrap">
        <motion.header className="section__head" {...reveal}>
          <p className="kicker">The week at All Roads</p>
          <h2 id="week-title" className="display section__title">
            What kind of night is it?
          </h2>
          <p className="lede">
            Wednesdays and Thursdays are for dinner. Fridays and Saturdays end with DJs. The weekend
            starts with bottomless cocktails. Pick a day.
          </p>
        </motion.header>
        <WeekPlanner />
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ food

function OnTheTable() {
  const food = menus.find((m) => m.id === 'food')!;
  const snacks = food.sections.find((s) => s.id === 'snacks')!;

  return (
    <section className="section section--paper" id="food" aria-labelledby="food-title">
      <div className="wrap">
        <div className="food__intro">
          <motion.header {...reveal}>
            <p className="kicker kicker--ink">On the table</p>
            <h2 id="food-title" className="display section__title">
              Order a few.
              <br />
              Pass them round.
            </h2>
          </motion.header>
          <motion.div className="food__copy" {...reveal}>
            <p className="lede">
              Comfort food from a Caribbean upbringing, with British, European and Southern American
              influences. Everything comes to the middle of the table.
            </p>
            <p>
              Start with something from the snacks, add a few smalls, then something from the grill and
              a plate or two. The house pot changes, so ask your server what’s in it.
            </p>
          </motion.div>
        </div>

        <ul className="dishes" aria-label="Dishes from the menu">
          {dishPhotos.map((d, i) => (
            <motion.li
              key={d.dish}
              className="dish"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <figure className="photo dish__photo">
                <Img name={d.img} alt={d.alt} sizes="(min-width: 900px) 30vw, 78vw" />
              </figure>
              <p className="dish__section">{d.section}</p>
              <h3 className="display dish__name">{d.dish}</h3>
              <p className="dish__desc">
                {food.sections.flatMap((s) => s.dishes).find((x) => x.name === d.dish)?.desc}
              </p>
              <p className="dish__price">{d.price}</p>
            </motion.li>
          ))}
        </ul>

        <div className="food__foot">
          <div className="snacks">
            <p className="snacks__title display">To start</p>
            {snacks.dishes.map((d) => (
              <p key={d.name} className="snacks__row">
                <span className="snacks__name">{d.name}</span>
                <span className="snacks__desc">{d.desc}</span>
                <span className="snacks__price">{d.price}</span>
              </p>
            ))}
          </div>
          <Link to="/menu" className="btn btn--burgundy">
            Read the whole menu <ArrowRight />
          </Link>
        </div>

        <div className="reviews" aria-labelledby="reviews-title">
          <p id="reviews-title" className="display reviews__title">
            The reviews
          </p>
          <ul className="reviews__list">
            {press.map((p) => (
              <li key={p.outlet} className="review">
                <a className="review__line" href={p.url} target="_blank" rel="noopener">
                  <span className="review__outlet">{p.outlet}</span>
                  <span className="review__dots" aria-hidden="true" />
                  <span className="review__score">{p.score}</span>
                </a>
                <p className="review__quote">“{p.quote}”</p>
                <p className="review__by">
                  {p.by}, {p.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ drinks

function AtTheBar() {
  const bottomless = happenings.find((h) => h.id === 'bottomless')!;
  const drinks = menus.find((m) => m.id === 'drinks')!;
  const cocktails = drinks.sections.find((s) => s.id === 'cocktails')!;

  return (
    <section className="section section--bar" id="drinks" aria-labelledby="drinks-title">
      <div className="wrap bar">
        <motion.div className="bar__bottomless" {...reveal}>
          <p className="kicker">Saturdays &amp; Sundays, {formatRange(bottomless.start, bottomless.end)}</p>
          <h2 id="drinks-title" className="display section__title">
            Bottomless
            <br />
            cocktails
          </h2>
          <p className="bar__price">
            <span className="display">{bottomless.price?.replace('pp', '')}</span>
            <span>a head</span>
          </p>
          <ul className="bar__pours">
            {bottomless.options?.map((o) => <li key={o}>{o}</li>)}
          </ul>
          <p className="bar__small">
            60 minutes, Saturdays and Sundays, alongside a proper meal. Drink options subject to change.
            Reservations highly recommended.
          </p>
          <p className="aside">“{theirWords.bottomless}”</p>
          <a className="btn" href={venue.bookingUrl} target="_blank" rel="noopener">
            Book a weekend table <ArrowUpRight />
          </a>
        </motion.div>

        <div className="bar__photos">
          <figure className="photo bar__photo bar__photo--a">
            <Img name="drinks-trio" alt="Three cocktails on a table: a pale sour, a dark coffee cocktail and a red one over ice" sizes="(min-width: 900px) 26vw, 60vw" />
          </figure>
          <figure className="photo bar__photo bar__photo--b">
            <Img name="cocktail-red" alt="A red cocktail with a grapefruit twist on a concrete ledge" sizes="(min-width: 900px) 20vw, 46vw" />
          </figure>
        </div>

        <motion.div className="bar__list" {...reveal}>
          <p className="kicker">Any day</p>
          <h3 className="display bar__list-title">Cocktails</h3>
          <ul>
            {cocktails.dishes.map((c) => (
              <li key={c.name}>
                <span className="bar__name">{c.name}</span>
                <span className="bar__price-sm">{c.price}</span>
                <span className="bar__desc">
                  {c.desc}
                  {c.note && <em> ({c.note})</em>}
                </span>
              </li>
            ))}
          </ul>
          <p className="bar__small">
            Wine by the glass from £5.50, carafes and bottles too. Beer from Pillars, and Lucky Saint
            alcohol-free.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ the room

function TheRoom() {
  return (
    <section className="section section--room" id="room" aria-labelledby="room-title">
      <div className="wrap room">
        <motion.header className="room__head" {...reveal}>
          <p className="kicker kicker--ink">The room</p>
          <h2 id="room-title" className="display section__title">
            Terracotta walls, a green tiled bar, a velvet curtain
          </h2>
          <p className="lede">
            {venue.covers} covers and a terrace, inside Brixton Village where the market opens onto
            Atlantic Road. Sit at the bar, in the main room or outside.
          </p>
          <blockquote className="pullquote pullquote--ink">
            <p>“…{roomQuote.quote}”</p>
            <footer>
              <a href={roomQuote.url} target="_blank" rel="noopener">
                {roomQuote.outlet}
              </a>
            </footer>
          </blockquote>
        </motion.header>

        <div className="room__photos">
          <figure className="photo room__photo room__photo--tall">
            <Img
              name="room-bar-curtain"
              sizes="(min-width: 900px) 34vw, 70vw"
              alt="The green tiled bar running down the room towards the burgundy velvet curtain and a bare brick back room"
            />
          </figure>
          <figure className="photo room__photo room__photo--windows">
            <Img
              name="room-windows"
              sizes="(min-width: 900px) 30vw, 60vw"
              alt="Tables laid along tall windows looking onto the Brixton Village arcade"
            />
          </figure>
          <figure className="photo room__photo room__photo--counter">
            <Img
              name="room-counter"
              sizes="(min-width: 900px) 24vw, 52vw"
              alt="A wooden counter against green tiles, set with menus and cutlery"
            />
          </figure>
          <figure className="photo room__photo room__photo--front">
            <Img
              name="shopfront-street"
              sizes="(min-width: 900px) 24vw, 52vw"
              alt="The All Roads shopfront on Atlantic Road with a cyclist blurring past"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ supper club

function SupperClub() {
  const track = useRef<HTMLDivElement>(null);
  return (
    <section className="section section--club" id="story" aria-labelledby="club-title">
      <div className="wrap">
        <div className="club__intro">
          <motion.header {...reveal}>
            <p className="kicker">Where it started</p>
            <h2 id="club-title" className="display section__title">
              The supper club
              <br />
              found a home
            </h2>
          </motion.header>
          <motion.div className="club__copy" {...reveal}>
            <p className="lede">
              Before Atlantic Road, All Roads was a supper club. From 2023, chefs and partners{' '}
              {venue.founders.join(' and ')} cooked in hired rooms across London, and the tickets kept
              selling out. Between them they’ve worked at {founders.kitchens.slice(0, -1).join(', ')} and{' '}
              {founders.kitchens[founders.kitchens.length - 1]}.
            </p>
            <p>
              Mains and sides came to the table family style, “so get to know the people next to you.”
              DJs played after dinner, and there was one house rule: “{supperClubWords.vibes}” In{' '}
              {venue.opened} the supper club got a home of its own.
            </p>
          </motion.div>
        </div>

        <motion.figure className="founders" {...reveal}>
          <div className="photo founders__photo">
            <Img
              name="founders"
              sizes="(min-width: 900px) 40vw, 92vw"
              alt={`${venue.founders.join(' and ')} outside the green All Roads shopfront on Atlantic Road`}
            />
          </div>
          <blockquote className="founders__quote">
            <p className="display">“Food for us growing up was always about people.”</p>
            <p className="founders__more">
              “It was how we connected, celebrated, gifted, marked moments - whatever the reason.”
            </p>
            <footer>
              {venue.founders.join(' & ')}, to{' '}
              <a href={founders.quoteSource.url} target="_blank" rel="noopener">
                {founders.quoteSource.outlet}
              </a>
              . Photo: All Roads.
            </footer>
          </blockquote>
        </motion.figure>
      </div>

      <p className="wrap posters__hint">The supper clubs, 2024 to 2025. Drag along.</p>
      <div className="posters" ref={track}>
        <motion.ol
          className="posters__track"
          drag="x"
          dragConstraints={track}
          dragElastic={0.08}
          aria-label="Past All Roads supper clubs"
        >
          {supperClubs.map((s, i) => (
            <motion.li
              key={s.id}
              className="poster"
              style={{ rotate: i % 2 ? 1.6 : -1.4 }}
              whileHover={{ rotate: 0, y: -6 }}
            >
              <figure className="poster__img">
                <Img name={s.img} alt={s.alt} sizes="(min-width: 900px) 300px, 70vw" />
              </figure>
              <p className="poster__date">{s.date}</p>
              <h3 className="display poster__title">{s.title}</h3>
              <p className="poster__where">{s.where}</p>
              <p className="poster__detail">{s.detail}</p>
            </motion.li>
          ))}
          <li className="poster poster--now">
            <HouseMark className="poster__house" />
            <p className="poster__date">{venue.opened}</p>
            <h3 className="display poster__title">44 Atlantic Road</h3>
            <p className="poster__where">Brixton Village. Every week, Wednesday to Sunday.</p>
          </li>
        </motion.ol>
      </div>

      <div className="wrap club__list">
        <p className="kicker">Supper club regulars</p>
        <p className="club__list-line">
          Sign up to hear about supper clubs, parties and what’s next.
        </p>
        <SignupForm cta="Stay connected" />
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ groups

function GroupsTeaser() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const progress = useTransform(scrollYProgress, [0.15, 1], [0, 1], { clamp: true });

  return (
    <section className="section groups-teaser" ref={ref} aria-labelledby="groups-teaser-title">
      <Curtain progress={progress} reach={0.3} className="groups-teaser__curtain" />
      <div className="groups-teaser__inner">
        <p className="kicker">Large parties 7+ &amp; private hire</p>
        <h2 id="groups-teaser-title" className="display section__title">
          Bringing everyone?
        </h2>
        <p className="aside aside--big">“{groups.invite}”</p>
        <p className="lede">
          Tables of seven or more, and the whole room, are arranged with the team directly.
        </p>
        <Link to="/groups" className="btn btn--cream">
          Plan a group booking <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ vouchers & merch

function TakeHome() {
  return (
    <section className="section section--shop" id="shop" aria-labelledby="shop-title">
      <div className="wrap">
        <motion.header className="section__head" {...reveal}>
          <p className="kicker">Take some home</p>
          <h2 id="shop-title" className="display section__title">
            Vouchers &amp; merch
          </h2>
        </motion.header>

        <div className="shop">
          <motion.div className="voucher" {...reveal}>
            <div className="voucher__card" aria-hidden="true">
              <Logo className="voucher__logo" />
              <span className="voucher__label">eGift voucher</span>
              <HouseMark className="voucher__house" />
            </div>
            <div className="voucher__copy">
              <h3 className="display voucher__title">Give someone a table</h3>
              <p>All Roads eGift vouchers, bought online in a couple of minutes.</p>
              <a className="btn" href={venue.vouchersUrl} target="_blank" rel="noopener">
                <Gift /> Buy a voucher
              </a>
            </div>
          </motion.div>

          <ul className="merch" aria-label="All Roads merch">
            {merch.map((m) => (
              <li key={m.name} className="merch__item">
                <figure className="photo merch__photo">
                  <Img name={m.img} alt={m.alt} sizes="(min-width: 900px) 22vw, 62vw" />
                  <span className="merch__tag">Sold out online</span>
                </figure>
                <h3 className="merch__name">{m.name}</h3>
                <p className="merch__price">{m.price}</p>
                <p className="merch__detail">{m.detail}</p>
              </li>
            ))}
          </ul>
          <p className="shop__note">
            Hand-printed tees and totes, an embroidered cap, the retro mug and a keyring. All sold out
            online for now.
          </p>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ visit

function Visit() {
  const now = useLondonNow();
  return (
    <section className="section section--visit" id="visit" aria-labelledby="visit-title">
      <div className="wrap visit">
        <div className="visit__where">
          <p className="kicker">Find us</p>
          <h2 id="visit-title" className="display section__title">
            {venue.address.line1}
          </h2>
          <p className="lede">
            Inside Brixton Village, where the market opens onto Atlantic Road. Brixton station is a few
            minutes’ walk.
          </p>
          <div className="visit__actions">
            <a className="btn" href={venue.directionsUrl} target="_blank" rel="noopener">
              <Pin /> Directions
            </a>
            <a className="btn btn--ghost" href={venue.mapUrl} target="_blank" rel="noopener">
              Open in Maps <ArrowUpRight />
            </a>
          </div>
          <figure className="photo visit__photo">
            <Img
              name="shopfront"
              sizes="(min-width: 900px) 36vw, 92vw"
              alt="The All Roads shopfront: green fascia, red All Roads lettering and “Modern Comfort Dining” arched on the window"
            />
          </figure>
        </div>

        <div className="visit__info">
          <StatusPill now={now} />
          <table className="hours">
            <caption className="visually-hidden">Opening hours</caption>
            <tbody>
              {weekdays.map((d) => (
                <tr key={d} className={d === now.day ? 'is-today' : ''}>
                  <th scope="row">
                    {d}
                    {d === now.day && <span className="hours__today">Today</span>}
                  </th>
                  <td>
                    {hours[d].length === 0
                      ? 'Closed'
                      : hours[d].map((s) => (
                          <span key={s.label} className="hours__session">
                            {formatRange(s.open, s.close)}
                            <small>last orders {formatTime(lastOrders(s))}</small>
                          </span>
                        ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="contact">
            <li>
              <a href={venue.phoneHref}>
                <Phone /> {venue.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${venue.email}`}>
                <Mail /> {venue.email}
              </a>
            </li>
            <li>
              <a href={venue.instagram.url} target="_blank" rel="noopener">
                <Instagram /> {venue.instagram.handle}
              </a>
            </li>
            <li>
              <a href={venue.tiktok.url} target="_blank" rel="noopener">
                <TikTok /> {venue.tiktok.handle}
              </a>
            </li>
          </ul>

          <ul className="rules">
            {houseRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
