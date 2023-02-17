import { Component, Input } from "@angular/core";
import { DocumentData } from "@angular/fire/firestore";
import { IngredientsService } from "src/app/services/ingredients.service";

@Component({
  selector: "app-ingredients-table",
  templateUrl: "./ingredients-table.component.html",
  styleUrls: ["./ingredients-table.component.css"],
})
export class IngredientsTableComponent {
  @Input() setFormValues!: (ingredient: DocumentData) => void;
  @Input() ingredients!: DocumentData[];

  constructor(private ingredientsService: IngredientsService) {}
}
