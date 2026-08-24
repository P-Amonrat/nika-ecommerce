'use client';

import { useState, useEffect } from 'react';
import { ApiResponse } from './client';

/**
 * Custom hooks for API calls
 */

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiResponse | null;
}

/**
 * Hook for GET requests
 */
export const useApi = <T = any>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
): UseApiState<T> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const result = await apiCall();

        if (isMounted) {
          if (result.success) {
            setState({
              data: result.data || null,
              loading: false,
              error: null,
            });
          } else {
            setState({
              data: null,
              loading: false,
              error: result,
            });
          }
        }
      } catch (error: any) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error,
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
};

/**
 * Hook for POST/PUT/PATCH/DELETE requests
 */
export const useMutation = <T = any>(
  apiCall: (data?: any) => Promise<ApiResponse<T>>
) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = async (data?: any) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const result = await apiCall(data);

      if (result.success) {
        setState({
          data: result.data || null,
          loading: false,
          error: null,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: result,
        });
      }

      return result;
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error,
      });
      throw error;
    }
  };

  const reset = () => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  };

  return { ...state, mutate, reset };
};
