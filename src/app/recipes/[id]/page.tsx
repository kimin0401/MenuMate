//레시피 페이지: 레시피 상세 페이지로, 레시피의 제목, 이미지, 재료, 조리법 등을 보여줌
import type { RecipeDetail } from '@/features/recipes/model/types';
import { getRecipeDetail } from '@/features/recipes/api/getRecipeDetail';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';
import { parseIngredients } from '@/features/recipes/lib/parseIngredients';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const PAGE_STYLE = 'mx-auto max-w-3xl px-4 py-8 md:py-10';

const ARTICLE_STYLE = 'flex flex-col gap-8';

const HERO_IMAGE_WRAPPER_STYLE =
  'relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-[var(--mm-border)] bg-[var(--mm-surface)]';

const SECTION_STYLE =
  'rounded-3xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 shadow-sm md:p-6';

const SECTION_TITLE_STYLE = 'text-xl font-bold text-[var(--mm-text)]';

const SECTION_DESCRIPTION_STYLE = 'mt-1 text-sm leading-6 text-[var(--mm-muted)]';

const INGREDIENT_ITEM_STYLE =
  'flex items-start gap-3 rounded-2xl bg-[var(--mm-inner-card-soft)] px-4 py-3';

const STEP_ITEM_STYLE =
  'flex items-start gap-3 rounded-2xl bg-[var(--mm-inner-card-soft)] px-4 py-4';

const RecipePage = async ({ params }: Props) => {
  const { id } = await params;

  let recipe: RecipeDetail;

  try {
    recipe = await getRecipeDetail(id);
  } catch (error) {
    return (
      <main className={PAGE_STYLE}>
        <p className="text-sm text-red-500">레시피를 불러오지 못했습니다.</p>
      </main>
    );
  }

  const ingredientList = parseIngredients(recipe.ingredients);

  return (
    <main className={PAGE_STYLE}>
      <article className={ARTICLE_STYLE}>
        <header className="flex flex-col gap-3">
          <div className={HERO_IMAGE_WRAPPER_STYLE}>
            <ImageWithFallback
              key={`${recipe.id}-${recipe.imageUrl}`}
              src={recipe.imageUrl}
              alt={recipe.name}
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="w-fit rounded-full bg-[var(--mm-primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--mm-primary-hover)]">
              Recipe
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-[var(--mm-text)]">
              {recipe.name}
            </h1>

            <p className="text-sm leading-6 text-[var(--mm-muted)]">
              필요한 재료와 조리 순서를 한눈에 확인해보세요.
            </p>
          </div>
        </header>

        <section className={SECTION_STYLE}>
          <div className="mb-4">
            <h2 className={SECTION_TITLE_STYLE}>재료</h2>
            <p className={SECTION_DESCRIPTION_STYLE}>준비해야 할 재료를 먼저 확인해보세요.</p>
          </div>

          {ingredientList.length > 0 ? (
            <ul className="grid gap-3">
              {ingredientList.map((ingredient, index) => (
                <li key={`${recipe.id}-ingredient-${index}`} className={INGREDIENT_ITEM_STYLE}>
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--mm-primary)]" />
                  <span className="text-sm leading-6 text-[var(--mm-text)]">{ingredient}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--mm-muted)]">재료 정보가 없습니다.</p>
          )}
        </section>

        <section className={SECTION_STYLE}>
          <div className="mb-4">
            <h2 className={SECTION_TITLE_STYLE}>조리 순서</h2>
            <p className={SECTION_DESCRIPTION_STYLE}>순서대로 따라 하면 쉽게 완성할 수 있어요.</p>
          </div>

          {recipe.steps.length > 0 ? (
            <ol className="flex flex-col gap-4">
              {recipe.steps.map((step, index) => (
                <li key={`${recipe.id}-step-${index}`} className={STEP_ITEM_STYLE}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--mm-primary)] text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-7 text-[var(--mm-text)]">{step.description}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-[var(--mm-muted)]">조리 순서 정보가 없습니다.</p>
          )}
        </section>
      </article>
    </main>
  );
};

export default RecipePage;
