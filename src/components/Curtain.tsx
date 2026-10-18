import { animate, motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion';
import { useCallback, useMemo } from 'react';

type Props = {
  /** 0 = drawn back to the sides, 1 = closed across the opening */
  progress: MotionValue<number>;
  /** How much of the opening each side covers when fully closed (0.5 meets in the middle). */
  reach?: number;
  className?: string;
};

// The plush burgundy curtain from the dining room. Each side is a velvet panel
// that bunches into tighter folds as it is drawn back.
export function Curtain({ progress, reach = 0.5, className }: Props) {
  return (
    <div className={`curtain ${className ?? ''}`} aria-hidden="true">
      <Panel side="left" progress={progress} reach={reach} />
      <Panel side="right" progress={progress} reach={reach} />
      <div className="curtain__rail" />
    </div>
  );
}

const OPEN_SHARE = 0.07; // a drawn-back curtain keeps a little of itself in view

function Panel({
  side,
  progress,
  reach,
}: {
  side: 'left' | 'right';
  progress: MotionValue<number>;
  reach: number;
}) {
  const scaleX = useTransform(progress, (p) => OPEN_SHARE + (reach - OPEN_SHARE) * p);
  // The hem swings a touch while the curtain is moving.
  const skewX = useTransform(progress, [0, 0.5, 1], [0, side === 'left' ? -1.5 : 1.5, 0]);

  return (
    <motion.div
      className={`curtain__panel curtain__panel--${side}`}
      style={{ scaleX, skewX, transformOrigin: side === 'left' ? '0% 0%' : '100% 0%' }}
    />
  );
}

// For curtains that open or close on an event rather than on scroll.
export function useCurtain(initial: 0 | 1) {
  const progress = useMotionValue<number>(initial);
  const to = useCallback(
    (value: number, duration = 1.3) =>
      animate(progress, value, { duration, ease: [0.65, 0, 0.25, 1] }),
    [progress],
  );
  return useMemo(() => ({ progress, to }), [progress, to]);
}
