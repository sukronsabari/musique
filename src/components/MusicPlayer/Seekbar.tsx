import React from 'react';

type SeekbarProps = {
  currentTime: number;
  min: number;
  max: number;
  handleSeekChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Seekbar({
  currentTime,
  min,
  max,
  handleSeekChange,
}: SeekbarProps) {
  function formatTime(time: number) {
    if (time === 0) {
      return '00:00';
    }

    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  return (
    <div className="hidden lg:flex space-x-4 items-center justify-center w-72">
      <p className="text-paragraph">{formatTime(currentTime)}</p>
      <input
        type="range"
        step="any"
        min={min}
        max={max}
        value={currentTime}
        onInput={handleSeekChange}
        className="block flex-1"
      />
      <p className="text-paragraph">{formatTime(max)}</p>
    </div>
  );
}
