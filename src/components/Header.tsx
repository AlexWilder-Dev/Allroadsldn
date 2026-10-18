import { Link, NavLink } from 'react-router-dom';
import { venue } from '../data/allRoads';
import { ArrowUpRight } from './Icons';
import { Logo } from './Logo';

const links = [
  { to: '/menu', label: 'Menu' },
  { to: '/groups', label: 'Groups' },
  { to: '/', label: 'Visit', hash: 'visit' },
];

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo" aria-label="All Roads, home">
          <Logo eager />
        </Link>
        <nav className="header__nav" aria-label="Main">
          {links.map((l) =>
            l.hash ? (
              <Link key={l.label} to={{ pathname: '/', search: `?to=${l.hash}` }} className="header__link">
                {l.label}
              </Link>
            ) : (
              <NavLink key={l.label} to={l.to} className="header__link">
                {l.label}
              </NavLink>
            ),
          )}
        </nav>
        <a className="btn header__book" href={venue.bookingUrl} target="_blank" rel="noopener">
          <span>
            Book<span className="header__book-long"> a table</span>
          </span>
          <ArrowUpRight />
        </a>
      </div>
    </header>
  );
}
