import { apiClient, ApiResponse } from './client';
import { responseHandler, httpMethods, makeRequest } from './middleware';

/**
 * API Service Layer
 * Contains all API endpoints and business logic
 */

// Example: Product Service
export const productService = {
  /**
   * Get all products
   */
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.GET, '/products', undefined, {
        params,
      });
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Get product by ID
   */
  getById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.GET, `/products/${id}`);
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Create new product
   */
  create: async (data: any): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.POST, '/products', data);
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Update product
   */
  update: async (id: string, data: any): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.PUT, `/products/${id}`, data);
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Delete product
   */
  delete: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.DELETE, `/products/${id}`);
      return response;
    } catch (error: any) {
      return error;
    }
  },
};

// Example: Order Service
export const orderService = {
  /**
   * Get all orders
   */
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.GET, '/orders', undefined, {
        params,
      });
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Get order by ID
   */
  getById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.GET, `/orders/${id}`);
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Create new order
   */
  create: async (data: any): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.POST, '/orders', data);
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Update order status
   */
  updateStatus: async (id: string, status: string): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.PATCH, `/orders/${id}/status`, {
        status,
      });
      return response;
    } catch (error: any) {
      return error;
    }
  },
};

// Example: Auth Service
export const authService = {
  /**
   * Login user
   */
  login: async (email: string, password: string): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.POST, '/auth/login', {
        email,
        password,
      });
      // Store token in localStorage
      if (response.success && response.data?.token) {
        typeof window !== 'undefined' &&
          localStorage.setItem('authToken', response.data.token);
      }
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Register user
   */
  register: async (data: any): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.POST, '/auth/register', data);
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.POST, '/auth/logout');
      // Clear token from localStorage
      typeof window !== 'undefined' && localStorage.removeItem('authToken');
      return response;
    } catch (error: any) {
      return error;
    }
  },
};

// Category Service
export const categoryService = {
  /**
   * Get all categories with pagination
   * Calls Next.js API route which proxies to external API
   */
  getAll: async (params?: {
    pageNumber?: number;
    pageSize?: number;
  }): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.GET, '/api/categories', undefined, {
        params,
      });
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Get category by ID
   */
  getById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.GET, `/api/Categories/${id}`);
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Create new category
   */
  create: async (data: any): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.POST, '/api/Categories', data);
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Update category
   */
  update: async (id: string, data: any): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.PUT, `/api/Categories/${id}`, data);
      return response;
    } catch (error: any) {
      return error;
    }
  },

  /**
   * Delete category
   */
  delete: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.DELETE, `/api/Categories/${id}`);
      return response;
    } catch (error: any) {
      return error;
    }
  },
};

export default {
  productService,
  orderService,
  authService,
  categoryService,
};
