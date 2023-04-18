import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import messageReducer from './messageSlice';
import authReducer from './authSlice';

const persistConfig = { key: 'root', storage, version: 1 };
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: { auth: persistedAuthReducer, message: messageReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
