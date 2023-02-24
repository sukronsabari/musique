import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { shazamApi } from './services/api';
import musicPlayerReducer from './features/musicPlayerSlice';

export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,

    musicPlayer: musicPlayerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
