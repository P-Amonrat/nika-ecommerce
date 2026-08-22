'use client';

import Image from 'next/image';
import { Locale } from '@/types';
import { promotions } from '@/data/promotions';
import { getLocalizedText } from '@/lib/utils';

interface PromotionSectionProps {
  locale: Locale;
}

export default function PromotionSection({ locale }: PromotionSectionProps) {
  return (
    <section className="py-10 md:py-12 bg-cream-50">
      <div className="container-custom">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#18181B] mb-1">
            {locale === 'th' ? 'โปรโมชั่นพิเศษ' : 'Exclusive promotions'}
          </h2>
          <p className="text-gray-500 text-sm">
            {locale === 'th' ? 'ลดราคาพิเศษจากร้านเรา' : 'Limited time special offers'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="group relative h-40 md:h-48 rounded-2xl overflow-hidden cursor-pointer border border-gray-100"
            >
              <Image
                src={promo.image}
                alt={getLocalizedText(promo.title, locale)}
                fill
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start">
                <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mb-3 drop-shadow">
                  {getLocalizedText(promo.title, locale)}
                </h3>
                <button
                  suppressHydrationWarning
                  className="bg-white text-[#18181B] px-5 py-2 rounded-full font-semibold text-sm hover:bg-cream-100 transition-colors"
                >
                  {locale === 'th' ? 'ดูเลย' : 'Shop now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
