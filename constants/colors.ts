export const colors = {
  blue: 'var(--color-blue)',
  dark: 'var(--color-dark)',
  black: 'var(--color-black)',
  white: 'var(--color-white)',
  gray: 'var(--color-gray)',
} as const;

export type Color = (typeof colors)[keyof typeof colors];
