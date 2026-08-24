import { ApiResponse } from './client';

/**
 * Response Handler Middleware
 * Handles all API responses uniformly
 */

export const responseHandler = {
  /**
   * Handle successful response
   */
  success: <T>(data: T, message: string = 'Success'): ApiResponse<T> => {
    return {
      success: true,
      data,
      message,
      statusCode: 200,
    };
  },

  /**
   * Handle error response
   */
  error: (statusCode: number, message: string, error?: string): ApiResponse => {
    return {
      success: false,
      statusCode,
      message,
      error: error || message,
    };
  },

  /**
   * Handle response validation
   */
  validate: <T>(response: any): ApiResponse<T> => {
    if (!response) {
      return responseHandler.error(400, 'Invalid response', 'Response is empty');
    }
    return response;
  },

  /**
   * Handle paginated response
   */
  paginate: <T>(
    data: T[],
    page: number,
    limit: number,
    total: number
  ): ApiResponse<{ data: T[]; pagination: { page: number; limit: number; total: number; pages: number } }> => {
    return {
      success: true,
      data: {
        data,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      message: 'Data retrieved successfully',
      statusCode: 200,
    };
  },
};

/**
 * HTTP Method Middleware
 * Standardized method calls
 */

export const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export type HttpMethod = typeof httpMethods[keyof typeof httpMethods];

/**
 * Method wrapper for making requests
 */
export const makeRequest = async <T>(
  client: any,
  method: HttpMethod,
  url: string,
  data?: any,
  config?: any
): Promise<ApiResponse<T>> => {
  try {
    let response;

    switch (method) {
      case httpMethods.GET:
        response = await client.get(url, config);
        break;
      case httpMethods.POST:
        response = await client.post(url, data, config);
        break;
      case httpMethods.PUT:
        response = await client.put(url, data, config);
        break;
      case httpMethods.PATCH:
        response = await client.patch(url, data, config);
        break;
      case httpMethods.DELETE:
        response = await client.delete(url, config);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return response;
  } catch (error: any) {
    console.error(`Error in ${method} request to ${url}:`, error);
    throw error;
  }
};
