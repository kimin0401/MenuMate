// 외부 API Raw 타입을 내부 타입으로 정규화하는 함수
import type { RecipeDetail, RecipeDetailRaw } from '@/features/recipes/model/types';

const extractRecipeSteps = (raw: RecipeDetailRaw): string[] => {
  const manualSteps = [
    raw.MANUAL01,
    raw.MANUAL02,
    raw.MANUAL03,
    raw.MANUAL04,
    raw.MANUAL05,
    raw.MANUAL06,
    raw.MANUAL07,
    raw.MANUAL08,
    raw.MANUAL09,
    raw.MANUAL10,
    raw.MANUAL11,
    raw.MANUAL12,
    raw.MANUAL13,
    raw.MANUAL14,
    raw.MANUAL15,
    raw.MANUAL16,
    raw.MANUAL17,
    raw.MANUAL18,
    raw.MANUAL19,
    raw.MANUAL20,
  ];

  return manualSteps.map((step) => step?.trim() ?? '').filter((step) => step.length > 0);
};

export const normalizeRecipeDetail = (raw: RecipeDetailRaw): RecipeDetail => {
  return {
    id: raw.RCP_SEQ?.trim() ?? '',
    name: raw.RCP_NM?.trim() ?? '',
    imageUrl: raw.ATT_FILE_NO_MAIN?.trim() ?? '',
    ingredients: raw.RCP_PARTS_DTLS?.trim() ?? '',
    steps: extractRecipeSteps(raw),
  };
};
