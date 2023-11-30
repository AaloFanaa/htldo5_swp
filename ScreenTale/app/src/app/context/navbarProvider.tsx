'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ActivePageContextType = {
  activePage: number;
  setActivePage: (page: number) => void;
};

const ActivePageContext = createContext<ActivePageContextType | undefined>(undefined);

export const ActivePageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<number>(0);

  return <ActivePageContext.Provider value={{ activePage, setActivePage }}>{children}</ActivePageContext.Provider>;
};

export const useActivePage = (): ActivePageContextType => {
  const context = useContext(ActivePageContext);
  if (!context) {
    throw new Error('useActivePage must be used within an ActivePageProvider');
  }
  return context;
};
