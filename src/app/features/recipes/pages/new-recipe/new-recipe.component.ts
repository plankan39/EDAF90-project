import { Component } from "@angular/core";
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
  query,
  where,
} from "@angular/fire/firestore";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
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
      title: "",
      description: "",
      cookingTime: 0,
      ingredients: this.formBuilder.array([]),
      instructions: this.formBuilder.array([]),
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
    this.recipeService.addRecipe(this.form.value);
  }

  get ingredientForms() {
    return this.form.get("ingredients") as FormArray;
  }

  get instructionForms() {
    return this.form.get("instructions") as FormArray;
  }

  addIngredientField() {
    const newGroup = this.formBuilder.group({
      ref: "",
      unit: "",
      quantity: "",
    });

    this.ingredientForms.push(newGroup);
  }

  deleteIngredientField(i: number) {
    this.ingredientForms.removeAt(i);
  }

  addInstructionField() {
    const newGroup = this.formBuilder.group({
      type: "",
      description: "",
    });

    this.instructionForms.push(newGroup);
  }

  deleteInstructionField(i: number) {
    this.instructionForms.removeAt(i);
  }
}
