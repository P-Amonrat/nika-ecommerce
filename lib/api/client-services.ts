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

import { ApiResponse, ApiCategory, ApiProduct, PagedResult, PaginationParams } from './types';
import { toQueryString } from './query-string';

/** GETs one of our own `/api/**` routes and normalizes the result to ApiResponse. */
async function request<T = any>(path: string, notFoundMessage: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(path, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        error: `HTTP Error: ${response.statusText}`,
        message: notFoundMessage,
      };
    }

    return await response.json();
  } catch (error: any) {
    console.error(notFoundMessage, error);
    return {
      success: false,
      statusCode: 500,
      error: error.message,
      message: notFoundMessage,
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

export default categoryClientService;
