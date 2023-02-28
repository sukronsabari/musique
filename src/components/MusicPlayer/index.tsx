/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import {
  setIsPlaying,
  prevSong,
  nextSong,
} from '@/redux/features/musicPlayerSlice';
import ReactPlayer from 'react-player';
import Track from './Track';
import VolumeBar from './VolumeBar';
import Controls from './Controls';
import Seekbar from './Seekbar';

export default function MusicPlayer() {
  const { activeSong, tracks, isActive, isPlaying, currentIndex } =
    useAppSelector((state) => state.musicPlayer);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const dispatch = useAppDispatch();
  const reactPlayerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (tracks.length) {
      dispatch(setIsPlaying(true));
    }
  }, [currentIndex, dispatch, tracks.length]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) dispatch(setIsPlaying(false));
    else dispatch(setIsPlaying(true));
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(tracks.length - 1));
    } else if (shuffle) {
      // Math.random() * tracks.length => get number (0 sampai tracks.length - 1)
      dispatch(prevSong(Math.floor(Math.random() * tracks.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handleNextSong = () => {
    if (!shuffle) {
      // get number 0 - 19. Jika current index 19, maka ( 19 + 1 ) % 20 = 0
      dispatch(nextSong((currentIndex + 1) % tracks.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * tracks.length)));
    }
  };

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setCurrentTime(playedSeconds);
  };

  const handleDuration = (dur: number) => setDuration(dur);

  const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(event.target.value);
    setCurrentTime(time);

    if (reactPlayerRef.current) {
      reactPlayerRef.current.seekTo(time);
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 bg-white backdrop-blur-sm lg:px-6 lg:py-4">
      <Track activeSong={activeSong} isPlaying={isPlaying} />
      <div className="flex-1 flex flex-col items-center justify-center lg:space-y-2">
        <Controls
          tracks={tracks}
          isPlaying={isPlaying}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          currentTime={currentTime}
          min={0}
          max={duration}
          handleSeekChange={handleSeekChange}
        />
        {/* song url terletak di-property action[1] */}
        {activeSong?.hub?.actions?.length && (
          <div className="hidden" title="Audio Player">
            <ReactPlayer
              url={activeSong?.hub?.actions[1]?.uri}
              ref={reactPlayerRef}
              playing={isPlaying}
              loop={repeat}
              volume={volume}
              onProgress={handleProgress}
              onDuration={handleDuration}
              onEnded={handleNextSong}
              style={{ height: '0px !important', width: '0px !important' }}
            />
          </div>
        )}
      </div>
      <VolumeBar
        volume={volume}
        min="0"
        max="1"
        handleVolumeChange={(e) => setVolume(Number(e.target.value))}
        setVolume={setVolume}
      />
    </div>
  );
}
