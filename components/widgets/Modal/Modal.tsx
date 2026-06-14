'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IMaskInput } from 'react-imask';
import styles from './Modal.module.scss';
import { IconClose } from '@/public/icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
}

interface FloatingField {
  name: boolean;
  phone: boolean;
  email: boolean;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', email: '' });
  const [isFilled, setIsFilled] = useState<FloatingField>({
    name: false,
    phone: false,
    email: false,
  });

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const handleFocus = (field: keyof FloatingField) => {
    setIsFilled((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof FloatingField, value: string) => {
    if (!value.trim()) {
      setIsFilled((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={400}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modal}>
          <button className={styles.close} onClick={onClose} aria-label="Закрыть">
            <IconClose width={20} height={20} />
          </button>

          <h2 className={styles.title}>ЗАКАЗАТЬ ЗВОНОК</h2>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className={styles.field}>
              <input
                id="modal-name"
                type="text"
                className={styles.input}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onFocus={() => handleFocus('name')}
                onBlur={(e) => handleBlur('name', e.target.value)}
              />
              <label
                htmlFor="modal-name"
                className={`${styles.label} ${isFilled.name ? styles.labelFloated : ''}`}
              >
                Имя
              </label>
            </div>

            {/* Phone */}
            <div className={styles.field}>
              <IMaskInput
                id="modal-phone"
                mask="+7 (000) 000-00-00"
                className={styles.input}
                value={formData.phone}
                onAccept={(value: string) => handleChange('phone', value)}
                onFocus={() => handleFocus('phone')}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                  handleBlur('phone', e.target.value)
                }
              />
              <label
                htmlFor="modal-phone"
                className={`${styles.label} ${isFilled.phone ? styles.labelFloated : ''}`}
              >
                Телефон
              </label>
            </div>

            {/* Email */}
            <div className={styles.field}>
              <input
                id="modal-email"
                type="email"
                className={styles.input}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onFocus={() => handleFocus('email')}
                onBlur={(e) => handleBlur('email', e.target.value)}
              />
              <label
                htmlFor="modal-email"
                className={`${styles.label} ${isFilled.email ? styles.labelFloated : ''}`}
              >
                Email
              </label>
            </div>

            <button type="submit" className={styles.submit}>
              Отправить
            </button>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
}
