export const colors = {
  white: 'var(--color-white)',
  black: 'var(--color-black)',
  blue: 'var(--color-blue)',
  dark: 'var(--color-dark)',
  gray: 'var(--color-gray)',
  border: 'var(--color-border)',
} as const;

export type Color = (typeof colors)[keyof typeof colors];
