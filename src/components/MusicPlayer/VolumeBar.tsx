import React from 'react';
import {
  IconVolume as VolumeHigh,
  IconVolume2 as VolumeLow,
  IconVolume3 as VolumeMute,
} from '@tabler/icons-react';

type VolumeBarProps = {
  volume: number;
  min: string;
  max: string;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
};

export default function VolumeBar({
  volume,
  min,
  max,
  handleVolumeChange,
  setVolume,
}: VolumeBarProps) {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-end">
      <div>
        {volume <= 1 && volume > 0.5 && (
          <VolumeHigh
            size={25}
            className="text-slate-700"
            onClick={() => setVolume(0)}
          />
        )}
        {volume <= 0.5 && volume > 0 && (
          <VolumeLow
            size={25}
            className="text-slate-700"
            onClick={() => setVolume(0)}
          />
        )}
        {volume === 0 && (
          <VolumeMute
            size={25}
            className="text-slate-700"
            onClick={() => setVolume(1)}
          />
        )}
      </div>
      <input
        type="range"
        name="volume"
        step="any"
        value={volume}
        min={min}
        max={max}
        onInput={handleVolumeChange}
      />
    </div>
  );
}
