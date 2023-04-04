import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { addMessage } from 'store/messageSlice';
import store from 'store';

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map((error) => {
      store.dispatch(addMessage({ message: error.message, severity: 'error', origin: 'GraphQL Client' }));
    });
    return;
  } else if (networkError) {
    store.dispatch(addMessage({ message: networkError.message, severity: 'error', origin: 'GraphQL Client' }));
    return;
  }
});

const uploadLink = createUploadLink({ uri: 'http://localhost:3001/graphql', credentials: 'include' });

const link = from([errorLink, uploadLink]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});
