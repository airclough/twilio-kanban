import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient( {
  cache: new InMemoryCache(),
  uri: process.env.TWILIO_KANBAN_GRAPHQL_SERVER_URI,
} );

export default client;
