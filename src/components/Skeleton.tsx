import React from "react";
import { motion } from "motion/react";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Base Skeleton Component */
export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <div 
      className={`shimmer rounded-md ${className}`} 
      style={style} 
      aria-hidden="true" 
    />
  );
}

export function SkeletonText({ className = "", lines = 1 }: { className?: string, lines?: number }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="shimmer h-4 rounded-md w-full"
          style={{ width: i === lines - 1 && lines > 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonTitle({ className = "" }: SkeletonProps) {
  return <div className={`shimmer h-6 w-3/4 rounded-md ${className}`} aria-hidden="true" />;
}

export function SkeletonAvatar({ className = "", size = 40 }: { className?: string, size?: number }) {
  return (
    <div 
      className={`shimmer rounded-full shrink-0 ${className}`} 
      style={{ width: size, height: size }} 
      aria-hidden="true" 
    />
  );
}

export function SkeletonImage({ className = "" }: SkeletonProps) {
  return <div className={`shimmer w-full h-full rounded-2xl ${className}`} aria-hidden="true" />;
}

export function SkeletonButton({ className = "" }: SkeletonProps) {
  return <div className={`shimmer h-12 w-full rounded-xl ${className}`} aria-hidden="true" />;
}

export function SkeletonChip({ className = "" }: SkeletonProps) {
  return <div className={`shimmer h-8 w-24 rounded-full ${className}`} aria-hidden="true" />;
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
  return (
    <div className={`p-4 rounded-2xl border border-outline bg-surface-variant/30 flex flex-col gap-4 ${className}`} aria-hidden="true">
      <SkeletonImage className="h-32 w-full" />
      <div className="flex flex-col gap-2">
        <SkeletonTitle />
        <SkeletonText lines={2} />
      </div>
      <SkeletonButton className="h-10 mt-2" />
    </div>
  );
}

export function SkeletonInput({ className = "" }: SkeletonProps) {
  return <div className={`shimmer h-14 w-full rounded-2xl ${className}`} aria-hidden="true" />;
}
