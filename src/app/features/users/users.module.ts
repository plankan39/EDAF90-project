import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./pages/users/users.component";
import { MaterialModule } from "src/app/modules/material.module";
import { SharedModule } from "src/app/components/shared/shared.module";

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, SharedModule],
})
export class UsersModule {}
