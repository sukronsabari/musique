export type SongDetailResponse = {
  layout: string;
  type: string;
  key: string;
  title: string;
  subtitle: string;
  images: Images;
  share: Share;
  hub: Hub;
  url: string;
  artists: Artist[];
  isrc: string;
  genres: Genres;
  urlparams: Urlparams;
  myshazam: Myshazam;
  albumadamid: string;
  sections: Section[];
};

interface Section {
  type: string;
  metapages?: Metapage[];
  tabname: string;
  metadata?: Metadatum[];
  text?: string[];
  footer?: string;
  beacondata?: Beacondata2;
  youtubeurl?: Youtubeurl;
}

interface Youtubeurl {
  caption: string;
  image: Image;
  actions: Action4[];
}

interface Action4 {
  name: string;
  type: string;
  share: Share;
  uri: string;
}

interface Image {
  dimensions: Dimensions;
  url: string;
}

interface Dimensions {
  width: number;
  height: number;
}

interface Beacondata2 {
  lyricsid: string;
  providername: string;
  commontrackid: string;
}

interface Metadatum {
  title: string;
  text: string;
}

interface Metapage {
  image: string;
  caption: string;
}

interface Myshazam {
  apple: Apple;
}

interface Apple {
  actions: Action3[];
}

interface Urlparams {
  '{tracktitle}': string;
  '{trackartist}': string;
}

interface Genres {
  primary: string;
}

interface Artist {
  id: string;
  adamid: string;
}

interface Hub {
  type: string;
  image: string;
  actions: Action[];
  options: Option[];
  providers: Provider[];
  explicit: boolean;
  displayname: string;
}

interface Provider {
  caption: string;
  images: Images2;
  actions: Action3[];
  type: string;
}

interface Action3 {
  name: string;
  type: string;
  uri: string;
}

interface Images2 {
  overflow: string;
  default: string;
}

interface Option {
  caption: string;
  actions: Action2[];
  beacondata: Beacondata;
  image: string;
  type: string;
  listcaption: string;
  overflowimage: string;
  colouroverflowimage: boolean;
  providername: string;
}

interface Beacondata {
  type: string;
  providername: string;
}

interface Action2 {
  name?: string;
  type: string;
  uri: string;
}

interface Action {
  name: string;
  type: string;
  id?: string;
  uri?: string;
}

interface Share {
  subject: string;
  text: string;
  href: string;
  image: string;
  twitter: string;
  html: string;
  avatar: string;
  snapchat: string;
}

interface Images {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}
