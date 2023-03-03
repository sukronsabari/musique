import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios, { AxiosResponse } from 'axios';
import { useAppSelector } from '@/redux/app/hooks';
import { ParsedUrlQuery } from 'querystring';
import SongCard from '@/components/SongCard';
import SkeletonLoadingGrid from '@/components/SkeletonLoadingGrid';

import { generateRequestOptions } from '@/utils';
import { SongsResultResponse, Hit } from '@/types/songsResult';
import { useEffect, useState } from 'react';

interface IParams extends ParsedUrlQuery {
  searchTerm: string;
}

export default function SearchPage({
  tracksHitsResult,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isPlaying, activeSong } = useAppSelector(
    (state) => state.musicPlayer
  );

  const [loading, setLoading] = useState(true);

  const tracks = tracksHitsResult.map((hit) => {
    return hit.track;
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-5 sm:px-6">
        <SkeletonLoadingGrid />
      </div>
    );
  }

  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-x-4 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {tracksHitsResult.length ? (
          tracksHitsResult.map((hit, index) => (
            <SongCard
              key={hit.track.key}
              track={hit.track}
              tracks={tracks}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          ))
        ) : (
          <h2 className="px-4 sm:px-6 my-5">Song Not Found</h2>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  tracksHitsResult: Hit[];
}> = async (context) => {
  const { searchTerm } = context.params as IParams;
  const BASE_URL = 'https://shazam.p.rapidapi.com';

  const options = generateRequestOptions({
    method: 'GET',
    url: `${BASE_URL}/search`,
    params: {
      term: searchTerm,
      locale: 'en-US',
      offset: '0',
      limit: '5',
    },
  });

  try {
    const response: AxiosResponse<SongsResultResponse> = await axios.request(
      options
    );

    return {
      props: {
        tracksHitsResult: response.data.tracks.hits,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    const emptyResult = [] as unknown as Hit[];

    return {
      props: {
        tracksHitsResult: emptyResult,
      },
    };
  }
};
