// 검색 유스케이스의 진입점
import type { SearchResult } from '@/features/search/model/types';
import { searchFoodApiRecipes } from '@/features/search/api/foodApi/searchFoodApiRecipes';

export const searchRecipes = async (keyword: string): Promise<SearchResult[]> => {
  const rawRecipes = await searchFoodApiRecipes(keyword);

  console.log('[searchRecipes] rawRecipes:', rawRecipes);

  return [];
};
