import '../styles/main.scss';

import { AppProps } from 'next/app';
import React, { ReactNode } from 'react';

import Head from '../src/components/Head';
import { AppProvider } from '../src/contexts/App';

const App = (
  { Component, pageProps }: AppProps,
): ReactNode => (
  <AppProvider>
    <Head />
    <Component { ...pageProps } />
  </AppProvider>
);

export default App;
