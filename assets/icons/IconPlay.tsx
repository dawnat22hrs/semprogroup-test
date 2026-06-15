interface IconPlayProps {
  width?: number;
  height?: number;
  className?: string;
}

export const IconPlay = ({ width = 16, height = 18, className }: IconPlayProps) => (
  <svg width={width} height={height} viewBox="0 0 16 18" fill="none" className={className}>
    <path d="M15 9L1 1v16l14-8Z" fill="currentColor" />
  </svg>
);
