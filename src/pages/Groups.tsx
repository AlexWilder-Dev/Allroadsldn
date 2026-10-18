import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Curtain, useCurtain } from '../components/Curtain';
import { ArrowUpRight } from '../components/Icons';
import { Img } from '../components/Img';
import { groups, hours, venue, weekdays, type Weekday } from '../data/allRoads';
import { formatRange } from '../lib/hours';

// How far the curtain comes in to frame the page: a sliver on a phone, more on a wide screen.
const framed = () => (window.matchMedia('(min-width: 900px)').matches ? 0.36 : 0.06);

type Form = {
  name: string;
  email: string;
  phone: string;
  date: string;
  session: string;
  guests: number;
  occasion: string;
  notes: string;
};

const blank: Form = {
  name: '',
  email: '',
  phone: '',
  date: '',
  session: '',
  guests: 10,
  occasion: groups.occasions[0],
  notes: '',
};

const weekdayOf = (iso: string): Weekday | null => {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const js = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = Sunday
  return weekdays[(js + 6) % 7];
};

const prettyDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/London',
  });

export function Groups() {
  const curtain = useCurtain(0);
  const [form, setForm] = useState<Form>(blank);
  const [sent, setSent] = useState(false);

  // On arrival the curtain comes in from the edges and frames the form.
  useEffect(() => {
    const t = window.setTimeout(() => curtain.to(framed(), 1.4), 250);
    return () => window.clearTimeout(t);
  }, [curtain]);

  const day = weekdayOf(form.date);
  const sessions = day ? hours[day] : [];
  const closedDay = day !== null && sessions.length === 0;

  useEffect(() => {
    // Keep the chosen session valid for the chosen day.
    if (sessions.length && !sessions.some((s) => s.label === form.session)) {
      setForm((f) => ({ ...f, session: sessions[0].label }));
    }
  }, [sessions, form.session]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (closedDay) return;
    setSent(true);
    curtain.to(1, 1.2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setSent(false);
    setForm(blank);
    curtain.to(framed(), 1.2);
  };

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <div className="groups">
      <section className="groups__stage" aria-labelledby="groups-title">
        <Curtain progress={curtain.progress} className="groups__curtain" />

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              className="groups__sent"
              role="status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.9 } }}
              exit={{ opacity: 0 }}
            >
              <p className="kicker">Curtain’s drawn</p>
              <p className="display groups__sent-title">Thanks, {form.name.split(' ')[0] || 'friend'}.</p>
              <p className="lede">
                Your enquiry for {form.guests} on {form.date ? prettyDate(form.date) : 'your date'}
                {form.session ? ` (${form.session.toLowerCase()})` : ''} is ready for the team at{' '}
                {venue.email}. They’ll reply to {form.email || 'you'}.
              </p>
              <p className="groups__demo">This is a demo, so nothing has been sent.</p>
              <button type="button" className="btn btn--cream" onClick={reset}>
                Start another enquiry
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="groups__inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <header className="groups__head">
                <p className="kicker">{groups.line}</p>
                <h1 id="groups-title" className="display groups__title">
                  Bring everyone
                </h1>
                <p className="aside aside--big">“{groups.invite}”</p>
              </header>

              <div className="groups__paths">
                <div className="groups__path">
                  <h2 className="display">Up to {groups.maxOnline}</h2>
                  <p>
                    Book straight in on SevenRooms. {groups.terms}
                  </p>
                  <a className="btn" href={venue.bookingUrl} target="_blank" rel="noopener">
                    Book online <ArrowUpRight />
                  </a>
                </div>
                <div className="groups__path">
                  <h2 className="display">Bigger, or the whole room</h2>
                  <p>
                    For private hire, larger parties or anything you want to talk through first, send an
                    enquiry and the team will come back to you.
                  </p>
                  <a className="textlink" href={`mailto:${venue.email}`}>
                    {venue.email}
                  </a>
                </div>
              </div>

              <form className="enquiry" onSubmit={submit}>
                <fieldset className="enquiry__set">
                  <legend className="display enquiry__legend">Group enquiry</legend>

                  <div className="field">
                    <label htmlFor="g-name">Your name</label>
                    <input
                      id="g-name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                    />
                  </div>
                  <div className="field-pair">
                    <div className="field">
                      <label htmlFor="g-email">Email</label>
                      <input
                        id="g-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="g-phone">
                        Phone <span className="field__opt">optional</span>
                      </label>
                      <input
                        id="g-phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field-pair">
                    <div className="field">
                      <label htmlFor="g-date">Date</label>
                      <input
                        id="g-date"
                        type="date"
                        required
                        min={today}
                        value={form.date}
                        onChange={(e) => set('date', e.target.value)}
                        aria-describedby="g-date-hint"
                      />
                      <p id="g-date-hint" className={`field__hint ${closedDay ? 'is-warning' : ''}`}>
                        {!day && 'Open Wednesday to Sunday.'}
                        {closedDay && `We’re closed on ${day}s. Try Wednesday to Sunday.`}
                        {day && !closedDay &&
                          `${day}: ${sessions.map((s) => `${s.label.toLowerCase()} ${formatRange(s.open, s.close)}`).join(', ')}`}
                      </p>
                    </div>
                    <div className="field">
                      <span className="field__label" id="g-session-label">
                        When
                      </span>
                      <div className="chips" role="radiogroup" aria-labelledby="g-session-label">
                        {(sessions.length ? sessions : [{ label: 'Pick a date first' }]).map((s) => (
                          <button
                            key={s.label}
                            type="button"
                            role="radio"
                            aria-checked={form.session === s.label}
                            disabled={!sessions.length}
                            className={`chip ${form.session === s.label ? 'is-on' : ''}`}
                            onClick={() => set('session', s.label)}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <span className="field__label" id="g-guests-label">
                      How many of you?
                    </span>
                    <div className="guests">
                      <button
                        type="button"
                        className="guests__btn"
                        aria-label="One fewer guest"
                        onClick={() => set('guests', Math.max(groups.threshold, form.guests - 1))}
                      >
                        −
                      </button>
                      <output className="display guests__count" aria-labelledby="g-guests-label" aria-live="polite">
                        {form.guests}
                      </output>
                      <button
                        type="button"
                        className="guests__btn"
                        aria-label="One more guest"
                        onClick={() => set('guests', Math.min(venue.covers, form.guests + 1))}
                      >
                        +
                      </button>
                    </div>
                    <Covers taken={form.guests} />
                  </div>

                  <div className="field">
                    <span className="field__label" id="g-occasion-label">
                      What’s the occasion?
                    </span>
                    <div className="chips" role="radiogroup" aria-labelledby="g-occasion-label">
                      {groups.occasions.map((o) => (
                        <button
                          key={o}
                          type="button"
                          role="radio"
                          aria-checked={form.occasion === o}
                          className={`chip ${form.occasion === o ? 'is-on' : ''}`}
                          onClick={() => set('occasion', o)}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="g-notes">
                      Anything else? <span className="field__opt">optional</span>
                    </label>
                    <textarea
                      id="g-notes"
                      rows={3}
                      placeholder="Dietary needs, a cake, timings…"
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn enquiry__submit" disabled={closedDay}>
                    Send enquiry
                  </button>
                </fieldset>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="wrap groups__room">
        <figure className="photo groups__photo">
          <Img
            name="room-service"
            sizes="(min-width: 900px) 60vw, 92vw"
            alt="Diners at All Roads, with the green tiled bar on one side and the burgundy velvet curtain drawn across the back"
          />
          <figcaption>
            The curtain at the back of the room, drawn across when the space needs to be smaller.
            Photo: The Nudge.
          </figcaption>
        </figure>
      </section>
    </div>
  );
}

// The room holds 35. Your party fills its share of the seats.
function Covers({ taken }: { taken: number }) {
  return (
    <div className="covers" aria-hidden="true">
      <div className="covers__dots">
        {Array.from({ length: venue.covers }, (_, i) => (
          <motion.span
            key={i}
            className="covers__dot"
            animate={{ scale: i < taken ? 1 : 0.62, opacity: i < taken ? 1 : 0.35 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30, delay: Math.abs(i - taken) * 0.006 }}
            data-on={i < taken}
          />
        ))}
      </div>
      <p className="covers__caption">
        {taken} of the room’s {venue.covers} covers inside
        {taken >= venue.covers ? ', which is the whole room' : ''}
      </p>
    </div>
  );
}
