// 정규화 레이어, 매핑 - 외부 raw 응답 1개를 SearchResult 내부 타입 1개로 변환
import type { FoodApiRecipeRaw, SearchResult } from '@/features/search/model/types';

const parseHashTags = (hasTagText?: string): string[] => {
  if (!hasTagText) {
    return [];
  }

  return hasTagText
    .split(/[#,]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
};

export const mapFoodApiRecipeToSearchResult = (recipe: FoodApiRecipeRaw): SearchResult => {
  return {
    id: recipe.RCP_SEQ?.trim() ?? '',
    name: recipe.RCP_NM?.trim() ?? '',
    summary: recipe.RCP_PAT2?.trim() ?? '',
    imageUrl: recipe.ATT_FILE_NO_MAIN?.trim() ?? '',
    tags: parseHashTags(recipe.HASH_TAG),
  };
};
