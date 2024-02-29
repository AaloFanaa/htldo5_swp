'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useActivePage } from '../context/navbarProvider';
import { firestore } from '../page';
import { collection, getDocs } from 'firebase/firestore';
import styles from './page.module.css';
import DisplayCard from '../components/displayCard';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import filterAZ from '../../../public/arrow-down-a-z-solid.svg';
import filterZA from '../../../public/arrow-up-a-z-solid.svg';
import searchIcon from '../../../public/search-icon.svg';
import { update } from 'firebase/database';

interface libraryProps {}

type Entry = {
  displayName: string;
  image: string | null;
  info: string | null;
  link: string;
  type: string;
  shown: boolean;
};

const Library: FC<libraryProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  const [entryArray, setEntryArray] = useState<Array<Entry>>([]);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [searchBarFocus, setSearchBarFocus] = useState<boolean>(false);
  const sessionData = useSession();
  const omdbApiKey = 'b93d24e3';

  useEffect(() => {
    setActivePage(3); // sicherstellen, dass die richtige Seite ausgewählt wird
    fetchUserData();
    console.log(sessionData);
  }, []);

  const fetchUserData = async () => {
    setEntryArray([]);
    console.log('Fetching...');

    //@ts-expect-error
    let userId = await sessionData.data?.user.id;
    console.log(userId);
    let userData;

    try {
      const querySnapshot = await getDocs(collection(firestore, 'user-libraries'));
      querySnapshot.forEach((doc) => {
        if (doc.id == userId) {
          userData = doc.data();
        }
      });
    } catch (e) {
      console.error('Error reading user: ', e);
      return;
    }

    console.log(userData);

    const entryPromises = Object.values(userData!).map(async (entry: any) => {
      try {
        const response = await fetch(entry);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }
        const result: any = await response.json();
        if (result.totalItems === 0) {
          return null;
        }
        if (result.volumeInfo) {
          return {
            displayName: result.volumeInfo.title,
            image: result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : null,
            info: result.volumeInfo.authors ? result.volumeInfo.authors[0] : null,
            link: result.selfLink,
            type: 'book',
            shown: true,
          };
        }
        return {
          displayName: result.Title,
          image: result.Poster,
          link: `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${result.Title}`,
          info: result.Year,
          type: 'movie',
          shown: true,
        };
      } catch (error) {
        console.log('An error occurred:', error);
        return null;
      }
    });

    const entries = await Promise.all(entryPromises);

    //@ts-expect-error
    setEntryArray(entries.filter((entry) => entry !== null));
    console.log(entryArray);
  };

  const handleDelete = async () => {
    fetchUserData();
    return;
  };

  const filterAtoZ = () => {
    let tmp = entryArray;
    tmp = tmp.filter((entry) => typeof entry.displayName === 'string').sort((a, b) => a.displayName.localeCompare(b.displayName));
    console.log('Filtering from A to Z', tmp);
    setEntryArray(tmp);
  };

  const filterZtoA = () => {
    let tmp = entryArray;
    tmp = tmp.filter((entry) => typeof entry.displayName === 'string').sort((a, b) => b.displayName.localeCompare(a.displayName));
    console.log('Filtering from Z to A', tmp);
    setEntryArray(tmp);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value.toLowerCase();
    const updatedEntryArray = entryArray.map((entry) => ({
      ...entry,
      shown: entry.displayName.toLowerCase().includes(searchString),
    }));
    setEntryArray(updatedEntryArray);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerText}>Your library</div>
        <div className={styles.searchBarWrapper}>
          <input
            className={`${styles.searchBarInput} ${showSearchBar ? styles.searchBarActive : ''}`}
            id='searchBar'
            type='text'
            onChange={(event) => {
              handleSearchChange(event);
            }}
            onFocus={() => {
              setSearchBarFocus(!searchBarFocus);
            }}
            onBlur={async () => {
              setSearchBarFocus(!searchBarFocus);
            }}
          />
          <div
            className={styles.searchIconWrapper}
            onClick={() => {
              if (!showSearchBar) {
                document.getElementById('searchBar')?.focus();
              } else {
                document.getElementById('searchBar')?.blur();
              }
              setShowSearchBar(!showSearchBar);
            }}>
            <Image src={searchIcon} alt={'SearchIcon'} className={`${styles.searchBarIcon} ${searchBarFocus ? styles.searchBarIconFocus : ''}`} />
          </div>
        </div>
        <div className={styles.headerIconWrapper}>
          <div
            className={styles.iconWrapper}
            onClick={() => {
              filterAtoZ();
            }}>
            <Image priority src={filterAZ} alt='Filter from A to Z' className={styles.headerIcon} />
          </div>
          <div
            className={styles.iconWrapper}
            onClick={() => {
              filterZtoA();
            }}>
            <Image priority src={filterZA} alt='Filter from Z to A' className={styles.headerIcon} />
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        {entryArray.length >= 1 ? (
          entryArray.map((entry, i) => {
            if (!entry.shown) {
              return <></>;
            }
            return (
              <DisplayCard
                displayName={entry!.displayName}
                info={entry!.info}
                image={entry!.image!}
                key={'Entry-' + i}
                link={entry!.link}
                showDelButton={true}
                showAddButton={false}
                onDelete={() => {
                  handleDelete();
                }}></DisplayCard>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Library;
