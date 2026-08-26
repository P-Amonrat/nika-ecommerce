import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { fetchExternalApi, toQueryString } from '@/lib/api/external-api';
import { ApiCategory, ApiProduct, PagedResult } from '@/lib/api/types';
import { ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale; id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { locale, id } = await params;
  const { page = '1' } = await searchParams;

  const itemsPerPage = 12;
  const currentPage = Math.max(1, parseInt(page));

  // Fetch category first — GET {EXTERNAL_API_BASE}/api/Categories/{id}
  // `notFound()` throws by design, so this call must stay OUTSIDE the
  // try/catch below or the 404 UI would get swallowed as a generic error.
  const categoryResponse = await fetchExternalApi(`/api/Categories/${id}`);

  if (!categoryResponse.ok) {
    notFound();
  }

  const category: ApiCategory = await categoryResponse.json();

  try {
    // Fetch products in this category, paginated — GET {EXTERNAL_API_BASE}/api/Products/category/{id}
    const productsQuery = toQueryString({ pageNumber: currentPage, pageSize: itemsPerPage });
    const productsResponse = await fetchExternalApi(`/api/Products/category/${id}${productsQuery}`);

    if (!productsResponse.ok) {
      throw new Error('Failed to fetch products');
    }

    const data: PagedResult<ApiProduct> = await productsResponse.json();
    const displayedProducts = data.items || [];
    const totalPages = data.totalPages || 1;
    const totalCount = data.totalCount || 0;

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
              {category.name}
            </span>
          </div>

          {/* Category Header */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <h1 className="text-3xl font-bold mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-gray-600">
                {category.description}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {totalCount} {locale === 'th' ? 'สินค้า' : 'products'}
            </p>
          </div>

          {/* Products Grid */}
          {displayedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group text-center cursor-pointer bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/${locale}/products/${product.id}`}>
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        {product.images && product.images.length > 0 && (
                          <img
                            src={product.images[0].imageUri}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-red-600 font-bold">
                            ฿{product.salePrice || product.price}
                          </span>
                          {product.salePrice && (
                            <span className="text-gray-500 line-through text-sm">
                              ฿{product.price}
                            </span>
                          )}
                        </div>
                        {product.reviewCount !== undefined && (
                          <p className="text-xs text-gray-500 mt-1">
                            ({product.reviewCount})
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
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

                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
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
                    );
                  })}

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
  } catch (error) {
    console.error('Error loading category:', error);
    return (
      <div className="py-10">
        <div className="container-custom">
          <div className="text-center py-12">
            <p className="text-lg text-red-600 mb-4">
              {locale === 'th' ? 'เกิดข้อผิดพลาด' : 'An error occurred'}
            </p>
            <Link href={`/${locale}`} className="btn-primary">
              {locale === 'th' ? 'กลับไปหน้าแรก' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
