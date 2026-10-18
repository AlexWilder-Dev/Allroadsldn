import {
  happenings,
  hours,
  lastOrdersMinutes,
  weekdays,
  type Happening,
  type Session,
  type Weekday,
} from '../data/allRoads';

export type LondonNow = { day: Weekday; minutes: number };

// The restaurant runs on London time whatever timezone the visitor is in.
export function londonNow(date = new Date()): LondonNow {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return {
    day: get('weekday') as Weekday,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

// 17:00 -> "5pm", 21:30 -> "9:30pm", 12:00 -> "12pm"
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, '0')}${suffix}`;
}

export function formatRange(open: string, close: string) {
  return `${formatTime(open)}–${formatTime(close)}`;
}

const fromMinutes = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

export const lastOrders = (s: Session) => fromMinutes(toMinutes(s.close) - lastOrdersMinutes);

export const happeningsOn = (day: Weekday): Happening[] =>
  happenings.filter((h) => h.days.includes(day));

const nextDay = (day: Weekday, offset = 1) =>
  weekdays[(weekdays.indexOf(day) + offset) % weekdays.length];

// The first day after `day` that has any sessions.
export function nextOpenAfter(day: Weekday): Weekday {
  for (let i = 1; i <= 7; i++) {
    const d = nextDay(day, i);
    if (hours[d].length) return d;
  }
  throw new Error('No opening hours set');
}

export type Status =
  | { kind: 'open'; session: Session; lastOrders: string; happeningNow?: Happening }
  | { kind: 'later-today'; session: Session; between: boolean }
  | { kind: 'closed'; nextDay: Weekday; nextSession: Session; tomorrow: boolean };

export function statusAt(now: LondonNow): Status {
  const today = hours[now.day];
  for (const session of today) {
    const open = toMinutes(session.open);
    const close = toMinutes(session.close);
    if (now.minutes >= open && now.minutes < close) {
      const happeningNow = happeningsOn(now.day).find(
        (h) => now.minutes >= toMinutes(h.start) && now.minutes < toMinutes(h.end),
      );
      return { kind: 'open', session, lastOrders: lastOrders(session), happeningNow };
    }
    if (now.minutes < open) {
      return { kind: 'later-today', session, between: today.indexOf(session) > 0 };
    }
  }
  for (let i = 1; i <= 7; i++) {
    const day = nextDay(now.day, i);
    if (hours[day].length) {
      return { kind: 'closed', nextDay: day, nextSession: hours[day][0], tomorrow: i === 1 };
    }
  }
  throw new Error('No opening hours set');
}

// Short lines for the first screen, e.g. "Open now" / "Till 10pm, last orders 9:30pm".
export function statusLine(status: Status): {
  open: boolean;
  headline: string;
  detail: string;
  extra?: string;
} {
  switch (status.kind) {
    case 'open':
      return {
        open: true,
        headline: 'Open now',
        detail: `Till ${formatTime(status.session.close)}, last orders ${formatTime(status.lastOrders)}`,
        extra: status.happeningNow
          ? `${status.happeningNow.title} till ${formatTime(status.happeningNow.end)}`
          : undefined,
      };
    case 'later-today':
      return {
        open: false,
        headline: status.between
          ? `Back at ${formatTime(status.session.open)} for ${status.session.label.toLowerCase()}`
          : `Doors open at ${formatTime(status.session.open)}`,
        detail: `${status.session.label} ${formatRange(status.session.open, status.session.close)}`,
      };
    case 'closed':
      return {
        open: false,
        headline: 'Closed now',
        detail: `Back ${status.tomorrow ? 'tomorrow' : status.nextDay} at ${formatTime(status.nextSession.open)}`,
      };
  }
}
