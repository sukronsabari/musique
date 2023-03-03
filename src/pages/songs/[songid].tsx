/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import Image from 'next/image';
import { SongDetailResponse } from '@/types/songDetail';
import { TopChartResponse } from '@/types/topChart';
import NoCoverArt from '@/assets/nocoverart.jpg';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import axios, { AxiosResponse } from 'axios';
import { ParsedUrlQuery } from 'querystring';
import VideoPlayer from '@/components/VideoPlayer';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { setIsPlaying, setActiveSong } from '@/redux/features/musicPlayerSlice';
import PlayPauseIcon from '@/components/PlayPauseIcon';
import SongCard from '@/components/SongCard';
import { SongsRecomendationResponse } from '@/types/songsRecomendation';
import { useState, useEffect } from 'react';
import { generateRequestOptions } from '@/utils';

const BASE_URL = 'https://shazam.p.rapidapi.com';

interface IParams extends ParsedUrlQuery {
  songid: string;
}

export default function DetailSong({
  trackDetail,
  songsRecomendation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [preRenderComplete, setPreRenderComplete] = useState(false);
  const { isPlaying, activeSong } = useAppSelector(
    (state) => state.musicPlayer
  );
  const dispatch = useAppDispatch();

  const videoSection = trackDetail?.sections?.find(
    (section) => section.type === 'VIDEO'
  );

  const lyricsSections = trackDetail?.sections?.find(
    (section) => section.type === 'LYRICS'
  );

  const handlePlayClick = () => {
    dispatch(
      setActiveSong({ track: trackDetail, tracks: [trackDetail], index: 0 })
    );
    dispatch(setIsPlaying(true));
  };

  const handlePauseClick = () => {
    dispatch(setIsPlaying(false));
  };

  useEffect(() => {
    // Updating a state causes a re-render
    setPreRenderComplete(true);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-gradient-to-b from-sky-900 to-slate-900 text-white pt-6 pb-2 lg:flex-row lg:bg-gradient-to-r lg:from-transparent lg:to-primary/60 lg:text-dark lg:px-12 lg:py-5">
        <div className="relative group">
          <div
            className={`absolute top-0 z-[2] items-center justify-center w-full h-full bg-black/80 rounded-lg group-hover:flex ${
              activeSong?.title === trackDetail?.title ? 'flex' : 'hidden'
            }`}
          >
            <div className="text-white">
              <PlayPauseIcon
                track={trackDetail}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePlay={handlePlayClick}
                handlePause={handlePauseClick}
              />
            </div>
          </div>
          <Image
            src={trackDetail?.images?.coverart || NoCoverArt}
            alt="coverart"
            width={275}
            height={275}
            className="object-cover rounded-lg block border-2 border-white/40"
          />
        </div>

        <div className="text-center lg:text-left lg:ml-6">
          <h2 className="font-bold text-2xl mt-4">
            {trackDetail?.title || 'No Title'}
          </h2>
          <p className="text-base font-medium mt-2 mb-4">
            {trackDetail?.subtitle || 'No Subtitle'}
          </p>
        </div>
      </div>
      {lyricsSections?.text ? (
        <div className="mt-10 pl-6 lg:pl-12">
          <h2 className="font-bold text-2xl mb-5">Lyrics</h2>
          <div className="w-full h-[400px] overflow-scroll hide-scrollbar space-y-1">
            {lyricsSections?.text?.map((lyric) => (
              <p key={uuidv4()} className="text-paragraph text-base">
                {lyric}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 pl-6 lg:pl-12">
          <h2 className="font-bold text-2xl mb-5">Lyrics</h2>
          <div className="min-h-[100px]">
            <p className="text-paragraph text-base">
              The lyrics cannot be found, please wait until our team provides
              the lyrics for this song
            </p>
          </div>
        </div>
      )}

      {preRenderComplete && videoSection?.youtubeurl && (
        <div className="mt-12">
          <h2 className="font-bold text-2xl pl-6 mb-5 lg:pl-12">Video Music</h2>
          <VideoPlayer url={videoSection.youtubeurl.actions[0].uri} />
        </div>
      )}

      {songsRecomendation?.tracks?.length && (
        <div className="mt-12">
          <h2 className="font-bold text-2xl pl-5 mb-5 lg:pl-12">
            Similar Songs
          </h2>
          <div className="px-4 sm:px-6 lg:px-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-x-4 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {songsRecomendation?.tracks?.map((track, index) => (
              <SongCard
                key={track.key}
                track={track}
                tracks={songsRecomendation?.tracks}
                index={index}
                isPlaying={isPlaying}
                activeSong={activeSong}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  trackDetail: SongDetailResponse;
  songsRecomendation: SongsRecomendationResponse;
}> = async (context) => {
  const { songid } = context.params as IParams;

  const optionsSongDetail = generateRequestOptions({
    method: 'GET',
    url: `${BASE_URL}/songs/get-details`,
    params: {
      key: songid,
      locale: 'en-US',
    },
  });

  const optionsSongsRecomendation = generateRequestOptions({
    method: 'GET',
    url: `${BASE_URL}/songs/list-recommendations`,
    params: {
      key: songid,
      locale: 'en-US',
    },
  });

  const optionsSongsRecAlternatif = generateRequestOptions({
    method: 'GET',
    url: `${BASE_URL}/songs/list-recommendations`,
    params: {
      key: '484129036',
      locale: 'en-US',
    },
  });

  try {
    const [dataSongDetail, dataSongsRecomendation, dataSongsRecAlternatif] =
      await Promise.all([
        axios.request(optionsSongDetail),
        axios.request(optionsSongsRecomendation),
        axios.request(optionsSongsRecAlternatif),
      ]);

    const songs =
      dataSongsRecomendation.data &&
      Object.keys(dataSongsRecomendation.data)?.length !== 0
        ? dataSongsRecomendation.data
        : dataSongsRecAlternatif.data;

    console.log(`Generating page using songid: ${songid}`);

    return {
      props: {
        trackDetail: dataSongDetail.data,
        songsRecomendation: songs,
      },
      // revalidate: 172800,
    };
  } catch (error) {
    console.log(error);

    const trackEmpty = [] as unknown as SongDetailResponse;
    const songsRecomendationEmpty = [] as unknown as SongsRecomendationResponse;
    return {
      props: {
        trackDetail: trackEmpty,
        songsRecomendation: songsRecomendationEmpty,
      },
      // revalidate: 172800, // revalidate setiap 2 hari (dalam detik)
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/charts/track`,
    params: { locale: 'en-US', pageSize: '20', startFrom: '0' },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
    },
  };

  const response: AxiosResponse<TopChartResponse> = await axios.request(
    options
  );
  const paths = response.data.tracks.map((track) => {
    return {
      params: { songid: track.key },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
