import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IngredientsRoutingModule } from "./ingredients-routing.module";
import { IngredientsComponent } from "./pages/ingredients/ingredients.component";
import { IngredientsFormComponent } from "./components/ingredients-form/ingredients-form.component";
import { IngredientsTableComponent } from "./components/ingredients-table/ingredients-table.component";
import { MaterialModule } from "src/app/modules/material.module";

import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    IngredientsComponent,
    IngredientsFormComponent,
    IngredientsTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    IngredientsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class IngredientsModule {}
