import Image from 'next/image';
import styles from './Main.module.scss';
import { Typography } from '@/shared/ui';
import { colors } from '@/constants/colors';

export const Main = () => {
  return (
    <section className={styles.main}>
      <div className={styles.imageWrap}>
        <Image
          src="/images/hero-bg.jpg"
          alt="INCHAPIN — горный жилой комплекс"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.titleWrap}>
        <Typography color={colors.blue} className={styles.subtitle}>
          Дом бизнес-класса <br /> для ценителей роскоши
        </Typography>
        <Typography tag="span" color={colors.black} weight={500} className={styles.title}>
          INCHAPIN
        </Typography>
      </div>
    </section>
  );
};
