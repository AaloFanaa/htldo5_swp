import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Main Page</h1>
      <Link href='/login'>Go to login</Link>
    </main>
  );
}
