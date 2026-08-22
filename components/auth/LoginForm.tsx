'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { useAuthStore } from '@/lib/store';

interface LoginFormProps {
  locale: Locale;
}

export default function LoginForm({ locale }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Mock login - in real app, this would call an API
      if (email && password.length >= 6) {
        login(email, password);
        setTimeout(() => {
          router.push(`/${locale}`);
        }, 500);
      } else {
        setError(locale === 'th' ? 'กรุณากรอกข้อมูลให้ถูกต้อง' : 'Please enter valid credentials');
      }
    } catch (err) {
      setError(locale === 'th' ? 'เกิดข้อผิดพลาด' : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-2">
          {locale === 'th' ? 'อีเมล' : 'Email'}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="user@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          {locale === 'th' ? 'รหัสผ่าน' : 'Password'}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="••••••••"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {locale === 'th' ? 'Demo: password123' : 'Demo: password123'}
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (locale === 'th' ? 'กำลังเข้าสู่ระบบ...' : 'Logging in...') : (locale === 'th' ? 'เข้าสู่ระบบ' : 'Login')}
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          {locale === 'th' ? 'ยังไม่มีบัญชี? ' : "Don't have an account? "}
          <Link href={`/${locale}`} className="text-red-600 font-semibold hover:underline">
            {locale === 'th' ? 'สมัครสมาชิก' : 'Sign up'}
          </Link>
        </p>
      </div>
    </form>
  );
}
