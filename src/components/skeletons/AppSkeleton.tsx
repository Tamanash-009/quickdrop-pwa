import React from 'react';
import HeroSkeleton from './HeroSkeleton';
import { CategorySkeleton, ProductGridSkeleton } from './ProductSkeleton';
import { ContactSkeleton, FooterSkeleton, ReviewsSkeleton } from './SectionSkeletons';

export default function AppSkeleton() {
  return (
    <div className="w-full flex flex-col overflow-hidden animate-pulse-slow">
      <HeroSkeleton />
      
      <section className="py-24 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col items-center">
            <div className="w-48 h-10 bg-surface-variant rounded-xl mb-4 shimmer"></div>
            <div className="w-64 h-4 bg-surface-variant rounded-md shimmer"></div>
          </div>
          
          <CategorySkeleton />
          
          <div className="mt-12">
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative bg-surface-variant/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col items-center">
            <div className="w-48 h-10 bg-surface-variant rounded-xl mb-4 shimmer"></div>
          </div>
          <ReviewsSkeleton />
        </div>
      </section>

      <ContactSkeleton />
      <FooterSkeleton />
    </div>
  );
}
