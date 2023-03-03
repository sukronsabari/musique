import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { v4 as uuidv4 } from 'uuid';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function SwiperSlideSongEmpty() {
  const arrays = Array.from({ length: 8 });
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={15}
      freeMode
      modules={[FreeMode]}
    >
      {arrays.map((arr, index) => (
        <SwiperSlide
          key={uuidv4()}
          style={{ width: '160px', height: '200px' }}
          className="sm:!w-[190px] md:!w-[210px] lg:!w-[190px]"
        >
          {index}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
