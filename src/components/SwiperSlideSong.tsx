import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { FreeMode } from 'swiper';
import { Track } from '@/redux/features/musicPlayerType';
import { useRef } from 'react';
import SongCard from './SongCard';
import CustomNavigationSwiper from './CustomNavigationSwiper';

import 'swiper/css';
import 'swiper/css/free-mode';

type SwiperSlideProps = {
  tracks: Track[] | undefined;
  activeSong: Track;
  isPlaying: boolean;
};

export default function SwiperSlideSong({
  tracks,
  activeSong,
  isPlaying,
}: SwiperSlideProps) {
  const swiperRef = useRef<SwiperRef>(null);

  if (!tracks?.length) {
    return null;
  }

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView="auto"
      spaceBetween={15}
      freeMode
      modules={[FreeMode]}
    >
      {tracks?.map((track, index) => (
        <SwiperSlide
          key={track.key}
          style={{ width: '160px' }}
          className="sm:!w-[190px] md:!w-[210px] lg:!w-[190px]"
        >
          <SongCard
            track={track}
            tracks={tracks}
            index={index}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </SwiperSlide>
      ))}
      <CustomNavigationSwiper
        slideNext={() =>
          swiperRef.current && swiperRef.current.swiper.slideNext()
        }
        slidePrev={() =>
          swiperRef.current && swiperRef.current.swiper.slidePrev()
        }
      />
    </Swiper>
  );
}
