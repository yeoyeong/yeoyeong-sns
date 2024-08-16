import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/_shared/styles/globals.css';
import '@/_shared/styles/theme.css';
import Provider from '@/_shared/util/ReactQueryProviders';
import ZustandProvider from '@/_shared/util/ZustandProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <Provider>
          <ZustandProvider>{children}</ZustandProvider>
        </Provider>
      </body>
    </html>
  );
}