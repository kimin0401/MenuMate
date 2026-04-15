//TODO: 로딩 스피너 추가 고려
import type { SearchResult } from '@/features/search/model/types';
import { SearchResultCard } from '@/features/search/ui/SearchResultCard';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

type SearchResultsProps = {
  results: SearchResult[];
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  hasQuery: boolean;
};

export const SearchResults = ({
  results,
  isLoading,
  isFetching,
  error,
  hasQuery,
}: SearchResultsProps) => {
  // 검색 전 상태
  if (!hasQuery) {
    return null;
  }
  // 처음 검색(캐시 없음)
  if (results.length === 0 && isLoading) {
    return <LoadingSpinner size="md" label="검색 중..." className="py-10" />;
  }
  // 에러
  if (error) {
    return <p>{error}</p>;
  }
  // 결과 없음
  if (results.length === 0) {
    return <p>검색 결과가 없습니다.</p>;
  }

  return (
    <div>
      {isFetching && <p className="mb-2 text-sm text-gray-400">업데이트 중...</p>}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <SearchResultCard key={result.id} result={result} />
        ))}
      </ul>
    </div>
  );
};
