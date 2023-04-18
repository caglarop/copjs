'use client';

import LoadingSpinner from '@/components/loading/LoadingSpinner';

export default function Loader() {
  return (
    <>
      <div className="absolute left-0 top-0 z-50 h-full w-full dark:bg-gray-800 dark:text-white">
        <div className="flex h-full w-full items-center justify-center text-black">
          <LoadingSpinner />
        </div>
      </div>
    </>
  );
}
