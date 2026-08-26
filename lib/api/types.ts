/**
 * ============================================================================
 * Shared API types — the DTOs and envelope every layer agrees on
 * ============================================================================
 * These model the NIKA backend's actual response shapes (numeric ids, flat
 * fields) — a different concern from the localized mock/UI types in `@/types`.
 * Route handlers (`app/api/**`), `lib/api/client-services.ts`, and any Server
 * Component that calls `fetchExternalApi` directly all import from here so
 * the same category/product shape isn't redeclared in every file that uses it.
 */

/** The envelope every `app/api/**` route returns and every client call receives. */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

/** The paginated list shape the backend returns for list endpoints. */
export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

/** `{ pageNumber, pageSize }` — accepted by every paginated endpoint. */
export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
  // Index signature so this satisfies `toQueryString`'s Record-shaped param
  // without every call site casting it.
  [key: string]: string | number | undefined;
}

export interface ApiCategory {
  id: number;
  name: string;
  description?: string;
  parentCategoryId?: number;
  isActive?: boolean;
  createdAt?: string;
}

export interface ApiProductImage {
  id: number;
  imageUri: string;
  sortOrder?: number;
  productId?: number;
}

/** The shape returned by list endpoints, e.g. GET /api/Products/category/:id. */
export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  images: ApiProductImage[];
  reviewCount?: number;
  brand?: string;
}

/** The richer shape returned by GET /api/Products/:id. */
export interface ApiProductDetail {
  id: number;
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  saleEndAt?: string;
  preOrderDays?: number;
  soldCount?: number;
  reviewCount?: number;
  brand?: string;
  warrantyMonths?: number;
  weight?: number;
  weightUnit?: string;
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: string;
  shipsFromCountry?: string;
  categoryId: number;
  category?: ApiCategory;
  images: ApiProductImage[];
}
