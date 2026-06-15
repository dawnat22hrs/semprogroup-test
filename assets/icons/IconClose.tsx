interface IconCloseProps {
  width?: number;
  height?: number;
  className?: string;
}

export const IconClose = ({ width = 24, height = 24, className }: IconCloseProps) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M0.5 0.5L23.5 23.5M0.5 23.5L23.5 0.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
