// 외부 API 전용 어댑터 - 식약처 API와 직접 통신, URL 조립, fetch, raw 응답 반환
import type { FoodApiRecipeRaw, FoodApiResponseRaw } from '@/features/search/model/types';

const FOOD_API_BASE_URL = 'https://openapi.foodsafetykorea.go.kr/api/';
const FOOD_API_SERVICE_ID = 'COOKRCP01';
const FOOD_API_DATA_TYPE = 'json';
const SEARCH_START_INDEX = 1;
const SEARCH_END_INDEX = 20;

export const searchFoodApiRecipes = async (keyword: string): Promise<FoodApiRecipeRaw[]> => {
  const apiKey = process.env.FOOD_API_KEY;

  if (!apiKey) {
    throw new Error('FOOD_API_KEY 환경변수가 설정되지 않았습니다.');
  }

  const trimmedKeyword = keyword.trim();

  if (!trimmedKeyword) {
    return [];
  }

  const requestUrl =
    `${FOOD_API_BASE_URL}/${apiKey}/${FOOD_API_SERVICE_ID}/${FOOD_API_DATA_TYPE}` +
    `/${SEARCH_START_INDEX}/${SEARCH_END_INDEX}/RCP_NM=${encodeURIComponent(trimmedKeyword)}`;

  const response = await fetch(requestUrl, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('식약처 API 요청에 실패했습니다.');
  }

  const data: FoodApiResponseRaw = await response.json();

  const resultCode = data.COOKRCP01?.RESULT?.CODE;

  if (resultCode && resultCode !== 'INFO-000' && resultCode !== 'INFO-200') {
    const resultMessage =
      data.COOKRCP01?.RESULT?.MSG || '식약처 API 응답 처리 중 오류가 발생했습니다.';

    throw new Error(resultMessage);
  }

  return data.COOKRCP01?.row ?? [];
};
