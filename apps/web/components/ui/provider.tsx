'use client';

import { system } from '@/lib/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { getQueryClient } from '@/lib/get-query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
