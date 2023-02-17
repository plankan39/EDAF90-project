import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InspirationRoutingModule } from "./inspiration-routing.module";
import { InspirationComponent } from "./pages/inspiration/inspiration.component";
import { MaterialModule } from "src/app/modules/material.module";
import { InspirationProfileComponent } from './pages/inspiration-profile/inspiration-profile.component';

@NgModule({
  declarations: [InspirationComponent, InspirationProfileComponent],
  imports: [CommonModule, InspirationRoutingModule, MaterialModule],
})
export class InspirationModule {}
