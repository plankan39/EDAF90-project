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
  selector: "app-shopping-lists",
  templateUrl: "./shopping-lists.component.html",
  styleUrls: ["./shopping-lists.component.css"],
})
export class ShoppingListsComponent {
  shoppingList: DocumentData = {};

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.authService.getUser().subscribe((user) => {
      if (!user) return;

      docData(doc(this.firestore, "shopping-lists", user.uid)).subscribe(
        (shoppingList) => {
          if (!shoppingList) return;

          this.shoppingList = shoppingList;

          const ingredientCol = collection(this.firestore, "ingredients");

          const ingredientIds = shoppingList["ingredients"].map(
            (ingredient: any) => ingredient["ingredientId"]
          );

          collectionData(
            query(ingredientCol, where(documentId(), "in", ingredientIds)),
            {
              idField: "id",
            }
          ).subscribe((ingredients) => {
            this.shoppingList["ingredients"].forEach((ingredient: any) => {
              const match = ingredients.find(
                (i: any) => i["id"] === ingredient["ingredientId"]
              );

              ingredient.title = match?.["title"];
            });
          });
        }
      );
    });
  }
}
