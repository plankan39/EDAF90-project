import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewRecipeComponent } from "./pages/new-recipe/new-recipe.component";
import { RecipeComponent } from "./pages/recipe/recipe.component";
import { RecipesComponent } from "./pages/recipes/recipes.component";

const routes: Routes = [
  {
    path: "new",
    component: NewRecipeComponent,
  },
  {
    path: ":userId",
    component: RecipesComponent,
  },
  {
    path: ":userId/:recipeId",
    component: RecipeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
