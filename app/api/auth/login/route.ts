import { NextRequest } from 'next/server';
import { postExternalApi } from '@/lib/api/external-api';
import { apiSuccess, apiExternalError, apiServerError } from '@/lib/api/route-response';
import { LoginRequest } from '@/lib/api/types';

// POST /api/auth/login
// Proxies POST {EXTERNAL_API_BASE}/api/Auth/login
export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    const response = await postExternalApi('/api/Auth/login', body);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const message =
        errorBody?.message || errorBody?.title || 'Invalid credentials';
      return apiExternalError(response, message);
    }

    const data = await response.json().catch(() => null);
    return apiSuccess(data, 'Logged in successfully');
  } catch (error) {
    return apiServerError(error, 'Internal server error');
  }
}
