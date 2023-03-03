import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SongsRecomendationResponse } from '@/types/songRecomendation';
import { TopChartResponse } from '../../types/topChart';

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
      query: () => `/charts/track?locale=en-US&pageSize=20&startFrom=0`,
    }),
    getRecomendationSongs: builder.query<
      SongsRecomendationResponse,
      { songid: number }
    >({
      query: ({ songid }) =>
        `/songs/list-recommendations?key=${songid}&locale=en-US`,
    }),
  }),
});

export const { useGetTopChartQuery, useGetRecomendationSongsQuery } = shazamApi;
