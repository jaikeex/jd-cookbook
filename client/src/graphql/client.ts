import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    alert(networkError.message);
  }
});

const uploadLink = createUploadLink({ uri: 'http://localhost:3001/graphql', credentials: 'include' });

const link = from([errorLink, uploadLink]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});
