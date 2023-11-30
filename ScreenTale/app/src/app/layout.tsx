import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import AuthProvider from './context/authProvider';
import { ActivePageProvider } from './context/navbarProvider';
import Header from './components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ScreenTale',
  description: 'Your personal digital library',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <ActivePageProvider>
            <Header />
            <main>{children}</main>
          </ActivePageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
