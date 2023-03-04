/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SongDetailResponse } from '@/types/songDetail';
import { Track } from '../../types/topChart';

type InitialState = {
  tracks: Track[] | SongDetailResponse[];
  activeSong: Track | SongDetailResponse;
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
};

export const initialState: InitialState = {
  tracks: [],
  activeSong: {} as Track,
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
};

export const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    setActiveSong: (
      state,
      action: PayloadAction<{
        track: Track | SongDetailResponse;
        tracks: Track[] | SongDetailResponse[];
        index: number;
      }>
    ) => {
      state.activeSong = action.payload.track;
      state.tracks = action.payload.tracks;
      state.currentIndex = action.payload.index;
      state.isActive = true;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    nextSong: (state, action: PayloadAction<number>) => {
      state.activeSong = state.tracks[action.payload];
      state.currentIndex = action.payload;
      state.isActive = true;
    },
    prevSong: (state, action: PayloadAction<number>) => {
      state.activeSong = state.tracks[action.payload];
      state.currentIndex = action.payload;
      state.isActive = true;
    },
  },
});

// men-genereate reducer
const { reducer: musicPlayerReducer } = musicPlayerSlice;

// men-generate actions
export const { setActiveSong, setIsPlaying, nextSong, prevSong } =
  musicPlayerSlice.actions;

export default musicPlayerReducer;
