'use client';

import { useState, useRef, useCallback } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';
import { ButtonVariant } from './types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export const Button = ({
  variant = ButtonVariant.FILLED,
  children,
  className,
  ...props
}: ButtonProps) => {
  const [animState, setAnimState] = useState<'idle' | 'entering' | 'leaving'>('idle');
  const [animKey, setAnimKey] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setAnimKey((k) => k + 1);
    setAnimState('entering');
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setAnimKey((k) => k + 1);
    setAnimState('leaving');
    timer.current = setTimeout(() => setAnimState('idle'), 500);
  }, []);

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className ?? ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className={styles.overflow}>
        <span
          key={animKey}
          className={`${styles.label} ${animState === 'entering' ? styles.entering : ''} ${animState === 'leaving' ? styles.leaving : ''}`}
        >
          {children}
        </span>
      </span>
    </button>
  );
};
