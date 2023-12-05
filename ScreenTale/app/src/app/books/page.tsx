'use client';

import { FC, useEffect } from 'react';
import { useActivePage } from '../context/navbarProvider';

interface bookOverviewProps {}

const bookOverview: FC<bookOverviewProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  useEffect(() => {
    setActivePage(1);
  }, []);
  return <div>Books</div>;
};

export default bookOverview;
