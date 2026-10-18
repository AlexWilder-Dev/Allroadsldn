import { useId } from 'react';

// The words arched across their front window, set the same way.
export function ArcText({ text, className }: { text: string; className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 72" className={className} role="img" aria-label={text}>
      <path id={id} d="M8 66 Q200 -4 392 66" fill="none" />
      <text>
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
