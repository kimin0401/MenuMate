// 성분 조회 정규화 함수
export const parseIngredients = (ingredients: string) => {
  return ingredients
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
};
