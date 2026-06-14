import Image from 'next/image';
import styles from './SecondScreen.module.scss';
import { VideoBlock } from './VideoBlock';
import { Typography } from '@/components/ui';
import { colors } from '@/constants/colors';
import clsx from 'clsx';

export const SecondScreen = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <Typography color={colors.blue} size="17px" className={styles.imageLabel}>
            О ПРОЕКТЕ
          </Typography>
          <div className={styles.imageWrap}>
            <div className={styles.imageClip}>
              <Image
                src="/images/hero-bg-2.jpg"
                alt="INCHAPIN — вид на комплекс"
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
            <div className={styles.badge}>
              <Image alt="" src="/images/logo-short.png" width={63} height={88} />
            </div>
          </div>
        </div>

        <div className={styles.textCol}>
          <div className={styles.blueSeparator} />
          <div className={clsx(styles.textBlock, styles.titleBlock)}>
            <Typography color={colors.dark} size={34} weight={500}>
              уютное и безопасное пространство для счастливой,
              <Typography color={colors.blue}>спокойной и размеренной жизни</Typography>
            </Typography>
          </div>
          <div className={clsx(styles.textBlock, styles.subtitleBlock)}>
            <Typography color={colors.blue} size={20} weight={500}>
              Квартиры от 65 до 356 м2 с чистовой отделкой,
              <Typography color={colors.dark}>
                балконами, лоджиями и террасами В собственной ЗАКРЫТОЙ охраняемой территориИ.
              </Typography>
            </Typography>
          </div>
          <VideoBlock />
        </div>
      </div>
    </section>
  );
};
