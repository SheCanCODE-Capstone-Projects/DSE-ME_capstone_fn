import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: Error & { status?: number }) => {
        
        if (error?.status && error.status >= 400 && error.status < 500) {
          return false;
        }
        
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, 
      gcTime: 10 * 60 * 1000, 
    },
    mutations: {
      retry: false,
    },
  },
});
