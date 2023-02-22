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
  collectionData,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { IngredientItem } from "../types/ingredient";
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

  addIngredient(ingredient: IngredientItem) {
    if (!this.user) return;

    addDoc(collection(this.firestore, "ingredient_items"), {
      ...ingredient,
      created: serverTimestamp(),
    });
  }

  updateIngredient(id: string, ingredient: IngredientItem) {
    if (!this.user) return;

    updateDoc(doc(this.firestore, "ingredient_items"), {
      ...ingredient,
    });
  }

  getAll() {
    return collectionData(collection(this.firestore, "ingredient_items"), {
      idField: "id",
    }) as Observable<IngredientItem[]>;
  }
}
