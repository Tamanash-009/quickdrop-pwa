import React from 'react';
import { Skeleton, SkeletonTitle, SkeletonText, SkeletonAvatar, SkeletonButton } from '../Skeleton';

export function SearchSkeleton() {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3 border-b border-outline">
          <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <SkeletonTitle className="h-4 w-32" />
            <SkeletonText lines={1} className="w-48" />
          </div>
          <Skeleton className="w-16 h-8 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function ReviewsSkeleton() {
  return (
    <div className="flex gap-6 overflow-x-hidden p-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-[320px] md:w-[380px] p-6 rounded-3xl border border-outline bg-surface-variant/20 shrink-0 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <SkeletonAvatar size={48} />
            <div className="flex flex-col gap-1.5 w-full">
              <SkeletonTitle className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <SkeletonText lines={3} />
        </div>
      ))}
    </div>
  );
}

export function ContactSkeleton() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <SkeletonTitle className="w-48 h-8" />
          <SkeletonText lines={2} className="w-3/4" />
          <div className="flex flex-col gap-4 mt-4">
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-3xl" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-[32px] p-8 md:p-10 border border-outline bg-surface-variant/30 flex flex-col gap-6">
            <SkeletonTitle className="w-40 h-8" />
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <SkeletonButton className="h-14 rounded-2xl mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="bg-surface-variant pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-outline pb-12">
        <div className="md:col-span-1 flex flex-col gap-4">
          <Skeleton className="h-8 w-32" />
          <SkeletonText lines={3} />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <SkeletonTitle className="h-5 w-24" />
            <SkeletonText lines={4} />
          </div>
        ))}
      </div>
    </footer>
  );
}
