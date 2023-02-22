import { Injectable } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  serverTimestamp,
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

    addDoc(collection(this.firestore, "ingredients"), {
      ...ingredient,
      created: serverTimestamp(),
    });
  }

  deleteIngredient(id: string) {
    deleteDoc(doc(this.firestore, "ingredients", id));
  }
}
