//레시피 페이지: 레시피 상세 페이지로, 레시피의 제목, 이미지, 재료, 조리법 등을 보여줌
type Props = {
  params: Promise<{
    id: string;
  }>;
};

const RecipePage = async ({ params }: Props) => {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/recipes/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return <div>레시피를 불러오지 못했습니다. status: {response.status}</div>;
  }

  const recipe = await response.json();

  return (
    <main>
      <h1>{recipe.name}</h1>
      <p>ID: {recipe.id}</p>
      <p>이미지: {recipe.imageUrl}</p>
      <p>재료: {recipe.ingredients}</p>

      <h2>조리 순서</h2>
      <ul>
        {recipe.steps?.map((step: string, index: number) => (
          <li key={`${recipe.id}-${index}`}>{step}</li>
        ))}
      </ul>
    </main>
  );
};

export default RecipePage;
