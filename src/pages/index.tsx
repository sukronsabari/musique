import { useGetTopChartQuery } from '@/redux/services/api';
import SongCard from '@/components/SongCard';
import { useAppSelector } from '@/redux/app/hooks';

import SwiperSlideSong from '@/components/SwiperSlideSong';
import SwiperSlideArtists from '@/components/SwiperSlideArtists';

export default function Home() {
  const { isPlaying, activeSong } = useAppSelector(
    (state) => state.musicPlayer
  );
  const { data, error, isFetching } = useGetTopChartQuery();
  const topArtists = data?.result?.tracks.slice(0, 10);

  if (isFetching) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Ups, something went wrong</p>;
  }

  return (
    <>
      <h2 className="font-bold text-xl mb-6">For You</h2>
      <SwiperSlideSong
        tracks={data?.result?.tracks}
        activeSong={activeSong}
        isPlaying={isPlaying}
      />

      <h2 className="font-bold text-xl mt-10 mb-6">Top Artists</h2>
      <SwiperSlideArtists topArtists={topArtists} />

      <h2 className="font-bold text-xl mt-16 mb-6">Recomended</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-x-4 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data?.result?.tracks?.map((track, index) => (
          <SongCard
            key={track.key}
            track={track}
            tracks={data?.result?.tracks}
            index={index}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </>
  );
}
