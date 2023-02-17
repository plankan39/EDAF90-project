import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PantryComponent } from "./pages/pantry/pantry.component";

const routes: Routes = [{ path: "", component: PantryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PantryRoutingModule {}
