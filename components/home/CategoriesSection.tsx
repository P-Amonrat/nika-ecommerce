'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/types';
import { categories } from '@/data/categories';
import { getLocalizedText } from '@/lib/utils';

interface CategoriesSectionProps {
  locale: Locale;
}

export default function CategoriesSection({ locale }: CategoriesSectionProps) {
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container-custom">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#18181B] mb-1">
            {locale === 'th' ? 'หมวดหมู่สินค้า' : 'Shop by category'}
          </h2>
          <p className="text-gray-500 text-sm">
            {locale === 'th' ? 'เลือกซื้อจากหมวดหมู่ที่ปรารถนา' : 'Explore our top categories'}
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 md:grid-cols-5 sm:gap-6 sm:overflow-visible">
          {categories.map((category) => (
            <Link key={category.id} href={`/${locale}/categories/${category.id}`}>
              <div className="group text-center cursor-pointer w-20 sm:w-auto flex-shrink-0">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-3 rounded-full overflow-hidden ring-1 ring-gray-100 group-hover:ring-2 group-hover:ring-red-400 transition-all duration-300">
                  <Image
                    src={category.image}
                    alt={getLocalizedText(category.name, locale)}
                    fill
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-medium text-[#18181B] text-sm group-hover:text-red-500 transition-colors duration-300 line-clamp-2">
                  {getLocalizedText(category.name, locale)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
