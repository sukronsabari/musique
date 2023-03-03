/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Skeleton from 'react-loading-skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { v4 as uuidv4 } from 'uuid';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonLoadingSlide({
  className = '',
}: {
  className?: string;
}) {
  const skeletonArray = Array.from({ length: 8 });
  return (
    <div className={className}>
      <div className="mb-4">
        <Skeleton className="!w-1/5 min-w-[140px] !h-10" />
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        modules={[FreeMode]}
      >
        {skeletonArray.map((_) => (
          <SwiperSlide
            key={uuidv4()}
            style={{ width: '160px' }}
            className="sm:!w-[190px] md:!w-[210px] lg:!w-[190px]"
          >
            <div className="w-[160px] h-[210px] sm:w-[190px] md:w-[210px] lg:w-[190px]">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
