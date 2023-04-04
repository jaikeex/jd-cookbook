import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from 'store';
import { ApolloProvider } from '@apollo/client';
import { client } from 'core/graphql/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
