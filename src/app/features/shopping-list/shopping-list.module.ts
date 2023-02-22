import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./pages/shopping-list/shopping-list.component";
import { MaterialModule } from "src/app/modules/material.module";

@NgModule({
  declarations: [ShoppingListComponent],
  imports: [CommonModule, ShoppingListRoutingModule, MaterialModule],
})
export class ShoppingListModule {}
