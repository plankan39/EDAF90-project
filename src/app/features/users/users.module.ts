import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./pages/users/users.component";
import { MaterialModule } from "src/app/modules/material.module";
import { UserComponent } from "./pages/user/user.component";
import { SharedModule } from "src/app/components/shared/shared.module";

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, SharedModule],
})
export class UsersModule {}
