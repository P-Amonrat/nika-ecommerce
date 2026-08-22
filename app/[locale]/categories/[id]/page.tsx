import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { getLocalizedText } from '@/lib/utils';
import ProductCard from '@/components/common/ProductCard';
import { ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale; id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { locale, id } = await params;
  const { page = '1' } = await searchParams;

  const category = categories.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  const categoryProducts = products
    .filter((p) => p.categoryId === id)
    .sort((a, b) => b.sold - a.sold);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);
  const currentPage = Math.max(1, Math.min(parseInt(page), totalPages));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = categoryProducts.slice(startIndex, startIndex + itemsPerPage);

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
            {getLocalizedText(category.name, locale)}
          </span>
        </div>

        {/* Category Header */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {getLocalizedText(category.name, locale)}
          </h1>
          {category.description && (
            <p className="text-gray-600">
              {getLocalizedText(category.description, locale)}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {categoryProducts.length} {locale === 'th' ? 'สินค้า' : 'products'}
          </p>
        </div>

        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {displayedProducts.map((product) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {currentPage > 1 && (
                  <Link
                    href={`/${locale}/categories/${id}?page=${currentPage - 1}`}
                    className="px-3 py-2 border border-gray-300 rounded hover:border-red-600 hover:text-red-600"
                  >
                    {'<'}
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/${locale}/categories/${id}?page=${pageNum}`}
                    className={`px-3 py-2 rounded ${
                      pageNum === currentPage
                        ? 'bg-red-600 text-white font-bold'
                        : 'border border-gray-300 hover:border-red-600 hover:text-red-600'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}

                {currentPage < totalPages && (
                  <Link
                    href={`/${locale}/categories/${id}?page=${currentPage + 1}`}
                    className="px-3 py-2 border border-gray-300 rounded hover:border-red-600 hover:text-red-600"
                  >
                    {'>'}
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">
              {locale === 'th' ? 'ไม่พบสินค้า' : 'No products found'}
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
