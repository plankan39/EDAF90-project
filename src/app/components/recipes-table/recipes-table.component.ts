import { Component, Input } from "@angular/core";
import { DocumentData } from "@angular/fire/firestore";
import { ShoppingListService } from "src/app/services/shopping-list.service";
import { Ingredient } from "src/app/types/ingredient";
import { Recipe } from "src/app/types/recipe";

@Component({
  selector: "app-recipes-table",
  templateUrl: "./recipes-table.component.html",
  styleUrls: ["./recipes-table.component.css"],
})
export class RecipesTableComponent {
  @Input() recipes!: DocumentData[];
  @Input() userId!: string | null;

  constructor(private shoppingListService: ShoppingListService) {}

  addToShoppingList(recipe: Recipe) {
    this.shoppingListService.addToShoppingList(recipe);
  }
}
