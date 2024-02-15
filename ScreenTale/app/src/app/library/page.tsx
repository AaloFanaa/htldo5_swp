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
};

const library: FC<libraryProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  const [entryArray, setEntryArray] = useState<Array<Entry>>([]);

  const sessionData = useSession();

  useEffect(() => {
    setActivePage(3); //Make sure the right page gets selected
    fetchUserData();
    console.log(sessionData);
  }, []);

  //Fetching user Data
  const fetchUserData = async () => {
    setEntryArray([]);
    console.log('Fetching...');

    //Fetching the saved entries
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
    //Getting data of the fetched entries
    Object.values(userData!).forEach(async (entry: any) => {
      try {
        const response = await fetch(entry);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }
        const result: any = await response.json();
        if (result.totalItems == 0) {
          return;
        }
        let newEntry: Entry = {
          title: result.volumeInfo.title,
          image: result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : null,
          author: result.volumeInfo.authors ? result.volumeInfo.authors[0] : null,
          link: result.selfLink,
        };
        setEntryArray((entryArray) => [...entryArray, newEntry]);
      } catch (error) {
        console.log('An error occured:', error);
      }
    });
    console.log(entryArray);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Your library</div>
      <div className={styles.contentWrapper}>
        {entryArray.length >= 1 ? (
          entryArray.map((entry, i) => {
            return (
              <DisplayCard displayName={entry.title} author={entry.author} image={entry.image!} key={'Book-' + i} link={entry.link}></DisplayCard>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default library;
