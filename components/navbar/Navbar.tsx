'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { Locale } from '@/types';
import { useCartStore, useWishlistStore, useAuthStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from '../common/LanguageSwitcher';

interface NavbarProps {
  locale: Locale;
}

export default function Navbar({ locale }: NavbarProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.productIds.length);
  const { isLoggedIn, user, logout } = useAuthStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    router.push(`/${locale}`);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-red-500 border-b border-red-600">
        <div className="container-custom py-3">
          {/* Main navbar row */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0">
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-white lowercase">
                nika
              </span>
            </Link>

            {/* Desktop Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full flex items-center rounded-full border-2 border-transparent bg-white transition-shadow focus-within:ring-2 focus-within:ring-white/60">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={t('searchPlaceholder', locale)}
                  className="flex-1 pl-5 pr-2 py-3 border-none focus:ring-0 focus:outline-none rounded-full bg-transparent text-sm"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="flex-shrink-0 mr-1.5 bg-[#18181B] hover:bg-black text-white rounded-full p-2.5 transition-colors"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-4 ml-auto">
              <LanguageSwitcher currentLocale={locale} />

              <button
                aria-label="Wishlist"
                className="relative p-2.5 rounded-full hover:bg-white/15 transition-colors"
              >
                <Heart size={22} className="text-white" />
                {wishlistItems > 0 && (
                  <span className="absolute top-1 right-1 bg-white text-red-600 text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistItems}
                  </span>
                )}
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="p-2.5 rounded-full hover:bg-white/15 transition-colors"
                >
                  <User size={22} className="text-white" />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-slide-down">
                    {isLoggedIn ? (
                      <>
                        <div className="px-5 py-3 border-b border-gray-200">
                          <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                        </div>
                        <Link
                          href={`/${locale}/profile`}
                          className="block px-5 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                        >
                          {locale === 'th' ? 'โปรไฟล์' : 'Profile'}
                        </Link>
                        <Link
                          href={`/${locale}/orders`}
                          className="block px-5 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                        >
                          {locale === 'th' ? 'คำสั่งซื้อ' : 'Orders'}
                        </Link>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-5 py-3 hover:bg-gray-50 text-sm font-bold text-red-500 transition-colors"
                          >
                            {locale === 'th' ? 'ออกจากระบบ' : 'Logout'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/${locale}/login`}
                          className="block px-5 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                        >
                          {t('login', locale)}
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                href={`/${locale}/cart`}
                className="relative group transition-all"
              >
                <div className="p-2.5 rounded-full hover:bg-white/15 transition-colors">
                  <ShoppingCart size={22} className="text-white" />
                </div>
                {cartItems > 0 && (
                  <span className="absolute top-1 right-1 bg-white text-red-600 text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/15 text-white rounded-lg transition-colors ml-auto"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="md:hidden mt-3">
            <div className="relative w-full flex items-center rounded-full border-2 border-transparent bg-white focus-within:ring-2 focus-within:ring-white/60">
              <Search size={16} className="ml-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t('searchPlaceholder', locale)}
                className="flex-1 pl-3 pr-4 py-2 border-none focus:ring-0 focus:outline-none rounded-full bg-transparent text-sm"
              />
            </div>
          </form>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          locale={locale}
          cartItems={cartItems}
          isLoggedIn={isLoggedIn}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
