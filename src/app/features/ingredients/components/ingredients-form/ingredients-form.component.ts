import { Component, Input } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IngredientsService } from "src/app/services/ingredients.service";

@Component({
  selector: "app-ingredients-form",
  templateUrl: "./ingredients-form.component.html",
  styleUrls: ["./ingredients-form.component.css"],
})
export class IngredientsFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ingredientsService: IngredientsService
  ) {
    this.form = this.formBuilder.group({
      title: ["", [Validators.required]],
      type: ["", [Validators.required]],
    });
  }

  handleSubmit() {
    this.addIngredient();
    this.form.reset();
  }

  addIngredient() {
    this.ingredientsService.addIngredient({
      title: this.form.get("title")?.value,
      type: this.form.get("type")?.value,
    });
  }
}
