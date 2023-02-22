import { Component, OnInit } from "@angular/core";
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
  query,
  where,
} from "@angular/fire/firestore";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { RecipesService } from "src/app/services/recipes.service";
import { map, startWith } from "rxjs/operators";
import { IngredientItem } from "src/app/types/ingredient";
import { IngredientsService } from "src/app/services/ingredients.service";
@Component({
  selector: "app-new-recipe",
  templateUrl: "./new-recipe.component.html",
  styleUrls: ["./new-recipe.component.css"],
})
export class NewRecipeComponent implements OnInit {
  form: FormGroup;
  ingredientItems: IngredientItem[] = [];
  ingredientControl = new FormControl();

  // ingredientFormGroup = this.formBuilder.group({
  //   quantity: "",
  //   unit: "",
  // });

  public filteredIngredients: Observable<IngredientItem[]> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipesService,
    private ingredientsService: IngredientsService
  ) {
    this.form = this.formBuilder.group({
      title: "",
      description: "",
      cookingTime: 0,
      ingredients: this.formBuilder.array([]),
      instructions: this.formBuilder.array([]),
    });

    // this.ingredientFormGroup.registerControl(
    //   "ingredient",
    //   this.ingredientControl
    // );

    this.ingredientsService.getAll().subscribe((ingredientItems) => {
      this.ingredientItems = ingredientItems;
      console.log(this.ingredientItems);
    });

    // this.authService.getUser().subscribe((user) => {
    //   if (user) {
    //     const col = collection(
    //       this.firestore,
    //       "users",
    //       user.uid,
    //       "ingredients"
    //     );

    //     collectionData(query(col), {
    //       idField: "id",
    //     }).subscribe((ingredients) => {

    //     });
    //   }
    // });

    this.addIngredientField();
    this.addInstructionField();
  }

  ngOnInit() {
    this.filteredIngredients = this.ingredientControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
    console.log("filtered:", this.filteredIngredients);
  }

  public _filter(value: string): IngredientItem[] {
    const filterValue = value.toLowerCase();

    return this.ingredientItems.filter((ingredient) =>
      ingredient["title"]?.toLowerCase().includes(filterValue)
    );
  }

  handleSubmit() {
    this.recipeService.addRecipe(this.form.value);
    console.log("Handle submit:", this.form.value);
  }

  get ingredientForms() {
    return this.form.get("ingredients") as FormArray;
  }

  get instructionForms() {
    return this.form.get("instructions") as FormArray;
  }

  addIngredientField() {
    const newGroup = this.formBuilder.group({
      ingredientId: "",
      quantity: "",
      unit: "",
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
