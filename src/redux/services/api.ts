import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';
const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || '';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://shazam.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
});

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery,
  endpoints: (builder) => ({
    getTopChart: builder.query({
      query: () => '/track?locale=en-US&pageSize=20&startFrom=0',
    }),
  }),
});

export const { useGetTopChartQuery } = shazamApi;
