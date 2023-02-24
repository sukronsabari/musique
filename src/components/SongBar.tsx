/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import Image from 'next/image';
import Link from 'next/link';
import PlayPause from './PlayPause';

export default function SongBar({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) {
  return (
    <div
      className={`w-full flex items-center hover:bg-[#4c426e] py-2 p-4 mb-2 rounded-lg cursor-pointer ${
        activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'
      }`}
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex flex-1 justify-between items-center">
        <Image
          src={
            artistId
              ? song?.attributes?.artwork?.url
                  .replace('{w}', 125)
                  .replace('{h}', 125)
              : song?.images?.coverart
          }
          className="rounded-lg"
          alt={song?.title}
          width={80}
          height={80}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link href={`/song/${song.key}`}>
              <p className="text-xl font-bold text-white">{song?.title}</p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white">
              {song?.attributes?.name}
            </p>
          )}
          <p className="text-base text-gray-300 mt-1">
            {artistId ? song?.attributes?.albumName : song?.subtitle}
          </p>
        </div>
      </div>
      {!artistId && (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      )}
    </div>
  );
}
