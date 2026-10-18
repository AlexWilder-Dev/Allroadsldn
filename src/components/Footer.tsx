import { Link } from 'react-router-dom';
import { venue } from '../data/allRoads';
import { HouseMark } from './HouseMark';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <HouseMark className="footer__house" />
        <div className="footer__cols">
          <p>
            {venue.name}
            <br />
            {venue.address.line1}, {venue.address.line2}
            <br />
            {venue.address.city} {venue.address.postcode}
          </p>
          <p>
            <a href={`mailto:${venue.email}`}>{venue.email}</a>
            <br />
            <a href={venue.phoneHref}>{venue.phone}</a>
            <br />
            <a href={venue.instagram.url} target="_blank" rel="noopener">
              Instagram {venue.instagram.handle}
            </a>
          </p>
          <p>
            <Link to="/menu">Menu</Link>
            <br />
            <Link to="/groups">Groups &amp; private hire</Link>
            <br />
            <a href={venue.bookingUrl} target="_blank" rel="noopener">
              Book on SevenRooms
            </a>
          </p>
        </div>
        <p className="footer__credit">Site by AlexWilder-Dev</p>
      </div>
    </footer>
  );
}
