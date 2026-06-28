import React from 'react';
import { SkeletonAvatar, SkeletonTitle, SkeletonCard } from '../Skeleton';

export function CategorySkeleton() {
  return (
    <div className="flex gap-4 overflow-x-hidden p-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-3 shrink-0">
          <SkeletonAvatar size={80} className="md:w-24 md:h-24" />
          <SkeletonTitle className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return <SkeletonCard className="w-full" />;
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
