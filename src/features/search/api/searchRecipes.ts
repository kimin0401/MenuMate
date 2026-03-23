// 검색 유스케이스의 진입점
import type { SearchResult } from '@/features/search/model/types';

export const searchRecipes = async (keyword: string): Promise<SearchResult[]> => {
  console.log('[searchRecipes] keyword:', keyword);

  return [];
};
