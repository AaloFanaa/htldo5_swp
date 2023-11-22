import styles from './navbar.module.css';

export default function navbar() {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbarUser}>User-Icon</div>
      <div className={styles.navbarMenu}>Menu</div>
      <div className={styles.navbarLogout}>Logout-Button</div>
    </div>
  );
}
