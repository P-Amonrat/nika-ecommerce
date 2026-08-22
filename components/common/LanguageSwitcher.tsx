'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Locale } from '@/types';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getLocalizedPath = (locale: Locale) => {
    // Remove current locale from pathname and add new locale
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] === currentLocale) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }

    return '/' + segments.join('/');
  };

  const languages = [
    { code: 'th' as Locale, label: 'ไทย' },
    { code: 'en' as Locale, label: 'English' }
  ];

  const currentLabel = languages.find(lang => lang.code === currentLocale)?.label || 'EN';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-800"
      >
        {currentLabel}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={getLocalizedPath(lang.code)}
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                currentLocale === lang.code
                  ? 'bg-red-50 text-red-600 font-semibold'
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {lang.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
