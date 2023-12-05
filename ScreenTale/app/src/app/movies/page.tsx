'use client';

import { FC, useEffect } from 'react';
import { useActivePage } from '../context/navbarProvider';

interface movieOverviewProps {}

const movieOverview: FC<movieOverviewProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  useEffect(() => {
    setActivePage(2);
  }, []);
  return <div>Movie</div>;
};

export default movieOverview;
