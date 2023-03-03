/* eslint-disable @typescript-eslint/ban-types */
export type TopChartResponse = {
  properties?: {};
  tracks: Track[];
};

export type Track = {
  layout: string;
  type: string;
  key: string;
  title: string;
  subtitle: string;
  share: Share;
  images?: Images;
  hub: Hub;
  artists?: Artist[];
  url: string;
  highlightsurls?: Highlightsurls;
};

interface Highlightsurls {
  artisthighlightsurl?: string;
  trackhighlighturl?: string;
}

interface Artist {
  alias: string;
  id: string;
  adamid: string;
}

interface Hub {
  type: string;
  image: string;
  actions?: Action[];
  options: Option[];
  explicit: boolean;
  displayname: string;
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
  name: string;
  type: string;
  uri: string;
}

interface Action {
  name: string;
  type: string;
  id?: string;
  uri?: string;
}

interface Images {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}

interface Share {
  subject: string;
  text: string;
  href: string;
  image?: string;
  twitter: string;
  html: string;
  avatar?: string;
  snapchat: string;
}
