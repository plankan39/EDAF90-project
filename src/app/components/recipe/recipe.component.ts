import { Component } from "@angular/core";
import { doc, docData, DocumentData, Firestore } from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { RecipesService } from "src/app/services/recipes.service";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.css"],
})
export class RecipeComponent {
  recipe: DocumentData = {};

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {
    this.route.params.subscribe((params: any) => {
      docData(doc(this.firestore, "recipes", params.id), {
        idField: "id",
      }).subscribe((recipe) => (this.recipe = recipe));
    });
  }

  deleteRecipe(id: string) {
    this.recipesService.deleteRecipe(id);
  }
}
