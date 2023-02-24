import React from 'react';
import {
  TbVolume as VolumeHigh,
  TbVolume2 as VolumeLow,
  TbVolume3 as VolumeMute,
} from 'react-icons/tb';

type VolumeBarProps = {
  volume: number;
  min: number;
  max: number;
  onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
};

export default function VolumeBar({
  volume,
  min,
  max,
  onVolumeChange,
  setVolume,
}: VolumeBarProps) {
  return (
    <div className="hidden lg:flex-1 items-center">
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
        id="volume"
        value={volume}
        min={min}
        max={max}
        onChange={onVolumeChange}
      />
    </div>
  );
}
