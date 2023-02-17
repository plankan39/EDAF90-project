import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ShoppingListsRoutingModule } from "./shopping-lists-routing.module";
import { ShoppingListsComponent } from "./pages/shopping-lists/shopping-lists.component";

@NgModule({
  declarations: [ShoppingListsComponent],
  imports: [CommonModule, ShoppingListsRoutingModule],
})
export class ShoppingListsModule {}
