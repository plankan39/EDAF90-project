export interface Ingredient {
  userId: string;
  id: string;
  title: string;
  unit: string;
  createdAt: string;
}

export interface IngredientPayload {
  title: string;
  unit: string;
}
