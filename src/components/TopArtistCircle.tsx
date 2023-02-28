import Link from 'next/link';
import Image from 'next/image';

type TopArtistCircleProps = {
  id: string;
  image: string;
  subtitle: string;
};

export default function TopArtistCircle({
  id,
  image,
  subtitle,
}: TopArtistCircleProps) {
  return (
    <div className="p-1 overflow-hidden">
      <Link href={`/artist/${id}`} className="block">
        <Image
          src={image || 'unsplash.com'}
          width="125"
          height="125"
          alt="artist-image"
          className="block mb-4 object-cover rounded-full w-24 sm:w-[130px] mx-auto"
        />
        <p className="font-bold text-center truncate">{subtitle || 'Artist'}</p>
      </Link>
    </div>
  );
}
