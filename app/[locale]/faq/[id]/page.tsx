import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { faqs } from '@/data/faq';
import { getLocalizedText } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ locale: Locale; id: string }>;
}

export default async function FAQDetailPage({ params }: Props) {
  const { locale, id } = await params;

  // The `[id]` route segment actually carries the FAQ's `slug` (e.g.
  // "how-to-buy") — every link into this page (Footer, MobileMenu) builds
  // the URL from `slug`, not the numeric `id`, so the lookup must match it.
  const faq = faqs.find((f) => f.slug === id);

  if (!faq) {
    notFound();
  }

  const otherFaqs = faqs.filter((f) => f.slug !== id).slice(0, 3);

  return (
    <div className="py-10">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href={`/${locale}`} className="hover:text-red-600">
            {locale === 'th' ? 'หน้าแรก' : 'Home'}
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-800 font-semibold">
            {getLocalizedText(faq.question, locale)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8">
              <h1 className="text-3xl font-bold mb-6">
                {getLocalizedText(faq.question, locale)}
              </h1>

              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
                {getLocalizedText(faq.answer, locale)}
              </div>
            </div>
          </div>

          {/* Related FAQs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">
                {locale === 'th' ? 'คำถามอื่น ๆ' : 'Other FAQs'}
              </h2>

              <div className="space-y-3">
                {otherFaqs.map((relatedFaq) => (
                  <Link
                    key={relatedFaq.id}
                    href={`/${locale}/faq/${relatedFaq.slug}`}
                    className="block p-3 bg-gray-50 rounded hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <p className="text-sm font-semibold">
                      {getLocalizedText(relatedFaq.question, locale)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
