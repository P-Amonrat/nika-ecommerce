'use client';

/**
 * Skeleton Loading Components
 * Used for loading states
 */

export function SkeletonCard() {
  return (
    <div className="flex flex-col items-center">
      {/* Image Skeleton with shimmer animation */}
      <div className="w-24 h-24 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 mb-3 animate-pulse" />

      {/* Text Skeleton Lines with shimmer */}
      <div className="w-20 h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-2 animate-pulse" />
      <div className="w-16 h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
    </div>
  );
}

export function CategorySkeletonLoader() {
  return (
    <div className="grid grid-cols-5 gap-6">
      {[...Array(5)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export function SkeletonHeader() {
  return (
    <div className="mb-8 flex justify-between items-center">
      {/* Title Skeleton with shimmer */}
      <div className="w-64 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />

      {/* Navigation Buttons Skeleton with shimmer */}
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
        <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
