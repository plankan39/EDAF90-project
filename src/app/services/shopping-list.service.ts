import { Injectable } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  deleteDoc,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
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
    const recipesPayload: any[] = [...this.shoppingList["recipes"]];

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

    setDoc(doc(this.firestore, "shopping-lists", this.user.uid), {
      recipes: recipesPayload,
    }).then(() => this.router.navigate(["/shopping-list"]));
  }

  updateShoppingList(ref: DocumentReference, quantity: number) {
    if (!this.user) return;

    const docRef = doc(this.firestore, "shopping-lists", this.user.uid);

    if (quantity < 1) {
      updateDoc(docRef, {
        recipes: this.shoppingList["recipes"].filter((r: any) => {
          if (r.ref.id === ref.id) {
            return false;
          }

          return true;
        }),
      }).then(() => location.reload());
      return;
    }

    updateDoc(docRef, {
      recipes: this.shoppingList["recipes"].map((r: any) => {
        if (r.ref.id === ref.id) {
          return { ...r, quantity };
        }

        return r;
      }),
    }).then(() => location.reload());
  }
}
