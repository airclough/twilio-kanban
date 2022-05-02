import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient( {
  cache: new InMemoryCache(),
  headers: { 'x-twilio-kanban-graphql-server-auth-token': process.env.NEXT_PUBLIC_TWILIO_KANBAN_GRAPHQL_SERVER_AUTH_TOKEN },
  uri: process.env.NEXT_PUBLIC_TWILIO_KANBAN_GRAPHQL_SERVER_URI,
} );

export default client;
