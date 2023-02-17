import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListsComponent } from "./pages/shopping-lists/shopping-lists.component";

const routes: Routes = [{ path: "", component: ShoppingListsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListsRoutingModule {}
