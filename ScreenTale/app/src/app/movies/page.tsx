'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useActivePage } from '../context/navbarProvider';
import styles from './page.module.css';
import Image from 'next/image';

import searchIcon from '../../../public/search-icon.svg';
import DisplayCard from '../components/displayCard';

interface movieOverviewProps {}

const movieOverview: FC<movieOverviewProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  const [searchString, setSearchString] = useState<string>('');

  const apiKey = 'b93d24e3';

  useEffect(() => {
    setActivePage(2);
  }, []);

  const createSearchUrl: (searchKey: string) => string = (searchKey: string) => {
    return `http://www.omdbapi.com/?t=${searchKey}&apikey=${apiKey}`;
  };

  const handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleSearchEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Searching for: ' + searchString);
      const fetchData = async () => {
        try {
          const response = await fetch(createSearchUrl(searchString));
          if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
          }
          const result: any = await response.json();
          console.log(result);
          // if (result.totalItems == 0) {
          //   return;
          // }
          // result.items.forEach((res: any, i: number) => {});
        } catch (error) {
          console.error('Error fetching data', error);
        } finally {
          console.log('Done fetching!');
        }
      };
      fetchData();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchBarLabel}>
            <Image src={searchIcon} alt='Search' className={styles.searchBarLabelIcon} width={30} height={30} />
          </div>
          <input
            className={styles.searchBarText}
            type='text'
            onChange={(event) => {
              handleSearchChange(event);
            }}
            onKeyDown={(event) => {
              handleSearchEnter(event);
            }}
          />
        </div>
      </div>
      <div className={styles.resultsWrapper}></div>
    </div>
  );
};

export default movieOverview;
