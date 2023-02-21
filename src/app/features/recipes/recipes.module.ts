import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./pages/recipes/recipes.component";
import { MaterialModule } from "src/app/modules/material.module";
import { RecipeComponent } from "./pages/recipe/recipe.component";
import { NewRecipeComponent } from "./pages/new-recipe/new-recipe.component";

import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/components/shared/shared.module";

@NgModule({
  declarations: [RecipesComponent, RecipeComponent, NewRecipeComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class RecipesModule {}
