// URL에서 id 받기 -> 외부 API에서 해당 데이터 찾기 -> 찾은 데이터 정규화 -> 프론트에 JSON으로 반환
import { NextResponse } from 'next/server';

import { normalizeRecipeDetail } from '@/features/recipes/lib/normalizeRecipeDetail';
import type { RecipeDetailRaw } from '@/features/recipes/model/types';
import { FOOD_API_BASE_URL, FOOD_API_DATA_TYPE, FOOD_API_SERVICE_ID } from '@/shared/api/foodApi';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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

// 공용 상수를 안쓰는 이유: 추후 공용 API 범위와 달라질 수 있기 때문에 따로 상수화
const RECIPE_DETAIL_START_INDEX = 1;
const RECIPE_DETAIL_END_INDEX = 20;

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

export const GET = async (_request: Request, context: RouteContext) => {
  const { id } = await context.params;
  const recipeId = id.trim();

  if (!recipeId) {
    return NextResponse.json({ message: '유효하지 않은 레시피 ID입니다.' }, { status: 400 });
  }

  try {
    const apiKey = process.env.FOOD_API_KEY;

    if (!apiKey) {
      throw new Error('FOOD_API_KEY 환경변수가 설정되지 않았습니다.');
    }

    const requestUrl =
      `${FOOD_API_BASE_URL}/${apiKey}/${FOOD_API_SERVICE_ID}/${FOOD_API_DATA_TYPE}` +
      `/${RECIPE_DETAIL_START_INDEX}/${RECIPE_DETAIL_END_INDEX}/RCP_SEQ=${encodeURIComponent(recipeId)}`;

    const response = await fetch(requestUrl, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('식약처 API 요청에 실패했습니다.');
    }

    const data: FoodApiResponse = await response.json();
    // 디버깅 로그 (임시)
    console.log('===== FOOD API RESPONSE =====');
    console.log(JSON.stringify(data, null, 2));
    console.log('=============================');

    const resultCode = getFoodApiResultCode(data);

    if (resultCode && resultCode !== 'INFO-000' && resultCode !== 'INFO-200') {
      throw new Error(getFoodApiResultMessage(data));
    }

    const rows = getRecipeRows(data);
    const targetRecipe = findRecipeById(rows, recipeId);

    if (!targetRecipe) {
      return NextResponse.json({ message: '레시피를 찾을 수 없습니다.' }, { status: 404 });
    }

    const normalizedRecipe = normalizeRecipeDetail(targetRecipe);

    return NextResponse.json(normalizedRecipe, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch recipe detail:', error);

    return NextResponse.json(
      { message: '레시피를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
};
