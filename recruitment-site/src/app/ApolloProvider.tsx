// app/ApolloProvider.js
'use client';

import { ApolloProvider } from '@apollo/client';
import client from '../app/graphql/apolloClient';

export function Providers({ children }: any) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
