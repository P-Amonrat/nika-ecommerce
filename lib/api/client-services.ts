'use client';

/**
 * Client-side services that use Next.js API routes (no CORS issues)
 * These are for use in client components
 */

import { ApiResponse } from './client';

export const categoryClientService = {
  /**
   * Get all categories with pagination
   * Uses Next.js API route proxy
   */
  getAll: async (params?: {
    pageNumber?: number;
    pageSize?: number;
  }): Promise<ApiResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.pageNumber) queryParams.append('pageNumber', String(params.pageNumber));
      if (params?.pageSize) queryParams.append('pageSize', String(params.pageSize));

      const response = await fetch(`/api/categories?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return {
          success: false,
          statusCode: response.status,
          error: `HTTP Error: ${response.statusText}`,
          message: 'Failed to fetch categories',
        };
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      return {
        success: false,
        statusCode: 500,
        error: error.message,
        message: 'Error fetching categories',
      };
    }
  },

  /**
   * Get category by ID
   */
  getById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return {
          success: false,
          statusCode: response.status,
          error: `HTTP Error: ${response.statusText}`,
          message: 'Failed to fetch category',
        };
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching category:', error);
      return {
        success: false,
        statusCode: 500,
        error: error.message,
        message: 'Error fetching category',
      };
    }
  },
};

export default categoryClientService;
