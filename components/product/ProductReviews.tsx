'use client';

import Image from 'next/image';
import { Locale, Product, Review } from '@/types';
import StarRating from '@/components/common/StarRating';

interface ProductReviewsProps {
  reviews: Review[];
  product: Product;
  locale: Locale;
}

export default function ProductReviews({
  reviews,
  product,
  locale,
}: ProductReviewsProps) {
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating;

  return (
    <div className="card p-6 md:p-8">
      <h2 className="text-xl font-bold text-[#18181B] mb-6">
        {locale === 'th' ? 'รีวิวจากลูกค้า' : 'Reviews'}
      </h2>

      {/* Rating Summary */}
      <div className="mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-[#18181B]">{avgRating}</div>
          <div>
            <StarRating rating={parseFloat(avgRating as string)} size={20} />
            <p className="text-gray-500 text-sm mt-1.5">
              {locale === 'th'
                ? `จาก ${reviews.length} รีวิว`
                : `from ${reviews.length} reviews`}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {reviews.map((review) => (
            <div key={review.id} className="py-6 first:pt-0 last:pb-0">
              {/* Reviewer Info */}
              <div className="flex items-center gap-3 mb-3">
                {review.avatar && (
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-[#18181B]">{review.author}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>

              {/* Rating and Comment */}
              <div className="mb-3">
                <StarRating rating={review.rating} size={16} />
              </div>

              <p className="text-gray-600 mb-3 leading-relaxed">{review.comment}</p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2">
                  {review.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`review-${index}`}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          {locale === 'th' ? 'ยังไม่มีรีวิว' : 'No reviews yet'}
        </p>
      )}
    </div>
  );
}
