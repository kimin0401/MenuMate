// 외부 API Raw 타입을 내부 타입으로 정규화하는 함수
import type { RecipeDetail, RecipeDetailRaw, RecipeStep } from '@/features/recipes/model/types';

const removeStepPrefix = (step: string): string => {
  return step.replace(/^\d+\.\s*/, '').trim();
};

// extractRecipeSteps: 외부 API의 펼쳐진 필드 구조를 RecipeStep[]으로 변환
const extractRecipeSteps = (raw: RecipeDetailRaw): RecipeStep[] => {
  const steps: RecipeStep[] = [];

  for (let index = 1; index <= 20; index++) {
    const stepKey = `MANUAL${String(index).padStart(2, '0')}` as keyof RecipeDetailRaw;
    const imageKey = `MANUAL_IMG${String(index).padStart(2, '0')}` as keyof RecipeDetailRaw;

    const descriptionValue = raw[stepKey];
    const imageValue = raw[imageKey];

    const description =
      typeof descriptionValue === 'string' ? removeStepPrefix(descriptionValue.trim()) : '';

    const imageUrl =
      typeof imageValue === 'string' && imageValue.trim().length > 0
        ? imageValue.trim()
        : undefined;

    if (!description) {
      continue;
    }

    steps.push({
      description,
      imageUrl,
    });
  }

  return steps;
};

// normalizeRecipeDetail: 전체 Raw 데이터를 내부 타입으로 바꾸는 메인 함수
export const normalizeRecipeDetail = (raw: RecipeDetailRaw): RecipeDetail => {
  return {
    id: raw.RCP_SEQ?.trim() ?? '',
    name: raw.RCP_NM?.trim() ?? '',
    imageUrl: raw.ATT_FILE_NO_MAIN?.trim() ?? '',
    ingredients: raw.RCP_PARTS_DTLS?.trim() ?? '',
    steps: extractRecipeSteps(raw),
  };
};
