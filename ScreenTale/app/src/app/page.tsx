import Link from 'next/link';
import styles from './page.module.css';

export default async function App() {
  return (
    <>
      <div className={styles.wrapper}>
        <h1>Main Page</h1>
        <Link href='/login'>Go to login</Link>
      </div>
    </>
  );
}
