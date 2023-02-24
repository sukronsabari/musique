import React from 'react';

type SeekbarProps = {
  currentTime: number;
  min: number;
  max: number;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Seekbar({
  currentTime,
  min,
  max,
  onInput,
}: SeekbarProps) {
  function formatTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className="hidden sm:flex items-center">
      <p className="text-white">{formatTime(currentTime)}</p>
      <input
        type="range"
        name="seekBar"
        step="0.1"
        min={min}
        max={max}
        value={currentTime}
        onInput={onInput}
        className="h-1 rounded hidden md:block"
      />
      <p className="text-white">{formatTime(max)}</p>
    </div>
  );
}
