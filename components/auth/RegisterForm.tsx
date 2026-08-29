'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Locale } from '@/types';
import { useApiErrorStore } from '@/lib/store';
import { authClientService } from '@/lib/api/client-services';

interface RegisterFormProps {
  locale: Locale;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Thai-style mobile numbers: 9-10 digits, optionally starting with +.
const PHONE_REGEX = /^\+?\d{9,10}$/;

interface PasswordRule {
  key: string;
  label: { th: string; en: string };
  test: (value: string) => boolean;
}

// Each rule is checked live and rendered as its own row with a check/x icon.
const PASSWORD_RULES: PasswordRule[] = [
  {
    key: 'minLength',
    label: { th: 'อย่างน้อย 8 ตัวอักษร', en: 'At least 8 characters' },
    test: (v) => v.length >= 8,
  },
  {
    key: 'uppercase',
    label: { th: 'ตัวอักษรพิมพ์ใหญ่ (A-Z)', en: 'Uppercase letter (A-Z)' },
    test: (v) => /[A-Z]/.test(v),
  },
  {
    key: 'lowercase',
    label: { th: 'ตัวอักษรพิมพ์เล็ก (a-z)', en: 'Lowercase letter (a-z)' },
    test: (v) => /[a-z]/.test(v),
  },
  {
    key: 'number',
    label: { th: 'ตัวเลข (0-9)', en: 'Number (0-9)' },
    test: (v) => /\d/.test(v),
  },
];

export default function RegisterForm({ locale }: RegisterFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const t = (th: string, en: string) => (locale === 'th' ? th : en);

  const errors = useMemo(() => {
    const next: Record<string, string> = {};

    if (!email) {
      next.email = t('กรุณากรอกอีเมล', 'Email is required');
    } else if (!EMAIL_REGEX.test(email)) {
      next.email = t('รูปแบบอีเมลไม่ถูกต้อง', 'Invalid email format');
    }

    if (!username.trim()) {
      next.username = t('กรุณากรอกชื่อผู้ใช้', 'Username is required');
    }

    if (!phoneNumber) {
      next.phoneNumber = t('กรุณากรอกเบอร์โทรศัพท์', 'Phone number is required');
    } else if (!PHONE_REGEX.test(phoneNumber)) {
      next.phoneNumber = t('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง', 'Invalid phone number format');
    }

    if (!password) {
      next.password = t('กรุณากรอกรหัสผ่าน', 'Password is required');
    } else if (!PASSWORD_RULES.every((rule) => rule.test(password))) {
      next.password = t(
        'รหัสผ่านยังไม่ตรงตามเงื่อนไข',
        'Password does not meet all requirements'
      );
    }

    if (!confirmPassword) {
      next.confirmPassword = t('กรุณายืนยันรหัสผ่าน', 'Please confirm your password');
    } else if (password !== confirmPassword) {
      next.confirmPassword = t('รหัสผ่านไม่ตรงกัน', 'Passwords do not match');
    }

    return next;
  }, [email, username, phoneNumber, password, confirmPassword, locale]);

  const isValid = Object.keys(errors).length === 0;

  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({
      email: true,
      username: true,
      phoneNumber: true,
      password: true,
      confirmPassword: true,
    });
    setSubmitError('');

    if (!isValid) return;

    setIsLoading(true);
    try {
      const result = await authClientService.register({
        email,
        password,
        username,
        phoneNumber,
      });

      if (!result.success) {
        // 5xx / network failures already popped the shared ApiErrorDialog
        // (see lib/api/client-services.ts) — only show this form's own
        // banner for an actual rejection (e.g. email already registered).
        if (!result.statusCode || result.statusCode < 500) {
          setSubmitError(
            result.message || t('สมัครสมาชิกไม่สำเร็จ', 'Registration failed')
          );
        }
        return;
      }

      router.push(`/${locale}/login`);
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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-2">
          {t('อีเมล', 'Email')}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => markTouched('email')}
          className={fieldClass('email')}
          placeholder="user@example.com"
        />
        {touched.email && errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          {t('ชื่อผู้ใช้', 'Username')}
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => markTouched('username')}
          className={fieldClass('username')}
          placeholder={t('ชื่อผู้ใช้', 'Username')}
        />
        {touched.username && errors.username && (
          <p className="text-xs text-red-600 mt-1">{errors.username}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          {t('เบอร์โทรศัพท์', 'Phone Number')}
        </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onBlur={() => markTouched('phoneNumber')}
          className={fieldClass('phoneNumber')}
          placeholder="0812345678"
        />
        {touched.phoneNumber && errors.phoneNumber && (
          <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>
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
        {touched.password && !password && (
          <p className="text-xs text-red-600 mt-1">{errors.password}</p>
        )}
        {password && (
          <ul className="mt-2 space-y-1">
            {PASSWORD_RULES.map((rule) => {
              const passed = rule.test(password);
              return (
                <li
                  key={rule.key}
                  className={`flex items-center gap-1.5 text-xs ${
                    passed ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {passed ? (
                    <Check className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{t(rule.label.th, rule.label.en)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          {t('ยืนยันรหัสผ่าน', 'Confirm Password')}
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => markTouched('confirmPassword')}
          className={fieldClass('confirmPassword')}
          placeholder="••••••••"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading
          ? t('กำลังสมัครสมาชิก...', 'Registering...')
          : t('สมัครสมาชิก', 'Register')}
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          {t('มีบัญชีอยู่แล้ว? ', 'Already have an account? ')}
          <Link href={`/${locale}/login`} className="text-red-600 font-semibold hover:underline">
            {t('เข้าสู่ระบบ', 'Login')}
          </Link>
        </p>
      </div>
    </form>
  );
}
