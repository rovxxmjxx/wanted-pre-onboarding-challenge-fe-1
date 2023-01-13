import '../styles/globals.css';
import type { AppProps } from 'next/app';
import getClient from '../lib/queryClient';
import SessionProvider from '../contexts/SessionContext';
import { QueryClientProvider } from 'react-query';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  const client = getClient();

  return (
    <QueryClientProvider client={client}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
