import type { SearchResult } from '@/features/search/model/types';

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
    <ul>
      {results.map((result) => (
        <li key={result.id}>{result.title}</li>
      ))}
    </ul>
  );
};
