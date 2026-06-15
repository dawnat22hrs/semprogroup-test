'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type Scrollbar from 'smooth-scrollbar';
import styles from './ScrollContainer.module.scss';

interface ScrollContainerProps {
  children: ReactNode;
}

export const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollbar: InstanceType<typeof Scrollbar> | null = null;

    const init = async () => {
      if (!containerRef.current) return;
      const SmoothScrollbar = (await import('smooth-scrollbar')).default;
      scrollbar = SmoothScrollbar.init(containerRef.current, {
        damping: 0.08,
        thumbMinSize: 20,
        alwaysShowTracks: false,
      });
      scrollbar.addListener(({ offset }) => {
        scrollbar!.setPosition(0, offset.y);
      });
      scrollbar.track.xAxis.element.remove();
    };

    init();

    return () => {
      scrollbar?.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {children}
    </div>
  );
};
