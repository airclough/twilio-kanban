import '../styles/main.scss';

import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import React, { ReactNode } from 'react';

import Head from '../src/components/Head';
import { AppProvider } from '../src/contexts/App';
import client from '../src/services/apollo';

const App = (
  { Component, pageProps }: AppProps,
): ReactNode => (
  <AppProvider>
    <ApolloProvider client={ client }>
      <Head />
      <Component { ...pageProps } />
    </ApolloProvider>
  </AppProvider>
);

export default App;
