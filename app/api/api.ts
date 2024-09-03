import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TRootState } from '../store/store.ts';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shoplist-be.vercel.app/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as TRootState).user?.user?.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export type TErrorType = {
  data: {
    message: string;
    meta: Record<string, string[]>;
    path: string;
    timestamp: string;
    status: number;
  };
};
