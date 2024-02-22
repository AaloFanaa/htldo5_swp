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
  title: string;
  image: string | null;
  author: string | null;
  link: string;
} | null;

const Library: FC<libraryProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  const [entryArray, setEntryArray] = useState<Array<Entry>>([]);
  const sessionData = useSession();

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

    // Verwende Promise.all für asynchrone Fetch-Anfragen
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
        return {
          title: result.volumeInfo.title,
          image: result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : null,
          author: result.volumeInfo.authors ? result.volumeInfo.authors[0] : null,
          link: result.selfLink,
        };
      } catch (error) {
        console.log('An error occurred:', error);
        return null;
      }
    });

    // Warte auf Abschluss aller asynchronen Fetch-Anfragen
    const entries = await Promise.all(entryPromises);

    // Filtere null-Werte heraus und setze den State
    setEntryArray(entries.filter((entry) => entry !== null));

    console.log(entryArray);
  };

  const handleDelete = async () => {
    // Aktualisiere die Benutzeroberfläche nach dem Löschen
    await fetchUserData();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Your library</div>
      <div className={styles.contentWrapper}>
        {entryArray.length >= 1 ? (
          entryArray.map((entry, i) => {
            return (
              <DisplayCard
                displayName={entry.title}
                author={entry.author}
                image={entry.image!}
                key={'Book-' + i}
                link={entry.link}
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
