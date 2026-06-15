'use client';

import styles from './Header.module.scss';
import { Burger, Button, ButtonVariant, Select } from '../../../shared/ui';
import { IconPhone } from '@/assets/icons';
import Image from 'next/image';
import { apartmentOptions } from '@/constants/selectOptions';

interface HeaderProps {
  onOpenModal: () => void;
}

export const Header = ({ onOpenModal }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Burger />
          <button
            className={`${styles.phoneBtn} ${styles.phoneBtnLeft}`}
            aria-label="Позвонить"
            onClick={onOpenModal}
          >
            <IconPhone />
          </button>
          <div className={styles.selectDesktop}>
            <Select options={apartmentOptions} placeholder="ВЫБРАТЬ КВАРТИРУ" />
          </div>
        </div>

        <div className={styles.logoWrap}>
          <Image src="/images/logo.png" alt="logo" fill className={styles.logo} />
        </div>

        <div className={styles.rightBlock}>
          <a href="tel:+74955272121">+7 495 527 21 21</a>
          <div className={styles.selectTablet}>
            <Select options={apartmentOptions} placeholder="ВЫБРАТЬ КВАРТИРУ" />
          </div>
          <div className={styles.callButton}>
            <Button variant={ButtonVariant.GHOST} onClick={onOpenModal}>
              ЗАКАЗАТЬ ЗВОНОК
            </Button>
          </div>
          <button
            className={`${styles.phoneBtn} ${styles.phoneBtnRight}`}
            aria-label="Позвонить"
            onClick={onOpenModal}
          >
            <IconPhone />
          </button>
        </div>
      </div>
    </header>
  );
};
