import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setMessage } from 'utils';

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    setMessage(graphQLErrors[0].message, 'error', 'GraphQL Client');
    return;
  } else if (networkError) {
    setMessage(networkError.message, 'error', 'GraphQL Client');
    return;
  }
});

const uploadLink = createUploadLink({ uri: 'http://localhost:3001/graphql', credentials: 'include' });

const link = from([errorLink, uploadLink]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});
