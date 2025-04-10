// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { cache } from 'react';
import { AUTH_TOKEN } from './constants';

const uri = 'https://localhost:7242/graphql/';

// Middleware to attach the token to headers
const authLink = new ApolloLink((operation, forward) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN) : null;
  console.log(token, 'token outcome');
  // Set the Authorization header
  operation.setContext({
    headers: {
      Authorization: token ? `${token}` : '',
    },
  });
  console.log(operation, 'operation outcome');
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: uri })),
  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default client;
