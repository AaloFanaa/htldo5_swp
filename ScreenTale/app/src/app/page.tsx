'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useActivePage } from './context/navbarProvider';

export default function App() {
  const { activePage, setActivePage } = useActivePage();
  useEffect(() => {
    setActivePage(0);
  }, []);

  return <div className={styles.wrapper}>Home</div>;
}
