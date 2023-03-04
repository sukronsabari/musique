/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Scenario testing for musicPlayerSlice:
 * - musicPlayerSlice:
 *  - should be able to set ActiveSong correctly
 *  - should be able to set isPlaying correctly
 *  - should be able to set nextSong correctly
 *  - should be able to set prevSong correctly
 */

import { Track } from '@/types/topChart';
import musicPlayerReducer, {
  setActiveSong,
  setIsPlaying,
  nextSong,
  prevSong,
  initialState,
} from '../src/redux/features/musicPlayerSlice';

describe('musicPlayerSlice', () => {
  test('should be able to set ActiveSong correctly', () => {
    // arrange
    const track = {
      id: 'song1',
      title: 'Song1',
      artist: 'Artist1',
    } as unknown as Track;

    // action
    const nextState = musicPlayerReducer(
      initialState,
      setActiveSong({
        track,
        tracks: [track],
        index: 0,
      })
    );

    // assert
    expect(nextState.activeSong).toEqual(track);
    expect(nextState.tracks).toEqual([track]);
    expect(nextState.currentIndex).toEqual(0);
    expect(nextState.isActive).toEqual(true);
    expect(nextState.isPlaying).toEqual(false);
  });

  test('should be able to set isPlaying correctly', () => {
    // action
    const nextState = musicPlayerReducer(initialState, setIsPlaying(true));

    // assert
    expect(nextState.isPlaying).not.toEqual(false);
    expect(nextState.isPlaying).toEqual(true);
  });

  test('should be able to set nextSong correctly', () => {
    // arrange
    const tracks = [
      {
        id: '123',
        title: 'Song1',
        artist: 'Artist1',
      },
      {
        id: '1234',
        title: 'Song2',
        artist: 'Artist2',
      },
    ] as unknown as Track[];

    const state = {
      ...initialState,
      currentIndex: 0,
      tracks,
    };

    // action
    const nextState = musicPlayerReducer(state, nextSong(1));

    // assert
    expect(nextState.currentIndex).toEqual(1);
    expect(nextState.activeSong).toEqual(state.tracks[1]);
    expect(nextState.isActive).toEqual(true);
  });

  test('should be able to set prevSong correctly', () => {
    const tracks = [
      {
        id: '123',
        title: 'Song1',
        artist: 'Artist1',
      },
      {
        id: '1234',
        title: 'Song2',
        artist: 'Artist2',
      },
    ] as unknown as Track[];

    // arrange
    const state = {
      ...initialState,
      currentIndex: 1,
      tracks,
    };

    // action
    const nextState = musicPlayerReducer(state, prevSong(0));

    // assert
    expect(nextState.currentIndex).toEqual(0);
    expect(nextState.activeSong).toEqual(state.tracks[0]);
    expect(nextState.isActive).toEqual(true);
  });
});
