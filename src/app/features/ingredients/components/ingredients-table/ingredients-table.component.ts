import { Component, Input } from "@angular/core";
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
  orderBy,
  query,
} from "@angular/fire/firestore";
import { IngredientsService } from "src/app/services/ingredients.service";

@Component({
  selector: "app-ingredients-table",
  templateUrl: "./ingredients-table.component.html",
  styleUrls: ["./ingredients-table.component.css"],
})
export class IngredientsTableComponent {
  ingredients: any[] = [];

  constructor(
    private firestore: Firestore,
    private ingredientsService: IngredientsService
  ) {
    const col = collection(this.firestore, "ingredients");

    collectionData(query(col, orderBy("type")), {
      idField: "id",
    }).subscribe((ingredients) => (this.ingredients = ingredients));
  }

  deleteIngredient(id: string) {
    this.ingredientsService.deleteIngredient(id);
  }
}
