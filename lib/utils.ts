import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, locale: string = 'th'): string {
  // Prices are stored in Thai Baht — only the number grouping changes with
  // locale, never the currency, so the amount stays correct in every language.
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: 'THB',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
}

export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getLocalizedText(obj: any, locale: string): string {
  if (typeof obj === 'string') return obj;
  if (obj && obj[locale]) return obj[locale];
  if (obj && obj.en) return obj.en;
  return '';
}
