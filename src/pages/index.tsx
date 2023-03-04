import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useGetTopChartQuery } from '@/redux/services/api';
import { useAppSelector } from '@/redux/app/hooks';
import axios, { AxiosResponse } from 'axios';

import SongCard from '@/components/SongCard';
import SwiperSlideSong from '@/components/SwiperSlideSong';
import SwiperSlideArtists from '@/components/SwiperSlideArtists';
import SkeletonLoadingGrid from '@/components/SkeletonLoadingGrid';
import SkeletonLoadingSlide from '@/components/SkeletonLoadingSlide';
import SwiperSlideSongEmpty from '@/components/SwiperSlideSongEmpty';

import { generateRequestOptions } from '@/utils';
import { SongsRecomendationResponse as ForYouSongsResponse } from '@/types/songsRecomendation';

export default function Home({
  forYouSongs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isPlaying, activeSong } = useAppSelector(
    (state) => state.musicPlayer
  );
  const [preRenderComplete, setPreRenderComplete] = useState(false);

  const { data, error, isFetching } = useGetTopChartQuery({ pageSize: 20 });
  const topArtists = data?.tracks.slice(0, 10);

  useEffect(() => {
    setPreRenderComplete(true);
  }, []);

  if (isFetching) {
    return (
      <div className="px-4 py-5 sm:px-6">
        <SkeletonLoadingSlide />
        <SkeletonLoadingSlide className="mt-12" />
        <SkeletonLoadingGrid className="mt-12" />
      </div>
    );
  }

  if (error) {
    return <h1 className="mx-4 my-5 sm:mx-6">Ups, something went wrong</h1>;
  }

  return (
    <div className="px-6 py-5 lg:px-12">
      <h2 className="font-bold text-xl mb-6">For You</h2>
      {preRenderComplete && forYouSongs?.tracks?.length && (
        <SwiperSlideSong
          tracks={forYouSongs.tracks}
          activeSong={activeSong}
          isPlaying={isPlaying}
        />
      )}

      <h2 className="font-bold text-xl mt-10 mb-6">Top Artists</h2>
      <SwiperSlideArtists topArtists={topArtists} />

      <div className="flex justify-between items-center mt-16 mb-6">
        <h2 className="font-bold text-xl">Top Chart</h2>
        <Link
          href="/topchart"
          className="font-medium text-paragraph hover:underline"
        >
          See more
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-x-4 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data?.tracks.length &&
          data?.tracks?.map((track, index) => (
            <SongCard
              key={track.key}
              track={track}
              tracks={data?.tracks}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  forYouSongs: ForYouSongsResponse;
}> = async () => {
  const BASE_URL = 'https://shazam.p.rapidapi.com';
  const options = generateRequestOptions({
    method: 'GET',
    url: `${BASE_URL}/songs/list-recommendations`,
    params: {
      key: '413168592',
      locale: 'en-US',
    },
  });

  try {
    const response: AxiosResponse<ForYouSongsResponse> = await axios.request(
      options
    );
    const forYouSongs = response.data;

    return {
      props: {
        forYouSongs,
      },
    };
  } catch (error) {
    const emptySongs = [] as unknown as ForYouSongsResponse;
    return {
      props: {
        forYouSongs: emptySongs,
      },
    };
  }
};
