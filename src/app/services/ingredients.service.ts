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
import { BehaviorSubject } from "rxjs";
import { Ingredient, IngredientPayload } from "../types/ingredient";
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

    addDoc(collection(this.firestore, "ingredients"), {
      ...ingredient,
      userId: this.user.uid,
      created: serverTimestamp(),
    });
  }

  deleteIngredient(id: string) {
    if (!this.user) return;

    deleteDoc(doc(this.firestore, "ingredients", id));
  }

  updateIngredient(id: string, ingredient: IngredientPayload) {
    updateDoc(doc(this.firestore, "ingredients", id), { ...ingredient });
  }
}
