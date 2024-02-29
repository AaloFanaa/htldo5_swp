'use client';

import { FC, useEffect } from 'react';
import { useActivePage } from '../context/navbarProvider';

interface profileProps {}

const profile: FC<profileProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  useEffect(() => {
    setActivePage(null);
  }, []);
  return <div>Nothing to see here!</div>;
};

export default profile;
