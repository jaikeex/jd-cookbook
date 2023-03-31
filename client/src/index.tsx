import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from 'store';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { api } from 'store/apiSlice';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider api={api}>
        <PersistGate persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </ApiProvider>
    </Provider>
  </React.StrictMode>
);
