/* eslint-disable @typescript-eslint/ban-types */
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { store } from '../redux/store';

import '@/styles/globals.css';

// custom type untuk pages dari NextJs
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Jika Component.getLayout tidak null, gunakan component method tsb.
  // Jika null gunakan fungsi yang ada di kanan

  if (Component.getLayout) {
    return Component.getLayout(
      <Provider store={store}>
        <Head>
          <title>MusiQue</title>
          <link rel="shortcut icon" href="favicon.svg" type="image/svg" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Head>
        <title>MusiQue</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
