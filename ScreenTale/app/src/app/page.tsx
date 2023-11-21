import Link from 'next/link';
import styles from './page.module.css';
import Header from './header';
import { useSession } from 'next-auth/react';

export default async function App() {
  const { data: session } = useSession();

  return (
    <>
      <Header></Header>
      <div className={styles.wrapper}>
        <h1>Main Page</h1>
        <Link href='/login'>Go to login</Link>
      </div>
    </>
  );
}
