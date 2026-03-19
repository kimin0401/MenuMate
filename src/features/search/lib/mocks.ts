import type { SearchResult } from '../model/types';

export const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: '김치찌개',
    imageUrl: '/images/mock/kimchi-jjigae.jpg',
    tags: ['한식', '찌개', '김치'],
    description: '매콤하고 익숙한 대표 한식 메뉴',
  },
  {
    id: '2',
    title: '김치볶음밥',
    imageUrl: '/images/mock/kimchi-fried-rice.jpg',
    tags: ['한식', '볶음밥', '김치'],
    description: '간단하게 즐기기 좋은 매콤한 볶음밥',
  },
  {
    id: '3',
    title: '된장찌개',
    imageUrl: '/images/mock/doenjang-jjigae.jpg',
    tags: ['한식', '찌개', '된장'],
    description: '구수한 맛이 특징인 국물 요리',
  },
];
