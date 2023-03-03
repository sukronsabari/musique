import { Track } from './topChart';

export interface Hit {
  track: Track;
  snippet?: string;
}

export interface SongsResultResponse {
  tracks: {
    hits: Hit[];
  };
  // artists: Artists;
}
