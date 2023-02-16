export interface Recipe {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
}

export interface RecipePayload {
  title: string;
  description: string;
  cookingTime: number;
  ingredients: any[];
  instructions: any[];
}
