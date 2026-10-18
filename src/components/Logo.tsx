const src = `${import.meta.env.BASE_URL}img/logo-brick-900.webp`;

export function Logo({ className, eager = false }: { className?: string; eager?: boolean }) {
  return (
    <img
      src={src}
      alt="All Roads"
      width={900}
      height={232}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
