import React from 'react';
import { Skeleton, SkeletonTitle, SkeletonText, SkeletonButton, SkeletonImage } from '../Skeleton';

export default function HeroSkeleton() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 lg:px-12 overflow-hidden flex items-center min-h-[90vh]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
        
        {/* Left Grid: Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left z-10 pt-10 lg:pt-0">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>

          <Skeleton className="h-14 md:h-20 w-full mb-4" />
          <Skeleton className="h-14 md:h-20 w-4/5 mx-auto lg:mx-0 mb-6" />

          <SkeletonText lines={3} className="max-w-xl mx-auto lg:mx-0 mb-10" />

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <SkeletonButton className="w-full sm:w-48 rounded-[20px]" />
            <SkeletonButton className="w-full sm:w-48 rounded-[20px]" />
          </div>

          {/* Stats Skeleton */}
          <div className="mt-14 grid grid-cols-3 gap-4 border-t border-outline pt-8">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-16 h-10" />
              <Skeleton className="w-20 h-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-16 h-10" />
              <Skeleton className="w-20 h-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-16 h-10" />
              <Skeleton className="w-20 h-4" />
            </div>
          </div>
        </div>

        {/* Right Grid: Visual/Card */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] lg:min-h-[500px]">
          <SkeletonImage className="w-full max-w-[420px] aspect-[4/5] rounded-[32px]" />
        </div>

      </div>
    </section>
  );
}
