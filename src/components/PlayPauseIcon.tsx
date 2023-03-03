import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from '@tabler/icons-react';
import { Track } from '@/types/topChart';
import { SongDetailResponse } from '@/types/songDetail';

type PlayPauseProps = {
  track: Track | SongDetailResponse;
  isPlaying: boolean;
  activeSong: Track | SongDetailResponse;
  handlePlay: () => void;
  handlePause: () => void;
};

export default function PlayPauseIcon({
  track,
  isPlaying,
  activeSong,
  handlePlay,
  handlePause,
}: PlayPauseProps) {
  if (isPlaying && activeSong?.title === track?.title) {
    return (
      <IconPlayerPauseFilled
        className="text-white cursor-pointer"
        size={50}
        onClick={handlePause}
      />
    );
  }

  return (
    <IconPlayerPlayFilled
      className="text-white cursor-pointer"
      size={50}
      onClick={handlePlay}
    />
  );
}
