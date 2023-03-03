import Image from 'next/image';

type TopArtistCircleProps = {
  subtitle: string;
  image: string | undefined;
};

export default function TopArtistCircle({
  subtitle,
  image,
}: TopArtistCircleProps) {
  return (
    <div className="p-1 overflow-hidden">
      <Image
        src={image || 'https://source.unsplash.com/random/?user'}
        width="125"
        height="125"
        alt="artist-image"
        className="block mb-4 object-cover rounded-full w-24 sm:w-[130px] mx-auto"
      />
      <p className="font-bold text-center truncate">{subtitle || 'Artist'}</p>
    </div>
  );
}
