import { NgModule } from "@angular/core";
import { BrowserModule, makeStateKey } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { HomeComponent } from "./components/home/home.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { IngredientsComponent } from "./components/ingredients/ingredients.component";
import { PantryComponent } from "./components/pantry/pantry.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
import { InspirationComponent } from "./components/inspiration/inspiration.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { RecipeComponent } from "./components/recipe/recipe.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material.module";
import { IngredientsFormComponent } from "./components/ingredients/ingredients-form/ingredients-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { IngredientsTableComponent } from "./components/ingredients/ingredients-table/ingredients-table.component";
import { RecipesTableComponent } from "./components/recipes/recipes-table/recipes-table.component";
import { RecipeNewComponent } from "./components/recipe-new/recipe-new.component";
import { InspirationProfileComponent } from './components/inspiration-profile/inspiration-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    RecipesComponent,
    LayoutComponent,
    IngredientsComponent,
    PantryComponent,
    ShoppingListComponent,
    InspirationComponent,
    SettingsComponent,
    RecipeComponent,
    IngredientsFormComponent,
    IngredientsTableComponent,
    RecipesTableComponent,
    RecipeNewComponent,
    InspirationProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
