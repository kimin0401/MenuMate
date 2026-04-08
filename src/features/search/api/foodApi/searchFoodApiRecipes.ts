// 외부 API 전용 어댑터 - 식약처 API와 직접 통신, URL 조립, fetch, raw 응답 반환
import type { FoodApiRecipeRaw, FoodApiResponseRaw } from '@/features/search/model/types';
import {
  FOOD_API_BASE_URL,
  FOOD_API_SERVICE_ID,
  FOOD_API_DATA_TYPE,
  DEFAULT_START_INDEX,
  DEFAULT_END_INDEX,
} from '@/shared/api/foodApi';

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
    `/${DEFAULT_START_INDEX}/${DEFAULT_END_INDEX}/RCP_NM=${encodeURIComponent(trimmedKeyword)}`;

  console.log('[food api] request start', {
    keyword: trimmedKeyword,
    requestUrl,
  });

  const response = await fetch(requestUrl, {
    method: 'GET',
    cache: 'no-store',
  });

  const contentType = response.headers.get('content-type') ?? '';

  console.log('[food api] response meta', {
    keyword: trimmedKeyword,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
    contentType,
  });

  const rawText = await response.text();

  console.log('[food api] response preview', {
    keyword: trimmedKeyword,
    preview: rawText.slice(0, 200),
  });

  if (!response.ok) {
    throw new Error(
      `식약처 API 요청에 실패했습니다. status=${response.status}, statusText=${response.statusText}`,
    );
  }

  if (!contentType.includes('application/json')) {
    throw new Error(`식약처 API가 JSON이 아닌 응답을 반환했습니다. content-type=${contentType}`);
  }

  let data: FoodApiResponseRaw;

  try {
    data = JSON.parse(rawText) as FoodApiResponseRaw;
  } catch (error) {
    console.error('[food api] JSON parse error', {
      keyword: trimmedKeyword,
      error,
      preview: rawText.slice(0, 200),
    });

    throw new Error('식약처 API 응답을 JSON으로 파싱하는 데 실패했습니다.');
  }

  const resultCode = data.COOKRCP01?.RESULT?.CODE;

  console.log('[food api] parsed result', {
    keyword: trimmedKeyword,
    resultCode,
    resultMessage: data.COOKRCP01?.RESULT?.MSG,
    rowLength: data.COOKRCP01?.row?.length ?? 0,
  });

  if (resultCode && resultCode !== 'INFO-000' && resultCode !== 'INFO-200') {
    const resultMessage =
      data.COOKRCP01?.RESULT?.MSG || '식약처 API 응답 처리 중 오류가 발생했습니다.';

    throw new Error(resultMessage);
  }

  return data.COOKRCP01?.row ?? [];
};
