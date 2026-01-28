import {
  isServer,
  QueryClient,
  QueryCache,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (!isServer) {
          toaster.create({
            title: 'Data Fetch Error',
            description: error.message,
            type: 'error',
          });
        }
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

// Global variable to persist the client instance in the browser
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}
