import { Component, OnInit } from "@angular/core";
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
  query,
  where,
} from "@angular/fire/firestore";
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { RecipesService } from "src/app/services/recipes.service";
import { map, startWith } from "rxjs/operators";
import { IngredientItem, Ingredient } from "src/app/types/ingredient";
import { IngredientsService } from "src/app/services/ingredients.service";
import { Instruction } from "src/app/types/instruction";
import { Recipe } from "src/app/types/recipe";
@Component({
  selector: "app-new-recipe",
  templateUrl: "./new.component.html",
  styleUrls: ["./new-recipe.component.css"],
})
export class NewRecipeComponentTest implements OnInit {
  ingredientItems: IngredientItem[] = [];
  filteredIngredients: Observable<IngredientItem[]>;
  form: FormGroup;
  ingredientForm: FormGroup;
  instructionForm: FormGroup;

  constructor(
    private ingredientService: IngredientsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ingredientService.getAll().subscribe((ingredientItems) => {
      this.ingredientItems = ingredientItems;
      console.log(this.ingredientItems);
    });

    this.form = this.formBuilder.group({
      userId: "",
      title: "",
      description: "",
      cookingTime: 0,
      ingredients: this.formBuilder.array([]),
      instructions: [],
    });

    this.ingredientForm = this.formBuilder.group<Ingredient>({
      ingredientItemId: "",
      unit: "",
      quantity: 0,
    });

    this.instructionForm = this.formBuilder.group<Instruction>({
      description: "",
      type: "",
    });

    this.filteredIngredients = this.ingredientItemForm.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.ingredientItems.slice()))
    );

    this.addIngredientField();
  }

  private _filter(value: string): IngredientItem[] {
    const filterValue = value.toLowerCase();
    return this.ingredientItems.filter(
      (option) => option.title.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(ingredient: IngredientItem): string {
    return ingredient && ingredient.title ? ingredient.title : "";
  }

  get ingredientItemForm() {
    return this.ingredientForm.get("ingredientItemId") as FormArray;
  }

  get instructionForms() {
    return this.form.get("instructions") as FormArray;
  }

  get ingredientForms() {
    return this.form.get("ingredients") as FormArray;
  }

  addIngredientField() {
    const newIngredient = this.formBuilder.group<Ingredient>({
      ingredientItemId: "",
      unit: "",
      quantity: 0,
    });

    this.ingredientForms.push(newIngredient);
    newIngredient.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.ingredientItems.slice()))
    );
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
