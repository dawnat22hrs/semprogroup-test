interface IconCheckProps {
  width?: number;
  height?: number;
  className?: string;
}

export const IconCheck = ({ width = 40, height = 30, className }: IconCheckProps) => (
  <svg width={width} height={height} viewBox="0 0 40 30" fill="none" className={className}>
    <path
      d="M2 15L14 27L38 2"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
