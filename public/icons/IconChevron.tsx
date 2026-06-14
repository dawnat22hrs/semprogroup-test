interface IconChevronProps {
  width?: number;
  height?: number;
  className?: string;
}

export const IconChevron = ({ width = 14, height = 8, className }: IconChevronProps) => (
  <svg width={width} height={height} viewBox="0 0 12 7" fill="none" className={className}>
    <path
      d="M1 1L6 6L11 1"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
