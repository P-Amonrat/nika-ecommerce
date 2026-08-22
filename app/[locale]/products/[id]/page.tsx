import { notFound } from 'next/navigation';
import { Locale, Product } from '@/types';
import { products } from '@/data/products';
import { reviews } from '@/data/reviews';
import ProductDetail from '@/components/product/ProductDetail';
import ProductSpecifications from '@/components/product/ProductSpecifications';
import ProductReviews from '@/components/product/ProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts';

interface Props {
  params: Promise<{ locale: Locale; id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const productReviews = reviews.filter((r) => r.productId === id);
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== id)
    .slice(0, 4);

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
