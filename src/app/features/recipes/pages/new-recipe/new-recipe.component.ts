import { Component } from "@angular/core";
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
  query,
  where,
} from "@angular/fire/firestore";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { RecipesService } from "src/app/services/recipes.service";

@Component({
  selector: "app-new-recipe",
  templateUrl: "./new-recipe.component.html",
  styleUrls: ["./new-recipe.component.css"],
})
export class NewRecipeComponent {
  form: FormGroup;
  ingredients: DocumentData[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipesService,
    private authService: AuthService,
    private firestore: Firestore
  ) {
    this.form = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      cookingTime: ["", Validators.required],
      ingredients: this.formBuilder.array([], [Validators.required]),
      instructions: this.formBuilder.array([], [Validators.required]),
    });

    this.authService.getUser().subscribe((user) => {
      if (user) {
        const col = collection(this.firestore, "ingredients");

        collectionData(query(col), {
          idField: "id",
        }).subscribe((ingredients) => (this.ingredients = ingredients));
      }
    });

    this.addIngredientField();
    this.addInstructionField();
  }

  handleSubmit() {
    if (this.form.valid) {
      this.recipeService.addRecipe(this.form.value);
    }
  }

  get ingredientForms() {
    return this.form.get("ingredients") as FormArray;
  }

  get instructionForms() {
    return this.form.get("instructions") as FormArray;
  }

  addIngredientField() {
    const newGroup = this.formBuilder.group({
      ref: ["", Validators.required],
      unit: ["", Validators.required],
      quantity: ["", Validators.required],
    });

    this.ingredientForms.push(newGroup);
  }

  deleteIngredientField(i: number) {
    this.ingredientForms.removeAt(i);
  }

  addInstructionField() {
    const newGroup = this.formBuilder.group({
      type: ["", Validators.required],
      description: ["", Validators.required],
    });

    this.instructionForms.push(newGroup);
  }

  deleteInstructionField(i: number) {
    this.instructionForms.removeAt(i);
  }
}
