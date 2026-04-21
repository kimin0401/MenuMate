export const getRecipeDetailHref = (id: string, name: string) =>
  `/recipes/${id}?name=${encodeURIComponent(name)}`;
