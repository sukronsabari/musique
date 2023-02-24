import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import Track from './Track';
import VolumeBar from './VolumeBar';
import Controls from './Controls';
import Seekbar from './Seekbar';
import AudioPlayer from './AudioPlayer';
import {
  setIsPlaying,
  prevSong,
  nextSong,
} from '@/redux/features/musicPlayerSlice';

export default function MusicPlayer() {
  const { activeSong, tracks, isActive, isPlaying, currentIndex } =
    useAppSelector((state) => state.musicPlayer);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tracks.length) dispatch(setIsPlaying(true));
  }, [currentIndex]);

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
      dispatch(nextSong((currentIndex + 1) % 20));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * tracks.length)));
    }
  };

  return (
    <div className="relative w-full flex justify-between items-center px-8 py-3">
      <Track activeSong={activeSong} isPlaying={isPlaying} />
      <div className="flex-1 flex flex-col items-center justify-center">
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
          onInput={(e) => setCurrentTime(Number(e.target.value))}
        />
        <AudioPlayer
          activeSong={activeSong}
          currentTime={currentTime}
          isPlaying={isPlaying}
          volume={volume}
          repeat={repeat}
          onEnded={handleNextSong}
          onTimeUpdate={(e) => setCurrentTime(Number(e.target.currentTime))}
          onLoadedData={(e) => setDuration(Number(e.target.duration))}
        />
      </div>
      <VolumeBar
        volume={volume}
        min={0}
        max={1}
        onVolumeChange={(e) => setVolume(Number(e.target.value))}
        setVolume={setVolume}
      />
    </div>
  );
}
