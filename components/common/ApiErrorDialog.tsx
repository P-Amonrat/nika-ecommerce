'use client';

import { usePathname } from 'next/navigation';
import { useApiErrorStore } from '@/lib/store';

/**
 * Central "something broke" popup — mounted once in the locale layout.
 * `lib/api/client-services.ts` opens it for any `/api/**` call that comes
 * back with a 5xx status or throws (network/timeout), so every endpoint on
 * the site reports the same dialog instead of each page building its own.
 */
export default function ApiErrorDialog() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/th') ? 'th' : 'en';
  const { isOpen, detail, hide } = useApiErrorStore();

  if (!isOpen) return null;

  const t = (th: string, en: string) => (locale === 'th' ? th : en);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-4"
      onClick={hide}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-red-600 mb-2">
          {t('เกิดข้อผิดพลาด', 'Something Went Wrong')}
        </h2>
        <p className="text-sm text-gray-600">
          {t(
            'ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง',
            'A server error occurred. Please try again later.'
          )}
        </p>
        {detail && <p className="text-xs text-gray-400 mt-2">{detail}</p>}
        <button type="button" onClick={hide} className="btn-primary w-full mt-6">
          {t('ตกลง', 'OK')}
        </button>
      </div>
    </div>
  );
}
