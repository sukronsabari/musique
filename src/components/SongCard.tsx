import { Track } from '@/types/topChart';
import { SongDetailResponse } from '@/types/songDetail';
import Image from 'next/image';
import NoCoverArtImage from '@/assets/nocoverart.jpg';
import { useAppDispatch } from '@/redux/app/hooks';
import { setActiveSong, setIsPlaying } from '@/redux/features/musicPlayerSlice';
import Link from 'next/link';
import PlayPauseIcon from './PlayPauseIcon';

type SongCardProps = {
  track: Track | SongDetailResponse;
  tracks: Track[] | SongDetailResponse[];
  index: number;
  isPlaying: boolean;
  activeSong: Track | SongDetailResponse;
};

export default function SongCard({
  track,
  tracks,
  index,
  isPlaying,
  activeSong,
}: SongCardProps) {
  const dispatch = useAppDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ track, tracks, index }));
    dispatch(setIsPlaying(true));
  };

  const handlePauseClick = () => {
    dispatch(setIsPlaying(false));
  };

  return (
    <div className="p-4 bg-white rounded-lg max-w-[160px] sm:max-w-[190px] md:max-w-[210px] lg:max-w-[190px]">
      <div className="relative group">
        <div
          className={`absolute top-0 z-[2] items-center justify-center w-full h-full bg-black/80 rounded-lg group-hover:flex ${
            activeSong?.title === track?.title ? 'flex' : 'hidden'
          }`}
        >
          <div className="text-white">
            <PlayPauseIcon
              track={track}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePlay={handlePlayClick}
              handlePause={handlePauseClick}
            />
          </div>
        </div>
        <Image
          src={track?.images?.coverart || NoCoverArtImage}
          width={160}
          height={160}
          alt="coverart"
          className="rounded-lg object-cover w-full"
        />
      </div>
      <p className="mt-2 truncate">
        <Link href={`/songs/${track.key}`} className="hover:underline">
          {track.title}
        </Link>
      </p>
      <p className="mt-1 text-xs text-paragraph truncate">
        {track?.subtitle || 'No Subtitle'}
      </p>
    </div>
  );
}
