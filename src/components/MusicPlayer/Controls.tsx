/* eslint-disable react/button-has-type */
import React from 'react';
import { Track } from '@/types/topChart';
import { SongDetailResponse } from '@/types/songDetail';
import {
  IconRepeat,
  IconArrowsShuffle,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from '@tabler/icons-react';

type ControlsProps = {
  tracks: Track[] | SongDetailResponse[];
  isPlaying: boolean;
  currentIndex: number;
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
  currentIndex,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}: ControlsProps) {
  return (
    <div className="flex items-center justify-around w-full md:w-80 lg:w-full">
      <button onClick={() => setRepeat((prev) => !prev)}>
        <IconRepeat
          size={25}
          className={`cursor-pointer ${repeat ? 'text-primary' : 'text-dark'}`}
        />
      </button>
      <button
        onClick={handlePrevSong}
        disabled={currentIndex === 0}
        className="text-dark disabled:text-paragraph"
      >
        <IconPlayerSkipBack size={25} />
      </button>
      {isPlaying ? (
        <button
          onClick={handlePlayPause}
          className="p-2 rounded-full bg-primary"
        >
          <IconPlayerPauseFilled size={25} className="text-white" />
        </button>
      ) : (
        <button
          onClick={handlePlayPause}
          className="p-2 rounded-full bg-primary"
        >
          <IconPlayerPlayFilled size={25} className="text-white" />
        </button>
      )}
      <button
        onClick={handleNextSong}
        disabled={currentIndex === tracks.length - 1}
        className="text-dark disabled:text-paragraph"
      >
        <IconPlayerSkipForward size={25} />
      </button>
      <button onClick={() => setShuffle((prev) => !prev)}>
        <IconArrowsShuffle
          size={25}
          className={`cursor-pointer ${shuffle ? 'text-primary' : 'text-dark'}`}
        />
      </button>
    </div>
  );
}
