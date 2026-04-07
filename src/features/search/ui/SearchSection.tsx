// 검색 상태, 로직 담당 컴포넌트
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar } from '@/shared/ui/SearchBar';
import type { SearchApiResponse, SearchResult } from '@/features/search/model/types';
import { SearchResults } from '@/features/search/ui/SearchResults';

export const SearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q')?.trim() ?? '';
  const hasQuery = Boolean(q);

  // inputValue: 검색창에 입력 중인 draft 값
  const [inputValue, setInputValue] = useState('');

  // results / isLoading / error: 검색 기준 상태로부터 파생되는 값
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL에 q가 있으면 검색창에도 반영
  useEffect(() => {
    setInputValue(q);
  }, [q]);

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('q', trimmedValue);

    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    if (!q) {
      setResults([]);
      setError(null);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/search?keyword=${encodeURIComponent(q)}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || '검색 요청 중 오류가 발생했습니다.');
        }
        const data: SearchApiResponse = await response.json();
        setResults(data.results);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        setError(errorMessage);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [q]);

  return (
    <div>
      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        placeholder="검색어를 입력하세요"
        disabled={isLoading}
      />
      <SearchResults results={results} isLoading={isLoading} error={error} hasQuery={hasQuery} />
    </div>
  );
};
