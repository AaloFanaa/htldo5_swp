'use client';

import { FC, useEffect } from 'react';
import { useActivePage } from '../context/navbarProvider';

interface settingsProps {}

const settings: FC<settingsProps> = () => {
  const { activePage, setActivePage } = useActivePage();
  useEffect(() => {
    setActivePage(null);
  }, []);
  return <div>Settings</div>;
};

export default settings;
