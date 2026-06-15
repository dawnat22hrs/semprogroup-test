'use client';

import { useState, useId } from 'react';
import { IMaskInput } from 'react-imask';
import styles from './Input.module.scss';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  mask?: string;
  error?: string;
  sanitize?: (value: string) => string;
}

export const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  mask,
  error,
  sanitize,
}: InputProps) => {
  const id = useId();
  const [isFilled, setIsFilled] = useState(false);

  const emit = (val: string) => onChange(sanitize ? sanitize(val) : val);

  const handleFocus = () => setIsFilled(true);
  const handleBlur = (val: string) => {
    if (!val.trim()) setIsFilled(false);
  };

  return (
    <div className={styles.field}>
      {mask ? (
        <IMaskInput
          id={id}
          mask={mask}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          value={value}
          onAccept={(val: string) => emit(val)}
          onFocus={handleFocus}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          value={value}
          onChange={(e) => emit(e.target.value)}
          onFocus={handleFocus}
          onBlur={(e) => handleBlur(e.target.value)}
        />
      )}
      <label htmlFor={id} className={`${styles.label} ${isFilled ? styles.labelFloated : ''}`}>
        {label}
      </label>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
