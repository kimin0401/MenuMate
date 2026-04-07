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
  const q = searchParams.get('q');

  // inputValue: 검색창에 입력 중인 draft 값
  const [inputValue, setInputValue] = useState('');

  // submittedKeyword: 현재는 실제 검색에 적용된 값
  // 추후에는 URL의 q 파라미터가 이 역할을 대체할 예정
  const [submittedKeyword, setSubmittedKeyword] = useState('');

  // results / isLoading / error: 검색 기준 상태로부터 파생되는 값
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // hasSearched: 현재는 검색 전/후 화면 분기용 상태
  // 추후에는 q 존재 여부로 대체할 예정
  const [hasSearched, setHasSearched] = useState(false);

  // 검색 제출 시 inputValue를 실제 검색 조건으로 확정한다.
  // 이후에는 submittedKeyword 대신 /?q=... 형태로 URL을 갱신하도록 변경 예정
  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    // 현재는 submittedKeyword를 기준으로 검색을 실행하고 있지만,
    // 추후에는 /?q=... 형태로 URL을 갱신하도록 변경 예정
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
