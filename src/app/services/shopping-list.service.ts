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
  shoppingList: DocumentData = {};

  constructor(private authService: AuthService, private firestore: Firestore) {
    this.authService.getUser().subscribe((user) => {
      this.user = user;

      if (user) {
        docData(doc(this.firestore, "shopping-lists", user.uid)).subscribe(
          (shoppingList) => {
            this.shoppingList = shoppingList;
            console.log(shoppingList, user.uid);
          }
        );
      }
    });
  }

  addToShoppingList(ingredients: DocumentData[]) {
    if (!this.user?.uid) return;

    const payload = ingredients.map((ingredient) => {
      const currentQuantity =
        this.shoppingList["ingredients"].find(
          (i: DocumentData) => i["ingredientId"] === ingredient["ingredientId"]
        )?.quantity || 0;

      return {
        ...ingredient,
        quantity: currentQuantity + ingredient["quantity"],
      };
    });

    setDoc(doc(this.firestore, "shopping-lists", this.user.uid), {
      ingredients: payload,
    });
  }
}
