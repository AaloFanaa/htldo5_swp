'use client';

import { FC, useEffect } from 'react';
import { useActivePage } from '../context/navbarProvider';
import styles from './page.module.css';
import Image from 'next/image';

import searchIcon from '../../../public/search-icon.svg';

interface bookOverviewProps {}

const bookOverview: FC<bookOverviewProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  useEffect(() => {
    setActivePage(1);
    console.log(searchIcon);
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchBarLabel}>
            <Image
              src={searchIcon}
              alt='Search'
              className={styles.searchBarLabelIcon}
              width={30}
              height={30}
            />
          </div>
          <input
            className={styles.searchBarText}
            type='text'
            placeholder='Gib hier deinen Suchtext ein'
          />
        </div>
      </div>
      <div className={styles.resultsWrapper}></div>
    </div>
  );
};

export default bookOverview;
