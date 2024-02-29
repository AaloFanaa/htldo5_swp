'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useActivePage } from './context/navbarProvider';
import { Gentium_Book_Plus } from 'next/font/google';
import DisplayCard from './components/displayCard';
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC3ZyjlEmP3yUoPQbGq7-A7p6Eu4-lDCtY',
  authDomain: 'screentale-ddc79.firebaseapp.com',
  projectId: 'screentale-ddc79',
  storageBucket: 'screentale-ddc79.appspot.com',
  messagingSenderId: '228530094474',
  appId: '1:228530094474:web:9d77d07826828857060873',
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

type Entry = {
  displayName: string;
  image: string | null;
  info: string | null;
  link: string;
  type: string;
};

export default function App() {
  const { activePage, setActivePage } = useActivePage();
  const [entryArray, setEntryArray] = useState<Array<Entry>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setActivePage(0);
    console.log('Initialiting to fetch data...');
    const fetchData = async () => {
      setIsLoading(true);
      console.log('Fetching data...');
      try {
        const responseMovie = await fetch('http://www.omdbapi.com/?apikey=b93d24e3&s=random&type=movie');
        if (!responseMovie.ok) {
          throw new Error('Failed to fetch movies');
        }
        const responseBook = await fetch('https://www.googleapis.com/books/v1/volumes?q=random&key=AIzaSyC3ZyjlEmP3yUoPQbGq7-A7p6Eu4-lDCtY');
        if (!responseBook.ok) {
          throw new Error('Failed to fetch books');
        }
        const resultMovie: any = await responseMovie.json();
        if (resultMovie.Response === 'False') {
          return;
        }
        if (resultMovie.Search.length === 0) {
          return;
        }
        resultMovie.Search.forEach((res: any, i: number) => {
          console.log(res);
          let newEntry: Entry = {
            displayName: res.Title,
            image: res.Poster,
            link: `http://www.omdbapi.com/?apikey=b93d24e3&t=${res.Title}`,
            info: res.Year,
            type: 'movie',
          };
          setEntryArray((entryArray) => [...entryArray, newEntry]);
        });
        const resultBook: any = await responseBook.json();
        if (resultBook.totalItems == 0) {
          return;
        }
        resultBook.items.forEach((res: any, i: number) => {
          let newBook: Entry = {
            displayName: res.volumeInfo.title,
            image: res.volumeInfo.imageLinks ? res.volumeInfo.imageLinks.thumbnail : null,
            info: res.volumeInfo.authors ? res.volumeInfo.authors[0] : null,
            link: res.selfLink,
            type: 'book',
          };
          setEntryArray((entryArray) => [...entryArray, newBook]);
        });
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
        console.log('Done fetching!');
      }
    };
    fetchData();
    const shuffledArray = [...entryArray].sort(() => Math.random() - 0.5);
    setEntryArray(shuffledArray);
  }, []);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <span className={styles.loader}></span>
        </div>
      ) : (
        <></>
      )}
      {entryArray?.map((entry, i) => {
        return (
          <DisplayCard
            key={'Entry-' + i}
            displayName={entry.displayName}
            info={entry.info}
            image={entry.image}
            link={entry.link}
            showDelButton={false}
            showAddButton={true}
            onDelete={() => {}}></DisplayCard>
        );
      })}
    </div>
  );
}
