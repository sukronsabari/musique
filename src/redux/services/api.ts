import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TopChartResponse } from '../features/musicPlayerType';

const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';
const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || '';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://shazam-song-recognizer.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
});

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery,
  endpoints: (builder) => ({
    // builder.query<TipeDariResponse, TipeParameterYandDikirimKeEndpointIni>
    getTopChart: builder.query<TopChartResponse, void>({
      query: () => '/top_country_tracks?country_code=ID&limit=10&start_from=0',
    }),
  }),
});

export const { useGetTopChartQuery } = shazamApi;
