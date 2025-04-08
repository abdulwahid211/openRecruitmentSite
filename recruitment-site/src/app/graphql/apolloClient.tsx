// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { cache } from 'react';
import { AUTH_TOKEN } from './constants';

const uri = 'https://localhost:7242/graphql/';

// Middleware to attach the token to headers
const authLink = new ApolloLink((operation, forward) => {
  // Get token from localStorage (or wherever you're storing it)
  const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN) : null;

  // Set the Authorization header
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: uri })),
  cache: new InMemoryCache(),
});

export default client;
