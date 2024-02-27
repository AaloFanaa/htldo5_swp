'use client';

import { FC, useEffect, useState } from 'react';
import { useActivePage } from '../context/navbarProvider';
import { firestore } from '../page';
import { collection, getDocs } from 'firebase/firestore';
import styles from './page.module.css';
import DisplayCard from '../components/displayCard';
import { useSession } from 'next-auth/react';

interface libraryProps {}

type Entry = {
  displayName: string;
  image: string | null;
  info: string | null;
  link: string;
} | null;

const Library: FC<libraryProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  const [entryArray, setEntryArray] = useState<Array<Entry>>([]);
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
          };
        }
        return {
          displayName: result.Title,
          image: result.Poster,
          link: `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${result.Title}`,
          info: result.Year,
        };
      } catch (error) {
        console.log('An error occurred:', error);
        return null;
      }
    });

    const entries = await Promise.all(entryPromises);

    setEntryArray(entries.filter((entry) => entry !== null));

    console.log(entryArray);
  };

  const handleDelete = async () => {
    fetchUserData();
    return;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerText}>Your library</div>
        <div className={styles.headerIcon}></div>
      </div>
      <div className={styles.contentWrapper}>
        {entryArray.length >= 1 ? (
          entryArray.map((entry, i) => {
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
