import { NgModule } from "@angular/core";
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";

const redirectAuthorized = () => redirectLoggedInTo([""]);
const redirectUnauthorized = () => redirectUnauthorizedTo(["auth/login"]);

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectAuthorized },
  },
  {
    path: "",
    loadChildren: () =>
      import("./features/home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "recipes",
    loadChildren: () =>
      import("./features/recipes/recipes.module").then((m) => m.RecipesModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "ingredients",
    loadChildren: () =>
      import("./features/ingredients/ingredients.module").then(
        (m) => m.IngredientsModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "pantry",
    loadChildren: () =>
      import("./features/pantry/pantry.module").then((m) => m.PantryModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./features/shopping-list/shopping-list.module").then(
        (m) => m.ShoppingListModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "users",
    loadChildren: () =>
      import("./features/users/users.module").then((m) => m.UsersModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "**",
    redirectTo: "/",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
