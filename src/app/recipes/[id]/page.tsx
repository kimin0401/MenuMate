//레시피 페이지: 레시피 상세 페이지로, 레시피의 제목, 이미지, 재료, 조리법 등을 보여줌
//TODO: 하드코딩된 localhost를 정리
import type { RecipeDetail } from '@/features/recipes/model/types';
import { getRecipeDetail } from '@/features/recipes/api/getRecipeDetail';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const RecipePage = async ({ params }: Props) => {
  const { id } = await params;

  let recipe: RecipeDetail;

  try {
    recipe = await getRecipeDetail(id);
  } catch (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-red-500">레시피를 불러오지 못했습니다.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="flex flex-col gap-6">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
          <ImageWithFallback
            key={`${recipe.id}-${recipe.imageUrl}`}
            src={recipe.imageUrl}
            alt={recipe.name}
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">{recipe.name}</h1>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">재료</h2>
        <p className="mt-4 text-sm leading-7 whitespace-pre-line text-gray-700">
          {recipe.ingredients}
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">조리 순서</h2>
        <ol className="mt-4 flex list-decimal flex-col gap-4 pl-5">
          {recipe.steps.map((step, index) => (
            <li key={`${recipe.id}-${index}`} className="text-sm leading-7 text-gray-700">
              {step}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
};

export default RecipePage;
