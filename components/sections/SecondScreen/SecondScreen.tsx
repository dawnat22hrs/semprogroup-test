import Image from 'next/image';
import styles from './SecondScreen.module.scss';
import { VideoBlock } from '../../widgets/VideoBlock/VideoBlock';
import { Typography } from '@/shared/ui';
import { colors } from '@/constants/colors';
import clsx from 'clsx';

export const SecondScreen = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <Typography color={colors.blue} className={styles.imageLabel}>
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
              <div className={styles.badgeLogo}>
                <Image alt="" src="/images/logo-short.png" fill />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.textCol}>
          <div className={styles.blueSeparator} />
          <div className={clsx(styles.textBlock, styles.titleBlock)}>
            <Typography color={colors.dark} weight={500} className={styles.titleText}>
              уютное и безопасное пространство для счастливой,{' '}
              <Typography tag="span" color={colors.blue}>
                спокойной и размеренной жизни
              </Typography>
            </Typography>
          </div>
          <div className={clsx(styles.textBlock, styles.subtitleBlock)}>
            <Typography color={colors.blue} className={styles.subtitleText}>
              Квартиры от 65 до 356 м2 с чистовой отделкой,{' '}
              <Typography tag="span" color={colors.dark}>
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
