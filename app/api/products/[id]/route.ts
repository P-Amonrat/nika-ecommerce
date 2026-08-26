import { fetchExternalApi } from '@/lib/api/external-api';
import { apiSuccess, apiExternalError, apiServerError } from '@/lib/api/route-response';

// GET /api/products/1
// Proxies GET {EXTERNAL_API_BASE}/api/Products/{id}
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetchExternalApi(`/api/Products/${id}`);

    if (!response.ok) {
      return apiExternalError(response, 'Failed to fetch product from external API');
    }

    const data = await response.json();
    return apiSuccess(data, 'Product fetched successfully');
  } catch (error) {
    return apiServerError(error, 'Internal server error');
  }
}
