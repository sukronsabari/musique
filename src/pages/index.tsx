/* eslint-disable import/no-extraneous-dependencies */
import { useGetTopChartQuery } from '@/redux/services/api';
import SongCard from '@/components/SongCard';
import { useAppSelector } from '@/redux/app/hooks';

import SwiperSlideSong from '@/components/SwiperSlideSong';
import SwiperSlideArtists from '@/components/SwiperSlideArtists';

import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonLoadingGrid from '@/components/SkeletonLoadingGrid';
import SkeletonLoadingSlide from '@/components/SkeletonLoadingSlide';

export default function Home() {
  const { isPlaying, activeSong } = useAppSelector(
    (state) => state.musicPlayer
  );
  const { data, error, isFetching } = useGetTopChartQuery();
  const topArtists = data?.tracks.slice(0, 10);

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
      <SwiperSlideSong
        tracks={data?.tracks}
        activeSong={activeSong}
        isPlaying={isPlaying}
      />

      <h2 className="font-bold text-xl mt-10 mb-6">Top Artists</h2>
      <SwiperSlideArtists topArtists={topArtists} />

      <h2 className="font-bold text-xl mt-16 mb-6">Recomended</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-x-4 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data?.tracks?.map((track, index) => (
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
