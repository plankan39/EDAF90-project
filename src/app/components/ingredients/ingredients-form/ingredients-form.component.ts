import { Component, Input } from "@angular/core";
import { DocumentData } from "@angular/fire/firestore";
import { FormGroup } from "@angular/forms";
import { IngredientsService } from "src/app/services/ingredients.service";

@Component({
  selector: "app-ingredients-form",
  templateUrl: "./ingredients-form.component.html",
  styleUrls: ["./ingredients-form.component.css"],
})
export class IngredientsFormComponent {
  @Input() form!: FormGroup;
  @Input() currentUpdateIngredient!: DocumentData | null;

  constructor(private ingredientsService: IngredientsService) {}

  handleSubmit() {
    if (!this.currentUpdateIngredient) {
      this.addIngredient();
      this.form.reset();
      return;
    }

    this.updateIngredient();
    this.form.reset();
  }

  addIngredient() {
    this.ingredientsService.addIngredient({
      title: this.form.get("title")?.value,
      unit: this.form.get("unit")?.value,
    });
  }

  updateIngredient() {
    this.ingredientsService.updateIngredient(
      this.currentUpdateIngredient?.["id"],
      {
        title: this.form.get("title")?.value,
        unit: this.form.get("unit")?.value,
      }
    );

    this.currentUpdateIngredient = null;
  }
}
