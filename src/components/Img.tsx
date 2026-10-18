const base = import.meta.env.BASE_URL;

export const imgUrl = (name: string, width: 720 | 1440 = 1440) => `${base}img/${name}-${width}.webp`;

type Props = {
  name: string;
  alt: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

// Photos are pre-sized by scripts/prepare-images.mjs into 720 and 1440 wide WebP.
export function Img({ name, alt, sizes = '100vw', eager = false, className, style }: Props) {
  return (
    <img
      src={imgUrl(name, 720)}
      srcSet={`${imgUrl(name, 720)} 720w, ${imgUrl(name, 1440)} 1440w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
