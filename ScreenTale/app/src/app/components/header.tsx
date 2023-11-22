import styles from './header.module.css';

export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerUser}>User-Icon</div>
      <div className={styles.headerMenu}>Menu</div>
      <div className={styles.headerLogout}>Logout-Button</div>
    </div>
  );
}
