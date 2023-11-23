'use client';

import AuthProvider from '../context/authProvider';
import styles from './navbar.module.css';
import { useSession } from 'next-auth/react';

import Image from 'next/image';
import userIcon from '../../../public/user-icon.svg';
import movieIcon from '../../../public/movie-icon.svg';
import bookmarkIcon from '../../../public/bookmark-icon.svg';
import bookIcon from '../../../public/book-icon.svg';

export default function navbar() {
  const session = useSession();

  return (
    <AuthProvider>
      <div className={styles.navbarWrapper}>
        <div className={styles.navbarMenu}>
          <div className={styles.menuIcon}>
            <Image src={bookIcon} alt='Books' className={styles.iconImage} />
          </div>
          <div className={styles.menuIcon}>
            <Image src={movieIcon} alt='Books' className={styles.iconImage} />
          </div>
          <div className={styles.menuIcon}>
            <Image src={bookmarkIcon} alt='Books' className={styles.iconImage} />
          </div>
        </div>
        <div className={styles.navbarUser}>
          <div className={styles.userName}>{session.data ? session.data?.user?.name : 'Loading...'}</div>
          {session.data?.user?.image ? (
            <img src={session.data.user?.image} alt='User image' className={styles.userImage} />
          ) : (
            <Image priority src={userIcon} alt='User image' className={styles.userImage} />
          )}
        </div>
      </div>
    </AuthProvider>
  );
}
