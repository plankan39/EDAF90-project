import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./pages/recipes/recipes.component";

@NgModule({
  declarations: [RecipesComponent],
  imports: [CommonModule, RecipesRoutingModule],
})
export class RecipesModule {}
