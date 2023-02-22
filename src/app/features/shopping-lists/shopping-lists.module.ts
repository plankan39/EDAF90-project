import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ShoppingListsRoutingModule } from "./shopping-lists-routing.module";
import { ShoppingListsComponent } from "./pages/shopping-lists/shopping-lists.component";
import { MaterialModule } from "src/app/modules/material.module";

@NgModule({
  declarations: [ShoppingListsComponent],
  imports: [CommonModule, ShoppingListsRoutingModule, MaterialModule],
})
export class ShoppingListsModule {}
