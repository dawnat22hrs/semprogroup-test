import type { Metadata } from 'next';
import '../styles/globals.scss';

export const metadata: Metadata = {
  title: 'INCHAPIN — Жилой комплекс',
  description: 'Премиальный жилой комплекс INCHAPIN',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
