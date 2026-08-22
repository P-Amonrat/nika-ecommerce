'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Locale } from '@/types';
import { formatPrice, getLocalizedText } from '@/lib/utils';
import { useWishlistStore } from '@/lib/store';
import StarRating from './StarRating';

interface ProductCardProps {
  id: string;
  name: any;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  sold: number;
  locale: Locale;
  brand?: string;
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  discount,
  rating,
  sold,
  locale,
  brand,
}: ProductCardProps) {
  const productName = getLocalizedText(name, locale);
  const isFavorited = useWishlistStore((state) => state.productIds.includes(id));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  return (
    <Link href={`/${locale}/products/${id}`}>
      <div className="product-card h-full flex flex-col">
        {/* Image Section */}
        <div className="relative overflow-hidden bg-cream-100 aspect-square group">
          <Image
            src={image}
            alt={productName}
            fill
            className="object-cover w-full h-full"
          />

          {/* Discount Badge */}
          {discount > 0 && <div className="badge-discount">-{discount}%</div>}

          {/* Favorite */}
          <button
            aria-label="Add to favorites"
            aria-pressed={isFavorited}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(id);
            }}
            className={`absolute top-2.5 right-2.5 rounded-full p-2 shadow-sm transition-opacity duration-200 ${
              isFavorited
                ? 'bg-white text-red-500 opacity-100'
                : 'bg-white/90 hover:bg-white text-[#18181B] opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart size={16} className={isFavorited ? 'fill-red-500' : ''} />
          </button>
        </div>

        {/* Info Section */}
        <div className="p-3.5 flex-1 flex flex-col">
          {brand && (
            <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1 truncate">
              {brand}
            </p>
          )}

          {/* Product Name */}
          <h3 className="text-sm font-medium text-[#18181B] line-clamp-2 mb-2 min-h-10">
            {productName}
          </h3>

          {/* Rating and Sold */}
          <div className="flex items-center gap-1.5 mb-2 text-xs text-gray-500">
            <StarRating rating={rating} size={12} />
            <span>({(sold / 1000).toFixed(1)}k)</span>
          </div>

          {/* Price Section */}
          <div className="mt-auto flex items-baseline gap-2">
            <span className="text-base font-bold text-[#18181B]">
              {formatPrice(price, locale)}
            </span>
            {originalPrice > price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(originalPrice, locale)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
