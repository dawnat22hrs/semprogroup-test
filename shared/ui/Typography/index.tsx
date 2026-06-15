import type { ReactNode, CSSProperties } from 'react';

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

interface TypographyProps {
  children: ReactNode;
  tag?: TypographyTag;
  color?: CSSProperties['color'];
  size?: CSSProperties['fontSize'];
  weight?: CSSProperties['fontWeight'];
  className?: string;
}

export const Typography = ({
  children,
  tag: Tag = 'p',
  color,
  size,
  weight,
  className,
}: TypographyProps) => {
  const style: CSSProperties = {
    color,
    fontSize: size,
    fontWeight: weight,
  };

  return (
    <Tag style={style} className={className}>
      {children}
    </Tag>
  );
};
