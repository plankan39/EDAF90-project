import { Component } from "@angular/core";
import { IngredientsService } from "src/app/services/ingredients.service";

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.component.html",
  styleUrls: ["./ingredients.component.css"],
})
export class IngredientsComponent {
  constructor(private ingredientsService: IngredientsService) {}

  add(values: any) {
    this.ingredientsService.addIngredient(values);
  }
}
