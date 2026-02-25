import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8088/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

interface ApiOptions extends AxiosRequestConfig {
  token?: string;
}

export async function apiFetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const maxRetries = 2;
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const { token, ...config } = options;
      
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await api({
        url: endpoint,
        ...config,
      });
      
      return response.data;
    } catch (error) {
      lastError = error;
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw error;
        }
        
        if (error.code === 'ECONNABORTED' && attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }
        
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
          throw new Error('Cannot connect to backend. Please ensure your backend is running.');
        }
        
        const responseData = error.response?.data;
        let errorMessage = 'Request failed';
        
        if (typeof responseData === 'string') {
          errorMessage = responseData;
        } else if (typeof responseData === 'object' && responseData !== null) {
          if (responseData.error) {
            errorMessage = typeof responseData.error === 'string' ? responseData.error : JSON.stringify(responseData.error);
          } else if (responseData.message) {
            errorMessage = responseData.message;
          } else if (responseData.details) {
            errorMessage = responseData.details;
          } else if (responseData.msg) {
            errorMessage = responseData.msg;
          }
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.response?.status === 404) {
          errorMessage = `Endpoint not found: ${endpoint}`;
        } else if (error.response?.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        throw new Error(errorMessage);
      }
      throw error;
    }
  }
  
  throw lastError;
}