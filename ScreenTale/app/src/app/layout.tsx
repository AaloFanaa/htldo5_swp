import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from './nextAuthProvider';

const inter = Inter({ subsets: ['latin'] });
// const { data: session } = useSession();

export const metadata: Metadata = {
  title: 'ScreenTale',
  description: 'Your personal library',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <html lang='en'>
        <body className={inter.className}>
          <div>{children}</div>
        </body>
      </html>
    </NextAuthProvider>
  );
}
