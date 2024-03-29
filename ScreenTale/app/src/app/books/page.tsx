'use client';

import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { useActivePage } from '../context/navbarProvider';
import styles from './page.module.css';
import Image from 'next/image';

import searchIcon from '../../../public/search-icon.svg';
import DisplayCard from '../components/displayCard';

interface bookOverviewProps {}

type Book = {
  title: string;
  image: string | null;
  author: string | null;
  link: string;
};

const bookOverview: FC<bookOverviewProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  const [searchString, setSearchString] = useState<string>('');
  const [bookArray, setBookArray] = useState<Array<Book>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState<boolean>(false);
  const apiKey: string = 'AIzaSyC3ZyjlEmP3yUoPQbGq7-A7p6Eu4-lDCtY';

  const createSearchUrl: (searchKey: string) => string = (searchKey: string) => {
    return `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${apiKey}`;
  };

  useEffect(() => {
    setActivePage(1);
  }, []);
  const handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };
  const handleSearchEnter: (event: KeyboardEvent<HTMLInputElement>) => void = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      setShowNoResultsMessage(false);
      setBookArray([]);
      console.log('Searching for: ' + searchString);
      const fetchData = async () => {
        try {
          const response = await fetch(createSearchUrl(searchString));
          if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
          }

          const result: any = await response.json();
          console.log(result);
          if (result.totalItems == 0) {
            setShowNoResultsMessage(true);
            return;
          }
          result.items.forEach((res: any, i: number) => {
            let newBook: Book = {
              title: res.volumeInfo.title,
              image: res.volumeInfo.imageLinks ? res.volumeInfo.imageLinks.thumbnail : null,
              author: res.volumeInfo.authors ? res.volumeInfo.authors[0] : null,
              link: res.selfLink,
            };
            setBookArray((bookArray) => [...bookArray, newBook]);
          });
        } catch (error) {
          console.log('Error fetching data', error);
        } finally {
          setIsLoading(false);
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

      {isLoading ? (
        <div className={styles.loaderContainer}>
          <span className={styles.loader}></span>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.resultsWrapper}>
        {bookArray.length >= 1 ? (
          bookArray.map((book, i) => {
            return (
              <DisplayCard
                displayName={book.title}
                info={book.author}
                image={book.image!}
                key={'Book-' + i}
                link={book.link}
                showDelButton={false}
                showAddButton={true}
                onDelete={() => {}}></DisplayCard>
            );
          })
        ) : (
          <></>
        )}
        {showNoResultsMessage && <div className={styles.noResultsMessage}>No results found for this search term</div>}
      </div>
    </div>
  );
};

export default bookOverview;
