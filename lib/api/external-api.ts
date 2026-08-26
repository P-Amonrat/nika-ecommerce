/**
 * ============================================================================
 * External API — low-level access to the NIKA backend (ASP.NET / Swagger)
 * ============================================================================
 * Every Next.js Route Handler under `app/api/**` (and any Server Component
 * that talks to the backend directly) goes through `fetchExternalApi()` so
 * the base URL, timeout, headers, and dev-cert handling live in ONE place.
 */

// Re-exported so existing callers (`@/lib/api/external-api`) don't all need
// updating — the implementation itself lives in one place, `query-string.ts`,
// shared with the browser-side `client-services.ts`.
export { toQueryString } from './query-string';

export const EXTERNAL_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7230';

const REQUEST_TIMEOUT_MS = 10_000;

/**
 * GET a path from the external API, e.g. fetchExternalApi('/api/Categories/1').
 * Callers are responsible for checking `response.ok` and reading the body —
 * this only centralizes the transport concerns (timeout, headers, dev certs).
 */
export async function fetchExternalApi(path: string): Promise<Response> {
  const url = `${EXTERNAL_API_BASE}${path}`;
  console.log('[external-api] GET', url);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      // Dev-only: allow the backend's self-signed HTTPS certificate.
      ...(process.env.NODE_ENV === 'development' && {
        // @ts-ignore - Node's fetch doesn't type this option, but it works
        ca: undefined,
      }),
    });
  } finally {
    clearTimeout(timeout);
  }
}
