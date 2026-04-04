// 성분 조회 정규화 함수
const LEADING_DECORATION_REGEX = /^[●•·ㆍ\-]\s*/;

export const parseIngredients = (ingredients: string) => {
  return ingredients
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .map((item) => item.replace(LEADING_DECORATION_REGEX, '').trim())
    .filter(Boolean);
};
