'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/types';
import { products } from '@/data/products';
import ProductCard from '@/components/common/ProductCard';
import { Zap } from 'lucide-react';

interface FlashSaleSectionProps {
  locale: Locale;
}

export default function FlashSaleSection({ locale }: FlashSaleSectionProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const flashSaleProducts = products.filter((p) => p.discount > 25).slice(0, 10);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(24, 0, 0, 0);

      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container-custom">
        {/* Header with Timer */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 text-red-500 p-2.5 rounded-full">
              <Zap size={22} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#18181B]">
                {locale === 'th' ? 'Flash Sale' : 'Flash Sale'}
              </h2>
              <p className="text-xs text-gray-500">
                {locale === 'th' ? 'ของลดสดวันนี้เท่านั้น' : 'Limited time offers today only'}
              </p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2">
            <div className="text-center">
              <div className="bg-[#18181B] text-white px-2 py-1 rounded-md font-bold text-sm w-10">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
            </div>
            <span className="text-gray-400 font-bold">:</span>
            <div className="text-center">
              <div className="bg-[#18181B] text-white px-2 py-1 rounded-md font-bold text-sm w-10">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
            </div>
            <span className="text-gray-400 font-bold">:</span>
            <div className="text-center">
              <div className="bg-[#18181B] text-white px-2 py-1 rounded-md font-bold text-sm w-10">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {flashSaleProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.images[0]}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              sold={product.sold}
              locale={locale}
              brand={product.brand}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
