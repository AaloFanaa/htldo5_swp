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

type Movie = {
  title: string;
  image: string | null;
  year: string | null;
  link: string;
};

export default function App() {
  const { activePage, setActivePage } = useActivePage();
  const [entryArray, setEntryArray] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSearchUrl: () => string = () => {
    return 'http://www.omdbapi.com/?apikey=b93d24e3&s=random&type=movie';
  };

  useEffect(() => {
    setActivePage(0);
    console.log('Initialiting to fetch data...');
    const fetchData = async () => {
      setIsLoading(true);
      console.log('Fetching data...');
      try {
        const response = await fetch('http://www.omdbapi.com/?apikey=b93d24e3&s=random&type=movie');
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }
        const result: any = await response.json();
        if (result.Response === 'False') {
          return;
        }
        if (result.Search.length === 0) {
          return;
        }
        result.Search.forEach((res: any, i: number) => {
          console.log(res);
          let newEntry: Movie = {
            title: res.Title,
            image: res.Poster,
            link: `http://www.omdbapi.com/?apikey=b93d24e3&t=${res.Title}`,
            year: res.Year,
          };
          setEntryArray((entryArray) => [...entryArray, newEntry]);
        });
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
        console.log('Done fetching!');
      }
    };
    fetchData();
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
      {entryArray?.map((entry) => {
        return (
          <DisplayCard
            onDelete={() => {}}
            displayName={entry.title}
            info={entry.year}
            image={entry.image}
            link={entry.link}
            showDelButton={false}
            showAddButton={true}></DisplayCard>
        );
      })}
    </div>
  );
}
