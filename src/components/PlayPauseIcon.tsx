import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from '@tabler/icons-react';
import { Track } from '@/redux/features/musicPlayerType';

type PlayPauseProps = {
  track: Track;
  isPlaying: boolean;
  activeSong: Track;
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
        className="text-white"
        size={50}
        onClick={handlePause}
      />
    );
  }

  return (
    <IconPlayerPlayFilled
      className="text-white"
      size={50}
      onClick={handlePlay}
    />
  );
}
