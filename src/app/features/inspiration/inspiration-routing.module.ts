import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InspirationProfileComponent } from "./pages/inspiration-profile/inspiration-profile.component";
import { InspirationComponent } from "./pages/inspiration/inspiration.component";

const routes: Routes = [
  { path: "", component: InspirationComponent },
  {
    path: "",
    component: InspirationComponent,
  },
  {
    path: ":id",
    component: InspirationProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspirationRoutingModule {}
