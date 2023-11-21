import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>
        Landing Page <Link href='/about'>About</Link>
      </h1>
    </main>
  );
}
