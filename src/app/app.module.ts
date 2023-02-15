import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { HomeComponent } from "./components/home/home.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LayoutComponent } from './components/layout/layout.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { PantryComponent } from './components/pantry/pantry.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { InspirationComponent } from './components/inspiration/inspiration.component';
import { SettingsComponent } from './components/settings/settings.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { RecipeComponent } from './components/recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    RecipesComponent,
    SidebarComponent,
    LayoutComponent,
    IngredientsComponent,
    PantryComponent,
    ShoppingListComponent,
    InspirationComponent,
    SettingsComponent,
    IngredientComponent,
    RecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
