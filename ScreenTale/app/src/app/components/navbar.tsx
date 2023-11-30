'use client';

import AuthProvider from '../context/authProvider';
import styles from './navbar.module.css';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useActivePage } from '../context/navbarProvider';

import Image from 'next/image';
import userIcon from '../../../public/user-icon.svg';
import movieIcon from '../../../public/movie-icon.svg';
import bookmarkIcon from '../../../public/bookmark-icon.svg';
import bookIcon from '../../../public/book-icon.svg';
import houseIcon from '../../../public/house-icon.svg';
import { redirect } from 'next/navigation';

type navbarPageType = {
  name: string;
  icon: any;
  activeNumber: number;
  linkTo: string;
};

export default function navbar() {
  const session = useSession();
  const { activePage } = useActivePage();

  const navbarPages: Array<navbarPageType> = [
    {
      name: 'Home',
      icon: houseIcon,
      activeNumber: 0,
      linkTo: '/',
    },
    {
      name: 'Books',
      icon: bookIcon,
      activeNumber: 1,
      linkTo: '/books',
    },
    {
      name: 'Movie',
      icon: movieIcon,
      activeNumber: 2,
      linkTo: '/movies',
    },
    {
      name: 'Library',
      icon: bookmarkIcon,
      activeNumber: 3,
      linkTo: '/library',
    },
  ];

  return (
    <AuthProvider>
      <div className={styles.navbarWrapper}>
        <div className={styles.navbarMenu}>
          {navbarPages.map((page: navbarPageType) => {
            return (
              <div
                onClick={() => {
                  console.log('Clicked: ', page.linkTo);
                  redirect(page.linkTo);
                }}
                className={page.activeNumber === activePage ? styles.menuIconActive : styles.menuIcon}>
                <Image src={page.icon} alt={page.name} className={styles.iconImage} />
              </div>
            );
          })}
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
