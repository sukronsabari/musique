import React, { useEffect, useRef } from 'react';
import { Track } from '@/redux/features/musicPlayerType';

type AudioPlayerProps = {
  activeSong: Track;
  currentTime: number;
  isPlaying: boolean;
  volume: number;
  repeat: boolean;
  onEnded: () => void;
  onTimeUpdate: (event: React.ChangeEvent<HTMLAudioElement>) => void;
  onLoadedData: (event: React.ChangeEvent<HTMLAudioElement>) => void;
};
export default function AudioPlayer({
  activeSong,
  currentTime,
  isPlaying,
  volume,
  repeat,
  onEnded,
  onTimeUpdate,
  onLoadedData,
}: AudioPlayerProps) {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current?.play();
      } else {
        ref.current?.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
      ref.current.currentTime = currentTime;
    }
  }, [volume, currentTime]);

  return (
    <>
      {activeSong.hub.actions && (
        <audio
          src={activeSong.hub.actions[1].uri}
          ref={ref}
          loop={repeat}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onLoadedData={onLoadedData}
        />
      )}
    </>
  );
}
