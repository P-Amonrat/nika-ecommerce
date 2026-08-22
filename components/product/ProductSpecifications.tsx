'use client';

import { Locale, Product } from '@/types';
import { getLocalizedText } from '@/lib/utils';

interface ProductSpecificationsProps {
  product: Product;
  locale: Locale;
}

export default function ProductSpecifications({
  product,
  locale,
}: ProductSpecificationsProps) {
  return (
    <div className="card p-6 md:p-8 mb-6">
      <h2 className="text-xl font-bold text-[#18181B] mb-6">
        {locale === 'th' ? 'ข้อมูลเพิ่มเติม' : 'Item details'}
      </h2>

      <div className="divide-y divide-gray-100">
        <div className="flex gap-4 py-3">
          <span className="font-medium text-gray-500 w-32 flex-shrink-0">
            {locale === 'th' ? 'หมวดหมู่' : 'Category'}
          </span>
          <span className="text-[#18181B]">{product.specifications.category}</span>
        </div>

        <div className="flex gap-4 py-3">
          <span className="font-medium text-gray-500 w-32 flex-shrink-0">
            {locale === 'th' ? 'แบรนด์' : 'Brand'}
          </span>
          <span className="text-[#18181B]">{product.specifications.brand}</span>
        </div>

        <div className="flex gap-4 py-3">
          <span className="font-medium text-gray-500 w-32 flex-shrink-0">
            {locale === 'th' ? 'ประกัน' : 'Warranty'}
          </span>
          <span className="text-[#18181B]">{product.specifications.warrantyDuration}</span>
        </div>

        <div className="flex gap-4 py-3">
          <span className="font-medium text-gray-500 w-32 flex-shrink-0">
            {locale === 'th' ? 'น้ำหนัก' : 'Weight'}
          </span>
          <span className="text-[#18181B]">{product.specifications.weight}</span>
        </div>

        <div className="flex gap-4 py-3">
          <span className="font-medium text-gray-500 w-32 flex-shrink-0">
            {locale === 'th' ? 'ขนาด' : 'Dimension'}
          </span>
          <span className="text-[#18181B]">{product.specifications.dimension}</span>
        </div>

        <div className="flex gap-4 py-3">
          <span className="font-medium text-gray-500 w-32 flex-shrink-0">
            {locale === 'th' ? 'ส่งจาก' : 'Ships from'}
          </span>
          <span className="text-[#18181B]">{product.specifications.shipsFrom}</span>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="text-lg font-bold text-[#18181B] mb-3">
          {locale === 'th' ? 'รายละเอียด' : 'Description'}
        </h3>
        <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
          {getLocalizedText(product.detail, locale)}
        </p>
      </div>
    </div>
  );
}
