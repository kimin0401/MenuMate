//TODO: 외부 API가 id 단건 필터를 안정적으로 지원하지 않는 것으로 보임. 한번에 1000개씩 받아와서 서버에서 id로 필터링하는 방식으로 구현.
// 하지만 비효율적이므로 개선안이 있다면 수정
import { NextResponse } from 'next/server';

import { getRecipeDetail } from '@/features/recipes/api/getRecipeDetail';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = async (_request: Request, context: RouteContext) => {
  const { id } = await context.params;

  try {
    const recipe = await getRecipeDetail(id);

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'INVALID_RECIPE_ID') {
        return NextResponse.json({ message: '유효하지 않은 레시피 ID입니다.' }, { status: 400 });
      }

      if (error.message === 'RECIPE_NOT_FOUND') {
        return NextResponse.json({ message: '레시피를 찾을 수 없습니다.' }, { status: 404 });
      }
    }

    console.error('Failed to fetch recipe detail:', error);

    return NextResponse.json(
      { message: '레시피를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
};
