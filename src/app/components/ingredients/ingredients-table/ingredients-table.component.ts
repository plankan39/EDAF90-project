import { Component, Input } from "@angular/core";
import { DocumentData } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { IngredientsService } from "src/app/services/ingredients.service";

@Component({
  selector: "app-ingredients-table",
  templateUrl: "./ingredients-table.component.html",
  styleUrls: ["./ingredients-table.component.css"],
})
export class IngredientsTableComponent {
  @Input() setFormValues!: (ingredient: DocumentData) => void;
  @Input() ingredients$!: BehaviorSubject<DocumentData[]>;

  constructor(private ingredientsService: IngredientsService) {}

  deleteIngredient(id: string) {
    this.ingredientsService.deleteIngredient(id);
  }
}
