'use client';

/**
 * ============================================================================
 * Client Services — called from Client Components
 * ============================================================================
 * Each service method calls OUR Next.js route under `/api/**` (never the
 * external backend directly), so there are no CORS/self-signed-cert issues
 * in the browser. Every route replies with the same envelope:
 *   { success, statusCode, data?, error?, message }
 * so `request()` below can be shared by every service.
 */

import {
  ApiResponse,
  ApiCategory,
  ApiProduct,
  PagedResult,
  PaginationParams,
  RegisterRequest,
  RegisterResult,
  LoginRequest,
  LoginResult,
} from './types';
import { toQueryString } from './query-string';
import { useApiErrorStore } from '@/lib/store';

/** GETs one of our own `/api/**` routes and normalizes the result to ApiResponse. */
async function request<T = any>(path: string, notFoundMessage: string): Promise<ApiResponse<T>> {
  return requestWithBody<T>(path, 'GET', undefined, notFoundMessage);
}

/** POSTs a JSON body to one of our own `/api/**` routes and normalizes the result. */
async function requestPost<T = any>(
  path: string,
  body: unknown,
  errorMessage: string
): Promise<ApiResponse<T>> {
  return requestWithBody<T>(path, 'POST', body, errorMessage);
}

async function requestWithBody<T = any>(
  path: string,
  method: 'GET' | 'POST',
  body: unknown,
  errorMessage: string
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      // 5xx = the backend/our route itself is broken — not a validation or
      // "wrong password" case the calling form can explain to the user, so
      // pop the one shared dialog instead of leaving it to each form.
      if (response.status >= 500) {
        useApiErrorStore.getState().show(`${method} ${path} → ${response.status}`);
      }
      return {
        success: false,
        statusCode: response.status,
        error: json?.error || `HTTP Error: ${response.statusText}`,
        message: json?.message || errorMessage,
      };
    }

    return json ?? { success: true, statusCode: response.status };
  } catch (error: any) {
    console.error(errorMessage, error);
    // Network failure / timeout — same shared dialog.
    useApiErrorStore.getState().show(`${method} ${path}`);
    return {
      success: false,
      statusCode: 500,
      error: error.message,
      message: errorMessage,
    };
  }
}

// ----------------------------------------------------------------------------
// Categories
// ----------------------------------------------------------------------------
export const categoryClientService = {
  /** Get all categories with pagination — GET /api/categories */
  getAll: (params?: PaginationParams) =>
    request<PagedResult<ApiCategory>>(
      `/api/categories${toQueryString(params)}`,
      'Failed to fetch categories'
    ),

  /** Get one category by id — GET /api/categories/:id */
  getById: (id: string | number) =>
    request<ApiCategory>(`/api/categories/${id}`, 'Failed to fetch category'),
};

// ----------------------------------------------------------------------------
// Products
// ----------------------------------------------------------------------------
export const productClientService = {
  /** Get products in a category with pagination — GET /api/products/category/:id */
  getByCategory: (categoryId: string | number, params?: PaginationParams) =>
    request<PagedResult<ApiProduct>>(
      `/api/products/category/${categoryId}${toQueryString(params)}`,
      'Failed to fetch products'
    ),
};

// ----------------------------------------------------------------------------
// Auth
// ----------------------------------------------------------------------------
export const authClientService = {
  /** Register a new account — POST /api/auth/register */
  register: (payload: RegisterRequest) =>
    requestPost<RegisterResult>('/api/auth/register', payload, 'Failed to register'),

  /** Log in with email/username + password — POST /api/auth/login */
  login: (payload: LoginRequest) =>
    requestPost<LoginResult>('/api/auth/login', payload, 'Invalid credentials'),
};

export default categoryClientService;
