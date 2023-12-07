'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useActivePage } from './context/navbarProvider';
import { Gentium_Book_Plus } from 'next/font/google';

const bestsellerUrl = 'https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=qkQgmC5hGtFlpt5A9BvWA09S2zAu6SUE';

export default function App() {
  const { activePage, setActivePage } = useActivePage();
  const [bookArray, setBookArray] = useState<Array<Object> | null>(null);

  const fetchData = async () => {
    console.log('Fetching data...');
    try {
      const response = await fetch(bestsellerUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }
      const result: any = await response.json();
      setBookArray(await result);
    } catch (error) {
      console.log('Error fetching data', error);
    }
    console.log(bookArray);
  };

  useEffect(() => {
    setActivePage(0);
    console.log('Initialiting to fetch data...');
    fetchData();
  }, []);

  return <div className={styles.wrapper}>{bookArray ? <div>No data here yet</div> : <div>{bookArray}</div>}</div>;
}
