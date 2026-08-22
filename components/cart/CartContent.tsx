'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Locale } from '@/types';
import { useCartStore } from '@/lib/store';
import { formatPrice, getLocalizedText } from '@/lib/utils';
import QuantitySelector from '@/components/common/QuantitySelector';

interface CartContentProps {
  locale: Locale;
}

export default function CartContent({ locale }: CartContentProps) {
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-gray-600 mb-6">
          {locale === 'th' ? 'ตะกร้าของคุณว่าง' : 'Your cart is empty'}
        </p>
        <Link href={`/${locale}`} className="btn-primary inline-block">
          {locale === 'th' ? 'ดำเนินการช้อปปิ้ง' : 'Continue Shopping'}
        </Link>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 1000 ? 0 : 50;
  const discount = Math.floor(subtotal * 0.05); // 5% discount
  const total = subtotal - discount + shipping;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="card p-6">
          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex gap-4 py-6 first:pt-0 last:pb-0">
                {/* Product Image */}
                <Image
                  src={item.product.images[0]}
                  alt={getLocalizedText(item.product.name, locale)}
                  width={88}
                  height={88}
                  className="rounded-lg object-cover w-[88px] h-[88px]"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <Link
                    href={`/${locale}/products/${item.productId}`}
                    className="text-base font-semibold text-[#18181B] hover:underline"
                  >
                    {getLocalizedText(item.product.name, locale)}
                  </Link>
                  <p className="text-gray-500 text-sm mb-3">
                    {item.product.specifications.brand}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-[#18181B]">
                        {formatPrice(item.product.price, locale)}
                      </p>
                      {item.product.originalPrice > item.product.price && (
                        <p className="text-xs line-through text-gray-400">
                          {formatPrice(item.product.originalPrice, locale)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <QuantitySelector
                        quantity={item.quantity}
                        maxQuantity={item.product.stock}
                        onQuantityChange={(qty) => updateQuantity(item.productId, qty)}
                      />

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="lg:col-span-1">
        <div className="card p-6 sticky top-24">
          <h2 className="text-xl font-bold text-[#18181B] mb-4">
            {locale === 'th' ? 'สรุปการสั่งซื้อ' : 'Order Summary'}
          </h2>

          <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">
                {locale === 'th' ? 'ราคารวม' : 'Subtotal'}
              </span>
              <span className="font-semibold text-[#18181B]">{formatPrice(subtotal, locale)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>{locale === 'th' ? 'ส่วนลด' : 'Discount'} (5%)</span>
                <span className="font-semibold">-{formatPrice(discount, locale)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-500">
                {locale === 'th' ? 'ค่าจัดส่ง' : 'Shipping'}
              </span>
              <span className="font-semibold text-[#18181B]">
                {shipping === 0 ? (
                  <span className="text-green-700">
                    {locale === 'th' ? 'ฟรี' : 'Free'}
                  </span>
                ) : (
                  formatPrice(shipping, locale)
                )}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold text-[#18181B] mb-6">
            <span>{locale === 'th' ? 'รวมทั้งสิ้น' : 'Total'}</span>
            <span>{formatPrice(total, locale)}</span>
          </div>

          <button className="btn-primary w-full mb-3">
            {locale === 'th' ? 'ดำเนินการชำระเงิน' : 'Checkout'}
          </button>

          <Link
            href={`/${locale}`}
            className="btn-secondary w-full block text-center"
          >
            {locale === 'th' ? 'ดำเนินการช้อปปิ้งต่อ' : 'Continue Shopping'}
          </Link>
        </div>
      </div>
    </div>
  );
}
