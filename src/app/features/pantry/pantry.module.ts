import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PantryRoutingModule } from "./pantry-routing.module";
import { PantryComponent } from "./pages/pantry/pantry.component";

@NgModule({
  declarations: [PantryComponent],
  imports: [CommonModule, PantryRoutingModule],
})
export class PantryModule {}
