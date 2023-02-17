import { NgModule } from "@angular/core";
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { InspirationProfileComponent } from "./components/inspiration-profile/inspiration-profile.component";
import { InspirationComponent } from "./components/inspiration/inspiration.component";
import { PantryComponent } from "./components/pantry/pantry.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";

const redirectAuthorized = () => redirectLoggedInTo([""]);
const redirectUnauthorized = () => redirectUnauthorizedTo(["sign-in"]);

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "sign-in",
    component: SignInComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectAuthorized },
  },
  // {
  //   path: "recipes",
  //   component: RecipesComponent,
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectUnauthorized },
  // },
  // {
  //   path: "recipes/new",
  //   component: RecipeNewComponent,
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectUnauthorized },
  // },
  // {
  //   path: "recipes/:userId/:recipeId",
  //   component: RecipeComponent,
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectUnauthorized },
  // },
  {
    path: "pantry",
    component: PantryComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "inspiration",
    component: InspirationComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "inspiration/:id",
    component: InspirationProfileComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./features/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "recipes",
    loadChildren: () =>
      import("./features/recipes/recipes.module").then((m) => m.RecipesModule),
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
  },
  {
    path: "shopping-lists",
    loadChildren: () =>
      import("./features/shopping-lists/shopping-lists.module").then(
        (m) => m.ShoppingListsModule
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
