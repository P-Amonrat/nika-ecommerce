'use client';

import { Locale, Product } from '@/types';
import ProductCard from '@/components/common/ProductCard';

interface RelatedProductsProps {
  products: Product[];
  locale: Locale;
}

export default function RelatedProducts({
  products,
  locale,
}: RelatedProductsProps) {
  return (
    <div className="mt-16 md:mt-20 pt-10 border-t border-gray-100">
      <h2 className="text-xl md:text-2xl font-bold text-[#18181B] mb-6">
        {locale === 'th' ? 'สินค้าที่เกี่ยวข้อง' : 'More to explore'}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
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
  );
}
