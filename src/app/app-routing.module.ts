import { NgModule } from "@angular/core";
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { IngredientComponent } from "./components/ingredient/ingredient.component";
import { IngredientsComponent } from "./components/ingredients/ingredients.component";
import { InspirationComponent } from "./components/inspiration/inspiration.component";
import { PantryComponent } from "./components/pantry/pantry.component";
import { RecipeNewComponent } from "./components/recipe-new/recipe-new.component";
import { RecipeComponent } from "./components/recipe/recipe.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
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
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "recipes/new",
    component: RecipeNewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "recipes/:id",
    component: RecipeComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "ingredients",
    component: IngredientsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: "ingredients/:id",
    component: IngredientComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
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
    path: "settings",
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
