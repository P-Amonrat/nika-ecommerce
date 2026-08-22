'use client';

import { Locale } from '@/types';
import { products } from '@/data/products';
import ProductCard from '@/components/common/ProductCard';
import { Star } from 'lucide-react';

interface NewArrivalsSectionProps {
  locale: Locale;
}

export default function NewArrivalsSection({ locale }: NewArrivalsSectionProps) {
  const newArrivals = products.slice(0, 10);

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 text-red-500 p-2.5 rounded-full">
              <Star size={22} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#18181B]">
                {locale === 'th' ? 'Recommended For You' : 'Recommended For You'}
              </h2>
              <p className="text-xs text-gray-500">
                {locale === 'th' ? 'สินค้าที่เหมาะสำหรับคุณ' : 'Curated just for you'}
              </p>
            </div>
          </div>

          <a
            href="#"
            className="text-[#18181B] font-semibold text-sm hover:underline underline-offset-4 flex items-center gap-1"
          >
            {locale === 'th' ? 'ดูทั้งหมด' : 'View All'} →
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {newArrivals.map((product) => (
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
