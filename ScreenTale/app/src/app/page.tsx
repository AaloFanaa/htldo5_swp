'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useActivePage } from './context/navbarProvider';
import { Gentium_Book_Plus } from 'next/font/google';
import DisplayCard from './components/displayCard';
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const bestsellerUrl =
  'https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=qkQgmC5hGtFlpt5A9BvWA09S2zAu6SUE';
// const bestsellerUrl = 'AAAAA';

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

export default function App() {
  const { activePage, setActivePage } = useActivePage();
  const [bookArray, setBookArray] = useState<Array<any> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setActivePage(0);
    console.log('Initialiting to fetch data...');
    const fetchData = async () => {
      setIsLoading(true);
      console.log('Fetching data...');
      try {
        const response = await fetch(bestsellerUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }
        const result: any = await response.json();
        setBookArray(await result.results);
      } catch (error) {
        console.log('Error fetching data', error);
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
      {bookArray?.map((book) => {
        return (
          <DisplayCard
            onDelete={() => {}}
            displayName={book.book_details[0].title}
            info={book.book_details[0].author}
            image={null}
            link={'1233'}
            showDelButton={false}
            showAddButton={true}></DisplayCard>
        );
      })}
    </div>
  );
}
