'use client';

import styles from './Header.module.scss';
import { Burger, Button, ButtonVariant, Select, type SelectOption } from '../../ui';
import Image from 'next/image';

const apartmentOptions: SelectOption[] = [
  { value: 'studio', label: 'Студии' },
  { value: '1k', label: '1-комнатные' },
  { value: '2k', label: '2-комнатные' },
  { value: '3k', label: '3-комнатные' },
  { value: 'penthouse', label: 'Пентхаусы' },
];

interface HeaderProps {
  onOpenModal: () => void;
}

export const Header = ({ onOpenModal }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Burger />

          <Select options={apartmentOptions} placeholder="ВЫБРАТЬ КВАРТИРУ" />
        </div>

        <Image src="/images/logo.png" alt="logo" width={187} height={30} className={styles.logo} />

        <div className={styles.rightBlock}>
          <a href="tel:+74955272121">+7 495 527 21 21</a>
          <Button variant={ButtonVariant.GHOST} onClick={onOpenModal}>
            ЗАКАЗАТЬ ЗВОНОК
          </Button>
        </div>
      </div>
    </header>
  );
};
