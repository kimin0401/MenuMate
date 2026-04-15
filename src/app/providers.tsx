'use client';

import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { ReactNode, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 기본적으로 5분 동안 캐시 유지
            gcTime: 1000 * 60 * 15, // 15분 후 가비지 컬렉션
            retry: 1, // 실패 시 1회 재시도
          },
        },
      }),
  );
  const persister = createAsyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 30, // 30분 유지
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
