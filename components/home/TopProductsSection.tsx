'use client';

import { Locale } from '@/types';
import { products } from '@/data/products';
import ProductCard from '@/components/common/ProductCard';
import { Flame } from 'lucide-react';

interface TopProductsSectionProps {
  locale: Locale;
}

export default function TopProductsSection({ locale }: TopProductsSectionProps) {
  const topProducts = products.slice(0, 8).sort((a, b) => b.sold - a.sold);

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-600 to-orange-500 p-3 rounded-full">
              <Flame className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {locale === 'th' ? 'สินค้าขายดีที่สุด' : 'Bestselling Products'}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {locale === 'th' ? 'สินค้ายอดนิยมจากผู้ซื้อ' : 'Loved by thousands of customers'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topProducts.map((product, index) => (
            <div key={product.id} className="relative group">
              {/* Rank Badge */}
              <div className="absolute -top-3 -left-3 z-20">
                <div className="bg-gradient-to-br from-red-600 to-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  #{index + 1}
                </div>
              </div>

              <ProductCard
                id={product.id}
                name={product.name}
                image={product.images[0]}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                rating={product.rating}
                sold={product.sold}
                locale={locale}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
