import { Locale } from '@/types';
import Banner from '@/components/home/Banner';
import ShopByCategory from '@/components/home/ShopByCategory';
import FlashSaleSection from '@/components/home/FlashSaleSection';
import BestSellerSection from '@/components/home/BestSellerSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import PromotionSection from '@/components/home/PromotionSection';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Banner locale={locale} />
      <ShopByCategory locale={locale} />
      <FlashSaleSection locale={locale} />
      <BestSellerSection locale={locale} />
      <NewArrivalsSection locale={locale} />
      <PromotionSection locale={locale} />
    </>
  );
}
