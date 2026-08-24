import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

// API Response Type
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

// Create Axios instance
const createApiClient = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7230';

  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request Interceptor
  client.interceptors.request.use(
    (config) => {
      // Add authorization token if needed
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  client.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error: AxiosError) => {
      const errorResponse: ApiResponse = {
        success: false,
        statusCode: error.response?.status || 500,
        error: error.message,
        message: (error.response?.data as any)?.message || 'An error occurred',
      };
      return Promise.reject(errorResponse);
    }
  );

  return client;
};

export const apiClient = createApiClient();
export default apiClient;
