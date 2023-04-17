import type { Preview } from '@storybook/react';
import * as React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { makeTheme } from '../src/theme/theme';
import { Provider } from 'react-redux';
import store from '../src/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const theme = makeTheme('light');

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Story />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  ],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};
