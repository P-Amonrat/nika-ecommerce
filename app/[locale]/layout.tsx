import type { Metadata } from 'next';
import { Locale } from '@/types';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ApiErrorDialog from '@/components/common/ApiErrorDialog';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'NIKA - E-Commerce Store',
  description: 'Modern e-commerce platform with Thailand and English support',
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Note: this layout is nested under the root app/layout.tsx, which already
// renders <html>/<body> — it must not render its own or React will hydrate
// two nested documents. Locale is applied on the <main> element instead.
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure locale is valid
  const validLocale: Locale = ['th', 'en'].includes(locale) ? (locale as Locale) : 'en';

  return (
    <div lang={validLocale} dir="ltr">
      <Navbar locale={validLocale} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer locale={validLocale} />
      <ApiErrorDialog />
    </div>
  );
}
