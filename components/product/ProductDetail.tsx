'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Locale, Product, Review } from '@/types';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice, getLocalizedText } from '@/lib/utils';
import StarRating from '@/components/common/StarRating';
import QuantitySelector from '@/components/common/QuantitySelector';
import { ShoppingCart, Heart, Truck, ShieldCheck, Store } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  productReviews: Review[];
  locale: Locale;
}

export default function ProductDetail({
  product,
  productReviews,
  locale,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const isFavorited = useWishlistStore((state) => state.productIds.includes(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const productName = getLocalizedText(product.name, locale);
  const avgRatingValue =
    productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
      : product.rating;
  const avgRating = avgRatingValue.toFixed(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
      {/* Images Section */}
      <div>
        {/* Main Image */}
        <div className="relative aspect-square bg-cream-100 rounded-2xl overflow-hidden">
          <Image
            src={product.images[selectedImage]}
            alt={productName}
            fill
            className="object-cover w-full h-full"
            priority
          />
          {product.preOrder && (
            <div className="absolute top-4 left-4 bg-[#18181B] text-white px-3 py-1.5 rounded-full text-xs font-bold">
              {locale === 'th' ? 'สั่งล่วงหน้า' : 'PRE-ORDER'}
            </div>
          )}
        </div>

        {/* Thumbnail Gallery — rendered below the main image */}
        {product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto mt-4 pb-1">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                aria-label={`${productName} ${index + 1}`}
                aria-current={selectedImage === index}
                className={`relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? 'border-[#18181B]'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div>
        {/* Shop line */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Store size={16} />
          <span>{product.brand}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-[#18181B] mb-3">{productName}</h1>

        {/* Rating */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
          <StarRating rating={avgRatingValue} size={16} />
          <span className="font-semibold text-[#18181B]">{avgRating}</span>
          <span className="text-gray-500">
            ({productReviews.length} {locale === 'th' ? 'รีวิว' : 'reviews'})
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500">
            {locale === 'th' ? `${product.sold.toLocaleString('th-TH')} ขายแล้ว` : `${product.sold.toLocaleString('en-US')} sold`}
          </span>
        </div>

        {/* Pricing */}
        <div className="mb-5">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-bold text-[#18181B]">
              {formatPrice(product.price, locale)}
            </span>
            {product.discount > 0 && (
              <span className="text-lg line-through text-gray-400">
                {formatPrice(product.originalPrice, locale)}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-red-500 font-semibold text-sm">
                -{product.discount}%
              </span>
            )}
          </div>
        </div>

        <hr className="my-5" />

        {/* Stock Status */}
        <div className="mb-6">
          {product.stock > 0 ? (
            <p className="text-sm text-gray-600">
              <span className="text-green-700 font-semibold">
                {locale === 'th' ? 'มีสต็อก' : 'In stock'}
              </span>{' '}
              —{' '}
              {locale === 'th'
                ? `เหลือ ${product.stock.toLocaleString('th-TH')} ชิ้น`
                : `only ${product.stock.toLocaleString('en-US')} left`}
            </p>
          ) : (
            <p className="text-red-500 font-semibold text-sm">
              {locale === 'th' ? 'หมดสต็อก' : 'Out of Stock'}
            </p>
          )}
        </div>

        {/* Quantity Selector */}
        {product.stock > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#18181B] mb-2">
              {locale === 'th' ? 'จำนวน' : 'Quantity'}
            </label>
            <QuantitySelector
              quantity={quantity}
              maxQuantity={product.stock}
              onQuantityChange={setQuantity}
            />
          </div>
        )}

        {/* Action Buttons */}
        {product.stock > 0 && (
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold transition-all ${
                isAdded ? 'bg-green-600 text-white' : 'btn-primary'
              }`}
            >
              <ShoppingCart size={20} />
              {isAdded
                ? locale === 'th'
                  ? 'เพิ่มสำเร็จ'
                  : 'Added'
                : locale === 'th'
                  ? 'เพิ่มลงตะกร้า'
                  : 'Add to cart'}
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to favorites"
              aria-pressed={isFavorited}
              className={`flex items-center justify-center w-14 rounded-lg border-2 transition-colors ${
                isFavorited ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-[#18181B] hover:border-[#18181B]'
              }`}
            >
              <Heart size={20} className={isFavorited ? 'fill-red-500' : ''} />
            </button>
          </div>
        )}

        {product.stock > 0 && (
          <button className="w-full mt-3 btn-dark">
            {locale === 'th' ? 'ซื้อเลย' : 'Buy it now'}
          </button>
        )}

        {/* Trust / delivery info */}
        <div className="mt-8 space-y-3 bg-cream-50 rounded-xl p-4">
          <div className="flex items-start gap-3 text-sm text-gray-700">
            <Truck size={18} className="flex-shrink-0 mt-0.5 text-[#18181B]" />
            <span>
              {locale === 'th'
                ? `จัดส่งจาก ${product.specifications.shipsFrom} — ฟรีค่าจัดส่งเมื่อสั่งซื้อครบ 1,000 บาท`
                : `Ships from ${product.specifications.shipsFrom} — free shipping over 1,000฿`}
            </span>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-700">
            <ShieldCheck size={18} className="flex-shrink-0 mt-0.5 text-[#18181B]" />
            <span>
              {locale === 'th'
                ? 'ชำระเงินปลอดภัย 100% พร้อมนโยบายคืนสินค้า 30 วัน'
                : '100% secure checkout with 30-day returns'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
