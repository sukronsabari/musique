import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'));

type VideoPlayerProps = {
  url: string;
};

export default function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <ReactPlayer url={url} controls width="100%" className="!min-h-[300px]" />
  );
}
