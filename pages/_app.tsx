import '../styles/main.scss';

import { AppProps } from 'next/app';
import React, { ReactNode } from 'react';

import Head from '../src/components/Head';

const App = (
  { Component, pageProps }: AppProps,
): ReactNode => (
  <>
    <Head />
    <Component { ...pageProps } />
  </>
);

export default App;
