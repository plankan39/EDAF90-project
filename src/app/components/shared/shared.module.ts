import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecipesTableComponent } from "../recipes-table/recipes-table.component";
import { MaterialModule } from "src/app/modules/material.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [RecipesTableComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [RecipesTableComponent],
})
export class SharedModule {}
