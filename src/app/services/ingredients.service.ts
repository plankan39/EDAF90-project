import { Injectable } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  addDoc,
  collection,
  Firestore,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "@angular/fire/firestore";
import { IngredientPayload } from "../types/ingredient";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class IngredientsService {
  user: User | null = null;

  constructor(private firestore: Firestore, private authService: AuthService) {
    authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  addIngredient(ingredient: IngredientPayload) {
    if (!this.user) return;

    addDoc(collection(this.firestore, "users", this.user.uid, "ingredients"), {
      ...ingredient,
      userId: this.user.uid,
      created: serverTimestamp(),
    });
  }

  updateIngredient(id: string, ingredient: IngredientPayload) {
    if (!this.user) return;

    updateDoc(doc(this.firestore, "users", this.user.uid, "ingredients", id), {
      ...ingredient,
    });
  }
}
