// 검색 상태, 로직 담당 컴포넌트
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
// import { useIsRestoring } from '@tanstack/react-query';

import { SearchBar } from '@/shared/ui/SearchBar';
import { SearchResults } from '@/features/search/ui/SearchResults';
import { fetchSearch } from '@/features/search/api/fetchSearch';

export const SearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const isRestoring = useIsRestoring();

  const q = searchParams.get('q')?.trim() ?? '';
  const hasQuery = Boolean(q);

  // 입력창 상태 (draft)
  const [inputValue, setInputValue] = useState('');

  // URL → input 동기화
  useEffect(() => {
    setInputValue(q);
  }, [q]);

  const {
    data: queryResults = [],
    isLoading: queryLoading,
    isFetching: queryFetching,
    error: queryError,
  } = useQuery({
    queryKey: ['recipes', q],
    queryFn: () => fetchSearch(q),
    enabled: !!q,
    // && !isRestoring,
  });

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('q', trimmedValue);

    router.push(`/?${params.toString()}`);
  };

  // if (isRestoring) {
  //   return <p>검색 중...</p>;
  // }

  return (
    <div>
      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        placeholder="검색어를 입력하세요"
        disabled={queryLoading}
      />
      <SearchResults
        results={queryResults}
        isLoading={queryLoading}
        isFetching={queryFetching}
        error={queryError instanceof Error ? queryError.message : null}
        hasQuery={hasQuery}
      />
    </div>
  );
};
