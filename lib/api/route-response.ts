import { NextResponse } from 'next/server';
import { ApiResponse } from './types';

/**
 * ============================================================================
 * Route Response — the one envelope shape every `app/api/**` route returns
 * ============================================================================
 * { success, statusCode, data?, error?, message } — so client code never has
 * to special-case one endpoint vs. another. Shares the `ApiResponse<T>` type
 * with `client-services.ts`, which is what actually reads these bodies.
 */

export function apiSuccess<T>(data: T, message: string) {
  const body: ApiResponse<T> = {
    success: true,
    statusCode: 200,
    data,
    message,
  };
  return NextResponse.json(body);
}

/** The external backend responded, but with a non-2xx status. */
export function apiExternalError(response: Response, message: string) {
  const body: ApiResponse = {
    success: false,
    statusCode: response.status,
    error: `External API error: ${response.statusText}`,
    message,
  };
  return NextResponse.json(body, { status: response.status });
}

/** Something failed on our side (network, timeout, parsing, ...). */
export function apiServerError(error: unknown, message: string) {
  console.error(message, error);
  const body: ApiResponse = {
    success: false,
    statusCode: 500,
    error: error instanceof Error ? error.message : 'Unknown error',
    message,
  };
  return NextResponse.json(body, { status: 500 });
}
