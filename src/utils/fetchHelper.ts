import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Create an axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

/**
 * Custom axios request function with auth, FormData support, and loading
 * @param url The endpoint URL
 * @param requiresAuth Whether auth token should be attached
 * @param options Axios options (headers, method, data, etc.)
 * @param setLoading Optional loading state setter
 */
export const customRequest = async <T = any,>(
  url: string,
  requiresAuth = false,
  options: AxiosRequestConfig = {},
  setLoading?: (loading: boolean) => void
): Promise<ApiResponse<T>> => {
  try {
    setLoading?.(true);

    const headers = {
      ...(options.headers || {}),
    };

    // Attach token if needed
    if (requiresAuth) {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        throw new Error("Authentication required but no token found");
      }
    }

    // If data is FormData, adjust headers accordingly
    if (options.data instanceof FormData) {
      delete headers["Content-Type"]; // Let browser set it with boundary
    }

    const response: AxiosResponse<T> = await axiosInstance({
      url,
      ...options,
      headers,
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    const apiError: ApiError = {
      message: axiosError.message || "Unknown error occurred",
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    };

    throw apiError;
  } finally {
    setLoading?.(false);
  }
};

// HTTP method helpers
export const api = {
  get: <T = any,>(
    url: string,
    requiresAuth = false,
    options: AxiosRequestConfig = {},
    setLoading?: (loading: boolean) => void
  ) =>
    customRequest<T>(
      url,
      requiresAuth,
      { ...options, method: "GET" },
      setLoading
    ),

  post: <T = any,>(
    url: string,
    data?: any,
    requiresAuth = false,
    options: AxiosRequestConfig = {},
    setLoading?: (loading: boolean) => void
  ) =>
    customRequest<T>(
      url,
      requiresAuth,
      { ...options, method: "POST", data },
      setLoading
    ),

  put: <T = any,>(
    url: string,
    data?: any,
    requiresAuth = false,
    options: AxiosRequestConfig = {},
    setLoading?: (loading: boolean) => void
  ) =>
    customRequest<T>(
      url,
      requiresAuth,
      { ...options, method: "PUT", data },
      setLoading
    ),

  delete: <T = any,>(
    url: string,
    requiresAuth = false,
    options: AxiosRequestConfig = {},
    setLoading?: (loading: boolean) => void
  ) =>
    customRequest<T>(
      url,
      requiresAuth,
      { ...options, method: "DELETE" },
      setLoading
    ),
};
