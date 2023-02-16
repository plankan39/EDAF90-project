import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RecipesService } from "src/app/services/recipes.service";

@Component({
  selector: "app-recipe-new",
  templateUrl: "./recipe-new.component.html",
  styleUrls: ["./recipe-new.component.css"],
})
export class RecipeNewComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipesService
  ) {
    this.form = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      cookingTime: [0, [Validators.required]],
    });
  }

  handleSubmit() {
    this.recipeService.addRecipe({
      title: this.form.get("title")?.value,
      description: this.form.get("description")?.value,
      cookingTime: this.form.get("cookingTime")?.value,
    });
  }
}
