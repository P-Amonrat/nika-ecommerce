'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { useAuthStore, useApiErrorStore } from '@/lib/store';
import { authClientService } from '@/lib/api/client-services';

interface LoginFormProps {
  locale: Locale;
}

export default function LoginForm({ locale }: LoginFormProps) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorDialog, setErrorDialog] = useState('');
  const login = useAuthStore((state) => state.login);

  const t = (th: string, en: string) => (locale === 'th' ? th : en);

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!identifier.trim()) {
      next.identifier = t('กรุณากรอกอีเมลหรือชื่อผู้ใช้', 'Please enter your email or username');
    }
    if (!password.trim()) {
      next.password = t('กรุณากรอกรหัสผ่าน', 'Please enter your password');
    }
    return next;
  }, [identifier, password, locale]);

  const isValid = Object.keys(errors).length === 0;

  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ identifier: true, password: true });

    if (!isValid) return;

    setIsLoading(true);
    try {
      const result = await authClientService.login({ identifier, password });

      if (!result.success) {
        // 5xx / network failures already popped the shared ApiErrorDialog
        // (see lib/api/client-services.ts) — only show this form's own
        // "check your details" popup for an actual rejected login.
        if (!result.statusCode || result.statusCode < 500) {
          setErrorDialog(
            t(
              'กรุณาตรวจสอบความถูกต้อง อีเมล/ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง',
              'Please check your details. Invalid email/username or password.'
            )
          );
        }
        return;
      }

      const data = result.data || {};
      const apiUser = (data as any).user || {};
      login(
        {
          id: String(apiUser.id ?? ''),
          name: apiUser.username || apiUser.name || identifier,
          email: apiUser.email || identifier,
        },
        (data as any).token || (data as any).accessToken
      );

      router.push(`/${locale}`);
    } catch (err) {
      useApiErrorStore.getState().show();
    } finally {
      setIsLoading(false);
    }
  };

  const fieldClass = (field: string) =>
    `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
      touched[field] && errors[field] ? 'border-red-500' : 'border-gray-300'
    }`;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t('อีเมล หรือ ชื่อผู้ใช้', 'Email or Username')}
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            onBlur={() => markTouched('identifier')}
            className={fieldClass('identifier')}
            placeholder="user@example.com"
          />
          {touched.identifier && errors.identifier && (
            <p className="text-xs text-red-600 mt-1">{errors.identifier}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            {t('รหัสผ่าน', 'Password')}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => markTouched('password')}
            className={fieldClass('password')}
            placeholder="••••••••"
          />
          {touched.password && errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('กำลังเข้าสู่ระบบ...', 'Logging in...') : t('เข้าสู่ระบบ', 'Login')}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('ยังไม่มีบัญชี? ', "Don't have an account? ")}
            <Link href={`/${locale}/register`} className="text-red-600 font-semibold hover:underline">
              {t('สมัครสมาชิก', 'Sign up')}
            </Link>
          </p>
        </div>
      </form>

      {errorDialog && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={() => setErrorDialog('')}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-red-600 mb-2">
              {t('เข้าสู่ระบบไม่สำเร็จ', 'Login Failed')}
            </h2>
            <p className="text-sm text-gray-600 mb-6">{errorDialog}</p>
            <button
              type="button"
              onClick={() => setErrorDialog('')}
              className="btn-primary w-full"
            >
              {t('ตกลง', 'OK')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
