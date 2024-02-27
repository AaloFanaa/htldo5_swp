'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useActivePage } from '../context/navbarProvider';
import styles from './page.module.css';
import Image from 'next/image';

import searchIcon from '../../../public/search-icon.svg';
import DisplayCard from '../components/displayCard';

interface movieOverviewProps {}

type Movie = {
  title: string;
  image: string | null;
  year: string | null;
  link: string;
};

const MovieOverview: FC<movieOverviewProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  const [searchString, setSearchString] = useState<string>('');
  const [movieArray, setMovieArray] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNoResultsMessage, setShowNoResultsMessage] =
    useState<boolean>(false);

  const apiKey = 'b93d24e3';

  useEffect(() => {
    setActivePage(2);
  }, []);

  const createSearchUrl: (searchKey: string) => string = (
    searchKey: string
  ) => {
    return `http://www.omdbapi.com/?s=${searchKey}&apikey=${apiKey}&page=10`;
  };

  const handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchString(event.target.value);
  };

  const handleSearchEnter: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Searching for: ' + searchString);
      setMovieArray([]);
      setIsLoading(true);
      setShowNoResultsMessage(false);

      try {
        const response = await fetch(createSearchUrl(searchString));
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }
        const result: any = await response.json();
        if (result.Response === 'False') {
          setShowNoResultsMessage(true);
          return;
        }
        if (result.Search.length === 0) {
          setShowNoResultsMessage(true);
          return;
        }
        result.Search.forEach((res: any, i: number) => {
          console.log(res);
          let newMovie: Movie = {
            title: res.Title,
            image: res.Poster,
            link: `http://www.omdbapi.com/?apikey=${apiKey}&t=${res.Title}`,
            year: res.Year,
          };
          setMovieArray((movieArray) => [...movieArray, newMovie]);
        });
        console.log(movieArray);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
        console.log('Done fetching!');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchBarLabel}>
            <Image
              src={searchIcon}
              alt='Search'
              className={styles.searchBarLabelIcon}
              width={30}
              height={30}
            />
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
        {movieArray.length >= 1 ? (
          movieArray.map((movie, i) => {
            return (
              <DisplayCard
                displayName={movie.title}
                info={movie.year}
                image={movie.image !== 'N/A' ? movie.image : null}
                key={'Movie-' + i}
                link={movie.link}
                showDelButton={false}
                showAddButton={true}
                onDelete={() => {}}></DisplayCard>
            );
          })
        ) : (
          <></>
        )}
        {showNoResultsMessage && (
          <div className={styles.noResultsMessage}>
            No results found for this search term
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieOverview;
