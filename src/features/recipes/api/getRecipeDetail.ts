// 레시피 상세 조회의 핵심 서버 로직 담당
//TODO: 조회 id가 1000이 넘어가면 조회되지 않는 문제 존재
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

const RECIPE_DETAIL_START_INDEX = 1;
const RECIPE_DETAIL_END_INDEX = 1000;

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

export const getRecipeDetail = async (recipeId: string): Promise<RecipeDetail> => {
  const trimmedRecipeId = recipeId.trim();

  if (!trimmedRecipeId) {
    throw new Error('INVALID_RECIPE_ID');
  }

  const apiKey = process.env.FOOD_API_KEY;

  if (!apiKey) {
    throw new Error('FOOD_API_KEY 환경변수가 설정되지 않았습니다.');
  }

  const requestUrl =
    `${FOOD_API_BASE_URL}/${apiKey}/${FOOD_API_SERVICE_ID}/${FOOD_API_DATA_TYPE}` +
    `/${RECIPE_DETAIL_START_INDEX}/${RECIPE_DETAIL_END_INDEX}`;

  console.log(requestUrl);
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
  const targetRecipe = findRecipeById(rows, trimmedRecipeId);

  if (!targetRecipe) {
    throw new Error('RECIPE_NOT_FOUND');
  }

  return normalizeRecipeDetail(targetRecipe);
};
