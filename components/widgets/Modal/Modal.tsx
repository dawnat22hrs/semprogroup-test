'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Modal.module.scss';
import { IconClose, IconCheck } from '@/assets/icons';
import { Button, Input, Typography } from '@/shared/ui';
import { colors } from '@/constants/colors';
import { contactFormSchema, type ContactFormData } from '@/schemas/contactForm';
import { EMPTY_FORM } from '@/constants/contactForm';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export default function Modal({ isOpen, onClose }: ModalProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = useCallback(() => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setIsDirty(false);
    setIsSuccess(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validate = (data: ContactFormData): FormErrors => {
    const result = contactFormSchema.safeParse(data);
    if (result.success) return {};
    return Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message]),
    ) as FormErrors;
  };

  const handleChange = (field: keyof ContactFormData) => (value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (isDirty) setErrors(validate(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDirty(true);
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      setFormData(EMPTY_FORM);
      setIsDirty(false);
      setIsSuccess(true);
    }
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
      <div ref={nodeRef} className={styles.overlay}>
        <button className={styles.close} onClick={handleClose} aria-label="Закрыть">
          <IconClose width={26} height={26} />
        </button>

        {isSuccess ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <IconCheck className={styles.successCheckIcon} />
            </div>
            <Typography tag="h2" color={colors.dark} weight={500} className={styles.successTitle}>
              ЗАЯВКА ПРИНЯТА
            </Typography>
            <Typography color={colors.gray} weight={300} className={styles.successSubtitle}>
              Мы свяжемся с вами в ближайшее время
            </Typography>
            <div className={styles.containerButton}>
              <Button onClick={handleClose} className={styles.button}>
                ЗАКРЫТЬ
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.modal}>
            <Typography color={colors.black} className={styles.title}>
              ЗАКАЗАТЬ ЗВОНОК
            </Typography>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <Input
                label="Имя"
                value={formData.name}
                onChange={handleChange('name')}
                error={errors.name}
                sanitize={(v) => v.replace(/[^а-яёА-ЯЁa-zA-Z\s]/g, '')}
              />
              <Input
                label="Телефон"
                value={formData.phone}
                onChange={handleChange('phone')}
                mask="+7 (000) 000-00-00"
                error={errors.phone}
              />
              <Input
                label="E-mail"
                value={formData.email}
                onChange={handleChange('email')}
                type="email"
                error={errors.email}
              />

              <div className={styles.buttonBlock}>
                <Typography color={colors.black} weight={400} className={styles.confirmationText}>
                  Нажимая на кнопку «Отправить», вы ознакомлены <br /> и соглашаетесь с{' '}
                  <Typography tag="span" className={styles.underline}>
                    политикой обработки персональных данных
                  </Typography>
                </Typography>
                <Button className={styles.button}>ОТПРАВИТЬ</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </CSSTransition>
  );
}
