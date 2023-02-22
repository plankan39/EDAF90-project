import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

// export interface Recipe {
//   id: string;
//   title: string;
//   userId: string;
//   createdAt: Date;
// }

export interface Recipe {
  id?: string;
  userId: string;
  title: string;
  description: string;
  cookingTime: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  createdAt?: Date;
}
