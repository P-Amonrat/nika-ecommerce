import { NextRequest } from 'next/server';
import { postExternalApi } from '@/lib/api/external-api';
import { apiSuccess, apiExternalError, apiServerError } from '@/lib/api/route-response';
import { RegisterRequest } from '@/lib/api/types';

// POST /api/auth/register
// Proxies POST {EXTERNAL_API_BASE}/api/Auth/register
export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();

    const response = await postExternalApi('/api/Auth/register', body);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const message =
        errorBody?.message || errorBody?.title || 'Failed to register';
      return apiExternalError(response, message);
    }

    const data = await response.json().catch(() => null);
    return apiSuccess(data, 'Registered successfully');
  } catch (error) {
    return apiServerError(error, 'Internal server error');
  }
}
