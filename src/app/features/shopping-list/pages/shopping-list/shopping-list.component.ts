import { Component } from "@angular/core";
import {
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
} from "@angular/fire/firestore";
import { AuthService } from "src/app/services/auth.service";
import { ShoppingListService } from "src/app/services/shopping-list.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent {
  shoppingList: DocumentData = {};
  recipes: any[] = [];
  ingredients: any[] = [];

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private shoppingListService: ShoppingListService
  ) {
    this.authService.getUser().subscribe((user) => {
      if (!user) return;

      getDoc(doc(this.firestore, "shopping-lists", user.uid)).then(
        (rSnap: any) => {
          const r = rSnap.data();

          r["recipes"].forEach((r: any) => {
            getDoc(r.ref).then((recipeSnap: any) => {
              const recipe = recipeSnap.data();

              this.recipes = [...this.recipes, { ...recipe, ...r }];

              recipe["ingredients"].forEach((i: any) => {
                getDoc(i.ref).then((ingredientSnap) => {
                  const ingredient = ingredientSnap.data();

                  const exists = this.ingredients.find((_i) => {
                    return _i.ref.id === i.ref.id;
                  });

                  if (exists) {
                    exists.quantity += i["quantity"] * r["quantity"];
                  } else {
                    this.ingredients = [
                      ...this.ingredients,
                      {
                        ...(ingredient as object),
                        ...i,
                        quantity: i["quantity"] * r["quantity"],
                      },
                    ];
                  }
                });
              });
            });
          });
        }
      );
    });
  }

  updateShoppingList(ref: DocumentReference, quantity: number) {
    this.shoppingListService.updateShoppingList(ref, quantity);
  }
}
