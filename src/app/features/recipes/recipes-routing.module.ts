import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewRecipeComponentTest } from "./pages/new-recipe/new-recipe-test-component";
import { NewRecipeComponent } from "./pages/new-recipe/new-recipe.component";
import { RecipeComponent } from "./pages/recipe/recipe.component";
import { RecipesComponent } from "./pages/recipes/recipes.component";

const routes: Routes = [
  {
    path: "",
    component: RecipesComponent,
  },
  {
    path: "new",
    component: NewRecipeComponentTest,
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
