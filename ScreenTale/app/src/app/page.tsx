'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useActivePage } from './context/navbarProvider';
import { Gentium_Book_Plus } from 'next/font/google';
import DisplayCard from './components/displayCard';

const bestsellerUrl = 'https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=qkQgmC5hGtFlpt5A9BvWA09S2zAu6SUE';
//const bestsellerUrl = 'AAAAA';

export default function App() {
  const { activePage, setActivePage } = useActivePage();
  const [bookArray, setBookArray] = useState<Array<any> | null>(null);

  useEffect(() => {
    setActivePage(0);
    console.log('Initialiting to fetch data...');
    const fetchData = async () => {
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
        console.log('Done fetching!');
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        console.log(bookArray);
      }}>
      <div className={styles.wrapperBooks}>
        {bookArray?.map((book) => {
          return (
            <DisplayCard
              displayName={book.book_details[0].title}
              isbn={book.isbns[0].isbn13}
              author={book.book_details[0].author}
              image={null}></DisplayCard>
          );
        })}
      </div>
    </div>
  );
}
