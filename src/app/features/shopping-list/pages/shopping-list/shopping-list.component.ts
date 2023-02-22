import { Component } from "@angular/core";
import {
  collection,
  collectionData,
  doc,
  docData,
  DocumentData,
  documentId,
  Firestore,
  query,
  where,
} from "@angular/fire/firestore";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent {
  shoppingList: DocumentData = {};

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.authService.getUser().subscribe((user) => {
      if (!user) return;

      docData(doc(this.firestore, "shopping-lists", user.uid)).subscribe(
        (shoppingList) => {
          if (!shoppingList) return;

          this.shoppingList = shoppingList;

          shoppingList["ingredients"].forEach((ingredient: any) => {
            docData(ingredient.ref, { idField: "id" }).subscribe((data) => {
              this.shoppingList["ingredients"] = this.shoppingList[
                "ingredients"
              ].map((ingredient: any) =>
                ingredient.ref.id === data["id"]
                  ? { ...ingredient, ...data }
                  : ingredient
              );
            });
          });

          shoppingList["recipes"].forEach((recipe: any) => {
            docData(recipe.ref, { idField: "id" }).subscribe((data) => {
              this.shoppingList["recipes"] = this.shoppingList["recipes"].map(
                (recipe: any) =>
                  recipe.ref.id === data["id"] ? { ...recipe, ...data } : recipe
              );
            });
          });
        }
      );
    });
  }
}
