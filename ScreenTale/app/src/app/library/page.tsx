'use client';

import { FC, useEffect } from 'react';
import { useActivePage } from '../context/navbarProvider';

interface libraryProps {}

const library: FC<libraryProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  useEffect(() => {
    setActivePage(3); //Make sure the right page gets selected
  }, []);
  return <div>Library</div>;
};

export default library;
