import Link from 'next/link';
import { Home, PackageSearch, Search, ShoppingBag, Truck, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-16">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          {/* Illustration */}
          <div className="relative mx-auto mb-8 w-32 h-32 md:w-36 md:h-36">
            <div className="absolute inset-0 rounded-full bg-red-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PackageSearch size={64} className="text-red-500" strokeWidth={1.5} />
            </div>
          </div>

          {/* Eyebrow */}
          <p className="text-red-500 font-bold text-sm tracking-[0.2em] uppercase mb-3">
            Error 404
          </p>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-ink-900 mb-4">
            We couldn&apos;t find that page
          </h1>

          {/* Description */}
          <p className="text-base text-ink-700 mb-8 leading-relaxed">
            The page may have been moved, renamed, or no longer exists.
            Try searching for what you need, or head back to the shop.
          </p>

          {/* Search */}
          <form action="/en/search" method="GET" className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="q"
                placeholder="Search for products…"
                className="w-full !pl-11 !pr-4 !py-3 !rounded-full"
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <Link href="/" className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              <Home size={18} />
              Back to Home
            </Link>
            <Link
              href="/en"
              className="btn-outline inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Need a hand?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/en/faq/how-to-buy"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-900 bg-white border border-gray-200 rounded-full px-4 py-2 hover:border-red-300 hover:text-red-600 transition-colors"
              >
                <HelpCircle size={15} />
                How to Buy
              </Link>
              <Link
                href="/en/faq/how-long-delivery"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-900 bg-white border border-gray-200 rounded-full px-4 py-2 hover:border-red-300 hover:text-red-600 transition-colors"
              >
                <Truck size={15} />
                Delivery Info
              </Link>
              <Link
                href="/en/faq/how-to-track-order"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-900 bg-white border border-gray-200 rounded-full px-4 py-2 hover:border-red-300 hover:text-red-600 transition-colors"
              >
                <PackageSearch size={15} />
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
