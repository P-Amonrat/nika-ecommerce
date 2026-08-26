/**
 * Builds a `?pageNumber=1&pageSize=10`-style query string, skipping unset values.
 * Shared by `external-api.ts` (server → backend) and `client-services.ts`
 * (browser → our own `/api/**` routes) so the two don't each keep a copy.
 */
export function toQueryString(params?: Record<string, string | number | undefined>): string {
  if (!params) return '';
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) query.append(key, String(value));
  }
  const qs = query.toString();
  return qs ? `?${qs}` : '';
}
