// Redrawn from the little house on the All Roads menu and favicon: a home with
// a record deck on the side, a checked window, and a chimney whose smoke turns
// into the single winding line that runs through their menu sheets.
export function HouseMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 124 96"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M17 44V20h7v15" />
      <path d="M20.5 17c-5-6 3-11 8-7 4 3 1 9-3 7-3-2 0-7 6-8 8-1 13 6 22 3" />
      <path d="M8 50 32 28l24 22M8 50v38h48V50M32 28h62l20 22H56M114 50v38H56" />
      <path d="M20 88V62c0-3 3-6 6-6s6 3 6 6v26" />
      <g strokeWidth={1.4}>
        <rect x="64" y="58" width="21" height="21" />
        <path d="M71 58v21M78 58v21M64 65h21M64 72h21" />
      </g>
      <g fill="currentColor" stroke="none">
        <rect x="64" y="58" width="7" height="7" />
        <rect x="78" y="58" width="7" height="7" />
        <rect x="71" y="65" width="7" height="7" />
        <rect x="64" y="72" width="7" height="7" />
        <rect x="78" y="72" width="7" height="7" />
      </g>
      <circle cx="100" cy="70" r="9.5" />
      <circle cx="100" cy="70" r="1.6" fill="currentColor" />
      <path d="M110 56v6l-6 5" />
    </svg>
  );
}
