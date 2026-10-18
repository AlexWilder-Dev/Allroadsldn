import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useState } from 'react';
import {
  dayMood,
  hours,
  moodCopy,
  venue,
  weekdays,
  type DayMood,
  type Weekday,
} from '../data/allRoads';
import {
  formatRange,
  formatTime,
  happeningsOn,
  lastOrders,
  londonNow,
  nextOpenAfter,
  statusAt,
  statusLine,
  type LondonNow,
} from '../lib/hours';
import { ArrowUpRight } from './Icons';
import { Img } from './Img';

export function useLondonNow(): LondonNow {
  const [now, setNow] = useState(() => londonNow());
  useEffect(() => {
    const id = window.setInterval(() => setNow(londonNow()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function StatusPill({ now, compact = false }: { now: LondonNow; compact?: boolean }) {
  const line = statusLine(statusAt(now));
  return (
    <p className={`status ${line.open ? 'status--open' : ''} ${compact ? 'status--compact' : ''}`}>
      <span className="status__dot" aria-hidden="true" />
      <span className="status__head">{line.headline}</span>
      {!compact && <span className="status__detail">{line.detail}</span>}
      {!compact && line.extra && <span className="status__extra">{line.extra}</span>}
    </p>
  );
}

const moodPhoto: Record<DayMood, { name: string; alt: string }> = {
  closed: {
    name: 'shopfront',
    alt: 'The All Roads shopfront on Atlantic Road: a dark green fascia, red lettering, and “Modern Comfort Dining” on the window',
  },
  midweek: {
    name: 'room-windows',
    alt: 'Set tables along the tall windows that look out onto Brixton Village market',
  },
  friday: {
    name: 'dj',
    alt: 'A DJ in headphones laughing, holding a can, against white tiles',
  },
  saturday: {
    name: 'cocktail-pour',
    alt: 'A red cocktail over ice being poured at the bar',
  },
  sunday: {
    name: 'table-overhead',
    alt: 'A table crowded with sharing plates: cauliflower, clams, wings, baked mac and cocktails',
  },
};

const short = (d: Weekday) => d.slice(0, 3);

// The week at All Roads: pick a day to see what kind of day it is. Opens on today.
export function WeekPlanner() {
  const now = useLondonNow();
  const [day, setDay] = useState<Weekday>(now.day);
  const panelId = useId();

  const mood = dayMood[day];
  const sessions = hours[day];
  const on = happeningsOn(day);
  const isToday = day === now.day;
  const nextOpenDay = nextOpenAfter(day);
  const doneForToday = isToday && statusAt(now).kind === 'closed';
  const bookLabel = !sessions.length
    ? `Book for ${nextOpenDay}`
    : doneForToday
      ? `Book for ${nextOpenDay}`
      : isToday
        ? now.minutes >= 15 * 60
          ? 'Book for tonight'
          : 'Book for today'
        : `Book for ${day}`;

  return (
    <div className={`week week--${mood}`}>
      <div className="week__tabs" role="tablist" aria-label="Choose a day">
        {weekdays.map((d) => {
          const closed = hours[d].length === 0;
          return (
            <button
              key={d}
              role="tab"
              type="button"
              aria-selected={d === day}
              aria-controls={panelId}
              className={`week__tab ${d === day ? 'is-active' : ''} ${closed ? 'is-closed' : ''}`}
              onClick={() => setDay(d)}
            >
              <span className="week__tab-day">{short(d)}</span>
              <span className="week__tab-note">{d === now.day ? 'Today' : closed ? 'Shut' : ''}</span>
              {d === day && (
                <motion.span layoutId="week-marker" className="week__marker" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={day}
          id={panelId}
          role="tabpanel"
          className="week__panel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="week__text">
            <p className="kicker">{isToday ? (doneForToday ? 'Today' : 'Tonight') : day}</p>
            <h3 className="display week__title">{isToday ? day : moodCopy[mood].title}</h3>
            <p className="week__line">{moodCopy[mood].line}</p>
            {moodCopy[mood].aside && <p className="week__aside">“{moodCopy[mood].aside}”</p>}
            {doneForToday && sessions.length > 0 && (
              <p className="week__done">
                That’s us for today. Back {nextOpenDay} at {formatTime(hours[nextOpenDay][0].open)}.
              </p>
            )}

            {sessions.length > 0 ? (
              <dl className="week__times">
                {sessions.map((s) => (
                  <div key={s.label} className="week__row">
                    <dt>{s.label}</dt>
                    <dd>
                      {formatRange(s.open, s.close)}
                      <small>last orders {formatTime(lastOrders(s))}</small>
                    </dd>
                  </div>
                ))}
                {on.map((h) => (
                  <div key={h.id} className="week__row week__row--on">
                    <dt>{h.title}</dt>
                    <dd>
                      {formatRange(h.start, h.end)}
                      {h.price && <small>{h.price}</small>}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="week__closed">
                Next open: <strong>{nextOpenDay}</strong> from {formatTime(hours[nextOpenDay][0].open)}
              </p>
            )}

            {on.some((h) => h.options) && (
              <p className="week__options">
                Bottomless pours: {on.find((h) => h.options)?.options?.join(', ')} (subject to change)
              </p>
            )}

            <a className="btn" href={venue.bookingUrl} target="_blank" rel="noopener">
              {bookLabel}
              <ArrowUpRight />
            </a>
          </div>

          <figure className="week__photo photo">
            <Img name={moodPhoto[mood].name} alt={moodPhoto[mood].alt} sizes="(min-width: 900px) 40vw, 92vw" />
            {mood === 'friday' || mood === 'saturday' ? <Record /> : null}
          </figure>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// A record on the deck for DJ nights, after the turntable in their house logo.
function Record() {
  return (
    <svg className="record" viewBox="0 0 100 100" aria-hidden="true">
      <g className="record__spin">
        <circle cx="50" cy="50" r="48" fill="#141012" />
        {[40, 34, 28, 22].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgba(255,247,219,.12)" strokeWidth="0.6" />
        ))}
        <circle cx="50" cy="50" r="15" fill="var(--orange)" />
        <path d="M43 47h14M43 53h9" stroke="var(--burgundy-ink)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="50" cy="50" r="1.8" fill="#141012" />
      </g>
    </svg>
  );
}
