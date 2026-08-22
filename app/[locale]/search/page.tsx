import { Locale } from '@/types';
import { products } from '@/data/products';
import { getLocalizedText } from '@/lib/utils';
import ProductCard from '@/components/common/ProductCard';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q = '' } = await searchParams;

  const query = q.toLowerCase();
  const searchResults = products.filter((product) => {
    const name = getLocalizedText(product.name, locale).toLowerCase();
    const brand = product.brand.toLowerCase();
    return name.includes(query) || brand.includes(query);
  });

  return (
    <div className="py-10">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href={`/${locale}`} className="hover:text-red-600">
            {locale === 'th' ? 'หน้าแรก' : 'Home'}
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-800 font-semibold">
            {locale === 'th' ? 'ผลการค้นหา' : 'Search Results'}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-2">
          {locale === 'th' ? 'ผลการค้นหา' : 'Search Results'}
        </h1>
        <p className="text-gray-600 mb-8">
          {query ? (
            <>
              {locale === 'th' ? 'ผลการค้นหาสำหรับ "' : 'Results for "'}
              <span className="font-bold text-red-600">{q}</span>
              {locale === 'th' ? '" - ' : '" - '}
              {searchResults.length} {locale === 'th' ? 'รายการ' : 'results'}
            </>
          ) : (
            locale === 'th' ? 'กรุณากรอกคำค้นหา' : 'Please enter a search query'
          )}
        </p>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((product) => (
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
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">
              {locale === 'th' ? 'ไม่พบสินค้าที่ตรงกับคำค้นหา' : 'No products found matching your search'}
            </p>
            <Link href={`/${locale}`} className="btn-primary">
              {locale === 'th' ? 'กลับไปหน้าแรก' : 'Back to Home'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
