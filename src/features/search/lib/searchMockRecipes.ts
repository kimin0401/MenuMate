import type { SearchResult } from '@/features/search/model/types';
import { MOCK_SEARCH_RESULTS } from '@/features/search/lib/mocks';

export const searchMockRecipes = async (keyword: string): Promise<SearchResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const lowerKeyword = keyword.toLowerCase();

  return MOCK_SEARCH_RESULTS.filter((item) => {
    return (
      item.title.toLowerCase().includes(lowerKeyword) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword)) ||
      item.description.toLowerCase().includes(lowerKeyword)
    );
  });
};
