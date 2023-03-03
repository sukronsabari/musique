/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonLoadingGrid({
  className = '',
}: {
  className?: string;
}) {
  const skeletonArray2 = Array.from({ length: 15 });

  return (
    <div className={className}>
      <div className="mb-4">
        <Skeleton className="!w-1/5 min-w-[140px] !h-10" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-x-4 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {skeletonArray2.map((_) => (
          <div
            key={uuidv4()}
            className="w-[160px] h-[210px] sm:w-[190px] md:w-[210px] lg:w-[190px]"
          >
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
