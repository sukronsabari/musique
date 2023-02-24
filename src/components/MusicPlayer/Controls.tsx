import React from 'react';
import { Track } from '@/redux/features/musicPlayerType';
import { TbRepeat, TbArrowsShuffle } from 'react-icons/tb';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';

type ControlsProps = {
  tracks: Track[];
  isPlaying: boolean;
  repeat: boolean;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
};

export default function Controls({
  tracks,
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}: ControlsProps) {
  const isDisable = tracks?.length > 0;
  return (
    <div className="flex items-center justify-around ">
      <TbRepeat
        size={25}
        className={repeat ? 'text-red-500' : 'text-slate-700'}
        onClick={() => setRepeat(true)}
      />
      <button onClick={handlePrevSong} disabled={isDisable}>
        <MdSkipPrevious size={25} className="text-slate-700" />
      </button>
      {isPlaying ? (
        <button onClick={handlePlayPause}>
          <BsFillPauseFill size={25} className="text-slate-700" />
        </button>
      ) : (
        <button onClick={handlePlayPause}>
          <BsFillPlayFill size={25} className="text-slate-700" />
        </button>
      )}
      <button onClick={handleNextSong} disabled={isDisable}>
        <MdSkipNext size={25} className="text-slate-700" />
      </button>
      <TbArrowsShuffle
        size={25}
        className={shuffle ? 'text-red-500' : 'text-slate-700'}
        onClick={() => setShuffle(true)}
      />
    </div>
  );
}
