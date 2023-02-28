import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { Track } from '@/redux/features/musicPlayerType';
import TopArtistCircle from './TopArtistCircle';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function SwiperSlideArtists({
  topArtists,
}: {
  topArtists: Track[] | undefined;
}) {
  if (!topArtists?.length) {
    return null;
  }

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={15}
      freeMode
      modules={[FreeMode]}
    >
      {topArtists?.map((track) => (
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
  );
}
