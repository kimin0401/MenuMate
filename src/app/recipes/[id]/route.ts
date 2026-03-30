// URL에서 id 받기 -> 외부 API에서 해당 데이터 찾기 -> 찾은 데이터 정규화 -> 프론트에 JSON으로 반환
import { NextResponse } from 'next/server';
import { normalizeRecipeDetail } from '@/features/recipes/lib/normalizeRecipeDetail';
import type { RecipeDetailRaw } from '@/features/recipes/model/types';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type FoodApiResponse = {
  COOKRCP01: {
    row?: RecipeDetailRaw[];
  };
};

const getRecipeRows = (data: FoodApiResponse): RecipeDetailRaw[] => {
  return data.COOKRCP01?.row ?? [];
};

export const GET = async (_request: Request, context: RouteContext) => {
  const { id } = await context.params;
  const recipeId = id.trim();

  if (!recipeId) {
    return NextResponse.json({ message: '유효하지 않은 레시피 ID입니다.' }, { status: 400 });
  }

  try {
    const serviceId = process.env.FOOD_API_SERVICE_ID;

    if (!serviceId) {
      throw new Error('FOOD_API_SERVICE_ID is not defined');
    }

    const apiUrl = `http://openapi.foodsafetykorea.go.kr/api/${serviceId}/COOKRCP01/json/1/1000/RCP_SEQ=${recipeId}`;

    const response = await fetch(apiUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Food API request failed: ${response.status}`);
    }

    const data: FoodApiResponse = await response.json();
    const rows = getRecipeRows(data);

    const targetRecipe = rows.find((recipe) => recipe.RCP_SEQ?.trim() === recipeId);

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
