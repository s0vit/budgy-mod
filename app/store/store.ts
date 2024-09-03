import { configureStore } from '@reduxjs/toolkit';
import { SLICE_NAMES } from './SLICE_NAMES.ts';
import { userSlice } from '../entities/user/model/userSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../api/api.ts';

export const store = configureStore({
  reducer: {
    [SLICE_NAMES.USER]: userSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type TRootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();
