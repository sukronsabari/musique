import Image from 'next/image';
import { Track as TrackType } from '@/types/topChart';
import { SongDetailResponse } from '@/types/songDetail';
import NoCoverImage from '@/assets/nocoverart.jpg';
import Link from 'next/link';

type TrackProps = {
  activeSong: TrackType | SongDetailResponse;
  isPlaying: boolean;
};

export default function Track({ activeSong, isPlaying }: TrackProps) {
  return (
    <div className="sm:flex-1 flex items-center w-[120px] sm:w-auto">
      <div
        className={`hidden sm:block sm:mr-4 ${
          isPlaying && 'animate-spin-slow'
        }`}
      >
        <Image
          src={activeSong?.images?.coverart || NoCoverImage}
          width="50"
          height="50"
          alt="coverart"
          className="rounded-full"
        />
      </div>
      <div>
        <p className="font-bold text-base mb-1 truncate w-[100px] sm:w-auto md:text-lg">
          <Link href={`/songs/${activeSong?.key}`} className="hover:underline">
            {activeSong?.title}
          </Link>
        </p>
        <p className="text-paragraph text-xs truncate w-[100px] sm:w-auto md:text-base">
          {activeSong?.subtitle}
        </p>
      </div>
    </div>
  );
}
