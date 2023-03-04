/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { setIsPlaying, setActiveSong } from '@/redux/features/musicPlayerSlice';

import VideoPlayer from '@/components/VideoPlayer';
import PlayPauseIcon from '@/components/PlayPauseIcon';
import SongCard from '@/components/SongCard';

import NoCoverArt from '@/assets/nocoverart.jpg';
import { generateRequestOptions } from '@/utils';

import { SongDetailResponse } from '@/types/songDetail';
import { useGetSongsRecomendationQuery } from '@/redux/services/api';
import { paths } from '@/assets/constant';

const BASE_URL = 'https://shazam.p.rapidapi.com';

interface IParams extends ParsedUrlQuery {
  songid: string;
}

export default function DetailSong({
  trackDetail,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [preRenderComplete, setPreRenderComplete] = useState(false);
  const { isPlaying, activeSong } = useAppSelector(
    (state) => state.musicPlayer
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data: songsRecomendation } = useGetSongsRecomendationQuery();

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

  if (router.isFallback) {
    return <h2 className="font-bold px-4 sm:px-6 py-5">Loading...</h2>;
  }

  return (
    <>
      <Head>
        <title>MusiQue | Song detail</title>
      </Head>
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

      {preRenderComplete && songsRecomendation?.tracks?.length && (
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

  try {
    const dataSongDetail = await axios.request(optionsSongDetail);

    return {
      props: {
        trackDetail: dataSongDetail.data,
      },
      revalidate: 172800,
    };
  } catch (error) {
    console.log(error);

    const trackEmpty = [] as unknown as SongDetailResponse;

    return {
      props: {
        trackDetail: trackEmpty,
      },
      revalidate: 172800, // revalidate setiap 2 hari (dalam detik)
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths,
    fallback: true,
  };
};
