//API 엔드 포인트 - 프론트 요청 받기, 입력 검증, 서비스 호출, 응답 반환
// 주의사항 - 프론트가 외부 API 응답 구조를 몰라도 되게 할 것
import { NextResponse } from 'next/server';
import { searchRecipes } from '@/features/search/api/searchRecipes';
import type { SearchApiResponse } from '@/features/search/model/types';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword')?.trim();

  if (!keyword) {
    return NextResponse.json({ message: '검색어를 입력해주세요.' }, { status: 400 });
  }

  const results = await searchRecipes(keyword);
  const response: SearchApiResponse = {
    results,
  };

  return NextResponse.json(response, { status: 200 });
};
