import { notFound } from 'next/navigation';
import { Locale, Product, Review } from '@/types';
import { fetchExternalApi, toQueryString } from '@/lib/api/external-api';
import { ApiProduct, ApiProductDetail, PagedResult } from '@/lib/api/types';
import { apiProductToDisplayProduct } from '@/lib/api/adapters';
import ProductDetail from '@/components/product/ProductDetail';
import ProductSpecifications from '@/components/product/ProductSpecifications';
import ProductReviews from '@/components/product/ProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts';

interface Props {
  params: Promise<{ locale: Locale; id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, id } = await params;

  // Fetch the product — GET {EXTERNAL_API_BASE}/api/Products/{id}
  // `notFound()` throws by design, so this call must stay OUTSIDE the
  // try/catch below or the 404 UI would get swallowed as a generic error.
  const productResponse = await fetchExternalApi(`/api/Products/${id}`);

  if (!productResponse.ok) {
    notFound();
  }

  const apiProduct: ApiProductDetail = await productResponse.json();
  const categoryId = String(apiProduct.categoryId);
  const product: Product = apiProductToDisplayProduct(
    { ...apiProduct, categoryName: apiProduct.category?.name },
    categoryId
  );

  // The backend doesn't serve reviews yet — empty list until it does
  // (see lib/api/adapters.ts for the other fields mocked for the same reason).
  const productReviews: Review[] = [];

  // Related products — other items in the same category.
  let relatedProducts: Product[] = [];
  try {
    const relatedQuery = toQueryString({ pageNumber: 1, pageSize: 5 });
    const relatedResponse = await fetchExternalApi(
      `/api/Products/category/${apiProduct.categoryId}${relatedQuery}`
    );

    if (relatedResponse.ok) {
      const relatedData: PagedResult<ApiProduct> = await relatedResponse.json();
      relatedProducts = relatedData.items
        .filter((item) => item.id !== apiProduct.id)
        .slice(0, 4)
        .map((item) =>
          apiProductToDisplayProduct({ ...item, categoryName: apiProduct.category?.name }, categoryId)
        );
    }
  } catch (error) {
    console.error('Failed to load related products:', error);
  }

  return (
    <div className="py-8 bg-white">
      <div className="container-custom max-w-6xl">
        <ProductDetail product={product} productReviews={productReviews} locale={locale} />

        <div className="mt-10 md:mt-12 space-y-8">
          <ProductSpecifications product={product} locale={locale} />
          <ProductReviews reviews={productReviews} product={product} locale={locale} />
        </div>

        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} locale={locale} />
        )}
      </div>
    </div>
  );
}
