import Link from 'next/link';
import styles from './page.module.css';
import { SessionProvider } from 'next-auth/react';

export default function App({
  pageProps: { session, ...pageProps },
}: {
  pageProps: any;
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={styles.main}>
        <h1>Main Page</h1>
        <Link href='/login'>Go to login</Link>
      </div>
    </SessionProvider>
  );
}
