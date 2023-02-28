import { Navigation, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetTopChartQuery } from '@/redux/services/api';
import SongCard from '@/components/SongCard';
import { useAppSelector } from '@/redux/app/hooks';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import TopArtistCircle from '@/components/TopArtistCircle';

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
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        modules={[FreeMode, Navigation]}
        navigation
        className="mySwiper"
      >
        {data?.result?.tracks?.map((track, index) => (
          <SwiperSlide
            key={track.key}
            style={{ width: '160px' }}
            className="sm:!w-[190px] md:!w-[210px] lg:!w-[190px]"
          >
            <SongCard
              track={track}
              tracks={data?.result?.tracks}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <h2 className="font-bold text-xl mt-10 mb-6">Top Artists</h2>
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        modules={[FreeMode, Navigation]}
        navigation
        className="mySwiper2"
      >
        {topArtists?.length &&
          topArtists?.map((track) => (
            <SwiperSlide
              key={track.key}
              style={{ width: '100px' }}
              className="sm:!w-[130px]"
            >
              <TopArtistCircle
                id={track?.artists?.length ? track.artists[0].adamid : '1'}
                image={track?.images?.background || 'unsplash.com'}
                subtitle={track?.subtitle}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <h2 className="font-bold text-xl mt-16 mb-6">Recomended</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-x-4 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data?.result?.tracks?.map((track, index) => (
          <SwiperSlide
            key={track.key}
            style={{ width: '160px' }}
            className="sm:!w-[190px] md:!w-[210px] lg:!w-[190px]"
          >
            <SongCard
              track={track}
              tracks={data?.result?.tracks}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          </SwiperSlide>
        ))}
      </div>
    </>
  );
}
