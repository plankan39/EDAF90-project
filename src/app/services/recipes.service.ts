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

    addDoc(collection(this.firestore, "recipes"), {
      ...recipe,
      userId: this.user.uid,
      created: serverTimestamp(),
    }).then((ref) => {
      this.router.navigate(["recipes", ref.id]);
    });
  }

  deleteRecipe(id: string) {
    if (!this.user) return;

    deleteDoc(doc(this.firestore, "recipes", id)).then(() =>
      this.router.navigate(["/recipes"])
    );
  }
}
