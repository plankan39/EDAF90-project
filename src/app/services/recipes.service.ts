import { Injectable } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  serverTimestamp,
  writeBatch,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { RecipePayload } from "../types/recipe";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  user: User | null = null;

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  addRecipe(recipe: RecipePayload) {
    if (!this.user) return;
    const userId = this.user.uid;

    addDoc(collection(this.firestore, "users", userId, "recipes"), {
      ...recipe,
      ingredients: recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        ref: doc(this.firestore, "ingredients", ingredient.ref),
      })),
      created: serverTimestamp(),
    }).then((ref) => {
      this.router.navigate(["recipes", userId, ref.id]);
    });
  }

  deleteRecipe(id: string) {
    if (!this.user) return;

    deleteDoc(doc(this.firestore, "users", this.user.uid, "recipes", id)).then(
      () => this.router.navigate(["/recipes", this.user?.uid])
    );
  }
}
