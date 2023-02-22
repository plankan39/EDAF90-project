import { Injectable } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  doc,
  docData,
  DocumentData,
  Firestore,
  setDoc,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Recipe } from "../types/recipe";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  user: User | null = null;
  shoppingList: DocumentData = { ingredients: [], recipes: [] };

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router
  ) {
    this.authService.getUser().subscribe((user) => {
      this.user = user;

      if (user) {
        docData(doc(this.firestore, "shopping-lists", user.uid)).subscribe(
          (shoppingList) => {
            if (shoppingList) this.shoppingList = shoppingList;
          }
        );
      }
    });
  }

  addToShoppingList(recipe: Recipe) {
    if (!this.user?.uid) return;

    const ingredientsPayload: any[] = [];
    const recipesPayload: any[] = [...this.shoppingList["recipes"]];

    const { ingredients } = recipe;

    const existingRecipeIndex = this.shoppingList["recipes"].findIndex(
      (r: any) => r.ref.id === recipe.id
    );

    if (existingRecipeIndex !== -1) {
      ++recipesPayload[existingRecipeIndex].quantity;
    } else {
      recipesPayload.push({
        ref: doc(this.firestore, "users", this.user.uid, "recipes", recipe.id),
        quantity: 1,
      });
    }

    ingredients.forEach((item1) => {
      const item2 = this.shoppingList["ingredients"].find(
        (item2: any) => item2.ref.id === item1["ref"].id
      );

      if (item2) {
        ingredientsPayload.push({
          ...item1,
          ref: item1["ref"],
          quantity: item1["quantity"] + item2.quantity,
        });
      } else {
        ingredientsPayload.push(item1);
      }
    });

    this.shoppingList["ingredients"].forEach((item2: any) => {
      const item1 = ingredientsPayload.find(
        (item1) => item1["ref"].id === item2["ref"].id
      );
      if (!item1) {
        ingredientsPayload.push(item2);
      }
    });

    setDoc(doc(this.firestore, "shopping-lists", this.user.uid), {
      ingredients: ingredientsPayload,
      recipes: recipesPayload,
    }).then(() => this.router.navigate(["/shopping-list"]));
  }
}
