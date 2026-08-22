'use client';

import Link from 'next/link';
import { ShoppingCart, HelpCircle } from 'lucide-react';
import { Locale } from '@/types';
import LanguageSwitcher from '../common/LanguageSwitcher';

interface MobileMenuProps {
  locale: Locale;
  cartItems: number;
  isLoggedIn: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  locale,
  cartItems,
  isLoggedIn,
  onClose,
}: MobileMenuProps) {
  return (
    <div className="md:hidden bg-white border-b shadow-md">
      <div className="container-custom py-4 space-y-4">
        {/* Navigation Links */}
        <Link
          href={`/${locale}`}
          onClick={onClose}
          className="block text-gray-700 hover:text-red-600 py-2"
        >
          {locale === 'th' ? 'หน้าแรก' : 'Home'}
        </Link>

        <Link
          href={`/${locale}#categories`}
          onClick={onClose}
          className="block text-gray-700 hover:text-red-600 py-2"
        >
          {locale === 'th' ? 'หมวดหมู่' : 'Categories'}
        </Link>

        {/* Cart */}
        <Link
          href={`/${locale}/cart`}
          onClick={onClose}
          className="flex items-center justify-between py-2"
        >
          <span className="text-gray-700 hover:text-red-600">{locale === 'th' ? 'ตะกร้า' : 'Cart'}</span>
          {cartItems > 0 && (
            <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1 font-bold">
              {cartItems}
            </span>
          )}
        </Link>

        {/* Auth */}
        {!isLoggedIn && (
          <Link
            href={`/${locale}/login`}
            onClick={onClose}
            className="block text-gray-700 hover:text-red-600 py-2"
          >
            {locale === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
          </Link>
        )}

        <hr />

        {/* FAQ Link */}
        <Link
          href={`/${locale}/faq/how-to-buy`}
          onClick={onClose}
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 py-2"
        >
          <HelpCircle size={18} />
          <span>{locale === 'th' ? 'คำถามที่พบบ่อย' : 'FAQ'}</span>
        </Link>

        <hr />

        {/* Language Switcher */}
        <div className="py-2">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {locale === 'th' ? 'ภาษา' : 'Language'}
          </p>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </div>
  );
}
