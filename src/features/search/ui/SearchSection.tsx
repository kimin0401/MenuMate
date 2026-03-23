// 검색 상태, 로직 담당 컴포넌트
'use client';

import { useEffect, useState } from 'react';
import { SearchBar } from '@/shared/ui/SearchBar';
import type { SearchApiResponse, SearchResult } from '@/features/search/model/types';
import { SearchResults } from '@/features/search/ui/SearchResults';

export const SearchSection = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    setSubmittedKeyword(trimmedValue);
    setHasSearched(true);
  };

  useEffect(() => {
    if (!submittedKeyword) {
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/search?keyword=${encodeURIComponent(submittedKeyword)}`);

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
  }, [submittedKeyword]);

  return (
    <div>
      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        placeholder="검색어를 입력하세요"
        disabled={isLoading}
      />
      <SearchResults
        results={results}
        isLoading={isLoading}
        error={error}
        hasSearched={hasSearched}
      />
    </div>
  );
};
