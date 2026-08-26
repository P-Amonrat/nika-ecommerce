import { NextRequest } from 'next/server';
import { fetchExternalApi, toQueryString } from '@/lib/api/external-api';
import { apiSuccess, apiExternalError, apiServerError } from '@/lib/api/route-response';

// GET /api/products/category/1?pageNumber=1&pageSize=10
// Proxies GET {EXTERNAL_API_BASE}/api/Products/category/{id}
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const query = toQueryString({
      pageNumber: searchParams.get('pageNumber') || '1',
      pageSize: searchParams.get('pageSize') || '10',
    });

    const response = await fetchExternalApi(`/api/Products/category/${id}${query}`);

    if (!response.ok) {
      return apiExternalError(response, 'Failed to fetch products from external API');
    }

    const data = await response.json();
    return apiSuccess(data, 'Products fetched successfully');
  } catch (error) {
    return apiServerError(error, 'Internal server error');
  }
}
