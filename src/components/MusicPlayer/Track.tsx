import Image from 'next/image';
import { Track } from '@/redux/features/musicPlayerType';
import NoCoverImage from '@/assets/nocoverart.jpg';

type TrackProps = {
  activeSong: Track;
  isPlaying: boolean;
};

export default function Track({ activeSong, isPlaying }: TrackProps) {
  return (
    <div className="flex-1 flex items-center">
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
        <p className="font-bold text-xl mb-1">{activeSong?.title}</p>
        <p className="text-slate-500">{activeSong?.subtitle}</p>
      </div>
    </div>
  );
}
