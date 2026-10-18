import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { venue } from '../data/allRoads';
import { ArrowUpRight } from './Icons';
import { StatusPill, useLondonNow } from './Tonight';

// Phone only: once the first screen has scrolled away, booking stays one tap away.
export function StickyBook() {
  const now = useLondonNow();
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > window.innerHeight * 0.7));

  return (
    <motion.div
      className="sticky-book"
      initial={false}
      animate={{ y: shown ? 0 : '120%' }}
      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
      aria-hidden={!shown}
    >
      <StatusPill now={now} compact />
      <a className="btn" href={venue.bookingUrl} target="_blank" rel="noopener" tabIndex={shown ? 0 : -1}>
        Book a table <ArrowUpRight />
      </a>
    </motion.div>
  );
}
