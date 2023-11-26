'use client';

import AuthProvider from '../context/authProvider';
import styles from './navbar.module.css';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

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
        <div
          className={styles.navbarUser}
          onMouseEnter={() => {
            console.log(document.getElementById('dropDownMenu'));
            document.getElementById('dropDownMenu')!.style.display = 'block';
          }}
          onMouseLeave={() => {
            console.log(document.getElementById('dropDownMenu'));
            document.getElementById('dropDownMenu')!.style.display = 'none';
          }}>
          <div className={styles.userName}>{session.data ? session.data?.user?.name : 'Loading...'}</div>
          {session.data?.user?.image ? (
            <img src={session.data.user?.image} alt='User image' className={styles.userImage} />
          ) : (
            <Image priority src={userIcon} alt='User image' className={styles.userImage} />
          )}
        </div>
        {session.data?.user?.name ? (
          <div
            onMouseEnter={() => {
              document.getElementById('dropDownMenu')!.style.display = 'block';
            }}
            onMouseLeave={() => {
              document.getElementById('dropDownMenu')!.style.display = 'none';
            }}
            id='dropDownMenu'
            className={styles.userDropdown}>
            <div className={styles.dropDownLink}>
              <Link href={'/'}>My profile</Link>
            </div>

            <div className={styles.dropDownLink}>
              <Link href={'/'}>Settings</Link>
            </div>
            <div className={styles.dropDownLink}>
              <a
                onClick={() => {
                  signOut();
                }}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </AuthProvider>
  );
}
