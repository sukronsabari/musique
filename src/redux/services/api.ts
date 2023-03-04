import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SongsRecomendationResponse } from '@/types/songsRecomendation';
import { TopChartResponse } from '../../types/topChart';

const API_KEY = process.env.NEXT_PUBLIC_MUSIQUE_RAPIDAPI_KEY || '';
const API_HOST = process.env.NEXT_PUBLIC_MUSIQUE_RAPIDAPI_HOST || '';

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
    getTopChart: builder.query<
      TopChartResponse,
      { pageSize?: number; startFrom?: number }
    >({
      query: ({ pageSize = 20, startFrom = 0 }) => {
        return `/charts/track?locale=en-US&pageSize=${pageSize}&startFrom=${startFrom}`;
      },
    }),
    getRecomendedForYouSongs: builder.query<SongsRecomendationResponse, void>({
      query: () => `/songs/list-recommendations?key=413168592&locale=en-US`,
    }),
  }),
});

export const { useGetTopChartQuery, useGetRecomendedForYouSongsQuery } =
  shazamApi;
