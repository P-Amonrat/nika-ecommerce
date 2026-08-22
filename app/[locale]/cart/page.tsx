import { Locale } from '@/types';
import CartContent from '@/components/cart/CartContent';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function CartPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="py-10">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">
          {locale === 'th' ? 'ตะกร้าสินค้า' : 'Shopping Cart'}
        </h1>
        <CartContent locale={locale} />
      </div>
    </div>
  );
}
