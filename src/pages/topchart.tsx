import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useGetTopChartQuery } from '@/redux/services/api';
import SongCard from '@/components/SongCard';
import SkeletonLoadingGrid from '@/components/SkeletonLoadingGrid';
import { useAppSelector } from '@/redux/app/hooks';

import { Track } from '@/types/topChart';
import BeatLoaderIndicator from '@/components/BeatLoaderIndicator';

export default function TopChart() {
  const [startFrom, setStartFrom] = useState(0);
  const [songs, setSongs] = useState<Track[]>([] as unknown as Track[]);
  const [initLoad, setInitLoad] = useState(true);
  const [loadMoreSongs, setLoadMoreSongs] = useState(false);

  const { data, isFetching, error } = useGetTopChartQuery({
    pageSize: 20,
    startFrom,
  });

  const { isPlaying, activeSong } = useAppSelector(
    (state) => state.musicPlayer
  );

  const handleLoadMore = () => {
    setLoadMoreSongs(true);
    setStartFrom((prev) => prev + 20);
  };

  useEffect(() => {
    if (data?.tracks?.length) {
      setSongs((prevSongs) => [...prevSongs, ...data.tracks]);
      setInitLoad(false);
      setLoadMoreSongs(false);
    }
  }, [data?.tracks]);

  if (initLoad && isFetching) {
    return (
      <div className="px-4 py-5 sm:px-6">
        <SkeletonLoadingGrid className="mt-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)]">
        <h1 className="my-5 font-bold text-2xl">Ups, something went wrong.</h1>
        <p className="font-medium text-paragraph text-center">
          You have exceeded your MONTHLY quota for Requests to the API
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>MusiQue | Topchart</title>
      </Head>
      <div className="px-6 py-5 lg:px-12">
        <h2 className="font-bold text-xl mb-6">Top Chart</h2>
        <div>
          {songs?.length && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-x-4 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {songs?.map((track, index) => (
                <SongCard
                  key={track.key}
                  track={track}
                  tracks={songs}
                  index={index}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                />
              ))}
            </div>
          )}

          {!loadMoreSongs && songs?.length >= 20 && (
            <div className="flex justify-center mt-12">
              <button
                type="button"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}

          {loadMoreSongs && (
            <div className="flex justify-center mt-12">
              <BeatLoaderIndicator />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
