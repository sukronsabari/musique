import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
// import { useSwiper } from 'swiper/react';

type NavSwiperProps = {
  slideNext: () => void;
  slidePrev: () => void;
};

export default function CustomNavigationSwiper({
  slideNext,
  slidePrev,
}: NavSwiperProps) {
  return (
    <div className="absolute z-[5] inset-y-1/2 w-full hidden sm:block">
      <div className="flex justify-between">
        <button
          type="button"
          className="bg-black bg-opacity-25 rounded-full w-10 h-10 flex justify-center items-center absolute left-0 transform -translate-y-1/2 focus:outline-none"
          onClick={() => slidePrev()}
        >
          <IconChevronLeft className="text-white" size={24} />
        </button>
        <button
          type="button"
          className="bg-black bg-opacity-25 rounded-full w-10 h-10 flex justify-center items-center absolute right-0 transform -translate-y-1/2 focus:outline-none"
          onClick={() => slideNext()}
        >
          <IconChevronRight className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
}
