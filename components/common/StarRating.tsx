'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 16 }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= Math.floor(rating);
    const isHalf = i === Math.ceil(rating) && rating % 1 !== 0;

    stars.push(
      <div key={i} className="relative" style={{ width: size, height: size }}>
        <Star
          size={size}
          className={isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          style={{ width: size, height: size }}
        />
        {isHalf && (
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: size / 2 }}>
            <Star
              size={size}
              className="fill-yellow-400 text-yellow-400"
              style={{ width: size, height: size }}
            />
          </div>
        )}
      </div>
    );
  }

  return <div className="flex gap-0.5">{stars}</div>;
}
