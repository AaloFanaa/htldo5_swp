'use client';

import AuthProvider from '../context/authProvider';
import styles from './navbar.module.css';
import { useSession } from 'next-auth/react';

export default function navbar() {
  const session = useSession();
  console.log(session);
  if (!session) {
    console.log('You should be logged out');
  }
  return (
    <AuthProvider>
      <div className={styles.navbarWrapper}>
        <div className={styles.navbarMenu}>Menu</div>
        <div className={styles.navbarUser}>
          <div className={styles.userName}>
            {session.data ? session.data?.user?.name : 'Loading...'}
          </div>
          {session.data?.user?.image ? (
            <img
              src={session.data.user?.image}
              alt='User image'
              className={styles.userImage}
            />
          ) : (
            <img
              src={'./user-icon.svg' as string}
              alt='User image'
              className={styles.userImage}
            />
          )}
        </div>
      </div>
    </AuthProvider>
  );
}
