// 검색 상태, 로직 담당 컴포넌트
'use client';

import { useEffect, useState } from 'react';
import { SearchBar } from '@/shared/ui/SearchBar';
import type { SearchResult } from '@/features/search/model/types';
import { searchMockRecipes } from '@/features/search/lib/searchMockRecipes';
import { SearchResults } from '@/features/search/ui/SearchResults';

export const SearchSection = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleSubmit = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) return;

    setSubmittedKeyword(trimmed);
    setHasSearched(true);
  };

  useEffect(() => {
    if (!submittedKeyword) return;

    const fetchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await searchMockRecipes(submittedKeyword);
        setResults(data);
      } catch (err) {
        setError('검색 중 문제가 발생했습니다.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [submittedKeyword]);

  return (
    <div>
      <SearchBar
        value={inputValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
        placeholder="검색어를 입력하세요"
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
