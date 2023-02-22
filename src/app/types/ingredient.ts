export interface Ingredient {
  userId: string;
  id: string;
  title: string;
  type: string;
  createdAt: string;
}

export interface IngredientPayload {
  title: string;
  type: string;
}
