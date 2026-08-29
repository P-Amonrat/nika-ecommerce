import { Locale } from '@/types';
import RegisterForm from '@/components/auth/RegisterForm';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          {locale === 'th' ? 'สมัครสมาชิก' : 'Register'}
        </h1>
        <RegisterForm locale={locale} />
      </div>
    </div>
  );
}
