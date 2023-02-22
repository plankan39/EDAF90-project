import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./pages/recipes/recipes.component";
import { MaterialModule } from "src/app/modules/material.module";
import { RecipesTableComponent } from "./components/recipes-table/recipes-table.component";
import { RecipeComponent } from "./pages/recipe/recipe.component";
import { NewRecipeComponent } from "./pages/new-recipe/new-recipe.component";

import { ReactiveFormsModule } from "@angular/forms";
import { NewRecipeComponentTest } from "./pages/new-recipe/new-recipe-test-component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesTableComponent,
    RecipeComponent,
    NewRecipeComponent,
    NewRecipeComponentTest,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
})
export class RecipesModule {}
