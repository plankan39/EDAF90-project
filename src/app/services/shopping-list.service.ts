import { Injectable } from "@angular/core";
import { User } from "@angular/fire/auth";
import {
  doc,
  docData,
  DocumentData,
  Firestore,
  setDoc,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  user: User | null = null;
  shoppingList: DocumentData = { ingredients: [] };

  constructor(private authService: AuthService, private firestore: Firestore) {
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

  addToShoppingList(ingredients: DocumentData[]) {
    if (!this.user?.uid) return;

    const payload: any[] = [];

    ingredients.forEach((item1) => {
      const item2 = this.shoppingList["ingredients"].find(
        (item2: any) => item2.ingredientId === item1["ingredientId"]
      );

      if (item2) {
        payload.push({
          ingredientId: item1["ingredientId"],
          quantity: item1["quantity"] + item2.quantity,
        });
      } else {
        payload.push(item1);
      }
    });

    this.shoppingList["ingredients"].forEach((item2: any) => {
      const item1 = payload.find(
        (item1) => item1["ingredientId"] === item2["ingredientId"]
      );
      if (!item1) {
        payload.push(item2);
      }
    });

    setDoc(doc(this.firestore, "shopping-lists", this.user.uid), {
      ingredients: payload,
    });
  }
}
