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
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('Network Error:', error.message, error.code);
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
        if (error.code === 'ECONNABORTED' && attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }
        
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
          throw new Error('Cannot connect to backend. Please ensure your backend is running.');
        }
        
        if (error.response?.status === 400) {
          throw new Error('Invalid or expired verification token. Please request a new verification email.');
        }
        
        if (error.response?.status === 500) {
          throw new Error('Server error during verification. Please try again or contact support.');
        }
        
        const errorMessage = error.response?.data?.error || 
                            error.response?.data?.message || 
                            error.response?.data || 
                            error.message;
        
        throw new Error(typeof errorMessage === 'string' ? errorMessage : 'Request failed');
      }
      throw error;
    }
  }
  
  throw lastError;
}