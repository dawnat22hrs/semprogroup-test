import styles from './Burger.module.scss';

export const Burger = () => (
  <div className={styles.container}>
    <button className={styles.burger} aria-label="Меню">
      <span />
      <span />
      <span />
    </button>

    <span>МЕНЮ</span>
  </div>
);
