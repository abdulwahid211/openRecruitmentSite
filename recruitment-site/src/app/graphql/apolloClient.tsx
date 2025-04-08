// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const uri = 'https://localhost:7242/graphql/';

const client = new ApolloClient({
  link: new HttpLink({
    uri: uri, // replace with your GraphQL server URL
  }),
  cache: new InMemoryCache(),
});

export default client;
