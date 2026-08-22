import { Locale } from '@/types';
import th from '@/translations/th.json';
import en from '@/translations/en.json';

const translations: Record<Locale, Record<string, string>> = {
  th,
  en,
};

export function getTranslation(locale: Locale | undefined): Record<string, string> {
  if (!locale || !['th', 'en'].includes(locale)) {
    return translations.en;
  }
  return translations[locale as Locale];
}

export function t(key: string, locale: Locale | undefined): string {
  const translation = getTranslation(locale);
  return translation[key] || key;
}
