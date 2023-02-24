/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from './musicPlayerType';

type InitialState = {
  tracks: Track[];
  activeSong: Track;
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
};

const initialState: InitialState = {
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
    setSong: (
      state,
      action: PayloadAction<{ song: Track; tracks: Track[]; index: number }>
    ) => {
      state.activeSong = action.payload.song;
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

const { reducer: musicPlayerReducer } = musicPlayerSlice;

export const { setSong, setIsPlaying, nextSong, prevSong } =
  musicPlayerSlice.actions;
export default musicPlayerReducer;
