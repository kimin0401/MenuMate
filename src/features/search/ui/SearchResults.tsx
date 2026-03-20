import type { SearchResult } from '@/features/search/model/types';
import { SearchResultCard } from '@/features/search/ui/SearchResultCard';

type SearchResultsProps = {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
};

export const SearchResults = ({ results, isLoading, error, hasSearched }: SearchResultsProps) => {
  if (isLoading) {
    return <p>검색 중입니다...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!hasSearched) {
    return null;
  }

  if (results.length === 0) {
    return <p>검색 결과가 없습니다.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
        <SearchResultCard key={result.id} result={result} />
      ))}
    </ul>
  );
};
