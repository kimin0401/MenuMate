// 레시피 상세 조회의 핵심 서버 로직 담당 RCP_NM으로 조회 후 RCP_SEQ로 보정하는 구조
import 'server-only';

import { normalizeRecipeDetail } from '@/features/recipes/lib/normalizeRecipeDetail';
import type { RecipeDetail, RecipeDetailRaw } from '@/features/recipes/model/types';
import { FOOD_API_BASE_URL, FOOD_API_DATA_TYPE, FOOD_API_SERVICE_ID } from '@/shared/api/foodApi';

type FoodApiResult = {
  CODE?: string;
  MSG?: string;
};

type FoodApiResponse = {
  COOKRCP01?: {
    RESULT?: FoodApiResult;
    row?: RecipeDetailRaw[];
  };
};

const getRecipeRows = (data: FoodApiResponse): RecipeDetailRaw[] => {
  return data.COOKRCP01?.row ?? [];
};

const getFoodApiResultCode = (data: FoodApiResponse): string | undefined => {
  return data.COOKRCP01?.RESULT?.CODE;
};

const getFoodApiResultMessage = (data: FoodApiResponse): string => {
  return data.COOKRCP01?.RESULT?.MSG || '식약처 API 응답 처리 중 오류가 발생했습니다.';
};

const findRecipeById = (rows: RecipeDetailRaw[], recipeId: string): RecipeDetailRaw | undefined => {
  return rows.find((recipe) => recipe.RCP_SEQ?.trim() === recipeId);
};

export const getRecipeDetail = async (
  recipeId: string,
  recipeName: string,
): Promise<RecipeDetail> => {
  const trimmedId = recipeId.trim();
  const trimmedName = recipeName.trim();

  if (!trimmedId || !trimmedName) {
    throw new Error('INVALID_RECIPE_PARAMS');
  }

  const apiKey = process.env.FOOD_API_KEY;

  if (!apiKey) {
    throw new Error('FOOD_API_KEY 환경변수가 설정되지 않았습니다.');
  }

  // 이름 기반 조회
  const encodedName = encodeURIComponent(trimmedName.replace(/\s+/g, ''));

  const requestUrl =
    `${FOOD_API_BASE_URL}/${apiKey}/${FOOD_API_SERVICE_ID}/${FOOD_API_DATA_TYPE}` +
    `/1/10/RCP_NM=${encodedName}`;

  const response = await fetch(requestUrl, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('식약처 API 요청에 실패했습니다.');
  }

  const data: FoodApiResponse = await response.json();

  const resultCode = getFoodApiResultCode(data);

  if (resultCode && resultCode !== 'INFO-000' && resultCode !== 'INFO-200') {
    throw new Error(getFoodApiResultMessage(data));
  }

  const rows = getRecipeRows(data);

  if (!rows.length) {
    throw new Error('RECIPE_NOT_FOUND');
  }

  const targetRecipe = findRecipeById(rows, trimmedId) ?? rows[0];

  return normalizeRecipeDetail(targetRecipe);
};
